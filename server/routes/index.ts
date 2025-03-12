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

// Get absolute path dynamically for server directory
const serverRoot = path.resolve(__dirname, '..'); // Points to 'server/'

// Serve static files
const uploadsPath = path.join(serverRoot, 'uploads');
const defaultFilesPath = path.join(serverRoot, 'default-files');

console.log("Serving uploads from:", uploadsPath);
console.log("Serving default files from:", defaultFilesPath);

router.use('/uploads', express.static(uploadsPath));
router.use('/default-files', express.static(defaultFilesPath));

// Serve React static files
router.use(express.static(path.join(serverRoot, '../client/dist')));

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
});

export default router;
