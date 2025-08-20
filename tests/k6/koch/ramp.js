import http from "k6/http";
import { check, sleep } from "k6";
const BASE = __ENV.BASE_URL || "http://localhost:5000";

export const options = {
  stages: [{ duration: "10s", target: 10 }, { duration: "20s", target: 20 }, { duration: "10s", target: 0 }],
  thresholds: {
    "http_req_duration{expected_response:true}": ["p(95)<500"],
    http_req_failed: ["rate<0.01"], checks: ["rate>0.99"],
  },
};

export function setup() {
  for (let i=0;i<30;i++){ try{ if(http.get(`${BASE}/health`).status===200) return; }catch(_){} sleep(1); }
  throw new Error("Backend no respondió /health en 30s");
}

export default function () {
  const body = JSON.stringify({ p1: { x: 0, y: 0 }, p2: { x: 100, y: 0 }, depth: 3 });
  const res = http.post(`${BASE}/api/koch`, body, { headers: { "Content-Type": "application/json" } });
  check(res, { "200-399": (r) => r.status >= 200 && r.status < 400 });
  sleep(0.5);
}
