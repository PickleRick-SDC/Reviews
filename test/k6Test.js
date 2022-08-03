import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  duration: '30s',
  vus: 300,
};

export default function () {
  let random_id = Math.floor(Math.random() * (100 - 1) + 1);
  let res = http.get(`http://localhost:3000/reviews?product_id=${random_id}`);
  check(res, {
    'is status 200': (r) => r.status === 200
  });
  sleep(1);
}

// const API_BASE_URL = 'http://localhost:3000';

// export default () => {
//   // let random_id = Math.floor(Math.random() * (100 - 1) + 1);

//   const responses = http.batch([
//     ['GET', `${API_BASE_URL}/reviews?product_id=40344`],
//     // ['GET', `${API_BASE_URL}/reviews/meta?product_id=${random_id}`]
//   ]);

//   sleep(1);
// }