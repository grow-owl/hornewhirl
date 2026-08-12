import { readDB, writeDB } from '../config/db.js';

export const getComplaints = (req, res) => {
  const db = readDB();
  const propertyId = req.query.propertyId;
  let complaints = db.complaints || [];
  if (propertyId) {
    complaints = complaints.filter((c) => c.propertyId === parseInt(propertyId));
  }
  res.json({ success: true, complaints });
};

export const createComplaint = (req, res) => {
  const db = readDB();
  const { propertyId, studentName, roomNo, category, priority, description } = req.body;

  if (!propertyId || !description) {
    return res.status(400).json({ success: false, message: 'Property ID and Description are required' });
  }

  const newComplaint = {
    id: Date.now(),
    propertyId: parseInt(propertyId),
    studentName: studentName || 'Tenant',
    roomNo: roomNo || '101',
    category: category || 'General Maintenance',
    priority: priority || 'MEDIUM',
    description: description || 'Maintenance issue logged',
    assignedStaff: 'Unassigned',
    date: new Date().toISOString().split('T')[0],
    status: 'OPEN'
  };

  db.complaints = [newComplaint, ...(db.complaints || [])];
  writeDB(db);

  res.status(201).json({ success: true, complaint: newComplaint });
};

export const assignStaff = (req, res) => {
  const db = readDB();
  const complaintId = parseInt(req.params.id);
  const { assignedStaff } = req.body;

  const idx = (db.complaints || []).findIndex((c) => c.id === complaintId);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Complaint ticket not found' });
  }

  db.complaints[idx].assignedStaff = assignedStaff || 'Assigned Staff';
  if (db.complaints[idx].status === 'OPEN') {
    db.complaints[idx].status = 'IN_PROGRESS';
  }

  writeDB(db);
  res.json({ success: true, complaint: db.complaints[idx] });
};

export const updateComplaintStatus = (req, res) => {
  const db = readDB();
  const complaintId = parseInt(req.params.id);
  const { status } = req.body;

  const complaintIndex = (db.complaints || []).findIndex((c) => c.id === complaintId);
  if (complaintIndex === -1) {
    return res.status(404).json({ success: false, message: 'Complaint ticket not found' });
  }

  db.complaints[complaintIndex].status = status || 'RESOLVED';
  writeDB(db);

  res.json({ success: true, complaint: db.complaints[complaintIndex] });
};
