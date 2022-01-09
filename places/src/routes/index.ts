import { requireAuth } from '@vitoraafastpayfood/common';
import express, { Request, Response } from 'express';
import { Place } from '../models/places';

const router = express.Router();

router.get('/api/places', requireAuth, async (req: Request, res: Response) => {
  const places = await Place.find({});
  res.status(200).send(places);
});

export { router as indexPlaceRouter };