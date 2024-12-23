import {RetrieveTranscriptResponse} from '@speechmatics/batch-client';

export type AnalysisResult = {
    overallTone: string;
    summary: string;
};

export function analyzeToneAndWords(response: RetrieveTranscriptResponse | string): AnalysisResult {
    if (typeof response === 'string') {
        throw new Error('Invalid response');
    }

    const segments = response?.sentiment_analysis?.sentiment_analysis?.segments;
    const summary = response?.sentiment_analysis?.sentiment_analysis?.summary?.overall;

    let overallTone = 'neutral';
    if (summary) {
        const summaryNegativeCount = summary?.negative_count || 0;
        const summaryPositiveCount = summary?.positive_count || 0;
        const summaryNeutralCount = summary?.neutral_count || 0;

        if (summaryNeutralCount > summaryNegativeCount && summaryNeutralCount > summaryPositiveCount) {
            overallTone = 'neutral';
        } else if (summaryPositiveCount > summaryNegativeCount) {
            overallTone = 'positive';
        } else {
            overallTone = 'negative';
        }
    }

    return <AnalysisResult> {
        overallTone,
        summary: response.summary?.content,
    };
}
