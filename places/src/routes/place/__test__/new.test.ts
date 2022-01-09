import request from 'supertest';
import { app } from '../../../app';
import { Place } from '../../../models/place';

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

test('should create a place', async () => {
  await request(app)
    .post('/api/places')
    .set('Cookie', global.signin())
    .send({
      name: 'Name',
      address: 'Adress',
      type: 'Type',
    })
    .expect(201);

  const placeFound = await Place.find({});
  expect(placeFound[0]).toBeTruthy();
  expect(placeFound[0]!.name).toEqual('Name');
  expect(placeFound[0]!.address).toEqual('Adress');
  expect(placeFound[0]!.type).toEqual('Type');
});