import request from 'supertest';
import { app } from '../../../app';
import mongoose from 'mongoose';
import { Place } from '../../../models/place';

const createPlace = () => {
  return Place.build({
    name: 'Place 1',
    address: 'Address 1',
    type: 'restaurant',
  })
};

test('should have a route handler listening to /api/places/:idPlace/food-category for get request', async () => {
  const place = createPlace();
  await place.save();

  await request(app)
    .post(`/api/places/${place.id}/food-category`)
    .send({ name: 'name' })

  const response = await request(app)
    .get(`/api/places/${place.id}/food-category`)
    .send({})

  expect(response.status).not.toEqual(404);
});