import { createRequire } from "module";
const require = createRequire(import.meta.url);
const app = require("../../backend/api/index.js");

export default function handler(req, res) {
  req.url = "/api/contact";
  return app(req, res);
}
