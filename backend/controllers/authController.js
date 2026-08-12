import { readDB, writeDB } from '../config/db.js';

export const loginOwner = (req, res) => {
  const db = readDB();
  const { credential, password } = req.body;

  if (!credential || !password) {
    return res.status(400).json({ success: false, message: 'Email/Phone and password are required' });
  }

  const owner = (db.owners || []).find(
    (o) => (o.email === credential || o.phone === credential || o.email?.toLowerCase() === credential?.toLowerCase()) && o.password === password
  );

  if (!owner) {
    return res.status(401).json({ success: false, message: 'Invalid Email/Phone or Password' });
  }

  const property = (db.properties || []).find((p) => p.id === owner.propertyId) || null;

  res.json({
    success: true,
    owner: {
      id: owner.id,
      name: owner.name,
      email: owner.email,
      phone: owner.phone,
      propertyId: owner.propertyId
    },
    property
  });
};

export const registerOwner = (req, res) => {
  const db = readDB();
  const { name, email, phone, password, propertyName, city, locality, type, totalBeds, monthlyRentPerBed } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, Email, and Password are required' });
  }

  // Check if owner with same email already exists
  const existingOwner = (db.owners || []).find((o) => o.email?.toLowerCase() === email.toLowerCase());
  if (existingOwner) {
    return res.status(400).json({ success: false, message: 'An account with this email already exists' });
  }

  const newPropId = Date.now();
  const newProperty = {
    id: newPropId,
    name: propertyName || `${name}'s PG`,
    city: city || 'Main City',
    locality: locality || 'Locality',
    type: type || 'Co-Living PG',
    totalBeds: parseInt(totalBeds) || 0,
    monthlyRentPerBed: parseInt(monthlyRentPerBed) || 0,
    ownerName: name,
    phone: phone || '',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800'
  };

  const newOwner = {
    id: Date.now() + 1,
    name,
    email,
    phone: phone || '',
    password,
    propertyId: newPropId
  };

  db.properties = [newProperty, ...(db.properties || [])];
  db.owners = [newOwner, ...(db.owners || [])];

  writeDB(db);

  res.status(201).json({
    success: true,
    owner: {
      id: newOwner.id,
      name: newOwner.name,
      email: newOwner.email,
      phone: newOwner.phone,
      propertyId: newPropId
    },
    property: newProperty
  });
};
