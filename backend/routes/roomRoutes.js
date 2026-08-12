import express from 'express';
import { getRooms, createRoom, deleteRoom, updateBedStatus } from '../controllers/roomController.js';

const router = express.Router();

router.get('/', getRooms);
router.post('/', createRoom);
router.delete('/:id', deleteRoom);
router.put('/:roomId/beds/:bedNo/status', updateBedStatus);

export default router;
