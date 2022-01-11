import { NotFoundError, requireAuth, validateRequest } from '@vitoraafastpayfood/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { FoodCategory } from '../../models/food-category';
import { Place } from '../../models/place';

const router = express.Router();

router.post('/api/places/:idPlace/food-category', requireAuth, [
  body('name')
    .not()
    .isEmpty()
    .withMessage('Name is required')
], validateRequest, async (req: Request, res: Response) => {
  const { name } = req.body;
  const placeId = req.params.idPlace;

  const place = await Place.findById(placeId);

  if (!place) {
    throw new NotFoundError();
  }

  const foodCategory = FoodCategory.build({ name });
  place.foodCategories.push(foodCategory);
  await place.save();

  res.status(201).send(foodCategory);
});

export { router as newFoodCategoryRouter };