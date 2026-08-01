const app = require("../../backend/api/index.js");

module.exports = (req, res) => {
  req.url = "/api/track-download";
  return app(req, res);
};
