import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  handleValidationErrors,
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];

const updateProfileValidation = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  handleValidationErrors,
];

const changePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  handleValidationErrors,
];

const taskValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('due_date').isISO8601().withMessage('Valid due date is required'),
  body('priority').optional().isInt({ min: 1, max: 3 }).withMessage('Priority must be 1, 2, or 3'),
  body('status').optional().isInt({ min: 1, max: 3 }).withMessage('Status must be 1, 2, or 3'),
  handleValidationErrors,
];

export {
  registerValidation,
  loginValidation,
  updateProfileValidation,
  changePasswordValidation,
  taskValidation,
};