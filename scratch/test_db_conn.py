import socket, ssl

def test_conn(host, port):
    print(f"Testing connection to {host}:{port}...")
    try:
        # 1. Resolve DNS
        ip = socket.gethostbyname(host)
        print(f"  DNS resolved: {ip}")
    except Exception as e:
        print(f"  DNS resolution failed: {e}")
        return
        
    try:
        # 2. Open TCP Socket
        sock = socket.create_connection((host, port), timeout=10)
        print("  TCP Socket opened successfully!")
        
        # 3. SSL Handshake
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        ssl_sock = ctx.wrap_socket(sock, server_hostname=host)
        print("  SSL connection established successfully!")
        ssl_sock.close()
    except Exception as e:
        print(f"  TCP/SSL Connection failed: {e}")

print("--- POOLER HOST ---")
test_conn("ep-aged-art-aou076y6-pooler.c-2.ap-southeast-1.aws.neon.tech", 5432)

print("\n--- DIRECT HOST ---")
test_conn("ep-aged-art-aou076y6.ap-southeast-1.aws.neon.tech", 5432)
