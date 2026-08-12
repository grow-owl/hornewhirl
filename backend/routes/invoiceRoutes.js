import express from 'express';
import { getInvoices, generateInvoice, settleInvoice } from '../controllers/invoiceController.js';

const router = express.Router();

router.get('/', getInvoices);
router.post('/generate', generateInvoice);
router.post('/settle', settleInvoice);

export default router;
