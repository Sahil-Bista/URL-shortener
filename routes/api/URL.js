import express from 'express';
import {
  getURLAnalyticsValidation,
  redirectURLValidation,
  shortenURLValidation,
} from '../../validation/URLValidation.js';
import { validationErrorHandler } from '../../middlewares/validationMiddleware.js';
import {
  getAnalytics,
  redirectURL,
  shortenURL,
} from '../../controllers/URLcontroller.js';
import { verifyJWT } from '../../middlewares/verifyjWT.js';
import { rateLimitter } from '../../middlewares/rateLimitter.js';

export const URLRouter = express.Router();

URLRouter.post(
  '/',
  rateLimitter,
  verifyJWT,
  shortenURLValidation,
  validationErrorHandler,
  shortenURL
);
URLRouter.get(
  '/:shortCode',
  redirectURLValidation,
  validationErrorHandler,
  redirectURL
);
URLRouter.get(
  '/stats/:shortCode',
  verifyJWT,
  getURLAnalyticsValidation,
  validationErrorHandler,
  getAnalytics
);
