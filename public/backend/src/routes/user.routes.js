import { Router } from "express";
import { User } from "../models/User.js";
import { authenticate, authorize } from "../middleware/auth.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

const router = Router();


router.get("/", authenticate, authorize("admin"), async (req, res) => {
  const page = Math.max(parseInt(req.query.page || "1", 10), 1);
  const limit = Math.max(parseInt(req.query.limit || "10", 10), 1);
  const offset = (page - 1) * limit;

  const where = {};
  if (req.query.role) where.role = req.query.role; 
  if (req.query.q) where.name = { [Op.iLike]: `%${req.query.q}%` };

  const { rows, count } = await User.findAndCountAll({
    where,
    attributes: ["id", "name", "email", "role", "createdAt"],
    order: [["createdAt", "DESC"]],
    limit,
    offset,
  });

  return res.json({
    data: rows,
    page,
    limit,
    total: count,
    totalPages: Math.ceil(count / limit),
  });
});


router.get("/:id", authenticate, authorize("admin"), async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: ["id", "name", "email", "role", "createdAt"],
  });
  if (!user) return res.status(404).json({ message: "Not found" });

  return res.json(user);
});


router.post("/", authenticate, authorize("admin"), async (req, res) => {
  const { name, email, password, role = "employee" } = req.body;
  const exists = await User.findOne({ where: { email } });
  if (exists) return res.status(409).json({ message: "Email already used" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash, role });

  return res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  });
});


router.put("/:id", authenticate, authorize("admin"), async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: "Not found" });

  const { name, email, password, role } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  if (password) user.passwordHash = await bcrypt.hash(password, 10);
  if (role) user.role = role;

  await user.save();

  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  });
});


router.delete("/:id", authenticate, authorize("admin"), async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: "Not found" });

  await user.destroy();
  return res.json({ message: "User deleted successfully" });
});

export default router;
