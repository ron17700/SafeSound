import {RetrieveTranscriptResponse} from "@speechmatics/batch-client";

export const mockData: RetrieveTranscriptResponse | any = {
    "format": "2.9",
    "job": {
        "created_at": "2024-12-22T18:17:26.730Z",
        "data_name": "file-1734891445355-597964590.wav",
        "duration": 45,
        "id": "6jnree5ueo"
    },
    "metadata": {
        "created_at": "2024-12-22T18:17:47.819640Z",
        "language_pack_info": {
            "adapted": false,
            "itn": true,
            "language_description": "English",
            "word_delimiter": " ",
            "writing_direction": "left-to-right"
        },
        "sentiment_analysis_config": {},
        "summarization_config": {
            "content_type": "informative",
            "summary_length": "brief",
            "summary_type": "bullets"
        },
        "transcription_config": {
            "language": "en"
        },
        "type": "transcription"
    },
    "results": [
        {
            "alternatives": [
                {
                    "confidence": 0.78,
                    "content": "Yeah",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 2.31,
            "start_time": 2.04,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 1,
                    "content": ".",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "attaches_to": "previous",
            "end_time": 2.31,
            "is_eos": true,
            "start_time": 2.31,
            "type": "punctuation"
        },
        {
            "alternatives": [
                {
                    "confidence": 0.52,
                    "content": "He",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 3.39,
            "start_time": 3.18,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 0.7,
                    "content": "has",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 5.13,
            "start_time": 4.98,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 1,
                    "content": ".",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "attaches_to": "previous",
            "end_time": 5.13,
            "is_eos": true,
            "start_time": 5.13,
            "type": "punctuation"
        },
        {
            "alternatives": [
                {
                    "confidence": 0.98,
                    "content": "A",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 7.92,
            "start_time": 7.74,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 0.81,
                    "content": "vivid",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 8.4,
            "start_time": 7.92,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 0.69,
                    "content": "memory",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 8.91,
            "start_time": 8.4,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 1,
                    "content": ".",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "attaches_to": "previous",
            "end_time": 8.91,
            "is_eos": true,
            "start_time": 8.91,
            "type": "punctuation"
        },
        {
            "alternatives": [
                {
                    "confidence": 0.74,
                    "content": "About",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 11.58,
            "start_time": 11.31,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 0.66,
                    "content": "him",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 13.35,
            "start_time": 13.14,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 1,
                    "content": ".",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "attaches_to": "previous",
            "end_time": 13.35,
            "is_eos": true,
            "start_time": 13.35,
            "type": "punctuation"
        },
        {
            "alternatives": [
                {
                    "confidence": 0.92,
                    "content": "He's",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 13.53,
            "start_time": 13.35,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 0.91,
                    "content": "always",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 14.25,
            "start_time": 13.86,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 1,
                    "content": ".",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "attaches_to": "previous",
            "end_time": 14.25,
            "is_eos": true,
            "start_time": 14.25,
            "type": "punctuation"
        },
        {
            "alternatives": [
                {
                    "confidence": 0.79,
                    "content": "You",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 15.18,
            "start_time": 15.03,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 1,
                    "content": "don't",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 15.6,
            "start_time": 15.18,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 0.84,
                    "content": "lie",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 16.17,
            "start_time": 15.6,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 1,
                    "content": "that",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 16.32,
            "start_time": 16.17,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 1,
                    "content": "you",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 16.5,
            "start_time": 16.32,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 1,
                    "content": "have",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 16.71,
            "start_time": 16.5,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 1,
                    "content": "a",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 16.8,
            "start_time": 16.71,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 1,
                    "content": "boyfriend",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 17.37,
            "start_time": 16.8,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 1,
                    "content": "?",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "attaches_to": "previous",
            "end_time": 17.37,
            "is_eos": true,
            "start_time": 17.37,
            "type": "punctuation"
        },
        {
            "alternatives": [
                {
                    "confidence": 0.3,
                    "content": "Yes",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 18.69,
            "start_time": 18.48,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 1,
                    "content": ".",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "attaches_to": "previous",
            "end_time": 18.69,
            "is_eos": true,
            "start_time": 18.69,
            "type": "punctuation"
        },
        {
            "alternatives": [
                {
                    "confidence": 0.57,
                    "content": "No",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 19.35,
            "start_time": 18.84,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 1,
                    "content": ",",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "attaches_to": "previous",
            "end_time": 19.35,
            "is_eos": false,
            "start_time": 19.35,
            "type": "punctuation"
        },
        {
            "alternatives": [
                {
                    "confidence": 0.6,
                    "content": "I'm",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 19.8,
            "start_time": 19.59,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 0.8,
                    "content": "not",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 20.55,
            "start_time": 20.31,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 0.99,
                    "content": "that",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 20.94,
            "start_time": 20.55,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 0.8,
                    "content": "bad",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 22.41,
            "start_time": 22.11,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 0.92,
                    "content": "for",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 22.59,
            "start_time": 22.41,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 0.85,
                    "content": "you",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 22.68,
            "start_time": 22.59,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 1,
                    "content": ".",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "attaches_to": "previous",
            "end_time": 22.68,
            "is_eos": true,
            "start_time": 22.68,
            "type": "punctuation"
        },
        {
            "alternatives": [
                {
                    "confidence": 0.98,
                    "content": "Hello",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 26.07,
            "start_time": 25.77,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 1,
                    "content": "?",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "attaches_to": "previous",
            "end_time": 26.07,
            "is_eos": true,
            "start_time": 26.07,
            "type": "punctuation"
        },
        {
            "alternatives": [
                {
                    "confidence": 1,
                    "content": "Lover",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 28.26,
            "start_time": 27.66,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 1,
                    "content": ".",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "attaches_to": "previous",
            "end_time": 28.26,
            "is_eos": true,
            "start_time": 28.26,
            "type": "punctuation"
        },
        {
            "alternatives": [
                {
                    "confidence": 1,
                    "content": "Lover",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 29.28,
            "start_time": 28.5,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 1,
                    "content": ".",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "attaches_to": "previous",
            "end_time": 29.28,
            "is_eos": true,
            "start_time": 29.28,
            "type": "punctuation"
        },
        {
            "alternatives": [
                {
                    "confidence": 0.84,
                    "content": "Does",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 33.54,
            "start_time": 32.97,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 0.78,
                    "content": "not",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 34.83,
            "start_time": 34.32,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 0.39,
                    "content": "give",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 35.1,
            "start_time": 34.83,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 0.27,
                    "content": "us",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 36.72,
            "start_time": 36.42,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 0.4,
                    "content": "any",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 37.08,
            "start_time": 36.72,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 0.94,
                    "content": "respect",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 38.01,
            "start_time": 37.08,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 0.44,
                    "content": "about",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 39.54,
            "start_time": 39.24,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 0.62,
                    "content": "the",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 39.63,
            "start_time": 39.54,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 1,
                    "content": "respect",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 40.35,
            "start_time": 39.63,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 1,
                    "content": ".",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "attaches_to": "previous",
            "end_time": 40.35,
            "is_eos": true,
            "start_time": 40.35,
            "type": "punctuation"
        },
        {
            "alternatives": [
                {
                    "confidence": 1,
                    "content": "That's",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 44.94,
            "start_time": 44.52,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 1,
                    "content": "it",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "end_time": 45.27,
            "start_time": 44.94,
            "type": "word"
        },
        {
            "alternatives": [
                {
                    "confidence": 1,
                    "content": ".",
                    "language": "en",
                    "speaker": "UU"
                }
            ],
            "attaches_to": "previous",
            "end_time": 45.27,
            "is_eos": true,
            "start_time": 45.27,
            "type": "punctuation"
        }
    ],
    "sentiment_analysis": {
        "segments": [
            {
                "confidence": 0.59,
                "end_time": 5.13,
                "sentiment": "neutral",
                "speaker": "UU",
                "start_time": 2.04,
                "text": "Yeah. He has."
            },
            {
                "confidence": 0.57,
                "end_time": 14.25,
                "sentiment": "positive",
                "speaker": "UU",
                "start_time": 7.74,
                "text": "A vivid memory. About him. He's always."
            },
            {
                "confidence": 0.49,
                "end_time": 18.69,
                "sentiment": "neutral",
                "speaker": "UU",
                "start_time": 15.03,
                "text": "You don't lie that you have a boyfriend? Yes."
            },
            {
                "confidence": 0.69,
                "end_time": 29.28,
                "sentiment": "positive",
                "speaker": "UU",
                "start_time": 18.84,
                "text": "No, I'm not that bad for you. Hello? Lover. Lover."
            },
            {
                "confidence": 0.88,
                "end_time": 45.27,
                "sentiment": "negative",
                "speaker": "UU",
                "start_time": 32.97,
                "text": "Does not give us any respect about the respect. That's it."
            }
        ],
        "summary": {
            "overall": {
                "negative_count": 1,
                "neutral_count": 2,
                "positive_count": 2
            }
        }
    },
    "summary": {
        "content": "- The speaker acknowledges someone's vivid memory.\n- There is a mention of a boyfriend and lying.\n- The term \"lover\" is used, indicating a personal relationship context."
    }
}
