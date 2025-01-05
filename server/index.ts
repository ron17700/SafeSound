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
import { Server } from 'socket.io';
import { setupSocketHandlers } from './socket/socket-handlers'; // Import the socket handlers

dotenv.config({ path: path.join(__dirname, "./.env") });

process.env.rootDir = __dirname;

const PORT = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000', // Frontend URL
      methods: ['GET', 'POST'], // Allowed methods
    },
  });

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(mongoSanitize());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "./public")));
app.use("/", mainRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(errorHandler);

setupSocketHandlers(io); // Set up the socket handlers

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

start();
