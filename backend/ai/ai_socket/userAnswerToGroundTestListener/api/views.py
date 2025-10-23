from rest_framework.decorators import api_view
from rest_framework.response import Response
import socket
from rest_framework import status

HOST = '192.168.80.13'
PORT = 2828

@api_view(['POST'])
def api_view_example(request):
    client = None
    try:
        # Create a new socket with a timeout
        client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        
        # Connect and send data
        client.connect((HOST, PORT))
        print(request.data)
        client.send(str(request.data.get('userAnswer')).encode("utf-8"))
        response = client.recv(1024).decode("utf-8")
        print(response)
        return Response({"status": "ok", "response": response})
    
    except Exception as e:
        return Response(
            {"error": str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    finally:
        if client:
            try:
                client.shutdown(socket.SHUT_RDWR)
                client.close()
            except Exception:
                pass