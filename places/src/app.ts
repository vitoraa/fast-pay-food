import express from 'express';
import 'express-async-errors';
import { NotFoundError, errorHandler } from '@vitoraafastpayfood/common';
import cookieSession from 'cookie-session';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(cookieSession({
  signed: false,
  secure: false,
}));

app.all('*', async () => {
  throw new NotFoundError()
});

app.use(errorHandler);

export { app };
