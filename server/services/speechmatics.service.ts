import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

const SPEECHMATICS_API_URL = process.env.SPEECHMATICS_API_URL;
const SPEECHMATICS_API_KEY = process.env.SPEECHMATICS_API_KEY;
const SPEECHMATICS_APP_ID = process.env.SPEECHMATICS_APP_ID;

export async function analyzeAudio(audioFilePath: string) {
    const form = new FormData();
    form.append('data_file', fs.createReadStream(audioFilePath));

    try {
        const response = await axios.post(`${SPEECHMATICS_API_URL}/jobs`, form, {
            headers: {
                ...form.getHeaders(),
                'Authorization': `Bearer ${SPEECHMATICS_API_KEY}`
            }
        });

        const jobId = response.data.id;

        // Polling for job completion
        let jobStatus = 'running';
        let analysisResult = null;

        while (jobStatus === 'running') {
            const jobResponse = await axios.get(`${SPEECHMATICS_API_URL}/jobs/${jobId}`, {
                headers: {
                    'Authorization': `Bearer ${SPEECHMATICS_API_KEY}`
                }
            });

            jobStatus = jobResponse.data.status;

            if (jobStatus === 'completed') {
                analysisResult = jobResponse.data.results;
            } else if (jobStatus === 'failed') {
                throw new Error('Speechmatics job failed');
            }

            // Wait for a while before polling again
            await new Promise(resolve => setTimeout(resolve, 5000));
        }

        return analysisResult;
    } catch (error) {
        console.error('Error analyzing audio with Speechmatics', error);
        throw new Error('Error analyzing audio with Speechmatics');
    }
}
