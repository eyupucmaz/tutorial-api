import request from 'supertest';
import { app } from '../src/index';
import { after } from 'node:test';
import mongoose from 'mongoose';

describe('API Endpoints Test', () => {
  describe('Get Routes', () => {
    test('GET /', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'It works!',
      });
    });

    test('GET /item/all', async () => {
      const response = await request(app).get('/items/all');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('docs');
      expect(response.body.docs).toBeInstanceOf(Array);
    });

    test('GET /item/:id', async () => {
      const response = await request(app).get('/item/6660d9a6131cf3573af83e31');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('_id');

      const response2 = await request(app).get(
        '/item/6660d9a6131cf3573af83e31'
      );
      expect(response2.status).toBe(200);
      expect(response2.body).toHaveProperty('_id');
    });

    afterAll(() => {
      console.log('Closing server');
      mongoose.disconnect();
    } );
  });
});
