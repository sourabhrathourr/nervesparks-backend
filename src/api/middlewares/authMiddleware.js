import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  const token = authHeaders.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(403).json({ message: "Invalid token" });
      return;
    } else {
      req.user = decoded;
      next();
    }
  });
};
