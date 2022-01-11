import { NotFoundError } from '@vitoraafastpayfood/common';
import express, { Request, Response } from 'express';
import { Place } from '../../models/place';

const router = express.Router();

router.get('/api/places/:id', async (req: Request, res: Response) => {
  const place = await Place.findById(req.params.id);
  if (!place) {
    throw new NotFoundError();
  }
  res.status(200).send(place);
});

export { router as showPlaceRouter };