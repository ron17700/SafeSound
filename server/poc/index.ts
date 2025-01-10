import {analyzeAudio} from "../services/speechmatics.service";
import path from "path";
import * as fs from "fs";

async function startPOC() {
    const pocAudioFilePath = path.join(__dirname, 'poc#1.mp3');
    const response = await analyzeAudio(pocAudioFilePath);
    const filePath = path.join(__dirname, 'response.json');
    fs.writeFile(filePath, JSON.stringify(response, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('JSON data successfully written to', filePath);
        }
    });
}
startPOC().then(() => console.log('POC complete!')).catch((err) => console.error('POC failed!', err))