import jwt from "jsonwebtoken";


export const authenticate = (req, res, next) => {
const auth = req.headers.authorization || "";
const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
if (!token) return res.status(401).json({ message: "Missing token" });
try {
const payload = jwt.verify(token, process.env.JWT_SECRET); // { id, role }
req.user = payload;
next();
} catch {
return res.status(401).json({ message: "Invalid or expired token" });
}
};


export const authorize = (...roles) => (req, res, next) => {
if (!roles.includes(req.user.role)) return res.status(403).json({ message: "Forbidden" });
next();
};