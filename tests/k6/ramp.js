import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  thresholds: {
    'http_req_duration{expected_response:true}': ['p(95)<500'],
    'http_req_failed': ['rate<0.01'],
    checks: ['rate>0.99'],
  },
  stages: [
    { duration: '5m', target: 100 } // 10 -> 100 VUs gradual (ajusta)
  ],
};

const BASE_URL = __ENV.BASE_URL; // e.g. https://tu-backend.onrender.com

export default function () {
  const res = http.get(`${BASE_URL}/health`);
  check(res, {
    'status 2xx/3xx': (r) => r.status >= 200 && r.status < 400,
  });
  sleep(1);
}
