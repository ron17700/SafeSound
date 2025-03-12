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
router.use('/uploads', express.static(uploadsPath, {
    setHeaders: (res) => {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Expires', '0');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Access-Control-Allow-Origin', '*'); // Allow external access
    }
}));
router.use('/default-files', (req, res, next) => {
    console.log(`🔍 Serving: ${req.originalUrl}`);
    next();
}, express.static(defaultFilesPath, {
    fallthrough: false
}));

router.get('/test-image', (req, res) => {
    const imagePath = path.join(defaultFilesPath, 'default-record-image.jpg');
    res.setHeader('Content-Type', 'image/jpeg'); // ✅ Explicitly set content type
    res.sendFile(imagePath, (err) => {
        if (err) {
            console.error("❌ Error sending file:", err);
            // res.status(err.status).end();
        }
    });
});

// Serve React static files
router.use(express.static(path.join(serverRoot, '../client/dist')));

router.get('*', (req, res, next) => {
    if (req.path.startsWith('/default-files') || req.path.startsWith('/uploads')) {
        return next(); // ✅ Let Express handle static files
    }
    res.sendFile(path.join(serverRoot, '../client/dist/index.html'));
});
export default router;
