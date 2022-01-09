import { requireAuth } from '@vitoraafastpayfood/common';
import express, { Request, Response } from 'express';
import { Place } from '../models/places';

const router = express.Router();

router.post('/api/places', async (req: Request, res: Response) => {
  res.status(200).send();
});

export { router as newPlaceRouter };