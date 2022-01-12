import request from 'supertest';
import { app } from '../../../app';
import { Place } from '../../../models/place';

const createPlace = () => {
  return Place.build({
    name: 'Place 1',
    address: 'Address 1',
    type: 'restaurant',
  })
};

test('should have a route handler listening to /api/places/:idPlace/food-category for post request', async () => {
  const place = createPlace();
  await place.save();
  const response = await request(app)
    .post(`/api/places/${place.id}/food-category`)
    .send({ name: 'name' })

  expect(response.status).not.toEqual(404);
});

test('should only be accessed if the user is signed in', async () => {
  const place = createPlace();
  await place.save();
  await request(app)
    .post(`/api/places/${place.id}/food-category`)
    .send({ name: 'name' })
    .expect(401);
});