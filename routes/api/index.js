import express from 'express';

export const router = express.Router();

router.get('/health', (req, res) => {
  console.log(`App is up and runing`);
});
