import express, { Router } from 'express';
import path from 'path';
import authRoutes from "./auth.routes";
import recordRoutes from "./record.routes";
import chunkRoutes from "./chunk.routes";
import uploadRoutes from "./upload.routes";
import userRoutes from "./user.routes";

const router = Router();
router.use("/auth", authRoutes);
router.use("/record", recordRoutes);
router.use("/chunk", chunkRoutes);
router.use("/upload", uploadRoutes);
router.use("/user", userRoutes);

// Serve the uploaded files statically
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

export default router;
