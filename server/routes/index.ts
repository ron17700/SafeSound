import express, { Router } from 'express';
import path from 'path';
import authRoutes from "./auth.routes";
import recordRoutes from "./record.routes";
import uploadRoutes from "./upload.routes";
import userRoutes from "./user.routes";

const router = Router();
router.use("/auth", authRoutes);
router.use("/record", recordRoutes);
router.use("/upload", uploadRoutes);
router.use("/user", userRoutes);

// Serve the uploaded and default files statically
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));
router.use('/default-files', express.static(path.join(__dirname, '../default-files')));

// Fallback route for React
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
export default router;
