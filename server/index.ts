import path from "path";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import passport from "./middlewares/passport";
import mongoSanitize from "express-mongo-sanitize";
import swaggerUi from "swagger-ui-express"
import swaggerDoc from "./defenitions/swagger.json";
import mainRoutes from './routes/index';
import errorHandler from './middlewares/errorHandler';
import taskQueueInstance, {TaskQueue} from "./services/task.queue";
import http from 'http';
import https from 'https';
import fs from 'fs';
import { Server } from 'socket.io';
import { setupSocketHandlers } from './socket/socket-handlers';
import admin from 'firebase-admin';
import {serviceAccountString} from './config/firebase-config';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountString)
});

dotenv.config({ path: path.join(__dirname, "./.env") });

process.env.rootDir = __dirname;

const PORT = process.env.PORT || 3001;
const app = express();
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

let server: http.Server | https.Server;
let io: Server;

if (process.env.NODE_ENV === "production") {
    const options = {
        key: fs.readFileSync("/etc/safesound/privkey.pem"),
        cert: fs.readFileSync("/etc/safesound/fullchain.pem"),
    };
    server = https.createServer(options, app);
    console.log("Running in production with HTTPS");
} else {
    server = http.createServer(app);
    console.log("Running in development with HTTP");
}

// WebSocket setup
io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // Change to frontend URL in production
        methods: ['GET', 'POST'],
    },
});
setupSocketHandlers(io); // Set up the socket handlers

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(mongoSanitize());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "./public")));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use("/", mainRoutes);
app.use(errorHandler);

export let taskQueue: TaskQueue;
const start = async () => {
    try {
        console.log('Trying to connect to MongoDB...\n');
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('MongoDB connected successfully\n');

        taskQueue = taskQueueInstance;
        console.log('Task queue initialized\n');
    } catch (error) {
        console.error((error as Error).message);
        console.log((error as Error).stack);
    }

    server.listen(PORT, () => {
        console.log(`Server is listening on port: ${PORT}\n`);
        console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
};

if (require.main === module) {
    start();
}

export default app;