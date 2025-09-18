import express from 'express';
import { URLRouter } from './URL.js';
import { userRouter } from './user.js';

export const router = express.Router();

router.use('/url', URLRouter);
router.use('/user', userRouter);
