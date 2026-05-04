const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwt"); // ✅ same source

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secret); // ✅ FIXED
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;