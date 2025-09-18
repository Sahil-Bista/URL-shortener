import { Router } from 'express';
import { registerUser } from '../../controllers/registerController.js';
import { registerUserValidation } from '../../validation/userValidation.js';
import { validationErrorHandler } from '../../middlewares/validationMiddleware.js';

export const userRouter = Router();

userRouter.post(
  '/register',
  registerUserValidation,
  validationErrorHandler,
  registerUser
);
