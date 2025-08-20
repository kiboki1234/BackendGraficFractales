import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  thresholds: {
    'http_req_duration{expected_response:true}': ['p(95)<500'],
    'http_req_failed': ['rate<0.01'],
    checks: ['rate>0.99'],
  },
  stages: [
    { duration: '20s', target: 300 }, // spike
    { duration: '2m', target: 300 },
    { duration: '30s', target: 0 },
  ],
};

const BASE_URL = __ENV.BASE_URL;

export default function () {
  const res = http.get(`${BASE_URL}/health`);
  check(res, { ok: (r) => r.status === 200 });
  sleep(1);
}
