import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    // ❌ No token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    // ✅ Extract token
    const token = authHeader.split(" ")[1];

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach admin data
    req.admin = decoded;

    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
}
