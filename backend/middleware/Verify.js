import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyJwt = (req, res, next) => {
  const token = req.cookies;
  if (!token?.jwt) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token.jwt, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden!" });
    req.userId = decoded.id;
    req.userName = decoded.userName;
    req.userEmail = decoded.email;
    next();
  });
};

export default verifyJwt;