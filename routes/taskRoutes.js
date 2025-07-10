import express from 'express';
import { createTask, getTask, updateTask, deleteTask } from '../controllers/taskController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createTask);
router.get('/', protect, getTask);
router.route('/:id')
  .put(protect, updateTask)
  .delete(protect, deleteTask);

export default router;