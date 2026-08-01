const app = require("../backend/api/index.js");

module.exports = (req, res) => {
  req.url = "/api/health";
  return app(req, res);
};
