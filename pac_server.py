#!/usr/bin/env python3
"""
╔══════════════════════════════════════════════════════════════╗
║   PUBG Jordan PAC Server — ALYAZOURI 2026                   ║
║   يشغّل HTTP server محلي لتقديم ملف PAC على المنفذ 8080    ║
║   TikTok: @saeedalyazouri0  |  PUBG ID: 5744469523          ║
╚══════════════════════════════════════════════════════════════╝

الاستخدام:
  1. ضع هذا الملف في نفس مجلد pubg-jordan.pac
  2. شغّله: python3 pac_server.py
  3. على Android: WiFi ← Proxy Auto-Config ← http://<IP>:8080/pubg-jordan.pac
  4. على iOS: WiFi ← Configure Proxy ← Automatic ← http://<IP>:8080/pubg-jordan.pac
"""

import http.server
import socketserver
import os
import sys
import socket
import threading
import time

PORT = 8080
PAC_FILE = "pubg-jordan.pac"

# ANSI colors
R = '\033[91m'  # Red
G = '\033[92m'  # Green
Y = '\033[93m'  # Yellow
B = '\033[94m'  # Blue
C = '\033[96m'  # Cyan
W = '\033[97m'  # White
X = '\033[0m'   # Reset
BOLD = '\033[1m'

class PACHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        path = self.path.split('?')[0]

        # Serve PAC file on any recognized path
        if path in ('/', '/pubg-jordan.pac', '/wpad.dat', '/proxy.pac', '/pac'):
            pac_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'pac', PAC_FILE)
            if not os.path.exists(pac_path):
                pac_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), PAC_FILE)

            try:
                with open(pac_path, 'rb') as f:
                    data = f.read()
                self.send_response(200)
                self.send_header('Content-Type', 'application/x-ns-proxy-autoconfig')
                self.send_header('Content-Length', str(len(data)))
                self.send_header('Cache-Control', 'no-cache, no-store')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(data)
                self.log_custom(f"{G}✅ تم تقديم PAC لـ {self.client_address[0]}{X}")
            except FileNotFoundError:
                self.send_error(404, f"PAC file not found at: {pac_path}")
                self.log_custom(f"{R}❌ PAC file not found{X}")

        # Health check
        elif path == '/ping':
            msg = b'PUBG Jordan PAC Server OK'
            self.send_response(200)
            self.send_header('Content-Type', 'text/plain')
            self.send_header('Content-Length', str(len(msg)))
            self.end_headers()
            self.wfile.write(msg)

        # Info page
        elif path == '/info':
            local_ip = get_local_ip()
            html = f"""<!DOCTYPE html>
<html dir="rtl" lang="ar"><head><meta charset="UTF-8">
<title>PUBG Jordan PAC Server</title>
<style>body{{background:#07090f;color:#F0F2F8;font-family:Tajawal,sans-serif;padding:40px;}}
h1{{color:#FF6B00}}code{{background:#1e2233;padding:4px 10px;border-radius:6px;color:#00D4FF}}
.ok{{color:#10B981}}.box{{background:#0f1118;border:1px solid rgba(255,107,0,.3);padding:20px;border-radius:12px;margin:16px 0}}</style>
</head><body>
<h1>🇯🇴 PUBG Jordan PAC Server — نشط</h1>
<div class="box">
  <p class="ok">✅ السيرفر يعمل على المنفذ {PORT}</p>
  <p>📱 Android/iOS: <code>http://{local_ip}:{PORT}/pubg-jordan.pac</code></p>
  <p>🌐 WPAD: <code>http://{local_ip}:{PORT}/wpad.dat</code></p>
</div>
<div class="box">
  <p>by ALYAZOURI | TikTok: @saeedalyazouri0 | PUBG ID: 5744469523</p>
</div>
</body></html>""".encode()
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(html)))
            self.end_headers()
            self.wfile.write(html)
        else:
            self.send_error(404)

    def log_message(self, fmt, *args):
        pass  # suppress default logs

    def log_custom(self, msg):
        ts = time.strftime('%H:%M:%S')
        print(f"[{C}{ts}{X}] {msg}")


def get_local_ip():
    """Get the local network IP address."""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return '127.0.0.1'


def print_banner(local_ip):
    print(f"\n{BOLD}{Y}╔══════════════════════════════════════════════════════════╗{X}")
    print(f"{BOLD}{Y}║  🇯🇴 PUBG JORDAN PAC SERVER — ALYAZOURI 2026             ║{X}")
    print(f"{BOLD}{Y}╚══════════════════════════════════════════════════════════╝{X}\n")
    print(f"  {G}✅ السيرفر نشط على المنفذ {PORT}{X}\n")
    print(f"  {C}📱 Android (WiFi PAC URL):{X}")
    print(f"     {W}http://{local_ip}:{PORT}/pubg-jordan.pac{X}")
    print()
    print(f"  {C}🍎 iOS (Configure Proxy → Automatic):{X}")
    print(f"     {W}http://{local_ip}:{PORT}/pubg-jordan.pac{X}")
    print()
    print(f"  {C}🌐 WPAD (Router / DHCP 252):{X}")
    print(f"     {W}http://{local_ip}:{PORT}/wpad.dat{X}")
    print()
    print(f"  {C}💻 Windows (Proxy Setup Script):{X}")
    print(f"     {W}http://{local_ip}:{PORT}/pubg-jordan.pac{X}")
    print()
    print(f"  {C}🔍 صفحة المعلومات:{X}")
    print(f"     {W}http://{local_ip}:{PORT}/info{X}")
    print()
    print(f"  {R}اضغط Ctrl+C للإيقاف{X}\n")
    print(f"  {Y}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━{X}\n")


class ThreadedServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    allow_reuse_address = True
    daemon_threads = True


if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    local_ip = get_local_ip()
    print_banner(local_ip)

    try:
        with ThreadedServer(('', PORT), PACHandler) as httpd:
            httpd.serve_forever()
    except OSError as e:
        if e.errno == 98:  # Address already in use
            print(f"\n{R}❌ المنفذ {PORT} مستخدم. جرّب:{X}")
            print(f"   {W}lsof -ti:{PORT} | xargs kill -9{X}\n")
        else:
            print(f"\n{R}❌ خطأ: {e}{X}\n")
        sys.exit(1)
    except KeyboardInterrupt:
        print(f"\n{Y}🔴 تم إيقاف سيرفر PAC{X}\n")
