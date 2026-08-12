import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, '..', 'data.json');

// Schema with zero hardcoded test data
const initialSchema = {
  owners: [],
  properties: [],
  rooms: [],
  students: [],
  invoices: [],
  expenses: [],
  complaints: []
};

// Initialize DB file if not exists
export const initDB = () => {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialSchema, null, 2), 'utf-8');
  }
};

// Read database
export const readDB = () => {
  try {
    if (!fs.existsSync(DB_FILE)) {
      initDB();
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading DB, resetting to clean schema:', err);
    return initialSchema;
  }
};

// Write database
export const writeDB = (dbData) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(dbData, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing DB:', err);
  }
};
