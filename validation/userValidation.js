import { body } from 'express-validator';

export const registerUserValidation = [
  body('email')
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email'),
  body('username')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Username is required'),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Pasowrd must be at least 6 characters long'),
];

export const loginUserValidation = [
  body('email')
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email'),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Pasowrd must be at least 6 characters long'),
];
