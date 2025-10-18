from rest_framework.decorators import api_view
from rest_framework.response import Response
import socket

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
