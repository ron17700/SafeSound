// import fs from 'fs';
// import path from 'path';
// import mongoose from 'mongoose';
// import {ChunkService} from './services/chunk.service';
// import {IChunk, IChunkScheme, Status} from './models/chuck.model';
//
// const startTime = new Date();
// const endTime = new Date(startTime.getTime() + 10 * 60 * 1000); // 10 minutes later
//
// const test = async () => {
//     try {
//
//         await mongoose.connect("mongodb+srv://OnlineStore:1kgi94kltirMrCQr@onlinestoredb.g0hly.mongodb.net/safe-sound");
//
//         // Read the MP3 file from the desktop
//         const mp3FilePath = path.join('/Users/dana.co/Desktop', 'test.mp3');
//         // const mp3FilePath = path.join(__dirname, '../uploads/chunks', 'test.mp3');
//         const audioFile = fs.readFileSync(mp3FilePath);
//
//         // Create a chunk data object
//         const chunkData: IChunk = {
//             recordId: 'testRecordId',
//             chunkId: 'testChunkId',
//             startTime: new Date(),
//             endTime: new Date(startTime.getTime() + 10 * 60 * 1000), // 10 minutes later
//             status: Status.NotStarted,
//             chunkTimeStamp: [],
//             audioFilePath: ''
//         };
//
//         // Add the chunk using the ChunkService
//         ChunkService.addChunk('testRecordId', chunkData, audioFile);
//     } catch (error) {
//         console.error('Error during test:', error);
//     } finally {
//         // Close the MongoDB connection
//         await mongoose.connection.close();
//     }
// };
//
// test();
