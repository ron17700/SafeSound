import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });

export const splitMp3IntoChunks = async (
  audioFile: File,
  chunkDuration: number
): Promise<File[]> => {
  if (!ffmpeg.isLoaded()) {
    try {
      await ffmpeg.load();
      console.log('ffmpeg.wasm loaded successfully');
    } catch (error) {
      console.error('Error loading ffmpeg.wasm:', error);
      throw error;
    }
  }

  const chunks: File[] = [];
  const fileName = audioFile.name;

  try {
    // Load the file into ffmpeg
    await ffmpeg.FS('writeFile', fileName, await fetchFile(audioFile));

    // Set a custom logger to capture ffmpeg's output
    let ffmpegLogs = '';
    ffmpeg.setLogger(({ message }) => {
      ffmpegLogs += message + '\n';
    });

    // Extract audio duration
    await ffmpeg.run('-i', fileName, '-hide_banner');

    // Parse the logs to find the duration
    const durationMatch = ffmpegLogs.match(
      /Duration:\s*([0-9]+:[0-9]+:[0-9]+\.[0-9]+)/
    );
    if (!durationMatch) {
      throw new Error('Unable to retrieve audio duration from ffmpeg logs');
    }

    const durationString = durationMatch[1];
    const [hours, minutes, seconds] = durationString.split(':');
    const totalDuration =
      parseFloat(hours) * 3600 + parseFloat(minutes) * 60 + parseFloat(seconds);

    // Split the audio into chunks
    const totalChunks = Math.ceil(totalDuration / chunkDuration);
    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkDuration;
      const chunkName = `chunk_${i}.mp3`;
      const chunkTime = Math.min(chunkDuration, totalDuration - start);

      await ffmpeg.run(
        '-i',
        fileName,
        '-ss',
        start.toString(),
        '-t',
        chunkTime.toString(),
        '-c',
        'copy',
        chunkName
      );

      const chunkData = ffmpeg.FS('readFile', chunkName);

      // Convert Uint8Array to ArrayBuffer
      const arrayBuffer = chunkData.slice().buffer;

      chunks.push(new File([arrayBuffer], chunkName, { type: 'audio/mp3' }));

      // Clean up the chunk file from ffmpeg FS
      ffmpeg.FS('unlink', chunkName);
    }

    // Clean up the original file from ffmpeg FS
    ffmpeg.FS('unlink', fileName);
  } catch (error) {
    console.error('Error splitting audio file:', error);
    throw error;
  }

  return chunks;
};
