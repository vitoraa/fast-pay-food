import request from 'supertest';
import { app } from '../../app';

test('should have a route handler listening to api/places for post request', async () => {
  const response = await request(app)
    .post('/api/places')
    .send({})

  expect(response.status).not.toEqual(404);
});
