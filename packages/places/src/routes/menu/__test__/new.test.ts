import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../../app';
import { Place } from '../../../models/place';
import faker from 'faker';

test('should have a route handler listening to api/places for post request', async () => {
  const placeId = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .post(`/api/places/${placeId}/menus`)
    .send({});

  expect(response.status).not.toEqual(404);
});

test('should only be accessed if the user is signed in', async () => {
  const placeId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .post(`/api/places/${placeId}/menus`)
    .send({})
    .expect(401);
});

test('should return an error 404 if place does not exist', async () => {
  const placeId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .post(`/api/places/${placeId}/menus`)
    .set('Cookie', global.signin())
    .send({ name: 'name' })
    .expect(404);
});

test('should return an error 400 if an invalid menu is provided', async () => {
  const placeId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .post(`/api/places/${placeId}/menus`)
    .set('Cookie', global.signin())
    .send({ name: '' })
    .expect(400);

  await request(app)
    .post(`/api/places/${placeId}/menus`)
    .set('Cookie', global.signin())
    .send({})
    .expect(400);

  await request(app)
    .post(`/api/places/${placeId}/menus`)
    .set('Cookie', global.signin())
    .send({ name: 'name', description: faker.random.words(201) })
    .expect(400);
});

test('should create a place', async () => {
  const placeCreated = Place.build({
    name: 'name',
    address: 'address',
    type: 'type',
  });
  await placeCreated.save();

  const menuCreated = await request(app)
    .post(`/api/places/${placeCreated.id}/menus`)
    .set('Cookie', global.signin())
    .send({
      name: 'Name',
    })
    .expect(201);

  expect(menuCreated.body.name).toEqual('Name');
  expect(menuCreated.body.id).toBeDefined();

  const placeEdited = await Place.findById(placeCreated.id);
  expect(placeEdited!.menus.length).toEqual(1);
});