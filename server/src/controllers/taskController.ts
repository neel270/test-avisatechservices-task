import { Response } from 'express';
import { Tasks } from '../models';
import { AuthRequest } from '../middleware/auth';

const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { page = 1, limit = 10, status = 'all', sortBy = 'due_date' } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const offset = (pageNum - 1) * limitNum;

    const whereClause: any = { user_id: userId };
    if (status !== 'all') {
      whereClause.status = parseInt(status as string, 10);
    }

    let order: any[] = [];
    if (sortBy === 'due_date') {
      order = [['due_date', 'ASC']];
    } else if (sortBy === 'priority') {
      order = [['priority', 'DESC']];
    } else if (sortBy === 'title') {
      order = [['title', 'ASC']];
    }

    const { rows, count } = await Tasks.findAndCountAll({
      where: whereClause,
      order,
      limit: limitNum,
      offset,
    });

    res.json({
      tasks: rows,
      total: count,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(count / limitNum),
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const task = await Tasks.findOne({ where: { id, user_id: userId } });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ task });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, due_date, priority, status } = req.body;
    const userId = req.user!.id;

    const task = await Tasks.create({
      user_id: userId,
      title,
      description,
      due_date,
      priority: priority || 1,
      status: status || 1,
    });

    res.status(201).json({
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, due_date, priority, status } = req.body;
    const userId = req.user!.id;

    const task = await Tasks.findOne({ where: { id, user_id: userId } });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updateData: Partial<{ title: string; description: string | null; due_date: string; priority: number; status: number }> = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (due_date !== undefined) updateData.due_date = due_date;
    if (priority !== undefined) updateData.priority = priority;
    if (status !== undefined) updateData.status = status;

    await Tasks.update(updateData, { where: { id, user_id: userId } });

    const updatedTask = await Tasks.findByPk(id);
    res.json({
      message: 'Task updated successfully',
      task: updatedTask,
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const task = await Tasks.findOne({ where: { id, user_id: userId } });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await Tasks.destroy({ where: { id, user_id: userId } });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const updateStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user!.id;

    const task = await Tasks.findOne({ where: { id, user_id: userId } });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await Tasks.update({ status }, { where: { id, user_id: userId } });

    const updatedTask = await Tasks.findByPk(id);
    res.json({
      message: 'Task status updated successfully',
      task: updatedTask,
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { getTasks, getTask, createTask, updateTask, deleteTask, updateStatus };