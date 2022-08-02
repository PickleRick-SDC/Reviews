const request = require("supertest");

describe('GET request for review data', () => {
  it('sends status 200 on successful request', () => {
    return request('http://localhost:3000')
    .get('/reviews')
    .query({'product_id': 1})
    .expect(200)
  });
});