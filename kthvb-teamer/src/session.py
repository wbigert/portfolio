import urllib.parse
import urllib.request
import http.cookiejar
import brotli
import dotenv
import os
dotenv.load_dotenv()

def obtain_session(verbose=False):
    # Initialize a CookieJar to store cookies
    cookie_jar = http.cookiejar.CookieJar()
    cookie_handler = urllib.request.HTTPCookieProcessor(cookie_jar)
    opener = urllib.request.build_opener(cookie_handler)

    # Step 1: Fetch the login page to get the authenticity token
    authenticity_token_url = "https://teamer.net/session/new"
    authenticity_token_req = urllib.request.Request(authenticity_token_url)
    authenticity_token_req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0")
    authenticity_token_req.add_header("Connection", "keep-alive")
    authenticity_token_req.add_header("Upgrade-Insecure-Requests", "1")
    authenticity_token_req.add_header("Host", "teamer.net")
    authenticity_token_req.add_header("Accept-Encoding", "gzip, deflate, br")
    authenticity_token_req.add_header("Accept-Language", "sv-SE,sv;q=0.8,en-US;q=0.5,en;q=0.3")
    authenticity_token_req.add_header("Referer", "https://teamer.net/")
    authenticity_token_req.add_header("Alt-Used", "teamer.net")
    authenticity_token_req.add_header("Priority", "u=1")
    authenticity_token_req.add_header("Sec-Fetch-Dest", "document")
    authenticity_token_req.add_header("Sec-Fetch-Mode", "navigate")
    authenticity_token_req.add_header("Sec-Fetch-Site", "same-origin")
    authenticity_token_req.add_header("Sec-Fetch-User", "?1")
    authenticity_token_req.add_header("Upgrade-Insecure-Requests", "1")
    authenticity_token_req.add_header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8")

    authenticity_token_response = opener.open(authenticity_token_req)

    # Decompress and extract authenticity token
    decompressed_data = brotli.decompress(authenticity_token_response.read())
    html_content = decompressed_data.decode('utf-8')
    authenticity_token = html_content.split('<meta name="csrf-token" content="')[1].split('" />')[0]

    # Step 2: Login with the authenticity token
    login_url = "https://teamer.net/session"
    encoded_authenticity_token = urllib.parse.quote(authenticity_token, safe='/')
    teamer_login = os.environ['TEAMER_LOGIN']
    login_postdata = f"utf8=%E2%9C%93&authenticity_token={encoded_authenticity_token}{teamer_login}"
    print(f"Login Postdata: {login_postdata}")
    login_postdata_bytes = login_postdata.encode("utf-8")

    login_req = urllib.request.Request(login_url, login_postdata_bytes)
    login_req.add_header("Content-Type", "application/x-www-form-urlencoded")
    login_req.add_header("Content-Length", str(len(login_postdata_bytes)))
    login_req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0")
    login_req.add_header("Connection", "keep-alive")
    login_req.add_header("Upgrade-Insecure-Requests", "1")
    login_req.add_header("Host", "teamer.net")
    login_req.add_header("Origin", "https://teamer.net")
    login_req.add_header("Referer", "https://teamer.net/session/new")
    login_req.add_header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8")
    login_req.add_header("Accept-Encoding", "gzip, deflate, br")
    login_req.add_header("Priority", "u=1")
    login_req.add_header("Sec-Fetch-Dest", "document")
    login_req.add_header("Sec-Fetch-Mode", "navigate")
    login_req.add_header("Sec-Fetch-Site", "same-origin")
    login_req.add_header("Sec-Fetch-User", "?1")
    login_req.add_header("Upgrade-Insecure-Requests", "1")
    login_req.add_header("Accept-Language", "sv-SE,sv;q=0.8,en-US;q=0.5,en;q=0.3")

    login_response = opener.open(login_req)

    # Handle potential redirects
    redirect_url = login_response.getheader('Location')
    while redirect_url:
        redirect_response = opener.open(redirect_url)
        redirect_url = redirect_response.getheader('Location')

    # Final response content
    decompressed_data = brotli.decompress(login_response.read())

    # Step 3: Access the teams page
    teamer_member = os.environ['TEAMER_MEMBER']
    teams_url = f"https://teamer.net/users/{teamer_member}/teams"
    teams_req = urllib.request.Request(teams_url)
    teams_req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0")
    teams_req.add_header("Connection", "keep-alive")
    teams_req.add_header("Upgrade-Insecure-Requests", "1")
    teams_req.add_header("Host", "teamer.net")
    teams_req.add_header("Accept-Encoding", "gzip, deflate, br")
    teams_req.add_header("Accept-Language", "sv-SE,sv;q=0.8,en-US;q=0.5,en;q=0.3")
    teams_req.add_header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8")
    teams_req.add_header("Referer", "https://teamer.net/session")

    teams_response = opener.open(teams_req)

    return opener