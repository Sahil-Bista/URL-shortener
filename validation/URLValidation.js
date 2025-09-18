import { body, param } from 'express-validator';

export const shortenURLValidation = [
  body('longURL')
    .notEmpty()
    .withMessage('URL field cannot be empty')
    .isURL()
    .withMessage('Please enter a valid URL'),
];

export const redirectURLValidation = [
  param('shortCode')
    .notEmpty()
    .withMessage('A short code for the URL must be present')
    .isLength({ min: 1, max: 5 })
    .withMessage('The code must be 5 characters long'),
];

export const getURLAnalyticsValidation = [
  param('shortCode')
    .notEmpty()
    .withMessage('A short code for the URL must be present')
    .isLength({ min: 1, max: 5 })
    .withMessage('The code must be 5 characters long'),
];
