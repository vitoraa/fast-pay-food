import { requireAuth, validateRequest } from '@vitoraafastpayfood/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Place } from '../models/place';

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
  const { name, address, type } = req.body;
  const place = Place.build({ name, address, type });
  await place.save();
  res.status(201).send(place);
});

export { router as newPlaceRouter };