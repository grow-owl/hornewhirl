import express from 'express';
import {
  getStudents,
  allocateStudent,
  updateStudentKYC,
  transferStudent,
  checkoutStudent
} from '../controllers/studentController.js';

const router = express.Router();

router.get('/', getStudents);
router.post('/allocate', allocateStudent);
router.put('/:id/kyc', updateStudentKYC);
router.post('/transfer', transferStudent);
router.post('/checkout', checkoutStudent);

export default router;
