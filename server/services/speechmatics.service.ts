import { BatchClient } from '@speechmatics/batch-client';
import { openAsBlob } from 'node:fs';
import { mockData } from './mock';
import path from "path";
import fs from "fs";

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

            // Path to save the JSON file
            const filePath = path.join(__dirname, 'response.json');

            // Write the response data to the file
            fs.writeFile(filePath, JSON.stringify(response, null, 2), (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                } else {
                    console.log('JSON data successfully written to', filePath);
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
