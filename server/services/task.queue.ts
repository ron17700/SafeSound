import { IChunkScheme } from '../models/chunk.model';
import { processChunk } from './process-chunk.service';

export class TaskQueue {
    private queue: IChunkScheme[] = [];
    private maxParallelTasks = 5;
    private currentTasks = 0;

    constructor() {
        this.startProcessing();
    }

    public addTask(chunk: IChunkScheme) {
        this.queue.push(chunk);
    }

    private async startProcessing() {
        while (true) {
            await this.processQueue();
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before checking the queue again
        }
    }

    private async processQueue() {
        if (this.currentTasks >= this.maxParallelTasks) return;

        const chunk = this.queue.shift();
        if (!chunk) return;

        this.currentTasks++;
        try {
            // Save the chunk before processing
            processChunk(chunk);
        } catch (error) {
            console.error('Error processing chunk', error);
        } finally {
            this.currentTasks--;
        }
    }
}

const taskQueueInstance = new TaskQueue();
export default taskQueueInstance;
