import express from 'express';
import { shortenURLValidation } from '../../validation/URLValidation.js';
import { validationErrorHandler } from '../../middlewares/validationMiddleware.js';
import { shortenURL } from '../../controllers/URLcontroller.js';

export const URLRouter = express.Router();

URLRouter.post('/', shortenURLValidation, validationErrorHandler, shortenURL);
