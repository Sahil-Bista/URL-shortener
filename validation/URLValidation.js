import { body } from 'express-validator';

export const shortenURLValidation = [
  body('longURL')
    .notEmpty()
    .withMessage('URL field cannot be empty')
    .isURL()
    .withMessage('Please enter a valid URL'),
];
