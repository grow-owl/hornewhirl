import express from 'express';
import {
  getComplaints,
  createComplaint,
  assignStaff,
  updateComplaintStatus
} from '../controllers/complaintController.js';

const router = express.Router();

router.get('/', getComplaints);
router.post('/', createComplaint);
router.put('/:id/assign', assignStaff);
router.put('/:id/status', updateComplaintStatus);

export default router;
