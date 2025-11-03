import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models';
import { AuthRequest } from '../middleware/auth';
import { config } from '../config/env';

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashed });

    const token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, { expiresIn: '24h' });

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, { expiresIn: '24h' });

    res.json({
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email } = req.body;
    const userId = req.user!.id;

    const updateData: Partial<{ name: string; email: string }> = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    await User.update(updateData, { where: { id: userId } });

    const updatedUser = await User.findByPk(userId);
    res.json({
      message: 'Profile updated successfully',
      user: { id: updatedUser!.id, name: updatedUser!.name, email: updatedUser!.email },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user!.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    const hashed = await bcrypt.hash(newPassword, 12);
    await User.update({ password: hashed }, { where: { id: userId } });

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { register, login, getProfile, updateProfile, changePassword };