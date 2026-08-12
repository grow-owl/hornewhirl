import { readDB, writeDB } from '../config/db.js';

export const getInvoices = (req, res) => {
  const db = readDB();
  const propertyId = req.query.propertyId;
  let invoices = db.invoices || [];
  if (propertyId) {
    invoices = invoices.filter((i) => i.propertyId === parseInt(propertyId));
  }
  res.json({ success: true, invoices });
};

export const generateInvoice = (req, res) => {
  const db = readDB();
  const { propertyId, studentId, month, rentAmount, electricityAmount, waterAmount, dueDate } = req.body;

  const pId = parseInt(propertyId);
  const sId = parseInt(studentId);

  const student = (db.students || []).find((s) => s.id === sId);
  if (!student) {
    return res.status(404).json({ success: false, message: 'Tenant not found' });
  }

  const rent = parseInt(rentAmount) !== undefined ? parseInt(rentAmount) : (student.rent || 0);
  const elec = parseInt(electricityAmount) || 0;
  const water = parseInt(waterAmount) || 0;
  const total = rent + elec + water;

  const newInvoice = {
    id: `INV-${Date.now()}`,
    studentId: sId,
    studentName: student.name,
    propertyId: pId,
    month: month || `${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`,
    rentAmount: rent,
    electricityAmount: elec,
    waterAmount: water,
    amount: total,
    dueDate: dueDate || new Date().toISOString().split('T')[0],
    status: 'DUE',
    paidAmount: 0,
    paymentMethod: null,
    paidDate: null,
    receiptNo: null
  };

  db.invoices = [newInvoice, ...(db.invoices || [])];
  writeDB(db);

  res.status(201).json({ success: true, invoice: newInvoice });
};

export const settleInvoice = (req, res) => {
  const db = readDB();
  const { invoiceId, paymentMethod } = req.body;

  const invoiceIndex = (db.invoices || []).findIndex((i) => i.id === invoiceId);
  if (invoiceIndex === -1) {
    return res.status(404).json({ success: false, message: 'Invoice not found' });
  }

  const recNo = `REC-${Math.floor(1000 + Math.random() * 9000)}`;
  db.invoices[invoiceIndex] = {
    ...db.invoices[invoiceIndex],
    status: 'PAID',
    paidAmount: db.invoices[invoiceIndex].amount,
    paymentMethod: paymentMethod || 'UPI',
    paidDate: new Date().toISOString().split('T')[0],
    receiptNo: recNo
  };

  writeDB(db);
  res.json({ success: true, invoice: db.invoices[invoiceIndex] });
};
