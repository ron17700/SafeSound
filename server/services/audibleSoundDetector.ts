import { spawn } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

const DECIBEL_THRESHOLD = -40; // dB threshold to detect meaningful sound

// Analyze volume to check if there's sound above DECIBEL_THRESHOLD
export async function hasAudibleSound(filePath: string): Promise<boolean> {
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