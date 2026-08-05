import { createRequire } from "module";
const require = createRequire(import.meta.url);
const app = require("./_app.cjs");

export default function handler(req, res) {
  req.url = "/api";
  return app(req, res);
}
