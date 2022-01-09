import { requireAuth } from '@vitoraafastpayfood/common';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/places', requireAuth, async (req: Request, res: Response) => {
  res.status(200).send();
});

export { router as indexPlaceRouter };