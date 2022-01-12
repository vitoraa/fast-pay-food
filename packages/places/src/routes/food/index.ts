import { NotFoundError, requireAuth } from '@vitoraafastpayfood/common';
import express, { Request, Response } from 'express';
import { Place } from '../../models/place';

const router = express.Router();

router.get('/api/places/:idPlace/food', requireAuth, async (req: Request, res: Response) => {
  const placeId = req.params.idPlace;
  const place = await Place.findById(placeId);

  if (!place) {
    console.log('erro');
    throw new NotFoundError();
  }
  res.status(200).send(place.foods);
});

export { router as indexFoodRouter };