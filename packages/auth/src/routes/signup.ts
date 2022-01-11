import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError, validateRequest } from '@vitoraafastpayfood/common';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { environment } from '../environment';

const router = express.Router();

router.post('/api/users/signup', [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters')
], validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    await user.save();

    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    }, environment.jwt_key);

    req.session = { jwt: userJwt };

    res.status(201).send(user);
  });

export { router as signupRouter };