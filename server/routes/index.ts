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

export const resolveStaticPath = (relativePath: string) => {
    return process.env.NODE_ENV === 'production'
        ? path.join(__dirname, '../../', relativePath)
        : path.join(process.cwd(), relativePath);
};

// Serve the uploaded and default files statically
router.use('/uploads', express.static(resolveStaticPath('uploads')));
router.use('/default-files', express.static(resolveStaticPath('default-files')));
// Serve React static files
router.use(express.static(resolveStaticPath('../client/dist')));
router.get('*', (req, res) => {
    res.sendFile(resolveStaticPath('../client/dist/index.html'));
});


export default router;
