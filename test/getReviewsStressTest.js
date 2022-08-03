import http from 'k6/http';
import { sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export let options = {
  stages: [
    { duration: '15s', target: 100 },
    { duration: '30s', target: 100 },
    { duration: '15s', target: 200 },
    { duration: '30s', target: 200 },
    { duration: '15s', target: 500 },
    { duration: '30s', target: 500 },
    { duration: '1m', target: 0}
  ],
};



export default function () {
  // const API_BASE_URL = 'http://localhost:3000';
  let randomId = randomIntBetween(900000, 950000);
  // const responses = http.batch([
  //   ['GET', `${API_BASE_URL}/reviews?product_id=900000`],
  //   ['GET', `${API_BASE_URL}/reviews?product_id=900100`],
  //   ['GET', `${API_BASE_URL}/reviews?product_id=900200`]
  // ]);
  let res = http.get(`http://localhost:3000/reviews?product_id=${randomId}`);
  sleep(1);
}