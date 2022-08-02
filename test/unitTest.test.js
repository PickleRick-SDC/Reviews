const request = require("supertest");

describe('GET request for review data', () => {
  it('sends status 200 on successful request', () => {
    return request('http://localhost:3000')
    .get('/reviews')
    .query({'product_id': 50000})
    .expect(200)
  });

  it('has content-type json for response body', () => {
    return request('http://localhost:3000')
    .get('/reviews')
    .query({'product_id': 50000})
    .expect('Content-Type', /json/)
  })

  it('returns an array of results', () => {
    return request('http://localhost:3000')
    .get('/reviews')
    .query({'product_id': 50000})
    .then((res) => {
      expect(Array.isArray(res.body.results)).toBe(true);
    })
  })

  it('returns the correct data for given product id', () => {
    return request('http://localhost:3000')
    .get('/reviews')
    .query({'product_id': 50000})
    .then((res) => {
      expect(res.body.results[0]).toEqual({
          "id": 287964,
          "rating": 2,
          "date": "2021-03-24T06:07:21.412Z",
          "summary": "Odit alias voluptates molestiae et dolorum atque sit est.",
          "body": "Neque sed magnam at iste. Id deserunt quidem et eos voluptatibus. Voluptas doloremque earum et velit provident sed.",
          "recommend": true,
          "reviewer_name": "Murl_Mann70",
          "reviewer_email": "Lazaro.Barton@gmail.com",
          "response": "null",
          "helpfulness": 9,
          "photos": [
              {
                  "id": 136428,
                  "url": "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
              }
          ]
      })
    })
  })
});

describe('GET request for review metadata', () => {
  it('sends status 200 on successful request', () => {
    return request('http://localhost:3000')
    .get('/reviews/meta')
    .query({'product_id': 50000})
    .expect(200)
  });

  it('returns the correct data for given product id' ,() => {
    return request('http://localhost:3000')
    .get('/reviews/meta')
    .query({'product_id': 50000})
    .then((res) => {
      expect(res.body).toEqual({
          "ratings": {
              "1": "1",
              "2": "3",
              "3": "1",
              "4": "0",
              "5": "0"
          },
          "recommend": {
              "false": "1",
              "true": "4"
          },
          "characteristics": {
              "Fit": {
                  "id": 167186,
                  "value": "3.4000000000000000"
              },
              "Length": {
                  "id": 167187,
                  "value": "2.6000000000000000"
              },
              "Comfort": {
                  "id": 167188,
                  "value": "2.6000000000000000"
              },
              "Quality": {
                  "id": 167189,
                  "value": "3.8000000000000000"
              }
          }
      })
    })
  })
})