import {Class} from "../models/chunk.model";

export type AnalysisResult = {
    overallTone: Class;
    summary: string;
};

export type SentimentAnalysisAlternative = {
        summary: {
            overall: {
                negative_count: number;
                positive_count: number;
                neutral_count: number;
            };
        };
        sentiment_analysis?: SentimentAnalysisAlternative;
}

export type RetrieveTranscriptResponseAlternative = {
    sentiment_analysis: SentimentAnalysisAlternative;
    summary: {
        content: string;
    };
}

export type EmptyResponse = {
    emptyChunk: boolean
}

export function analyzeToneAndWords(response: RetrieveTranscriptResponseAlternative): AnalysisResult {
    const summary = response?.sentiment_analysis?.summary?.overall || response?.sentiment_analysis?.sentiment_analysis?.summary?.overall;

    let overallTone = 'neutral';
    if (summary) {
        const summaryNegativeCount = summary?.negative_count || 0;
        const summaryPositiveCount = summary?.positive_count || 0;
        const summaryNeutralCount = summary?.neutral_count || 0;

        if (summaryNeutralCount > summaryNegativeCount && summaryNeutralCount > summaryPositiveCount) {
            overallTone = Class.Natural;
        } else if (summaryPositiveCount > summaryNegativeCount) {
            overallTone = Class.Good;
        } else {
            overallTone = Class.Bad;
        }
    }

    return <AnalysisResult> {
        overallTone,
        summary: response.summary?.content,
    };
}
