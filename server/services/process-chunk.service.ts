import {Class, IChunkScheme, Status} from '../models/chunk.model';
import {ChunkService} from './chunk.service';
import {analyzeAudio} from './speechmatics.service';
import {analyzeToneAndWords, AnalysisResult} from "./transcribe-analyzer.service";
import {RetrieveTranscriptResponse} from "@speechmatics/batch-client"; // Assume this service sends audio to Speechmatics and returns the result

export async function processChunk(chunk: IChunkScheme) {
    try {
        // Update chunk status to in-progress
        await ChunkService.updateChunk(chunk.id, { status: Status.InProgress });

        // Send audio to Speechmatics
        const result: RetrieveTranscriptResponse | string  = await analyzeAudio(chunk.audioFilePath);
        const analysisResult: AnalysisResult = analyzeToneAndWords(result);

        // Analyze result for tone and bad words
        const chunkClass = analysisResult.overallTone === 'negative' ? Class.Bad : Class.Good;

        // Update chunk with analysis result
        await ChunkService.updateChunk(chunk.id, {
            status: Status.Completed,
            chunkClass: chunkClass,
            summary: analysisResult.summary,
        });
    } catch (error) {
        // Update chunk status to failed
        await ChunkService.updateChunk(chunk.id, { status: Status.Failed, chunkClass: Class.Failed});
        throw error;
    }
}
