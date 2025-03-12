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

const serverRoot = path.resolve(__dirname, '..'); // Since `index.ts` is inside `server/routes/`, one level up gets `server/`

// Serve the uploaded and default files statically
router.use('/uploads', express.static(path.join(serverRoot, 'uploads')));
router.use('/default-files', express.static(path.join(serverRoot, 'default-files')));

// Serve React static files
router.use(express.static(path.join(__dirname, '../../../client/dist')));

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
});

export default router;
