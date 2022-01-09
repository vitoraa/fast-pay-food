import { requireAuth, validateRequest } from '@vitoraafastpayfood/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Place } from '../models/places';

const router = express.Router();

router.post('/api/places', requireAuth, [
  body('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),
  body('address')
    .not()
    .isEmpty()
    .withMessage('Address is required'),
  body('type')
    .not()
    .isEmpty()
    .withMessage('Type is required'),
], validateRequest, async (req: Request, res: Response) => {
  res.status(200).send();
});

export { router as newPlaceRouter };