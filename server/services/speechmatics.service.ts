import { BatchClient } from '@speechmatics/batch-client';
import { openAsBlob } from 'node:fs';
import {mockData} from './mock';
import ffmpegPath from 'ffmpeg-static';
import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';

export async function removeSilenceFromAudio(inputPath: string): Promise<string | null> {
    const outputPath = path.join(path.dirname(inputPath), `processed-${path.basename(inputPath)}`);

    return new Promise((resolve, reject) => {
        const ffmpeg = spawn(ffmpegPath as string, [
            '-i', inputPath,
            '-af', 'silenceremove=start_periods=1:start_duration=0.5:start_threshold=-40dB:stop_periods=-1:stop_duration=0.5:stop_threshold=-40dB',
            '-ar', '44100', // sample rate
            '-ac', '2',     // channels
            '-b:a', '192k', // bitrate
            outputPath
        ]);

        ffmpeg.on('close', async (code) => {
            if (code === 0) {
                const stats = await fs.stat(outputPath).catch(() => null);
                if (stats && stats.size > 1000) {
                    resolve(outputPath);
                } else {
                    await fs.unlink(outputPath).catch(() => {});
                    resolve(null);
                }
            } else {
                reject(new Error('Failed to remove silence'));
            }
        });

        ffmpeg.stderr.on('data', (data) => {
            console.error(`FFmpeg error: ${data}`);
        });
    });
}


export async function analyzeAudio(audioFilePath: string) {
    let response;
    const client = new BatchClient({
        apiKey: process.env.SPEECHMATICS_API_KEY || 'apiKey',
        appId: process.env.SPEECHMATICS_APP_ID || 'appId'
    });

    try {
        console.log('Cleaning silence...');

        const cleanedPath = await removeSilenceFromAudio(audioFilePath);
        if (!cleanedPath) {
            console.log('All silence — skipping transcription.');
            return { skipped: true, reason: 'no_audio_detected' };
        }

        const blob = await openAsBlob(cleanedPath);
        const file = new File([blob], cleanedPath);

        if (process.env.LOCAL_ENV) {
            response = mockData;
        } else {
            response = await client.transcribe(
                file,
                {
                    transcription_config: {
                        language: 'en',
                    },
                    sentiment_analysis_config: {},
                    summarization_config: {
                        "content_type": "informative",
                        "summary_length": "brief",
                        "summary_type": "bullets"
                    }
                },
            );
        }

        console.log('Transcription finished!', {client, file});
        return response;
    } catch (error) {
        console.error('Error analyzing audio with Speechmatics', error);
        throw new Error('Error analyzing audio with Speechmatics');
    }
}
