import {Class, IChunkScheme, IChunkTimeStamp, Status} from '../models/chuck.model';
import {ChunkService} from './chunk.service';
import {analyzeAudio} from './speechmatics.service'; // Assume this service sends audio to Speechmatics and returns the result

export async function processChunk(chunk: IChunkScheme) {
    try {
        // Update chunk status to in-progress
        await ChunkService.updateChunk(chunk.chunkId, { status: Status.InProgress });

        // Send audio to Speechmatics
        const analysisResult = await analyzeAudio(chunk.audioFilePath);

        // Analyze result for tone and bad words
        const chunkClass = Class.Good;
        const chunkTimeStamp = analysisResult.timestamps.map((ts: IChunkTimeStamp) => ({
            startTime: ts.startTime,
            endTime: ts.endTime,
            text: ts.text,
            class: Class.Good
        }));


        // Update chunk with analysis result
        await ChunkService.updateChunk(chunk.chunkId, {
            status: Status.Completed,
            class: chunkClass,
            chunkTimeStamp: chunkTimeStamp
        });
    } catch (error) {
        // Update chunk status to failed
        await ChunkService.updateChunk(chunk.chunkId, { status: Status.Failed});
        throw error;
    }
}
