import { NotFoundError, requireAuth, validateRequest } from '@vitoraafastpayfood/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Food } from '../../models/food';
import { FoodCategory } from '../../models/food-category';
import { Place } from '../../models/place';

const router = express.Router();

router.post('/api/places/:idPlace/food', requireAuth, [
  body('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price is required'),
  body('foodCategoryId')
    .not()
    .isEmpty()
    .withMessage('Food Category ID is required'),
  body('photoUrl')
    .optional()
    .isURL()
    .withMessage('Photo URL should be a valid URL'),
], validateRequest, async (req: Request, res: Response) => {
  const { name, price, foodCategoryId, photoUrl } = req.body;
  const placeId = req.params.idPlace;

  const place = await Place.findById(placeId);

  if (!place) {
    throw new NotFoundError();
  }

  const foodCategory = place.foodCategories.find(
    (foodCategory) => foodCategory.id === foodCategoryId
  );

  console.log(foodCategory);

  if (!foodCategory) {
    throw new NotFoundError();
  }

  const food = Food.build({
    name,
    price,
    foodCategory: foodCategoryId,
    photoUrl,
  });

  place.foods.push(food);
  await place.save();

  res.status(201).send(food);
});

export { router as newFoodRouter };