import {Class, IChunkScheme, Status} from '../models/chunk.model';
import {ChunkService} from './chunk.service';
import {analyzeAudio} from './speechmatics.service';
import {
    AnalysisResult,
    analyzeToneAndWords,
    RetrieveTranscriptResponseAlternative
} from "./transcribe-analyzer.service";
import {NotificationService} from '../services/notification-service';

export function getRandomStatus(): Status {
    const statuses = [Status.NotStarted, Status.InProgress, Status.Completed];
    return statuses[Math.floor(Math.random() * statuses.length)];
}

export function getRandomClass(): Class {
    const classes = [Class.Natural, Class.Good, Class.Bad];
    return classes[Math.floor(Math.random() * classes.length)];
}

export function getRandomSummary(mockSummary: string): string {
    const summaries = ['I want to hug you tonight', 'May the odds be ever in your favor', 'I hate you!!!', mockSummary];
    return summaries[Math.floor(Math.random() * summaries.length)];
}

export async function processChunk(userId: string, chunk: IChunkScheme) {
    try {
        // Update chunk status to in-progress
        await ChunkService.updateChunk(chunk.id, { status: Status.InProgress });

        // Send audio to Speechmatics
        const result: RetrieveTranscriptResponseAlternative = await analyzeAudio(chunk.audioFilePath);
        const analysisResult: AnalysisResult = analyzeToneAndWords(result);

        // Analyze result for tone and bad words
        const chunkClass = analysisResult.overallTone;

        // Update chunk with analysis result

        if (process.env.LOCAL_ENV) {
            await ChunkService.updateChunk(chunk.id, {
                status: getRandomStatus(),
                chunkClass: getRandomClass(),
                summary: getRandomSummary(analysisResult.summary),
            });
        } else {
            await ChunkService.updateChunk(chunk.id, {
                status: Status.Completed,
                chunkClass: chunkClass,
                summary: analysisResult.summary,
            });
        }

        if (analysisResult.overallTone === Class.Bad) {
            await NotificationService.sendMessages(userId, chunk);
        }

    } catch (error) {
        // Update chunk status to failed
        await ChunkService.updateChunk(chunk.id, { status: Status.Failed, summary: 'Failed analyzing audio' });
        throw error;
    }
}
