const app = require("../backend/api/index.js");

module.exports = (req, res) => {
  req.url = "/api/contact";
  return app(req, res);
};
