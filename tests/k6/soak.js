import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  thresholds: {
    'http_req_duration{expected_response:true}': ['p(95)<500'],
    'http_req_failed': ['rate<0.01'],
    checks: ['rate>0.99'],
  },
  vus: 50,
  duration: '30m', // ajusta 30–60m
};

const BASE_URL = __ENV.BASE_URL;

export default function () {
  const res = http.get(`${BASE_URL}/health`);
  check(res, { ok: (r) => r.status === 200 });
  sleep(1);
}
