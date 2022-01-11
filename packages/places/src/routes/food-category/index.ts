import { NotFoundError } from '@vitoraafastpayfood/common';
import express, { Request, Response } from 'express';
import { Place } from '../../models/place';

const router = express.Router();

router.get('/api/places/:idPlace/food-category', async (req: Request, res: Response) => {
  const placeId = req.params.idPlace;
  const place = await Place.findById(placeId);

  if (!place) {
    throw new NotFoundError();
  }
  res.status(200).send(place.foodCategories);
});

export { router as indexFoodCategoryRouter };