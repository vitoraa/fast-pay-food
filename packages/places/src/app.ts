import express from 'express';
import 'express-async-errors';
import { NotFoundError, errorHandler, currentUser } from '@vitoraafastpayfood/common';
import cookieSession from 'cookie-session';
import { indexPlaceRouter } from './routes/place';
import { newPlaceRouter } from './routes/place/new';
import { showPlaceRouter } from './routes/place/show';
import { newMenuRouter } from './routes/menu/new';
import { showMenuRouter } from './routes/menu/show';
import { newFoodCategoryRouter } from './routes/food-category/new';
import { indexFoodCategoryRouter } from './routes/food-category';
import { newFoodRouter } from './routes/food/new';
import { indexFoodRouter } from './routes/food';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(cookieSession({
  signed: false,
  secure: false,
}));

app.use(currentUser);
app.use(indexPlaceRouter);
app.use(newPlaceRouter);
app.use(showPlaceRouter);
app.use(newMenuRouter);
app.use(showMenuRouter);
app.use(newFoodCategoryRouter);
app.use(indexFoodCategoryRouter);
app.use(newFoodRouter);
app.use(indexFoodRouter);

app.all('*', async () => {
  throw new NotFoundError()
});

app.use(errorHandler);

export { app };
