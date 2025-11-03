import express from 'express';
import { register, login, getProfile, updateProfile, changePassword } from '../controllers/authController';
import { registerValidation, loginValidation, updateProfileValidation, changePasswordValidation } from '../middleware/validation';
import { auth } from '../middleware/auth';

const router = express.Router();

// POST /api/auth/register
router.post('/register', registerValidation, register);

// POST /api/auth/login
router.post('/login', loginValidation, login);

// GET /api/auth/profile
router.get('/profile', auth, getProfile);

// PUT /api/auth/profile
router.put('/profile', auth, updateProfileValidation, updateProfile);

// PUT /api/auth/change-password
router.put('/change-password', auth, changePasswordValidation, changePassword);

export default router;