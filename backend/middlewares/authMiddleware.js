const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Auth token required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin)
      return res.status(403).json({ error: "Admin access only" });
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid auth token" });
  }
};

module.exports = authMiddleware;
