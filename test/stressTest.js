import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 100 },
    { duration: '30s', target: 100 },
    { duration: '10s', target: 200 },
    { duration: '30s', target: 200 },
    { duration: '10s', target: 500 },
    { duration: '30s', target: 500 },
    { duration: '10s', target: 1000 },
    { duration: '30s', target: 1000 },
    { duration: '1m', target: 0}
  ],
};

const API_BASE_URL = 'http://localhost:3000';

export default () => {
  let random_id = Math.floor(Math.random() * (100000 - 1) + 1);

  http.batch([
    ['GET', `${API_BASE_URL}/reviews?product_id=${random_id}`],
    ['GET', `${API_BASE_URL}/reviews/meta?product_id=${random_id}`]
  ]);

  sleep(1);
}