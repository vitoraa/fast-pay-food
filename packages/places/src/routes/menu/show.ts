import { NotFoundError } from '@vitoraafastpayfood/common';
import express, { Request, Response } from 'express';
import { Place } from '../../models/place';

const router = express.Router();

router.get('/api/places/:idPlace/menus/:idMenu', async (req: Request, res: Response) => {
  const place = await Place.findById(req.params.idPlace);
  if (!place) {
    throw new NotFoundError();
  }

  const menu = place.menus.find(menu => menu.id === req.params.idMenu);

  if (!menu) {
    throw new NotFoundError();
  }

  res.status(200).send(menu);
});

export { router as showMenuRouter };