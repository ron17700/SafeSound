import {analyzeToneAndWords, RetrieveTranscriptResponseAlternative} from '../../services/transcribe-analyzer.service';
import { Class } from '../../models/chunk.model';

describe('analyzeToneAndWords', () => {

    it('should return neutral tone if summary is not present', () => {
        const response = {
            format: "", job: undefined, metadata: undefined, results: undefined,
            sentiment_analysis: {
                sentiment_analysis: {
                    segments: [],
                    summary: undefined,
                },
            }
        };

        const result = analyzeToneAndWords(response as unknown as RetrieveTranscriptResponseAlternative);
        expect(result).toEqual({
            overallTone: 'neutral',
            summary: undefined,
        });
    });

    it('should return correct tone based on summary counts', () => {
        const response = {
            sentiment_analysis: {
                sentiment_analysis: {
                    segments: [],
                    summary: {
                        overall: {
                            negative_count: 1,
                            positive_count: 2,
                            neutral_count: 3,
                        },
                    },
                },
            },
        };

        const result = analyzeToneAndWords(response as unknown as RetrieveTranscriptResponseAlternative);
        expect(result).toEqual({
            overallTone: Class.Natural,
            summary: undefined,
        });
    });

    it('should return correct tone and summary content', () => {
        const response = {
            sentiment_analysis: {
                sentiment_analysis: {
                    segments: [],
                    summary: {
                        overall: {
                            negative_count: 1,
                            positive_count: 2,
                            neutral_count: 1,
                        },
                        content: 'This is a summary',
                    },
                },
            },
        };

        const result = analyzeToneAndWords(response as unknown as RetrieveTranscriptResponseAlternative);
        expect(result).toEqual({
            overallTone: Class.Good,
            summary: undefined,
        });
    });
});
