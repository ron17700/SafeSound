import { BatchClient } from '@speechmatics/batch-client';
import { openAsBlob } from 'node:fs';
import { spawn } from 'child_process';
import ffmpegPath from 'ffmpeg-static';
import { mockData } from './mock';
import path from 'path';

const DECIBEL_THRESHOLD = -40; // dB threshold to detect meaningful sound

// Analyze volume to check if there's sound above DECIBEL_THRESHOLD
async function hasAudibleSound(filePath: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const ffmpeg = spawn(ffmpegPath as string, [
            '-i', filePath,
            '-af', 'volumedetect',
            '-f', 'null',
            process.platform === 'win32' ? 'NUL' : '/dev/null'
        ]);

        let stderr = '';
        ffmpeg.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        ffmpeg.on('close', () => {
            const match = stderr.match(/max_volume: ([-\d.]+) dB/);
            if (match) {
                const maxVolume = parseFloat(match[1]);
                console.log(`Detected max volume: ${maxVolume} dB`);
                resolve(maxVolume > DECIBEL_THRESHOLD);
            } else {
                console.warn('Could not determine max_volume from ffmpeg output.');
                resolve(false);
            }
        });

        ffmpeg.on('error', (err) => {
            console.error('FFmpeg error during volume detection:', err);
            reject(err);
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
        const hasSound = await hasAudibleSound(audioFilePath);
        if (!hasSound) {
            console.log('Audio is below threshold. Skipping transcription.');
            return { emptyChunk: true };
        }

        console.log('Sending file for transcription...');
        const blob = await openAsBlob(audioFilePath);
        const file = new File([blob], audioFilePath);

        if (process.env.LOCAL_ENV) {
            response = mockData;
        } else {
            response = await client.transcribe(file, {
                transcription_config: { language: 'en' },
                sentiment_analysis_config: {},
                summarization_config: {
                    content_type: 'informative',
                    summary_length: 'brief',
                    summary_type: 'bullets'
                }
            });
        }

        console.log('Transcription finished!', {client, file});
        return response;
    } catch (error) {
        console.error('Error analyzing audio with Speechmatics', error);
        throw new Error('Error analyzing audio with Speechmatics');
    }
}
