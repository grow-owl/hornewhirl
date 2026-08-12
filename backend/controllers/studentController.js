import { readDB, writeDB } from '../config/db.js';

export const getStudents = (req, res) => {
  const db = readDB();
  const propertyId = req.query.propertyId;
  let students = db.students || [];
  if (propertyId) {
    students = students.filter((s) => s.propertyId === parseInt(propertyId));
  }
  res.json({ success: true, students });
};

export const allocateStudent = (req, res) => {
  const db = readDB();
  const {
    propertyId,
    studentName,
    phone,
    email,
    gender,
    guardian,
    roomNo,
    bedNo,
    rent,
    joiningDate,
    aadhaarNo,
    panNo,
    emergencyContact,
    idProofType
  } = req.body;

  if (!propertyId || !studentName || !phone || !roomNo) {
    return res.status(400).json({ success: false, message: 'Property, Tenant Name, Phone, and Room No are required' });
  }

  const pId = parseInt(propertyId);
  const studentId = Date.now();

  const newStudent = {
    id: studentId,
    propertyId: pId,
    name: studentName,
    phone,
    email: email || `${studentName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
    gender: gender || 'Male',
    guardian: guardian || 'Guardian Contact Recorded',
    joiningDate: joiningDate || new Date().toISOString().split('T')[0],
    roomNo,
    bedNo: bedNo || 'Bed 1',
    rent: parseInt(rent) || 0,
    status: 'ACTIVE',
    kyc: {
      aadhaarNo: aadhaarNo || '',
      panNo: panNo || '',
      emergencyContact: emergencyContact || phone,
      idProofType: idProofType || 'Aadhaar Card',
      idProofUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600',
      verified: true
    }
  };

  db.students = [newStudent, ...(db.students || [])];

  // Update Bed status in Room to OCCUPIED
  db.rooms = (db.rooms || []).map((room) => {
    if (room.propertyId === pId && String(room.roomNo) === String(roomNo)) {
      const updatedBeds = room.beds.map((bed) => {
        if (bed.bedNo === bedNo || bed.id === bedNo) {
          return { ...bed, status: 'OCCUPIED', studentId, studentName };
        }
        return bed;
      });
      return { ...room, beds: updatedBeds };
    }
    return room;
  });

  // Create Initial Monthly Rent Invoice
  const newInvoice = {
    id: `INV-${Date.now()}`,
    studentId,
    studentName,
    propertyId: pId,
    month: `${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`,
    rentAmount: parseInt(rent) || 0,
    electricityAmount: 0,
    waterAmount: 0,
    amount: parseInt(rent) || 0,
    dueDate: new Date().toISOString().split('T')[0],
    status: 'DUE',
    paidAmount: 0,
    paymentMethod: null,
    paidDate: null,
    receiptNo: null
  };

  db.invoices = [newInvoice, ...(db.invoices || [])];
  writeDB(db);

  res.status(201).json({ success: true, student: newStudent, invoice: newInvoice });
};

export const updateStudentKYC = (req, res) => {
  const db = readDB();
  const studentId = parseInt(req.params.id);
  const { aadhaarNo, panNo, emergencyContact, idProofType, idProofUrl } = req.body;

  const idx = (db.students || []).findIndex((s) => s.id === studentId);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Tenant not found' });
  }

  db.students[idx].kyc = {
    ...db.students[idx].kyc,
    aadhaarNo: aadhaarNo !== undefined ? aadhaarNo : db.students[idx].kyc?.aadhaarNo,
    panNo: panNo !== undefined ? panNo : db.students[idx].kyc?.panNo,
    emergencyContact: emergencyContact !== undefined ? emergencyContact : db.students[idx].kyc?.emergencyContact,
    idProofType: idProofType !== undefined ? idProofType : db.students[idx].kyc?.idProofType,
    idProofUrl: idProofUrl !== undefined ? idProofUrl : db.students[idx].kyc?.idProofUrl,
    verified: true
  };

  writeDB(db);
  res.json({ success: true, student: db.students[idx] });
};

export const transferStudent = (req, res) => {
  const db = readDB();
  const { studentId, newRoomNo, newBedNo } = req.body;
  const sId = parseInt(studentId);

  const studentIndex = (db.students || []).findIndex((s) => s.id === sId);
  if (studentIndex === -1) {
    return res.status(404).json({ success: false, message: 'Tenant not found' });
  }

  const student = db.students[studentIndex];
  const oldRoomNo = student.roomNo;
  const oldBedNo = student.bedNo;

  // Release old bed
  db.rooms = (db.rooms || []).map((room) => {
    if (room.propertyId === student.propertyId && String(room.roomNo) === String(oldRoomNo)) {
      const updatedBeds = room.beds.map((b) => {
        if (b.bedNo === oldBedNo) {
          return { ...b, status: 'AVAILABLE', studentId: null, studentName: null };
        }
        return b;
      });
      return { ...room, beds: updatedBeds };
    }
    return room;
  });

  // Occupy new bed
  db.rooms = (db.rooms || []).map((room) => {
    if (room.propertyId === student.propertyId && String(room.roomNo) === String(newRoomNo)) {
      const updatedBeds = room.beds.map((b) => {
        if (b.bedNo === newBedNo) {
          return { ...b, status: 'OCCUPIED', studentId: student.id, studentName: student.name };
        }
        return b;
      });
      return { ...room, beds: updatedBeds };
    }
    return room;
  });

  db.students[studentIndex].roomNo = newRoomNo;
  db.students[studentIndex].bedNo = newBedNo;

  writeDB(db);
  res.json({ success: true, student: db.students[studentIndex] });
};

export const checkoutStudent = (req, res) => {
  const db = readDB();
  const { studentId } = req.body;
  const sId = parseInt(studentId);

  const studentIndex = (db.students || []).findIndex((s) => s.id === sId);
  if (studentIndex === -1) {
    return res.status(404).json({ success: false, message: 'Tenant not found' });
  }

  const student = db.students[studentIndex];

  // Mark bed AVAILABLE
  db.rooms = (db.rooms || []).map((room) => {
    if (room.propertyId === student.propertyId && String(room.roomNo) === String(student.roomNo)) {
      const updatedBeds = room.beds.map((b) => {
        if (b.bedNo === student.bedNo) {
          return { ...b, status: 'AVAILABLE', studentId: null, studentName: null };
        }
        return b;
      });
      return { ...room, beds: updatedBeds };
    }
    return room;
  });

  db.students[studentIndex].status = 'CHECKED_OUT';
  writeDB(db);

  res.json({ success: true, message: 'Tenant checked out successfully' });
};
