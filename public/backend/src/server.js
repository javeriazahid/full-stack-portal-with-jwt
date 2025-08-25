
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());


const SECRET_KEY = "your_secret_key";


const users = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@test.com",
    password: bcrypt.hashSync("123456", 8), 
    role: "admin",
  },
  {
    id: 2,
    name: "Employee User",
    email: "employee@test.com",
    password: bcrypt.hashSync("123456", 8),
    role: "employee",
  },
];


app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: "User not found" });

 
  const validPass = bcrypt.compareSync(password, user.password);
  if (!validPass) return res.status(400).json({ message: "Invalid password" });

 
  const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({
    token,
    user: { id: user.id, name: user.name, role: user.role },
  });
});


function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    req.user = decoded; 
    next();
  });
}


app.get("/admin-data", verifyToken, (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admins only" });

  res.json({ message: "Welcome Admin, here is your secret data!" });
});


app.get("/employee-data", verifyToken, (req, res) => {
  if (req.user.role !== "employee")
    return res.status(403).json({ message: "Employees only" });

  res.json({ message: "Hello Employee, here is your work data!" });
});


const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
