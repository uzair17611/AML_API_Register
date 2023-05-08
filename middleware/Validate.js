const jwt = require("jsonwebtoken");
const config = require("../config/config");

const validateToken = (req, res, next) => {
  let accessToken = null;

  // Check for token in the HTTP request header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    accessToken = req.headers.authorization.split(" ")[1];
  }

  // Check for token in query parameters
  if (!accessToken && req.query && req.query.access_token) {
    accessToken = req.query.access_token;
  }

  // Check for token in cookies
  if (!accessToken && req.cookies && req.cookies["access-token"]) {
    accessToken = req.cookies["access-token"];
  }

  if (!accessToken) {
    return res.status(400).send({ msg: "User not authenticated" });
  }

  try {
    const validToken = jwt.verify(accessToken, config.jwt_secretkey);
    if (validToken) {
      req.authenticate = true;
      next();
    } else {
      return res.status(400).send({ msg: "Token is not valid" });
    }
  } catch (error) {
    return res.status(400).send({ msg: "Token is not valid" });
  }
};

module.exports = validateToken;
