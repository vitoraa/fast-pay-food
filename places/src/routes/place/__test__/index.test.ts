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

test('should have a route handler listening to api/places for get request', async () => {
  const response = await request(app)
    .get('/api/places')
    .send({})

  expect(response.status).not.toEqual(404);
});

test('should return all places', async () => {
  const place = createPlace();
  await place.save();
  const place2 = createPlace();
  await place2.save();
  const place3 = createPlace();
  await place3.save();

  const response = await request(app)
    .get('/api/places')
    .send({})

  expect(response.status).toEqual(200);
  expect(response.body.length).toEqual(3);
});