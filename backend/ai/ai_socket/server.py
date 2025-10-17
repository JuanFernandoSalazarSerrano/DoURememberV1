# How to start or create env:
# python3 -m venv venv - create
# source venv/bin/activate - start

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
            "content": messageFromClientToString
            }
        ]
    )
    print(completion.choices[0].message.content)
    print()
    communication_socket.send("Got your message".encode('utf-8'))
    communication_socket.close()
    print()
    print(f"Connection with {address} ended!")