import { Router } from 'express';
import { registerUser } from '../../controllers/registerController.js';
import {
  loginUserValidation,
  registerUserValidation,
} from '../../validation/userValidation.js';
import { validationErrorHandler } from '../../middlewares/validationMiddleware.js';
import { userLogin } from '../../controllers/authController.js';

export const userRouter = Router();

userRouter.post(
  '/register',
  registerUserValidation,
  validationErrorHandler,
  registerUser
);
userRouter.post(
  '/login',
  loginUserValidation,
  validationErrorHandler,
  userLogin
);
