import { BatchClient } from '@speechmatics/batch-client';
import { openAsBlob } from 'node:fs';
import { mockData } from './mock';

export async function analyzeAudio(audioFilePath: string) {
    let response;
    const client = new BatchClient({
        apiKey: process.env.SPEECHMATICS_API_KEY || 'apiKey',
        appId: process.env.SPEECHMATICS_APP_ID || 'appId'
    });

    try {
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
