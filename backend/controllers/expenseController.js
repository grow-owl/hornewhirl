import { readDB, writeDB } from '../config/db.js';

export const getExpenses = (req, res) => {
  const db = readDB();
  const propertyId = req.query.propertyId;
  let expenses = db.expenses || [];
  if (propertyId) {
    expenses = expenses.filter((e) => e.propertyId === parseInt(propertyId));
  }
  res.json({ success: true, expenses });
};

export const createExpense = (req, res) => {
  const db = readDB();
  const { propertyId, category, amount, notes, date } = req.body;

  if (!propertyId || !amount) {
    return res.status(400).json({ success: false, message: 'Property ID and Amount are required' });
  }

  const newExpense = {
    id: Date.now(),
    propertyId: parseInt(propertyId),
    category: category || 'General Operating',
    amount: parseInt(amount) || 0,
    notes: notes || '',
    date: date || new Date().toISOString().split('T')[0]
  };

  db.expenses = [newExpense, ...(db.expenses || [])];
  writeDB(db);

  res.status(201).json({ success: true, expense: newExpense });
};
