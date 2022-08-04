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
  let randomId = randomIntBetween(900000, 950000);
  let res = http.get(`http://localhost:3000/reviews?product_id=${randomId}`);
  sleep(1);
}