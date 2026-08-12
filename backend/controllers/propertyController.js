import { readDB, writeDB } from '../config/db.js';

export const getProperties = (req, res) => {
  const db = readDB();
  res.json({ success: true, properties: db.properties || [] });
};

export const createProperty = (req, res) => {
  const db = readDB();
  const { name, city, locality, type, totalBeds, monthlyRentPerBed, ownerName, phone } = req.body;

  if (!name || !city || !locality) {
    return res.status(400).json({ success: false, message: 'Name, City, and Locality are required' });
  }

  const newProperty = {
    id: Date.now(),
    name,
    city,
    locality,
    type: type || 'Co-Living PG',
    totalBeds: parseInt(totalBeds) || 0,
    monthlyRentPerBed: parseInt(monthlyRentPerBed) || 0,
    ownerName: ownerName || 'PG Owner',
    phone: phone || '',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800'
  };

  db.properties.unshift(newProperty);
  writeDB(db);

  res.status(201).json({ success: true, property: newProperty });
};
