import os
import urllib.request
import brotli
from datetime import datetime
import pytz


def obtain_activities_html(opener):
    # current stockholm time
    current_time = datetime.now(pytz.timezone('Europe/Stockholm'))
    current_timestamp_ms = int(current_time.timestamp() * 1000)
    teamer_member = os.environ['TEAMER_MEMBER']
    activities_url = f"https://teamer.net/users/{teamer_member}/activities?_={current_timestamp_ms}"
    dashboard_req = urllib.request.Request(activities_url)
    dashboard_req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0")
    dashboard_req.add_header("Connection", "keep-alive")
    dashboard_req.add_header("Referer", f"https://teamer.net/users/{teamer_member}/teams")
    dashboard_req.add_header("Accept-Encoding", "gzip, deflate, br, zstd")
    dashboard_req.add_header("Accept-Language", "sv-SE,sv;q=0.8,en-US;q=0.5,en;q=0.3")
    dashboard_req.add_header("Accept", "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01")
    dashboard_req.add_header("X-Requested-With", "XMLHttpRequest")
    dashboard_req.add_header("Alt-Used", "teamer.net")
    dashboard_req.add_header("Upgrade-Insecure-Requests", "1")
    dashboard_req.add_header("Host", "teamer.net")

    dashboard_response = opener.open(dashboard_req)
    decompressed_dashboard_data = brotli.decompress(dashboard_response.read())
    dashboard_js = decompressed_dashboard_data.decode('utf-8')
    dashboard_html = dashboard_js.split('html("')[1].split('");')[0]
    dashboard_html = dashboard_html.replace("\\'", "'")
    dashboard_html = dashboard_html.replace('\\"', '"')
    ul_month_split = dashboard_html.split('<ul class="month">')[1]
    li_splits = ul_month_split.split('<li>')[1:]
    li_splits.reverse()

    return li_splits