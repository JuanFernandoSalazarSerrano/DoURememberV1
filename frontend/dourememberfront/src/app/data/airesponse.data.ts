import { GroundTruthResponse } from "../models/GroundTruthResponse";

export const testAiResponses: GroundTruthResponse[] = [

    {
            "id": 5,
            "aiResponse": "Good recall, but some details were missing.",
            "rememberScore": 7,
            "presentEntities": "[\"Grandma\", \"recipe book\", \"kitchen\"]",
            "missingEntities": "[\"blue notebook\", \"Sunday afternoon\"]",
            "incorrectDetails": "[\"grandma cooked pasta (it was cookies)\"]",
            "confabulatedDetails": "[\"grandma mentioned Paris\"]",
            "presence": 0.85,
            "accuracy": 0.72,
            "omission": 0.28,
            "commission": 0.18,
            "explanation": "Most relevant entities were mentioned, but there were a few incorrect or invented details."
        },
        {
            "id": 6,
            "aiResponse": "Good recall, but some details were missing.",
            "rememberScore": 7,
            "presentEntities": "[\"Grandma\", \"recipe book\", \"kitchen\"]",
            "missingEntities": "[\"blue notebook\", \"Sunday afternoon\"]",
            "incorrectDetails": "[\"grandma cooked pasta (it was cookies)\"]",
            "confabulatedDetails": "[\"grandma mentioned Paris\"]",
            "presence": 0.85,
            "accuracy": 0.72,
            "omission": 0.28,
            "commission": 0.18,
            "explanation": "Most relevant entities were mentioned, but there were a few incorrect or invented details."
        },
        {
            "id": 7,
            "aiResponse": "Good recall, but some details were missing.",
            "rememberScore": 7,
            "presentEntities": "[\"Grandma\", \"recipe book\", \"kitchen\"]",
            "missingEntities": "[\"blue notebook\", \"Sunday afternoon\"]",
            "incorrectDetails": "[\"grandma cooked pasta (it was cookies)\"]",
            "confabulatedDetails": "[\"grandma mentioned Paris\"]",
            "presence": 0.85,
            "accuracy": 0.72,
            "omission": 0.28,
            "commission": 0.18,
            "explanation": "Most relevant entities were mentioned, but there were a few incorrect or invented details."
        },
        {
            "id": 8,
            "aiResponse": "Good recall, but some details were missing.",
            "rememberScore": 7,
            "presentEntities": "[\"Grandma\", \"recipe book\", \"kitchen\"]",
            "missingEntities": "[\"blue notebook\", \"Sunday afternoon\"]",
            "incorrectDetails": "[\"grandma cooked pasta (it was cookies)\"]",
            "confabulatedDetails": "[\"grandma mentioned Paris\"]",
            "presence": 0.85,
            "accuracy": 0.72,
            "omission": 0.28,
            "commission": 0.18,
            "explanation": "Most relevant entities were mentioned, but there were a few incorrect or invented details."
        }

];
