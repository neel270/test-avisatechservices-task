import { Router } from 'express';
import { getTasks, getTask, createTask, updateTask, deleteTask, markTaskComplete, updateStatus } from '../controllers/taskController';
import { taskValidation } from '../middleware/validation';
import { auth } from '../middleware/auth';

const router = Router();

router.use(auth); // All task routes require authentication

router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', taskValidation, createTask);
router.put('/:id', taskValidation, updateTask);
router.patch('/:id/complete', markTaskComplete);
router.patch('/:id/status', updateStatus);
router.delete('/:id', deleteTask);

export default router;