import {Class, IChunkScheme, Status} from '../models/chunk.model';
import { hasAudibleSound } from './audibleSoundDetector';
import {ChunkService} from './chunk.service';
import {analyzeAudio} from './speechmatics.service';
import { promises as fs } from 'fs';
import {
    AnalysisResult,
    analyzeToneAndWords,
} from "./transcribe-analyzer.service";
import {NotificationService} from './notification-service';
import {mockData} from "./mock";

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

        const hasSound = await hasAudibleSound(chunk.audioFilePath);
        if (!hasSound) {
            console.log('Audio is below threshold. Skipping transcription.');

            await ChunkService.updateChunk(chunk.id, {
                status: Status.Completed,
                chunkClass: Class.Natural,
                summary: 'No meaningful audio detected',
            });

            try {
                await fs.unlink(chunk.audioFilePath);
                console.log('File deleted:', chunk.audioFilePath);
            } catch (err) {
                console.error('Failed to delete file:', err);
            }

            return;
        }

        // Update chunk with analysis result
        let chunkClass;
        if (process.env.LOCAL_ENV) {
            chunkClass = getRandomClass();
            await ChunkService.updateChunk(chunk.id, {
                status: getRandomStatus(),
                chunkClass: chunkClass,
                summary: getRandomSummary(mockData.summary.content),
            });
        } else {
            // Send audio to Speechmatics
            const result: any = await analyzeAudio(chunk.audioFilePath);
            const analysisResult: AnalysisResult = analyzeToneAndWords(result);

            // Analyze result for tone and bad words
            chunkClass = analysisResult.overallTone;

            await ChunkService.updateChunk(chunk.id, {
                status: Status.Completed,
                chunkClass: chunkClass,
                summary: analysisResult.summary,
            });
        }

        if (chunkClass === Class.Bad) {
            await NotificationService.sendMessages(userId, chunk);
        }

    } catch (error) {
        // Update chunk status to failed
        await ChunkService.updateChunk(chunk.id, { status: Status.Failed, summary: 'Failed analyzing audio' });
        throw error;
    }
}
