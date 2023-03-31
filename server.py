from http.server import HTTPServer, BaseHTTPRequestHandler


HOST = "158.37.188.1"
PORT = 8080

print(f"Creating server for host = {HOST} and port = {PORT}")

class HUSKY_server(BaseHTTPRequestHandler):
    """docstring for Server."""

    def do_GET(self):
        print("Running do_GET")
        if self.path == '/':
            self.path = '/husky-ui/index.html'
        try:
            open_file = open(self.path[1:]).read()
            self.send_response(200)
        except:
            open_file = "File not found"
            self.send_response(404)
        self.end_headers()
        self.wfile.write(bytes(open_file, 'utf-8'))

serv = HTTPServer((HOST,PORT), HUSKY_server)
serv.serve_forever()
