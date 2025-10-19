from rest_framework.decorators import api_view
from rest_framework.response import Response
import socket
from server import aiResponse
import requests
from rest_framework import status

HOST = '192.168.80.13'
PORT = 2828

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

@api_view(['POST'])
def api_view_example(request):
    print(request.data)
    client.connect((HOST,PORT))
    client.send(str(request.data.get('userAnswer')).encode("utf-8"))
    print(client.recv(1024).decode("utf-8"))
    return Response({"status": "ok"})

@api_view(['POST'])
def forward_ai_response(request):
    try:
        value = aiResponse() if callable(aiResponse) else aiResponse
        resp = requests.post(
            "http://localhost:8080/api/v1/groundtruth/saveAiResponse",
            json={"aiResponse": value},
            timeout=5
        )
        try:
            body = resp.json()
        except ValueError:
            body = resp.text
        return Response({"sent": True, "status_code": resp.status_code, "response": body}, status=resp.status_code)
    except requests.RequestException as e:
        return Response({"sent": False, "error": str(e)}, status=status.HTTP_502_BAD_GATEWAY)
    except Exception as e:
        return Response({"sent": False, "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)