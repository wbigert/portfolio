import urllib.parse
import urllib.request
import http.cookiejar
import brotli
import datetime
import html
from bs4 import BeautifulSoup
import re
import time
from session import obtain_session
import os
import dotenv
from datetime import datetime
import pytz
import logging
dotenv.load_dotenv()

def notify_person(opener, member_id, member_name, event_name, text_type, queue_spot=None):
    

    team_name = os.environ['TEAM_NAME']
    
    authenticity_token_url = f"https://teamer.net/teams/{team_name}/teamtalks/new"
    authenticity_token_req = urllib.request.Request(authenticity_token_url)
    authenticity_token_req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0")
    authenticity_token_req.add_header("Connection", "keep-alive")
    authenticity_token_req.add_header("Upgrade-Insecure-Requests", "1")
    authenticity_token_req.add_header("Host", "teamer.net")
    authenticity_token_req.add_header("Accept-Encoding", "gzip, deflate, br, zstd")
    authenticity_token_req.add_header("Accept-Language", "sv-SE,sv;q=0.8,en-US;q=0.5,en;q=0.3")
    authenticity_token_req.add_header("Referer", f"https://teamer.net/teams/{team_name}/teamtalks")
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
    login_url = f"https://teamer.net/teams/{team_name}/teamtalks"
    if text_type == "spot":
        title = f"You got your spot!"
        body = f"Hello {member_name}. You got your spot for the event \"{event_name}\" that you were in queue for. Time to warm up!"
    elif text_type == "queue":
        title = f"You have been placed in the queue!"
        body = f"Hello {member_name}. You have been placed in the queue for the event \"{event_name}\" because you accepted the event when it was already full (your status has now been changed to declined). Your position in the queue is: {queue_spot}. You will be notified if a spot opens up and your response will be changed to accepted. To leave the queue, accept the event again."
    elif text_type == "remove":
        title = f"You have been removed from the queue!"
        body = f"Hello {member_name}. You have been removed from the queue for the event \"{event_name}\" because you accepted the event again while already in the queue. To join the queue again, accept the event again!"
    title_encoded = urllib.parse.quote(title, safe='/')
    body_encoded = urllib.parse.quote(f"<p>{body}</p>\r\n", safe='/')
    encoded_authenticity_token = urllib.parse.quote(authenticity_token, safe='/')
    teamtalk_postdata = f"utf8=%E2%9C%93&authenticity_token={encoded_authenticity_token}&teamtalk%5Btitle%5D={title_encoded}&teamtalk%5Bbody%5D={body_encoded}&teamtalk%5Breceive_comment_notifications%5D=0&teamtalk%5Breceive_comment_notifications%5D=1&teamtalk%5Bturn_off_comments%5D=0&commit=Save+message"
    teamtalk_postdata_bytes = teamtalk_postdata.encode("utf-8")

    teamtalk_req = urllib.request.Request(login_url, teamtalk_postdata_bytes)
    teamtalk_req.add_header("Content-Type", "application/x-www-form-urlencoded")
    teamtalk_req.add_header("Content-Length", str(len(teamtalk_postdata_bytes)))
    teamtalk_req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0")
    teamtalk_req.add_header("Connection", "keep-alive")
    teamtalk_req.add_header("Upgrade-Insecure-Requests", "1")
    teamtalk_req.add_header("Host", "teamer.net")
    teamtalk_req.add_header("Origin", "https://teamer.net")
    teamtalk_req.add_header("Referer", f"https://teamer.net/teams/{team_name}/teamtalks/new")
    teamtalk_req.add_header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8")
    teamtalk_req.add_header("Accept-Encoding", "gzip, deflate, br")
    teamtalk_req.add_header("Priority", "u=1")
    teamtalk_req.add_header("Sec-Fetch-Dest", "document")
    teamtalk_req.add_header("Sec-Fetch-Mode", "navigate")
    teamtalk_req.add_header("Sec-Fetch-Site", "same-origin")
    teamtalk_req.add_header("Sec-Fetch-User", "?1")
    teamtalk_req.add_header("Upgrade-Insecure-Requests", "1")
    teamtalk_req.add_header("Accept-Language", "sv-SE,sv;q=0.8,en-US;q=0.5,en;q=0.3")

    login_response = opener.open(teamtalk_req)
    current_url = login_response.geturl()
    # Handle potential redirects
    decompressed_data = brotli.decompress(login_response.read())
    # find the following content name="csrf-token" content="7NWdSk/WT/kPwn64QbYheDIt8N/Sqp6OER875ZsU8VJXeSULb9xIV/IIER2MH7rC0AK5FaSq5ndEhyQYRauaQw==" />
    login_html = decompressed_data.decode('utf-8')
    csrf_token = login_html.split('name="csrf-token" content="')[1].split('" />')[0]

    # Step 3: Access the members available
    teams_url = f"{current_url}/load_all_members"
    teams_req = urllib.request.Request(teams_url)
    teams_req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0")
    teams_req.add_header("Connection", "keep-alive")
    teams_req.add_header("Upgrade-Insecure-Requests", "1")
    teams_req.add_header("Host", "teamer.net")
    teams_req.add_header("Accept-Encoding", "gzip, deflate, br")
    teams_req.add_header("Accept-Language", "sv-SE,sv;q=0.8,en-US;q=0.5,en;q=0.3")
    teams_req.add_header("Accept", "*/*")
    teams_req.add_header("Referer", current_url)
    teams_req.add_header("X-Requested-With", "XMLHttpRequest")
    

    teams_response = opener.open(teams_req)
    current_time = datetime.now(pytz.timezone('Europe/Stockholm'))
    current_timestamp_ms = int(current_time.timestamp() * 1000)
    refresh_url = f"{current_url}/refresh_squad?group_id=All&_={current_timestamp_ms}"
    refresh_req = urllib.request.Request(refresh_url)
    refresh_req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0")
    refresh_req.add_header("Connection", "keep-alive")
    refresh_req.add_header("Upgrade-Insecure-Requests", "1")
    refresh_req.add_header("Host", "teamer.net")
    refresh_req.add_header("Accept-Encoding", "gzip, deflate, br")
    refresh_req.add_header("Accept-Language", "sv-SE,sv;q=0.8,en-US;q=0.5,en;q=0.3")
    refresh_req.add_header("Accept", "*/*")
    refresh_req.add_header("Referer", current_url)
    refresh_req.add_header("X-Requested-With", "XMLHttpRequest")
    retries = 0
    while True:
        if retries > 10:
            print("Raise exception")
            raise Exception("Member not found in the list")
        
        refresh_response = opener.open(refresh_req)
        refresh_response = opener.open(refresh_req)
        read_response = refresh_response.read()
        decompressed_data = brotli.decompress(read_response)

        dashboard_js = decompressed_data.decode('utf-8')
        dashboard_html = dashboard_js.split('replaceWith("')[1].split('");')[0]
        dashboard_html = dashboard_html.replace("\\'", "'")
        dashboard_html = dashboard_html.replace('\\"', '"')
        ul_month_split = dashboard_html.split('<ul class="team-members recipients events">')[1]
        li_splits = ul_month_split.split('<li class="member-list"')[1:]
        li_splits.reverse()
        print(f"Lenght of li_splits: {len(li_splits)}")
        logging.info(f"Lenght of li_splits: {len(li_splits)}")

        selected_li = None
        for idx, li in enumerate(li_splits):
            if member_id in li:
                selected_li = li
                break
        if not selected_li:
            print("Member not found, retrying...")
            logging.info("Member not found, retrying in 2 seconds...")
            time.sleep(2)
            retries += 1
            continue
        else:
            break
    notification_id = selected_li.split("teamtalk_notification_")[1].split('"')[0]
    print(f"Notification ID: {notification_id}")
    # make move post request
    url = f"{current_url}/{notification_id}/move"
    part_1 = url.split("/teams/")[0]
    part_2 = url.split("/teams/")[1].split("-")[0]
    part_3 = url.split("/teamtalks/")[1].split("-")[0]
    part_4 = url.split("/notifications/")[1]
    url = f"{part_1}/teams/{part_2}/teamtalks/{part_3}/notifications/{part_4}"

    postdata = "to=team"
    postdata_bytes = postdata.encode("utf-8")
    print(f"URL: {url}")
    req = urllib.request.Request(url, postdata_bytes)
    req.add_header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
    req.add_header("Content-Length", str(len(postdata_bytes)))
    req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0")
    req.add_header("Connection", "keep-alive")
    req.add_header("Host", "teamer.net")
    req.add_header("Origin", "https://teamer.net")
    req.add_header("Referer", current_url)
    req.add_header("Accept", "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01")
    req.add_header("Accept-Encoding", "gzip, deflate, br, zstd")
    req.add_header("Priority", "u=1")
    req.add_header("Sec-Fetch-Dest", "empty")
    req.add_header("Sec-Fetch-Mode", "cors")
    req.add_header("Sec-Fetch-Site", "same-origin")
    req.add_header("Accept-Language", "sv-SE,sv;q=0.8,en-US;q=0.5,en;q=0.3")
    req.add_header("X-Requested-With", "XMLHttpRequest")
    req.add_header("X-CSRF-Token", csrf_token)
    req.add_header("TE", "trailers")

    response = opener.open(req)
    br_response = brotli.decompress(response.read())
    br_response = br_response.decode('utf-8')
    br_response = br_response.replace("\\'", "'")
    br_response = br_response.replace('\\"', '"')

    split = br_response.split('name="authenticity_token" value="')
    if len(split) < 2:
        print("Authenticity token not found, using old one...")
    else:
        authenticity_token = br_response.split('name="authenticity_token" value="')[1].split('" />')[0]
        print(f"New authenticity token: {authenticity_token}")
    url = f"{current_url}/send_all"
    encoded_authenticity_token = urllib.parse.quote(authenticity_token, safe='/')
    postdata = f"utf8=%E2%9C%93&authenticity_token={encoded_authenticity_token}"
    postdata_bytes = postdata.encode("utf-8")
    req = urllib.request.Request(url, postdata_bytes)
    req.add_header("Content-Type", "application/x-www-form-urlencoded")
    req.add_header("Content-Length", str(len(postdata_bytes)))
    req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0")
    req.add_header("Connection", "keep-alive")
    req.add_header("Upgrade-Insecure-Requests", "1")
    req.add_header("Host", "teamer.net")
    req.add_header("Origin", "https://teamer.net")
    req.add_header("Referer", current_url)
    req.add_header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8")
    req.add_header("Accept-Encoding", "gzip, deflate, br")
    req.add_header("Priority", "u=1")
    req.add_header("Sec-Fetch-Dest", "document")
    req.add_header("Sec-Fetch-Mode", "navigate")
    req.add_header("Sec-Fetch-Site", "same-origin")
    req.add_header("Sec-Fetch-User", "?1")
    req.add_header("Upgrade-Insecure-Requests", "1")
    req.add_header("Accept-Language", "sv-SE,sv;q=0.8,en-US;q=0.5,en;q=0.3")

    response = opener.open(req)

    print("Response code:", response.getcode())
    print("PASSED")

    return opener