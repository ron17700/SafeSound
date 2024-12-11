import express, { Request, Response, Router } from 'express';
import path from 'path';
import authRoutes from "./auth.routes";
import recordRoutes from "./record.routes";
import uploadRoutes from "./upload.routes";

const router = Router();
router.use("/auth", authRoutes);
router.use("/record", recordRoutes);
router.use("/upload", uploadRoutes);

// Serve the uploaded files statically
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

export default router;
