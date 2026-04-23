import http.server
import socketserver
import socket

PORT = 8051

Handler = http.server.SimpleHTTPRequestHandler

def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # doesn't need to be reachable
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
    finally:
        s.close()
    return ip

with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
    local_ip = get_local_ip()
    print(f"Serving on:")
    print(f"  http://localhost:{PORT}")
    print(f"  http://{local_ip}:{PORT}  ← use this on your phone")
    httpd.serve_forever()