import request from 'supertest';
import { app } from '../../app';

test('should have a route handler listening to api/places for post request', async () => {
  const response = await request(app)
    .post('/api/places')
    .send({})

  expect(response.status).not.toEqual(404);
});

test('should only be accessed if the user is signed in', async () => {
  await request(app)
    .post('/api/places')
    .send({})
    .expect(401);
});

test('should return an error if an invalid place is provided', async () => {
  const cookie = global.signin();
  await request(app)
    .post('/api/places')
    .set('Cookie', cookie)
    .send({
      name: '',
      address: '',
      type: '',
    })
    .expect(400);

  await request(app)
    .post('/api/places')
    .set('Cookie', cookie)
    .send({
      name: 'Name',
      address: 'Adress',
    })
    .expect(400);

  await request(app)
    .post('/api/places')
    .set('Cookie', cookie)
    .send({
      address: 'Adress',
      type: 'Type',
    })
    .expect(400);

  await request(app)
    .post('/api/places')
    .set('Cookie', cookie)
    .send({
      name: 'Name',
      address: 'Adress',
    })
    .expect(400);
});
