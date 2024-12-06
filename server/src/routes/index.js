import express from "express";
import userRoutes from "./v1/user.route.js";
import messageRoutes from "./v1/message.route.js";
const router = express.Router();

router.use("/v1/users", userRoutes);
router.use("/v1/messages", messageRoutes);

export default router;
