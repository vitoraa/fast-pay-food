import { NotFoundError, requireAuth, validateRequest } from '@vitoraafastpayfood/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Menu } from '../../models/menu';
import { Place } from '../../models/place';

const router = express.Router();

router.post('/api/places/:id/menus', requireAuth, [
  body('name')
    .not()
    .isEmpty()
    .withMessage('Name is required')
], validateRequest, async (req: Request, res: Response) => {
  const { name } = req.body;

  const place = await Place.findById(req.params.id);

  if (!place) {
    throw new NotFoundError();
  }

  const menu = Menu.build({ name, place });
  await menu.save();

  res.status(201).send(menu);
});

export { router as newMenuRouter };