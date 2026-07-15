import urllib.request, base64, json, ssl, re

code = """erDiagram
    User ||--o{ Account : has
    User ||--o{ Session : has
    Team ||--o{ Position : has
    Team ||--o{ Member : has
    Team ||--o{ TeamMember : has
    Position ||--o{ Member : has

    User {
        string id PK
        string name
        string email
        timestamp emailVerified
        string image
        string role
    }
    Account {
        string id PK
        string accountId
        string providerId
        string userId FK
        string accessToken
        string refreshToken
        string idToken
        timestamp accessTokenExpiresAt
        timestamp refreshTokenExpiresAt
        string scope
        string password
        timestamp createdAt
        timestamp updatedAt
    }
    Session {
        string id PK
        timestamp expiresAt
        string token
        timestamp createdAt
        timestamp updatedAt
        string ipAddress
        string userAgent
        string userId FK
    }
    Team {
        string id PK
        string name
        string nameEn
        string slug
        string description
        string descriptionEn
        string imageUrl
        string icon
        string coverImage
        string logoUrl
        timestamp createdAt
        timestamp updatedAt
    }
    Position {
        string id PK
        string name
        string nameEn
        int hierarchyLevel
        string teamId FK
    }
    Member {
        string id PK
        string name
        string slug
        string photo
        string bio
        string bioEn
        string email
        string instagram
        string facebook
        string linkedin
        string website
        string skills
        string socialMedia
        string qrCodeUrl
        boolean isActive
        string teamId FK
        string positionId FK
        timestamp createdAt
        timestamp updatedAt
    }
    Project {
        string id PK
        string title
        string titleEn
        string description
        string descriptionEn
        string imageUrl
        string url
        int order
        boolean isVisible
        timestamp createdAt
        timestamp updatedAt
    }
    Gallery {
        string id PK
        string title
        string category
        string imageUrl
        int order
        boolean isVisible
        timestamp createdAt
        timestamp updatedAt
    }"""

if '%%{init' not in code:
    init = ("%%{init: {'theme':'neutral','themeVariables':{"
            "'background':'#ffffff','primaryColor':'#ffffff',"
            "'primaryTextColor':'#000000','primaryBorderColor':'#000000',"
            "'lineColor':'#000000','secondaryColor':'#ffffff','tertiaryColor':'#ffffff',"
            "'actorBkg':'#ffffff','actorBorder':'#000000','actorTextColor':'#000000',"
            "'noteBkgColor':'#ffffff','noteBorderColor':'#000000'}}}%%\n")
    code = init + code

encoded = base64.urlsafe_b64encode(code.encode()).decode()
url = f"https://mermaid.ink/img/{encoded}?bgColor=ffffff"
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

try:
    print(f"Sending request to: {url}")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, context=ctx) as r:
        print("OK!")
except Exception as e:
    print(f"Error: {e}")
    if hasattr(e, 'read'):
        try:
            print(e.read().decode())
        except:
            pass
