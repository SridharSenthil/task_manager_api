import express from 'express';
import { createTask, getTask } from '../controllers/taskController';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createTask);
router.get('/', protect, getTask);

export default router;