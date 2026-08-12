import { readDB, writeDB } from '../config/db.js';

export const getRooms = (req, res) => {
  const db = readDB();
  const propertyId = req.query.propertyId;
  let rooms = db.rooms || [];
  if (propertyId) {
    rooms = rooms.filter((r) => r.propertyId === parseInt(propertyId));
  }
  res.json({ success: true, rooms });
};

export const createRoom = (req, res) => {
  const db = readDB();
  const { propertyId, floor, roomNo, sharingType, rent, bedCount, acType } = req.body;

  if (!propertyId || !roomNo) {
    return res.status(400).json({ success: false, message: 'Property ID and Room Number are required' });
  }

  const numBeds = parseInt(bedCount) || 1;
  const beds = Array.from({ length: numBeds }).map((_, idx) => ({
    id: `${Date.now()}-${roomNo}-${idx + 1}`,
    bedNo: `Bed ${idx + 1}`,
    status: 'AVAILABLE',
    studentId: null,
    studentName: null
  }));

  const newRoom = {
    id: Date.now(),
    propertyId: parseInt(propertyId),
    floor: floor || 'Ground Floor',
    roomNo: String(roomNo),
    sharingType: sharingType || 'Double Sharing',
    monthlyRent: parseInt(rent) || 0,
    rent: parseInt(rent) || 0,
    acType: acType || 'NON-AC',
    hasAc: acType === 'AC',
    beds
  };

  db.rooms = [newRoom, ...(db.rooms || [])];
  writeDB(db);

  res.status(201).json({ success: true, room: newRoom });
};

export const deleteRoom = (req, res) => {
  const db = readDB();
  const roomId = parseInt(req.params.id);

  db.rooms = (db.rooms || []).filter((r) => r.id !== roomId);
  writeDB(db);

  res.json({ success: true, message: 'Room deleted successfully' });
};

export const updateBedStatus = (req, res) => {
  const db = readDB();
  const roomId = parseInt(req.params.roomId);
  const bedNo = req.params.bedNo;
  const { status } = req.body;

  if (!['AVAILABLE', 'OCCUPIED', 'MAINTENANCE'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid bed status' });
  }

  let updatedBed = null;
  db.rooms = (db.rooms || []).map((room) => {
    if (room.id === roomId) {
      const updatedBeds = room.beds.map((b) => {
        if (b.bedNo === bedNo || b.id === bedNo) {
          updatedBed = {
            ...b,
            status,
            ...(status === 'AVAILABLE' || status === 'MAINTENANCE'
              ? { studentId: null, studentName: null }
              : {})
          };
          return updatedBed;
        }
        return b;
      });
      return { ...room, beds: updatedBeds };
    }
    return room;
  });

  writeDB(db);
  res.json({ success: true, bed: updatedBed, message: `Bed status updated to ${status}` });
};
