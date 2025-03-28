import urllib.parse
import urllib.request
import brotli
import os

def find_event_id(html, member_name, event_id, status):
    team_name = os.environ['TEAM_NAME']
    person_html = html.split(f"{member_name}</span></h6>")[1][:2000]
    try:
        notification_id = person_html.split(f"/teams/{team_name}/events/{event_id}/notifications/")[1].split('/')[0]
    except:
        # id="notification_1279702506-playersettings"
        notification_id = person_html.split('id="notification_')[1].split('-playersettings')[0]
    
    print(f"Notifcation ID: {notification_id}")
    return notification_id

def change_person_status(opener, member_name, event_id, status):
    # Step 1: Fetch the login page to get the authenticity token
    team_name = os.environ['TEAM_NAME']
    event_notificiations_url = f"https://teamer.net/teams/{team_name}/events/{event_id}/notifications"
    event_notificiations_req = urllib.request.Request(event_notificiations_url)
    event_notificiations_req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0")
    event_notificiations_req.add_header("Connection", "keep-alive")
    event_notificiations_req.add_header("Upgrade-Insecure-Requests", "1")
    event_notificiations_req.add_header("Host", "teamer.net")
    event_notificiations_req.add_header("Accept-Encoding", "gzip, deflate, br, zstd")
    event_notificiations_req.add_header("Accept-Language", "sv-SE,sv;q=0.8,en-US;q=0.5,en;q=0.3")
    event_notificiations_req.add_header("Referer", f"https://teamer.net/teams/{team_name}/events")
    event_notificiations_req.add_header("Alt-Used", "teamer.net")
    event_notificiations_req.add_header("Priority", "u=1")
    event_notificiations_req.add_header("Sec-Fetch-Dest", "document")
    event_notificiations_req.add_header("Sec-Fetch-Mode", "navigate")
    event_notificiations_req.add_header("Sec-Fetch-Site", "same-origin")
    event_notificiations_req.add_header("Sec-Fetch-User", "?1")
    event_notificiations_req.add_header("Upgrade-Insecure-Requests", "1")
    event_notificiations_req.add_header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8")

    event_notificiations_response = opener.open(event_notificiations_req)

    # Decompress and extract authenticity token
    decompressed_data = brotli.decompress(event_notificiations_response.read())
    html_content = decompressed_data.decode('utf-8')
    csrf_token = html_content.split('name="csrf-token" content="')[1].split('" />')[0]
    html_content = html_content.replace("\\'", "'")
    html_content = html_content.replace('\\"', '"')

    notification_id = find_event_id(html_content, member_name, event_id, status)
    change_status_url = f"https://teamer.net/teams/{team_name}/events/{event_id}/notifications/{notification_id}/{status}?np=1"
    print(change_status_url)

    # PUT REQUEST TO CHANGE STATUS, no postdata needed
    put_req = urllib.request.Request(change_status_url, method='PUT')
    put_req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0")
    put_req.add_header("Connection", "keep-alive")
    put_req.add_header("Content-Length", "0")
    put_req.add_header("Upgrade-Insecure-Requests", "1")
    put_req.add_header("Host", "teamer.net")
    put_req.add_header("Accept-Encoding", "gzip, deflate, br, zstd")
    put_req.add_header("Accept-Language", "sv-SE,sv;q=0.8,en-US;q=0.5,en;q=0.3")
    put_req.add_header("Referer", event_notificiations_url)
    put_req.add_header("Pragma", "no-cache")
    put_req.add_header("Origin", "https://teamer.net")
    put_req.add_header("Priority", "u=4")
    put_req.add_header("Sec-Fetch-Dest", "empty")
    put_req.add_header("Sec-Fetch-Mode", "cors")
    put_req.add_header("Sec-Fetch-Site", "same-origin")
    put_req.add_header("Accept", "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01")
    put_req.add_header("X-CSRF-Token", csrf_token)
    put_req.add_header("X-Requested-With", "XMLHttpRequest")

    # set method to PUT
    put_response = opener.open(put_req)
    print(put_response.getcode())

    return opener