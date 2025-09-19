import express from 'express';
import { URLRouter } from './URL.js';
import { userRouter } from './user.js';
import { verifyJWT } from '../../middlewares/verifyjWT.js';

export const router = express.Router();

router.use('/url', URLRouter);
router.use('/user', userRouter);

router.get('/hi', verifyJWT, (req, res) => {
  console.log('userId', req.user);
  return res.json('Hello');
});
