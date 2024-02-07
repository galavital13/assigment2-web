const request = require('supertest');
const app = require('../controllers/index');

describe('GET /items', () => {
  it('should return all items', async () => {
    const response = await request(app).get('/items');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('items');
    expect(Array.isArray(response.body.items)).toBeTruthy();
  });
});

describe('POST /items', () => {
  it('should add a new item', async () => {
    const newItem = { item_name: 'New Item', unit_price: 10, quantity: 50 };
    const response = await request(app).post('/items').send(newItem);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Item has been added!');
  });
});

describe('PUT /items/:item_id', () => {
  it('should update an existing item', async () => {
    const itemToUpdate = { item_name: 'Bottled Water', unit_price: 2, quantity: 200 };
    const response = await request(app).put('/items/Bottled Water').send(itemToUpdate);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Item has been updated!');
  });
});

describe('DELETE /items/:item_id', () => {
  it('should delete an existing item', async () => {
    const response = await request(app).delete('/items/Flashlights');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Item has been deleted!');
  });
});

describe('GET /items/:item_id', () => {
  it('should return a specific item', async () => {
    const response = await request(app).get('/items/First Aid Kit');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('item_name', 'First Aid Kit');
  });
});

describe('Invalid Data Handling', () => {
  it('should handle missing data on POST /items', async () => {
    const response = await request(app).post('/items').send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid item');
  });

  it('should handle invalid JSON format on POST /items', async () => {
    const response = await request(app).post('/items').send('invalid_json');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid JSON format in the request body');
  });

  it('should handle updating a non-existing item on PUT /items/:item_id', async () => {
    const response = await request(app).put('/items/Non Existing Item').send({ unit_price: 5 });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Item not found');
  });

  it('should handle deleting a non-existing item on DELETE /items/:item_id', async () => {
    const response = await request(app).delete('/items/Non Existing Item');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Item not found');
  });

  it('should handle reading a non-existing item on GET /items/:item_id', async () => {
    const response = await request(app).get('/items/Non Existing Item');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Item not found');
  });
});
