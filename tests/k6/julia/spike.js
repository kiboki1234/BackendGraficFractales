// tests/k6/julia/spike.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "5s", target: 0 },
    { duration: "10s", target: 200 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.01"],
    checks: ["rate>0.99"],
  },
};

export default function () {
  // OJO: tu ruta está registrada como '/Julia' en el router,
  // Express por defecto NO es case-sensitive, así que '/julia' también matchea.
  const url = "http://localhost:5000/api/julia";
  const qs = "?width=10&height=10&realC=-0.7&imagC=0.27015&maxIter=200";
  const res = http.get(url + qs);
  check(res, { "status is 200": (r) => r.status === 200 });
  sleep(1);
}
