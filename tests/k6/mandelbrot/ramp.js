import http from 'k6/http';
import { check, sleep } from 'k6';
const BASE_URL = __ENV.BASE_URL;
const PATH = '/api/mandelbrot';
export const options = {
  thresholds: {
    'http_req_duration{expected_response:true}': ['p(95)<500'],
    'http_req_failed': ['rate<0.01'],
    checks: ['rate>0.99'],
  },
  stages: [
    { duration: '2m', target: 10 },
    { duration: '5m', target: 100 },
    { duration: '1m', target: 0 },
  ],
};
export default function () {
  const body = JSON.stringify({ maxIter: 100, real: -0.7, imag: 0.27015 });
  const res = http.post(`${BASE_URL}${PATH}`, body, { headers: { 'Content-Type': 'application/json' }, tags: { expected_response: 'true' } });
  check(res, { ok: (r) => r.status >= 200 && r.status < 400 }); sleep(1);
}
