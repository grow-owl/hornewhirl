import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { initDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';
import statsRoutes from './routes/statsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database Storage Schema
initDB();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check API Endpoint
app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'HomeWhirl PG Management Production REST API Server Online',
    timestamp: new Date().toISOString()
  });
});

// Modular Route Handlers
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/properties', propertyRoutes);
app.use('/api/v1/rooms', roomRoutes);
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/invoices', invoiceRoutes);
app.use('/api/v1/expenses', expenseRoutes);
app.use('/api/v1/complaints', complaintRoutes);
app.use('/api/v1/stats', statsRoutes);

// Global 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 HomeWhirl Production REST API running on http://localhost:${PORT}`);
});
