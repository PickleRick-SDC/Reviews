import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  duration: '30s',
  vus: 100,
};

export default function () {
  let res = http.get('http://localhost:3000/reviews?product_id=50000');
  check(res, {
    'is status 200': (r) => r.status === 200
  });
  sleep(1);
}