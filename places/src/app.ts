import express from 'express';
import 'express-async-errors';
import { NotFoundError, errorHandler, currentUser } from '@vitoraafastpayfood/common';
import cookieSession from 'cookie-session';
import { indexPlaceRouter } from './routes';
import { newPlaceRouter } from './routes/new';

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

app.all('*', async () => {
  throw new NotFoundError()
});

app.use(errorHandler);

export { app };
