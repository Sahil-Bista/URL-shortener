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

export const URLRouter = express.Router();

URLRouter.post('/', shortenURLValidation, validationErrorHandler, shortenURL);
URLRouter.get(
  '/:shortCode',
  redirectURLValidation,
  validationErrorHandler,
  redirectURL
);
URLRouter.get(
  '/stats/:shortCode',
  getURLAnalyticsValidation,
  validationErrorHandler,
  getAnalytics
);
