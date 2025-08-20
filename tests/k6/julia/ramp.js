import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL = __ENV.BASE_URL || "http://localhost:5000";

export const options = {
  stages: [
    { duration: "10s", target: 10 }, // sube a 10 VUs
    { duration: "20s", target: 20 }, // sostiene 20 VUs
    { duration: "10s", target: 0 },  // baja
  ],
  thresholds: {
    "http_req_duration{expected_response:true}": ["p(95)<500"],
    http_req_failed: ["rate<0.01"],
    checks: ["rate>0.99"],
  },
};

export function setup() {
  // Espera hasta 30s por /health para evitar refused
  for (let i = 0; i < 30; i++) {
    try {
      const r = http.get(`${BASE_URL}/health`);
      if (r.status === 200) return;
    } catch (_) {}
    sleep(1);
  }
  throw new Error("Backend no respondió /health en 30s");
}

export default function () {
  const res = http.post(
    `${BASE_URL}/api/julia`,
    JSON.stringify({ maxIter: 100, z: { real: 0.1, imag: 0.1 }, c: { real: -0.7, imag: 0.27015 } }),
    { headers: { "Content-Type": "application/json" } }
  );

  if (__ITER < 3) console.log("status:", res.status, "body:", res.body); // debug primeras iteraciones

  check(res, { "200-399": (r) => r.status >= 200 && r.status < 400 });
  sleep(0.5);
}
