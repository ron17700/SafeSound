import {Class, IChunkScheme, Status} from '../models/chunk.model';
import { hasAudibleSound } from './audibleSoundDetector';
import {ChunkService} from './chunk.service';
import {analyzeAudio} from './speechmatics.service';
import {AnalysisResult, analyzeToneAndWords} from "./transcribe-analyzer.service";
import { RetrieveTranscriptResponseAlternative } from './transcribe-analyzer.service';
import { promises as fs } from 'fs';

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

export async function processChunk(chunk: IChunkScheme) {
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

        // Send audio to Speechmatics
        const result: RetrieveTranscriptResponseAlternative = await analyzeAudio(chunk.audioFilePath);

        // Analyze result for tone and bad words
        const analysisResult: AnalysisResult = analyzeToneAndWords(result as RetrieveTranscriptResponseAlternative);

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
                chunkClass: analysisResult.overallTone,
                summary: analysisResult.summary,
            });
        }

    } catch (error) {
        // Update chunk status to failed
        await ChunkService.updateChunk(chunk.id, { status: Status.Failed, summary: 'Failed analyzing audio' });
        throw error;
    }
}
