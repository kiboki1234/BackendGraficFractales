import http from "k6/http";
import { check, sleep } from "k6";

const BASE = __ENV.BASE_URL || "http://localhost:5000";

export const options = {
  vus: 25,
  duration: "1m",
  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.01"],
    checks: ["rate>0.99"],
  },
};

export function setup() {
  for (let i = 0; i < 30; i++) {
    try { if (http.get(`${BASE}/health`).status === 200) return; } catch (_) {}
    sleep(1);
  }
  throw new Error("Backend no respondió /health en 30s");
}

export default function () {
  const res = http.get(`${BASE}/api/mandelbrot?real=-0.5&imag=0&maxIter=100`);
  check(res, { "200-399": (r) => r.status >= 200 && r.status < 400 });
  sleep(0.5);
}
