const app = require("../../backend/api/index.js");

module.exports = (req, res) => {
  req.url = "/api";
  return app(req, res);
};
