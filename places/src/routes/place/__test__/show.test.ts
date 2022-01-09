import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../../app';

test('should return 404 if the place is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get(`/api/places/${id}`)
    .send()
    .expect(404);
});

test('should return the place if the place is found', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post('/api/places')
    .set('Cookie', cookie)
    .send({
      name: 'Name',
      address: 'Address',
      type: 'Type'
    })
    .expect(201);

  const placeResponse = await request(app)
    .get(`/api/places/${response.body.id}`)
    .send()
    .expect(200);

  expect(placeResponse.body.name).toEqual('Name');
  expect(placeResponse.body.address).toEqual('Address');
  expect(placeResponse.body.type).toEqual('Type');
});