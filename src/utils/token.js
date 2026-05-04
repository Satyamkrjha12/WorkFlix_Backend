const jwt = require("jsonwebtoken");
const { secret, expiresIn } = require("../config/jwt");

const generateToken = (payload) => {
    console.log(expiresIn)
  return jwt.sign(payload, secret, { expiresIn });
};

module.exports = generateToken;
