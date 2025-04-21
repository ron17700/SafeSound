import { IChunkScheme } from '../models/chunk.model';
import { processChunk } from './process-chunk.service';
import { RecordService } from './record.service';

type Task = {
    userId: string,
    chunk: IChunkScheme,
};

export class TaskQueue {
    private queue: Task[] = [];
    private maxParallelTasks = 5;
    private currentTasks = 0;

    constructor() {
        this.startProcessing();
    }

    public addTask(userId: string, chunk: IChunkScheme) {
        this.queue.push({userId, chunk});
    }

    private async startProcessing() {
        while (true) {
            await this.processQueue();
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before checking the queue again
        }
    }

    private async processQueue() {
        if (this.currentTasks >= this.maxParallelTasks) return;

        const task = this.queue.shift();
        if (!task) return;

        const { userId, chunk } = task;

        this.currentTasks++;
        try {
            // Save the chunk before processing
            await processChunk(userId, chunk);
            await RecordService.defineRecordClass(chunk.recordId);
        } catch (error) {
            console.error('Error processing chunk', error);
        } finally {
            this.currentTasks--;
        }
    }
}

const taskQueueInstance = new TaskQueue();
export default taskQueueInstance;
