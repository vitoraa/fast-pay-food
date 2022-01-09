import request from 'supertest';
import { app } from '../../app';
import { Place } from '../../models/places';

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

test('should only be accessed if the user is signed in', async () => {
  await request(app)
    .get('/api/places')
    .send({})
    .expect(401);
});

test('should returns status other than 401 if the user is signed in', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .get('/api/places')
    .set('Cookie', cookie)
    .send({})

  expect(response.status).not.toEqual(401);
});

test('should return all places', async () => {
  const place = createPlace();
  await place.save();
  const place2 = createPlace();
  await place2.save();
  const place3 = createPlace();
  await place3.save();

  const cookie = global.signin();

  const response = await request(app)
    .get('/api/places')
    .set('Cookie', cookie)
    .send({})

  expect(response.status).toEqual(200);
  expect(response.body.length).toEqual(3);
});