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

export const mockDataNotWorking: RetrieveTranscriptResponse | any = {
    "format": "2.9",
    "job": {
        "created_at": "2025-03-15T15:56:19.332Z",
        "data_name": "file-1742054177228-392294815.mp3",
        "duration": 46,
        "id": "o7f32vmqo0"
    },
    "metadata": {
        "created_at": "2025-03-15T15:56:37.727739Z",
        "language_pack_info": {
            "adapted": false,
            "itn": true,
            "language_description": "English",
            "word_delimiter": " ",
            "writing_direction": "left-to-right"
        },
        "orchestrator_version": "2025.02.27021.1+cf4bc0994d.HEAD",
        "sentiment_analysis_config": {},
        "summarization_config": {"content_type": "informative", "summary_length": "brief", "summary_type": "bullets"},
        "transcription_config": {"language": "en"},
        "type": "transcription"
    },
    "results": [{
        "alternatives": [{"confidence": 0.62, "content": "La", "language": "en", "speaker": "UU"}],
        "end_time": 0.6,
        "start_time": 0.42,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 0.82, "content": "la", "language": "en", "speaker": "UU"}],
        "end_time": 2.22,
        "start_time": 2.04,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 0.98, "content": "la", "language": "en", "speaker": "UU"}],
        "end_time": 4.14,
        "start_time": 3.96,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 1, "content": "la", "language": "en", "speaker": "UU"}],
        "end_time": 5.91,
        "start_time": 5.67,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 1, "content": "la", "language": "en", "speaker": "UU"}],
        "end_time": 7.44,
        "start_time": 7.2,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 1, "content": ".", "language": "en", "speaker": "UU"}],
        "attaches_to": "previous",
        "end_time": 7.44,
        "is_eos": true,
        "start_time": 7.44,
        "type": "punctuation"
    }, {
        "alternatives": [{"confidence": 1, "content": "La", "language": "en", "speaker": "UU"}],
        "end_time": 12.9,
        "start_time": 12.6,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 1, "content": "la", "language": "en", "speaker": "UU"}],
        "end_time": 13.98,
        "start_time": 13.86,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 0.95, "content": "la", "language": "en", "speaker": "UU"}],
        "end_time": 14.94,
        "start_time": 14.79,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 1, "content": ".", "language": "en", "speaker": "UU"}],
        "attaches_to": "previous",
        "end_time": 14.94,
        "is_eos": true,
        "start_time": 14.94,
        "type": "punctuation"
    }, {
        "alternatives": [{"confidence": 1, "content": "Don't", "language": "en", "speaker": "UU"}],
        "end_time": 15.51,
        "start_time": 15.06,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 1, "content": "lie", "language": "en", "speaker": "UU"}],
        "end_time": 16.08,
        "start_time": 15.51,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 1, "content": "that", "language": "en", "speaker": "UU"}],
        "end_time": 16.23,
        "start_time": 16.08,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 1, "content": "you", "language": "en", "speaker": "UU"}],
        "end_time": 16.41,
        "start_time": 16.23,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 1, "content": "have", "language": "en", "speaker": "UU"}],
        "end_time": 16.62,
        "start_time": 16.41,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 1, "content": "a", "language": "en", "speaker": "UU"}],
        "end_time": 16.71,
        "start_time": 16.62,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 1, "content": "boyfriend", "language": "en", "speaker": "UU"}],
        "end_time": 17.28,
        "start_time": 16.71,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 1, "content": ".", "language": "en", "speaker": "UU"}],
        "attaches_to": "previous",
        "end_time": 17.28,
        "is_eos": true,
        "start_time": 17.28,
        "type": "punctuation"
    }, {
        "alternatives": [{"confidence": 0.64, "content": "And", "language": "en", "speaker": "UU"}],
        "end_time": 17.43,
        "start_time": 17.28,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 0.99, "content": "you", "language": "en", "speaker": "UU"}],
        "end_time": 18.51,
        "start_time": 18.39,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 0.99, "content": "know", "language": "en", "speaker": "UU"}],
        "end_time": 19.23,
        "start_time": 18.72,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 0.98, "content": "that", "language": "en", "speaker": "UU"}],
        "end_time": 20.85,
        "start_time": 20.46,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 1, "content": ".", "language": "en", "speaker": "UU"}],
        "attaches_to": "previous",
        "end_time": 20.85,
        "is_eos": true,
        "start_time": 20.85,
        "type": "punctuation"
    }, {
        "alternatives": [{"confidence": 0.87, "content": "Never", "language": "en", "speaker": "UU"}],
        "end_time": 22.47,
        "start_time": 22.02,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 1, "content": ".", "language": "en", "speaker": "UU"}],
        "attaches_to": "previous",
        "end_time": 22.47,
        "is_eos": true,
        "start_time": 22.47,
        "type": "punctuation"
    }, {
        "alternatives": [{"confidence": 0.87, "content": "Actually", "language": "en", "speaker": "UU"}],
        "end_time": 25.08,
        "start_time": 24.57,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 0.57, "content": "does", "language": "en", "speaker": "UU"}],
        "end_time": 27.3,
        "start_time": 26.97,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 0.71, "content": "love", "language": "en", "speaker": "UU"}],
        "end_time": 28.02,
        "start_time": 27.57,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 0.5, "content": "a", "language": "en", "speaker": "UU"}],
        "end_time": 28.17,
        "start_time": 28.02,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 1, "content": "lover", "language": "en", "speaker": "UU"}],
        "end_time": 29.19,
        "start_time": 28.41,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 1, "content": ".", "language": "en", "speaker": "UU"}],
        "attaches_to": "previous",
        "end_time": 29.19,
        "is_eos": true,
        "start_time": 29.19,
        "type": "punctuation"
    }, {
        "alternatives": [{"confidence": 0.97, "content": "He", "language": "en", "speaker": "UU"}],
        "end_time": 31.08,
        "start_time": 30.96,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 1, "content": "does", "language": "en", "speaker": "UU"}],
        "end_time": 33.45,
        "start_time": 32.88,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 1, "content": "not", "language": "en", "speaker": "UU"}],
        "end_time": 34.74,
        "start_time": 34.23,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 0.44, "content": "need", "language": "en", "speaker": "UU"}],
        "end_time": 34.95,
        "start_time": 34.74,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 0.44, "content": "any", "language": "en", "speaker": "UU"}],
        "end_time": 36.96,
        "start_time": 36.63,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 1, "content": "respect", "language": "en", "speaker": "UU"}],
        "end_time": 37.92,
        "start_time": 36.96,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 1, "content": ".", "language": "en", "speaker": "UU"}],
        "attaches_to": "previous",
        "end_time": 37.92,
        "is_eos": true,
        "start_time": 37.92,
        "type": "punctuation"
    }, {
        "alternatives": [{"confidence": 1, "content": "Respect", "language": "en", "speaker": "UU"}],
        "end_time": 40.26,
        "start_time": 39.54,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 1, "content": "?", "language": "en", "speaker": "UU"}],
        "attaches_to": "previous",
        "end_time": 40.26,
        "is_eos": true,
        "start_time": 40.26,
        "type": "punctuation"
    }, {
        "alternatives": [{"confidence": 1, "content": "That's", "language": "en", "speaker": "UU"}],
        "end_time": 44.85,
        "start_time": 44.43,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 1, "content": "it", "language": "en", "speaker": "UU"}],
        "end_time": 45.18,
        "start_time": 44.85,
        "type": "word"
    }, {
        "alternatives": [{"confidence": 1, "content": ".", "language": "en", "speaker": "UU"}],
        "attaches_to": "previous",
        "end_time": 45.18,
        "is_eos": true,
        "start_time": 45.18,
        "type": "punctuation"
    }],
    "sentiment_analysis": {
        "segments": [{
            "confidence": 0.4,
            "end_time": 7.44,
            "sentiment": "neutral",
            "speaker": "UU",
            "start_time": 0.42,
            "text": "La la la la la."
        }, {
            "confidence": 0.43,
            "end_time": 14.94,
            "sentiment": "neutral",
            "speaker": "UU",
            "start_time": 12.6,
            "text": "La la la."
        }, {
            "confidence": 0.4,
            "end_time": 17.28,
            "sentiment": "neutral",
            "speaker": "UU",
            "start_time": 15.06,
            "text": "Don't lie that you have a boyfriend."
        }, {
            "confidence": 0.52,
            "end_time": 22.47,
            "sentiment": "negative",
            "speaker": "UU",
            "start_time": 17.28,
            "text": "And you know that. Never."
        }, {
            "confidence": 0.63,
            "end_time": 29.19,
            "sentiment": "positive",
            "speaker": "UU",
            "start_time": 24.57,
            "text": "Actually does love a lover."
        }, {
            "confidence": 0.48,
            "end_time": 45.18,
            "sentiment": "negative",
            "speaker": "UU",
            "start_time": 30.96,
            "text": "He does not need any respect. Respect? That's it."
        }], "summary": {"overall": {"negative_count": 2, "neutral_count": 3, "positive_count": 1}}
    },
    "summary": {"content": "- The speaker discusses themes of love and respect.\n- The speaker denies the existence of a boyfriend and questions the need for respect in love."}
}