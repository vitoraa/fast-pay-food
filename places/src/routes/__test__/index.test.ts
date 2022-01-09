import request from 'supertest';
import { app } from '../../app';

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