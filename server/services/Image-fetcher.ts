import * as fs from "fs";
const { v4: uuidv4 } = require('uuid');
import path from "path";
import axios from "axios";

export const saveImageFromUrl = async (imageUrl: string) => {
    try {
        const uploadDir = path.join(__dirname, '../uploads');

        const response = await axios.get(imageUrl, { responseType: 'stream' });

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const fileExtension = path.extname(imageUrl) || '.jpg';
        const uniqueFileName = `file-${uuidv4()}${fileExtension}`;
        const savePath = path.join(uploadDir, uniqueFileName);

        const fileStream = fs.createWriteStream(savePath);
        response.data.pipe(fileStream);

        return new Promise((resolve, reject) => {
            fileStream.on('finish', () => resolve(`uploads/${uniqueFileName}`));
            fileStream.on('error', () => resolve(null));
        });
    } catch (error) {
        console.error('Error saving image:', error);
        throw error;
    }
};
