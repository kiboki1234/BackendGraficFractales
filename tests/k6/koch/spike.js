import http from 'k6/http'; import { check, sleep } from 'k6';
const BASE_URL = __ENV.BASE_URL; const PATH = '/api/koch';
export const options = {
  thresholds: { 'http_req_duration{expected_response:true}': ['p(95)<500'], 'http_req_failed': ['rate<0.01'], checks: ['rate>0.99'] },
  stages: [{ duration: '20s', target: 300 }, { duration: '90s', target: 300 }, { duration: '30s', target: 0 }],
};
export default function () {
  const body = JSON.stringify({ depth: 2, p1: { x: 0, y: 0 }, p2: { x: 90, y: 0 } });
  const res = http.post(`${BASE_URL}${PATH}`, body, { headers: { 'Content-Type': 'application/json' }, tags: { expected_response: 'true' } });
  check(res, { ok: (r) => r.status >= 200 && r.status < 400 }); sleep(1);
}
