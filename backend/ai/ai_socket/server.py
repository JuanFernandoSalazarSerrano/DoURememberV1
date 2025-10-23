# How to start or create env:
# python3 -m venv venv - create
# source venv/bin/activate - start

import requests
from openai import OpenAI
import os
from dotenv import find_dotenv, load_dotenv
import socket

HOST = '192.168.80.13'
PORT = 2828

dotenvpath = find_dotenv()
load_dotenv(dotenvpath)

client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key=os.getenv("api_key"),
)

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind((HOST,PORT))

server.listen(5)

while True:

    communication_socket, address = server.accept()
    print(f"Connected to {address}")
    messageFromClient = communication_socket.recv(1024).decode('utf-8')
    messageFromClientToString = str(messageFromClient)
    print("Message from the client is: {0}".format(messageFromClientToString))
    print()

    completion = client.chat.completions.create(
        extra_headers={
        },
        extra_body={},
        model="deepseek/deepseek-r1-distill-llama-70b:free",
        messages=[
            {
            "role": "user",
            "content": 
            
            """ You are an objective evaluator. Input is a JSON object containing groundTruth, groundTruthFacts, keyEntities, userAnswer, and scoringTolerances/weights. Do NOT produce any text other than a single JSON object exactly matching the output schema below.

                Steps you must perform:
                1. Tokenize groundTruthFacts and keyEntities and attempt to match each to the userAnswer using synonyms and fuzzy matching as allowed by matchingTolerances.
                2. For every matched keyEntity/fact mark it PRESENT and check whether any attribute (color, number, relationship, location, time) is ACCURATE or INCORRECT.
                3. Detect OMISSIONS (expected facts not mentioned) and COMMISSIONS (facts stated in userAnswer that contradict the groundTruth or add verifiably false people/objects).
                4. Compute four sub-scores from 0.0–1.0: presenceScore, accuracyScore, omissionScore, commissionScore (where omission and commission are penalties so higher penalty lowers final).
                5. Combine sub-scores using scoringWeights to create a finalNormalizedScore in range 0.0–1.0. Map finalNormalizedScore to rememberScore = 1..10 by multiplying by 9 and adding 1, then rounding to nearest integer.
                6. aiResponse string must be friendly and lightly humorous: use warm, positive phrasing and a touch of tasteful humor (no sarcasm, insults, sensitive topics, or profanity). Keep it clear and factual, suitable for diverse audiences, and short enough to display comfortably in a UI, while details in the JSON explain specifics.
                7. Return exactly this JSON schema and nothing else. Do NOT perform **Step-by-Step Explanations** or **Final Calculations** Just return this JSON schema and nothing else.

                Output JSON schema:
                {
                "aiResponse": "<short verdict string>",
                "rememberScore": <integer 1-10>,
                "details": {
                    "presentEntities": ["..."],
                    "missingEntities": ["..."],
                    "incorrectDetails": ["..."],
                    "confabulatedDetails": ["..."],
                    "rawScores": {
                    "presence": 0.0-1.0,
                    "accuracy": 0.0-1.0,
                    "omission": 0.0-1.0,
                    "commission": 0.0-1.0
                    },
                    "explanation": "<1-2 sentence explanation>"
                    }
                }
 Input = """ + messageFromClientToString
            }
        ]
    )
    print(completion.choices[0].message.content)

    # aiResponse = """{"aiResponse": "You've aced this one with flying colors! 🐾 GR 8!", "rememberScore": 8, "details": { "presentEntities": ["dog", "beach", "waves", "shoreline", "pug"], "missingEntities": [], "incorrectDetails": [], "confabulatedDetails": [], "rawScores": { "presence": 1.0, "accuracy": 1.0, "omission": 0.0, "commission": 0.0 }, "explanation": "Great job! You hit all the key points accurately."}}"""

    aiResponse = completion.choices[0].message.content

    url = 'http://localhost:8080/api/v1/groundtruth/saveAiResponse'
    myobj = {"aiResponse":str(aiResponse)}

    print("ai json -> ", myobj)

    response = requests.post(url, json=myobj)

    print()
    communication_socket.send("Got your message".encode('utf-8'))
    communication_socket.close()
    print()
    print(f"Connection with {address} ended!")