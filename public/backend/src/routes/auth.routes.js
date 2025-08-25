import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";
import { User } from "../models/User.js";


const router = Router();


const registerSchema = Joi.object({
name: Joi.string().min(2).required(),
email: Joi.string().email().required(),
password: Joi.string().min(6).required(),
role: Joi.string().valid("admin", "employee").required(),
});


router.post("/register", async (req, res) => {
const { error, value } = registerSchema.validate(req.body);
if (error) return res.status(400).json({ message: error.message });


const exists = await User.findOne({ where: { email: value.email } });
if (exists) return res.status(409).json({ message: "Email already registered" });


const passwordHash = await bcrypt.hash(value.password, 10);
const user = await User.create({ ...value, passwordHash });
return res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
});


router.post("/login", async (req, res) => {
const { email, password } = req.body;
const user = await User.findOne({ where: { email } });
if (!user) return res.status(401).json({ message: "Invalid credentials" });


const ok = await bcrypt.compare(password, user.passwordHash);
if (!ok) return res.status(401).json({ message: "Invalid credentials" });


const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});


// useful to fetch the logged-in user's info
router.get("/me", async (req, res) => {
// optional public endpoint in case you store user in localStorage; usually protected:
return res.status(501).json({ message: "Not implemented. Use localStorage user from login response." });
});


export default router;