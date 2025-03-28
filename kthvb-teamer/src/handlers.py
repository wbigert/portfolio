from backend import get_all, insert_one, delete_one
from notify_person import notify_person
from change_person_status import change_person_status

import urllib.request
import brotli
import pytz
from datetime import datetime
import logging
import time
import os
import dotenv
import gzip
import zlib
import brotli
import zstandard as zstd
dotenv.load_dotenv()

def get_decoded_response(response):
    encoding = response.info().get('Content-Encoding')
    response_read = response.read()
    if encoding == 'zstd':
        # Using a streaming decompression approach for Zstandard
        dctx = zstd.ZstdDecompressor()
        decompressed_dashboard_data = dctx.stream_reader(response_read)
        decompressed_data = decompressed_dashboard_data.read()
        decompressed_dashboard_data = decompressed_data
    elif encoding == 'br':
        decompressed_dashboard_data = brotli.decompress(response_read)
    elif encoding == 'gzip':
        decompressed_dashboard_data = gzip.decompress(response_read)
    elif encoding == 'deflate':
        decompressed_dashboard_data = zlib.decompress(response_read)
    else:
        # If no encoding, data is plain text
        decompressed_dashboard_data = response_read
    return decompressed_dashboard_data

def get_action_type(li):
  if 'accepted' in li.lower():
      action_type = 'accepted'
  elif 'declined' in li.lower():
      action_type = 'declined'
  elif 'scheduled' in li.lower():
      action_type = 'scheduled'
  elif 'teamtalk' in li.lower():
      action_type = 'teamtalk'
  elif 'notifications' in li.lower():
      action_type = 'notifications'
  elif 'commented' in li.lower():
      action_type = 'commented'
  elif 'updated the event' in li.lower():
      action_type = 'updated Event'
  else:
      action_type = 'unknown'

  return action_type

def convert_teamer_string_to_date_string(date_str):
    # Define the input format
    input_format = "%a, %d %b, %Y @ %I:%M%p"
    # Parse the input date string
    parsed_date = datetime.strptime(date_str, input_format)
    # Convert to ISO 8601 format
    iso_format_date = parsed_date.isoformat()
    return iso_format_date

def convert_string_to_date(date_str):
    # Convert ISO 8601 formatted string to datetime object
    parsed_date = datetime.fromisoformat(date_str)
    return parsed_date

def obtain_event_date(event_id, opener):
    team_name = os.environ['TEAM_NAME']
    event_notificiations_url = f"https://teamer.net/teams/{team_name}/events/{event_id}"
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
    decompressed_data = get_decoded_response(event_notificiations_response)
    html_content = decompressed_data.decode('utf-8')
    html_content = html_content.replace("\\'", "'")
    html_content = html_content.replace('\\"', '"')
    date = html_content.split('<td style="text-transformation: capitalize;">')[1].split('</td>')[0]
    print(f"Event date PRE: {date}")
    date = convert_teamer_string_to_date_string(date)
    print(f"Event date: {date}")
    return date

def populate_latest_actions(li, actions):
    action_type = get_action_type(li)
    if action_type == 'unknown':
        return actions
    team_name = os.environ['TEAM_NAME']
    if f'/teams/{team_name}/members/' not in li:
        return actions
    member_id = li.split(f'/teams/{team_name}/members/')[1][:8]
    member_name_temp = li.split(f'?m={member_id}">')[1]
    member_name = member_name_temp.split('<\/a>')[0]
    if action_type in ['accepted', 'declined', 'scheduled', 'notifications']:
        event_id = li.split('/events/')[1][:8]
        event_name = li.split('/events/')[1][35:].split('<\/a>')[0]
    else: 
        event_id = 'None'
        event_name = 'None'
    actions.append({'member_id': member_id, 'member_name': member_name, 'event_id': event_id, 'event_name': event_name, 'action_type': action_type})
    return actions

async def handle_schedule_event(action, events, queue_actions, opener):
    if action['event_id'] not in [event['event_id'] for event in events] and 'ball duty' not in action['event_name'].lower():
        event_date = obtain_event_date(action['event_id'], opener)
        max_participants = -1 if 'pp' not in action['event_name'].lower() else int(action['event_name'].lower().split('pp')[0].strip().split(' ')[-1])
        ball_duty = 'pending' if 'bd' in action['event_name'].lower() else 'disabled'
        bd_split = action['event_name'].lower().split('bd')[0].strip().split(' ') if 'bd' in action['event_name'].lower() else []
        if len(bd_split) <= 1:
            ball_duty = 'failed'
            ball_duty_count = 0
        else:
            ball_duty_count = int(bd_split[-1]) if 'bd' in action['event_name'].lower() else 0
        new_event = {'event_id': action['event_id'], 'event_name': action['event_name'], 'max_participants': max_participants, 'ball_duty': ball_duty, 'ball_duty_count': ball_duty_count, 'event_date': event_date, 'accepted': [], 'queue': []}
        logging.info(f"New event scheduled: {new_event}")
        await insert_one(new_event, 'events')
        queue_actions.append(action)
        events.append(new_event)
    return events, queue_actions

async def handle_member_event_status(action, actions, action_idx, events, queue_actions):
    action_is_obsolete = False
    member_id, member_name, event_id, event_name, action_type = action['member_id'], action['member_name'], action['event_id'], action['event_name'], action['action_type']
    if action_idx == len(actions)-1:
        action_is_obsolete = False
    else:
        for more_recent_action in actions[action_idx+1:]:
            if more_recent_action['action_type'] in ['accepted', 'declined'] and more_recent_action['member_id'] == member_id and more_recent_action['event_id'] == event_id:
                action_is_obsolete = True
                break
    
    if action_is_obsolete:
        return queue_actions
    
    reversed_queue = queue_actions[::-1]

    same_action = False
    for idx, queued_action in enumerate(reversed_queue):
        if queued_action['member_id'] == member_id and queued_action['event_id'] == event_id:
            if queued_action['action_type'] == action_type:
                same_action = True
                break
            elif (action_type == 'accepted' and queued_action['action_type'] == 'declined') or (action_type == 'declined' and queued_action['action_type'] == 'accepted'):
                same_action = False
                break

    if not same_action:
        new_action = {'member_id': member_id, 'member_name': member_name, 'event_id': event_id, 'event_name': event_name, 'action_type': action_type}
        
        if any([queued_action['member_id'] == member_id and queued_action['event_id'] == event_id for queued_action in queue_actions]):
            await delete_one({'member_id': member_id, 'event_id': event_id}, 'queue_actions')
            new_queue_actions = []
            for queued_action in queue_actions:
                if queued_action['member_id'] == member_id and queued_action['event_id'] == event_id:
                    continue
                new_queue_actions.append(queued_action)
        else:
            new_queue_actions = queue_actions
        await insert_one(new_action, 'queue_actions')
        new_queue_actions.append(new_action)
        queue_actions = new_queue_actions
    return queue_actions


def difference_in_seconds(date_str):
    # Convert the date string to a datetime object
    date_time_obj = convert_string_to_date(date_str)
    
    # Get the timezone for Stockholm
    stockholm_tz = pytz.timezone('Europe/Stockholm')
    
    # Ensure date_time_obj is aware by assigning the same timezone as current_time
    if date_time_obj.tzinfo is None:
        date_time_obj = stockholm_tz.localize(date_time_obj)
    else:
        date_time_obj = date_time_obj.astimezone(stockholm_tz)
    
    # Get the current time in Stockholm timezone
    current_time = datetime.now(stockholm_tz)
    
    # Calculate the difference in seconds
    time_difference = (date_time_obj - current_time).total_seconds()
    
    return time_difference

def invite_members_to_ball_duty(ball_duty_event_id, event_date, opener, members):
    string_obj = convert_string_to_date(event_date)
    date_year = string_obj.year
    date_month = f"{string_obj.month:02}"
    date_day = f"{string_obj.day:02}"
    team_name = os.environ['TEAM_NAME']
    notifications_url = f"https://teamer.net/teams/{team_name}/events/{ball_duty_event_id}/notifications"
    notifications_req = urllib.request.Request(notifications_url)
    notifications_req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0")
    notifications_req.add_header("Connection", "keep-alive")
    notifications_req.add_header("Upgrade-Insecure-Requests", "1")
    notifications_req.add_header("Host", "teamer.net")
    notifications_req.add_header("Accept-Encoding", "gzip, deflate, br, zstd")
    notifications_req.add_header("Accept-Language", "sv-SE,sv;q=0.8,en-US;q=0.5,en;q=0.3")
    notifications_req.add_header("Referer", f"https://teamer.net/teams/{team_name}/events")
    notifications_req.add_header("Alt-Used", "teamer.net")
    notifications_req.add_header("Priority", "u=1")
    notifications_req.add_header("Sec-Fetch-Dest", "document")
    notifications_req.add_header("Sec-Fetch-Mode", "navigate")
    notifications_req.add_header("Sec-Fetch-Site", "same-origin")
    notifications_req.add_header("Sec-Fetch-User", "?1")
    notifications_req.add_header("Upgrade-Insecure-Requests", "1")
    notifications_req.add_header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8")

    notifications_response = opener.open(notifications_req)
    br_response = get_decoded_response(notifications_response)
    html_content = br_response.decode('utf-8')
    html_content = html_content.replace("\\'", "'")
    html_content = html_content.replace('\\"', '"')

    authenticity_token = html_content.split('<meta name="csrf-token" content="')[1].split('" />')[0]

    current_time = datetime.now(pytz.timezone('Europe/Stockholm'))
    current_timestamp_ms = int(current_time.timestamp() * 1000)
    logging.info(f"Refresh event ball_duty_event_id: {ball_duty_event_id}")
    refresh_url = f'https://teamer.net/teams/{team_name}/events/{ball_duty_event_id}/notifications/refresh_squad?group_id=3&_={current_timestamp_ms}'
    refresh_req = urllib.request.Request(refresh_url)
    refresh_req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0")
    refresh_req.add_header("Connection", "keep-alive")
    refresh_req.add_header("Upgrade-Insecure-Requests", "1")
    refresh_req.add_header("Host", "teamer.net")
    refresh_req.add_header("Accept-Encoding", "gzip, deflate, br, zstd")
    refresh_req.add_header("Accept-Language", "sv-SE,sv;q=0.8,en-US;q=0.5,en;q=0.3")
    refresh_req.add_header("Referer", f"https://teamer.net/teams/{team_name}/events/{ball_duty_event_id}")
    refresh_req.add_header("Alt-Used", "teamer.net")
    refresh_req.add_header("Priority", "u=1")
    refresh_req.add_header("Sec-Fetch-Dest", "document")
    refresh_req.add_header("Sec-Fetch-Mode", "navigate")
    refresh_req.add_header("Sec-Fetch-Site", "same-origin")
    refresh_req.add_header("Sec-Fetch-User", "?1")
    refresh_req.add_header("Upgrade-Insecure-Requests", "1")
    refresh_req.add_header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8")
    refresh_req.add_header("X-CSRF-Token", authenticity_token)
    refresh_req.add_header("X-Requested-With", "XMLHttpRequest")
    retries = 0
    logging.info(f"Searching for members: {members}")
    while True:
        if retries > 10:
            print("Raise exception")
            raise Exception("Members not found in the list")
        try:
            refresh_response = opener.open(refresh_req)
        except Exception as e:
            logging.info(f"Error: {e}")
            time.sleep(2)
            retries += 1
            continue
        try:
          decompressed_data = get_decoded_response(refresh_response)

          dashboard_js = decompressed_data.decode('utf-8')
          dashboard_html = dashboard_js.split('.html("  ')[1].split('")')[0]
          dashboard_html = dashboard_html.replace("\\'", "'")
          dashboard_html = dashboard_html.replace('\\"', '"')
          tr_splits = dashboard_html.split('<tr id=\"notification_')[1:]
          logging.info(f"Lenght of tr_splits: {len(tr_splits)}")
          member_id_to_notification_id = {}
          for idx, li in enumerate(tr_splits):
              for selected_user in members:
                  if selected_user['member_name'] in li:
                      notification_id = li.split("_table_row")[0]
                      member_id_to_notification_id[selected_user['member_id']] = notification_id
                      print(f"Found member id: {selected_user['member_id']}")
                      logging.info(f"Found member id: {selected_user['member_id']}")
          if not len(member_id_to_notification_id.keys()) == len(members):
              logging.info("All member ids were not found, retrying...")
              # Members names not found:
              member_names_not_found = [member['member_name'] for member in members if member['member_id'] not in member_id_to_notification_id.keys()]
              logging.info(f"Members not found: {member_names_not_found}")
              time.sleep(2)
              retries += 1
              continue
          else:
              break
        except Exception as e:
            logging.info(f"Error: {e}")
            time.sleep(2)
            retries += 1
            continue
    logging.info(f"Notification IDS: {member_id_to_notification_id}")
    for member_id, notification_id in member_id_to_notification_id.items():
        # PUT REQUEST TO CHANGE STATUS, no postdata needed
        url = f"https://teamer.net/teams/{team_name}/events/{ball_duty_event_id}/notifications/{notification_id}/move?to=team"
        put_req = urllib.request.Request(url, method='PUT')
        put_req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0")
        put_req.add_header("Connection", "keep-alive")
        put_req.add_header("Content-Length", "0")
        put_req.add_header("Upgrade-Insecure-Requests", "1")
        put_req.add_header("Host", "teamer.net")
        put_req.add_header("Accept-Encoding", "gzip, deflate, br, zstd")
        put_req.add_header("Accept-Language", "sv-SE,sv;q=0.8,en-US;q=0.5,en;q=0.3")
        put_req.add_header("Referer", f"https://teamer.net/teams/{team_name}/events/{ball_duty_event_id}")
        put_req.add_header("Pragma", "no-cache")
        put_req.add_header("Origin", "https://teamer.net")
        put_req.add_header("Priority", "u=4")
        put_req.add_header("Sec-Fetch-Dest", "empty")
        put_req.add_header("Sec-Fetch-Mode", "cors")
        put_req.add_header("Sec-Fetch-Site", "same-origin")
        put_req.add_header("Accept", "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01")
        put_req.add_header("X-CSRF-Token", authenticity_token)
        put_req.add_header("X-Requested-With", "XMLHttpRequest")
        put_response = opener.open(put_req)
    
    # Send all PUT requests
    try:
        url = f"https://teamer.net/teams/{team_name}/events/{ball_duty_event_id}/notifications/send_all"
        put_data = f"utf8=%E2%9C%93&_method=put&event%5Bevent_notification_reminder%5D%5Bhours_interval%5D=24&event%5Bevent_notification_reminder%5D%5Bend_date%5D={date_day}%2F{date_month}%2F{date_year}&event%5Bevent_notification_reminder%5D%5Bresend_notifications%5D=false"
        put_req = urllib.request.Request(url, data=put_data.encode('utf-8'), method='PUT')
        put_req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0")
        put_req.add_header("Connection", "keep-alive")
        put_req.add_header("Content-Length", str(len(put_data)))
        put_req.add_header("Content-Type", "application/x-www-form-urlencoded")
        put_req.add_header("Upgrade-Insecure-Requests", "1")
        put_req.add_header("Host", "teamer.net")
        put_req.add_header("Accept-Encoding", "gzip, deflate, br, zstd")
        put_req.add_header("Accept-Language", "sv-SE,sv;q=0.8,en-US;q=0.5,en;q=0.3")
        put_req.add_header("Referer", f"https://teamer.net/teams/{team_name}/events/{ball_duty_event_id}")
        put_req.add_header("Pragma", "no-cache")
        put_req.add_header("Origin", "https://teamer.net")
        put_req.add_header("Priority", "u=4")
        put_req.add_header("Sec-Fetch-Dest", "empty")
        put_req.add_header("Sec-Fetch-Mode", "cors")
        put_req.add_header("Sec-Fetch-Site", "same-origin")
        put_req.add_header("Accept", "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01")
        put_req.add_header("X-CSRF-Token", authenticity_token)
        put_req.add_header("X-Requested-With", "XMLHttpRequest")
        put_response = opener.open(put_req)
        print(f"Sent all notifications")
    except Exception as e:
        print(f"Couldn't send all notifications, sending individually...")
        for member_id, notification_id in member_id_to_notification_id.items():
            # PUT REQUEST TO CHANGE NO POSTDATA NEEDED
            url = f"https://teamer.net/teams/{team_name}/events/{ball_duty_event_id}/notifications/{notification_id}/send_now"
            put_req = urllib.request.Request(url, method='PUT')
            put_req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0")
            put_req.add_header("Connection", "keep-alive")
            put_req.add_header("Content-Length", "0")
            put_req.add_header("Upgrade-Insecure-Requests", "1")
            put_req.add_header("Host", "teamer.net")
            put_req.add_header("Accept-Encoding", "gzip, deflate, br, zstd")
            put_req.add_header("Accept-Language", "sv-SE,sv;q=0.8,en-US;q=0.5,en;q=0.3")
            put_req.add_header("Referer", f"https://teamer.net/teams/{team_name}/events/{ball_duty_event_id}/notifications")
            put_req.add_header("Origin", "https://teamer.net")
            put_req.add_header("Priority", "u=1")
            put_req.add_header("Sec-Fetch-Dest", "empty")
            put_req.add_header("Sec-Fetch-Mode", "cors")
            put_req.add_header("Sec-Fetch-Site", "same-origin")
            put_req.add_header("Accept", "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01")
            put_req.add_header("X-CSRF-Token", authenticity_token)
            put_req.add_header("X-Requested-With", "XMLHttpRequest")
            put_response = opener.open(put_req)
            print(f"Sent notification to member {member_id}")
    return opener

def create_ball_duty_event(event_date, opener, selected_users):
    team_name = os.environ['TEAM_NAME']
    events_url = f"https://teamer.net/teams/{team_name}/events"
    events_req = urllib.request.Request(events_url)
    events_req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0")
    events_req.add_header("Connection", "keep-alive")
    events_req.add_header("Upgrade-Insecure-Requests", "1")
    events_req.add_header("Host", "teamer.net")
    events_req.add_header("Accept-Encoding", "gzip, deflate, br, zstd")
    events_req.add_header("Accept-Language", "sv-SE,sv;q=0.8,en-US;q=0.5,en;q=0.3")
    events_req.add_header("Referer", f"https://teamer.net/teams/{team_name}/events")
    events_req.add_header("Alt-Used", "teamer.net")
    events_req.add_header("Priority", "u=1")
    events_req.add_header("Sec-Fetch-Dest", "document")
    events_req.add_header("Sec-Fetch-Mode", "navigate")
    events_req.add_header("Sec-Fetch-Site", "same-origin")
    events_req.add_header("Sec-Fetch-User", "?1")
    events_req.add_header("Upgrade-Insecure-Requests", "1")
    events_req.add_header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8")

    events_response = opener.open(events_req)
    decompressed_data = get_decoded_response(events_response)
    html_content = decompressed_data.decode('utf-8')
    print(html_content.split('<meta name="csrf-token" content="')[1][:100])
    authenticity_token = html_content.split('<meta name="csrf-token" content="')[1].split('" />')[0]
    print(f"Authenticity token: {authenticity_token}")
    encoded_authenticity_token = urllib.parse.quote(authenticity_token, safe='/')
    print(f"Encoded authenticity token: {encoded_authenticity_token}")
    string_obj = convert_string_to_date(event_date)
    date_year = string_obj.year
    date_month = f"{string_obj.month:02}"
    date_day = f"{string_obj.day:02}"
    date_hour = f"{string_obj.hour:02}"
    date_minute = f"{string_obj.minute:02}"
    date_second = f"{string_obj.second:02}"
    # populate 2024-06-10+03%3A00%3A00
    starts_at = f"{date_year}-{date_month}-{date_day}+{date_hour}%3A{date_minute}%3A{date_second}"
    print(f"Starts at: {starts_at}")
    date_picker_event_date = f"{date_day}%2F{date_month}%2F{date_year}+{date_hour}%3A{date_minute}"
    print(f"Date picker event date: {date_picker_event_date}")
    create_event_url = f"https://teamer.net/teams/{team_name}/events"
    team_name_raw = os.environ['TEAM_NAME_RAW']
    team_name_string = team_name_raw.replace(' ', '+')
    postdata_url = f"utf8=%E2%9C%93&authenticity_token={encoded_authenticity_token}&event%5Bteam_name%5D={team_name_string}&event%5Bevent_type%5D=Other&event%5Bstarts_at%5D={starts_at}&datepicker_event_date={date_picker_event_date}&event%5Brecurring_count%5D=0&event%5Bvenue%5D=Ball+Duty&event%5Battendance_limit%5D=&event%5Bother_type%5D=Ball+Duty&event%5Bopponent%5D=&event%5Bhas_meetup%5D=0&event%5Bmeets_at%5D=13%3A00&event%5Bmeet_location%5D=&event%5Bpoll_disabled%5D=0&event%5Bpoll_disabled%5D=1&event%5Bopponent_email%5D=&event%5Bopponent_phone%5D=&event%5Baddress%5D=Ball+Duty&event%5Blat%5D=&event%5Blng%5D=&event%5Bplace_id%5D=&event%5Bgame_description%5D=&event%5Bnon_game_description%5D=&event%5Bboolean_reminder_email_cancellation_at%5D=0"

    postdata = postdata_url.encode('utf-8')
    post_req = urllib.request.Request(create_event_url, data=postdata, method='POST')
    post_req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0")
    post_req.add_header("Connection", "keep-alive")
    post_req.add_header("Content-Length", str(len(postdata)))
    post_req.add_header("Upgrade-Insecure-Requests", "1")
    post_req.add_header("Host", "teamer.net")
    post_req.add_header("Accept-Encoding", "gzip, deflate, br, zstd")
    post_req.add_header("Accept-Language", "sv-SE,sv;q=0.8,en-US;q=0.5,en;q=0.3")
    post_req.add_header("Referer", events_url)
    post_req.add_header("Alt-Used", "teamer.net")
    post_req.add_header("Priority", "u=1")
    post_req.add_header("Sec-Fetch-Dest", "document")
    post_req.add_header("Sec-Fetch-Mode", "navigate")
    post_req.add_header("Sec-Fetch-Site", "same-origin")
    post_req.add_header("Sec-Fetch-User", "?1")
    post_req.add_header("Upgrade-Insecure-Requests", "1")
    post_req.add_header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8")
    post_req.add_header("Content-Type", "application/x-www-form-urlencoded")
    post_req.add_header("Origin", "https://teamer.net")
    post_req.add_header("X-CSRF-Token", authenticity_token)
    post_req.add_header("X-Requested-With", "XMLHttpRequest")

    post_response = opener.open(post_req)
    
    activities_html = obtain_activities_html(opener)
    # Save to file
    latest_actions = []
    for li in activities_html:
      latest_actions = populate_latest_actions(li, latest_actions)  # Populates the actions list with dictionaries containing information about the actions
    new_event_id = None
    latest_actions = latest_actions[::-1] # Reverse the list to get the latest actions first
    for idx, action in enumerate(latest_actions):
        action_type = action['action_type']
        if action_type == 'scheduled':
          new_event_id = action['event_id']
          break
    opener = invite_members_to_ball_duty(new_event_id, event_date, opener, selected_users)
    print(f"New event id: {new_event_id}")
    logging.info(f"New event id: {new_event_id}")
    return new_event_id, opener

def get_players(opener):
    current_time = datetime.now(pytz.timezone('Europe/Stockholm'))
    current_timestamp_ms = int(current_time.timestamp() * 1000)
    team_name = os.environ['TEAM_NAME']

    url = f"https://teamer.net/teams/{team_name}/members"
    req = urllib.request.Request(url)
    req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0")
    req.add_header("Connection", "keep-alive")
    req.add_header("Upgrade-Insecure-Requests", "1")
    req.add_header("Host", "teamer.net")
    req.add_header("Accept-Encoding", "gzip, deflate, br, zstd")
    req.add_header("Accept-Language", "sv-SE,sv;q=0.8,en-US;q=0.5,en;q=0.3")
    req.add_header("Referer", f"https://teamer.net/teams/{team_name}")
    req.add_header("Alt-Used", "teamer.net")
    req.add_header("Priority", "u=1")
    req.add_header("Sec-Fetch-Dest", "document")
    req.add_header("Sec-Fetch-Mode", "navigate")
    req.add_header("Sec-Fetch-Site", "same-origin")
    req.add_header("Sec-Fetch-User", "?1")
    req.add_header("Upgrade-Insecure-Requests", "1")
    req.add_header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8")

    response = opener.open(req)
    decompressed_data = get_decoded_response(response)
    
    html_content = decompressed_data.decode('utf-8')
    html_content = html_content.replace("\\'", "'")
    html_content = html_content.replace('\\"', '"')

    csrf_token = html_content.split('name="csrf-token" content="')[1].split('" />')[0]

    url = f'https://teamer.net/teams/{team_name}/groups/3/members?_={current_timestamp_ms}'
    req = urllib.request.Request(url)
    req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0")
    req.add_header("Connection", "keep-alive")
    req.add_header("Upgrade-Insecure-Requests", "1")
    req.add_header("Host", "teamer.net")
    req.add_header("Accept-Encoding", "gzip, deflate, br, zstd")
    req.add_header("Accept-Language", "sv-SE,sv;q=0.8,en-US;q=0.5,en;q=0.3")
    req.add_header("Referer", f"https://teamer.net/teams/{team_name}/groups/3")
    req.add_header("Alt-Used", "teamer.net")
    req.add_header("Priority", "u=1")
    req.add_header("Sec-Fetch-Dest", "document")
    req.add_header("Sec-Fetch-Mode", "navigate")
    req.add_header("Sec-Fetch-Site", "same-origin")
    req.add_header("Sec-Fetch-User", "?1")
    req.add_header("Upgrade-Insecure-Requests", "1")
    req.add_header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8")
    req.add_header("X-CSRF-Token", csrf_token)
    req.add_header("X-Requested-With", "XMLHttpRequest")

    response = opener.open(req)
    decompressed_data = get_decoded_response(response)
    html_content = decompressed_data.decode('utf-8')
    html_content = html_content.replace("\\'", "'")
    html_content = html_content.replace('\\"', '"')

    # Split on /teams/111822505-kth-volleyball/members/33186677\' and extract the member_id 33186677 for example
    member_ids = html_content.split(f'/teams/{team_name}/members/')[1:]
    member_ids = [member_id.split("'")[0] for member_id in member_ids]
    for idx in range(len(member_ids)):
        member_id = member_ids[idx]
        if '">' in member_id:
            member_ids[idx] = member_id.split('">')[0]
    print(f"Member ids: {member_ids}")
    logging.info(f"Member ids: {member_ids}")
    return member_ids

async def check_ball_duty(opener, event, users):
    if event['ball_duty'] == 'pending':
        time_to_event = difference_in_seconds(event['event_date'])
        if time_to_event < 0:
            event['ball_duty'] = 'failed'
            await delete_one({ 'event_id': event['event_id'] }, 'events')
            await insert_one(event, 'events')
            return opener
        # 5 hours before the event
        if time_to_event < 18000:
            # Get all registered players that are not external users
            player_ids = get_players(opener)
            for user in event['accepted']:
                print(f"user member_id: {user['member_id']}")
                if user['member_id'] not in [user['member_id'] for user in users] and user['member_id'] in player_ids:
                    print(f"Adding user: {user} because they are not in the users list: {users}")
                    new_user = { 'member_id': user['member_id'], 'member_name': user['member_name'], 'ball_duty_count': 0 }
                    await insert_one(new_user, 'users')
                    print(f"New user: {new_user}")
                    logging.info(f"New user: {new_user}")
                    users.append(new_user)
            ball_duty_count = event['ball_duty_count']
            # Select <ball_duty_count> users with the least amount of ball duties among the accepted users
            accepted_ids = [user['member_id'] for user in event['accepted']]
            accepted_players = [user for user in users if user['member_id'] in player_ids and user['member_id'] in accepted_ids]
            
            sorted_accepted_users = sorted(accepted_players, key=lambda x: x['ball_duty_count'])
            if len(sorted_accepted_users) < ball_duty_count:
                event['ball_duty'] = 'failed'
                await delete_one({ 'event_id': event['event_id'] }, 'events')
                await insert_one(event, 'events')
                return opener
                
            selected_users = sorted_accepted_users[:ball_duty_count]
            print(f"Old event id: {event['event_id']}")
            new_event_id, opener = create_ball_duty_event(event['event_date'], opener, selected_users)
            for user in selected_users:
                
                user['ball_duty_count'] += 1
                new_user = { 'member_id': user['member_id'], 'member_name': user['member_name'], 'ball_duty_count': user['ball_duty_count'] }
                await delete_one({ 'member_id': user['member_id'] }, 'users')
                await insert_one(new_user, 'users')
                print(f"Updated user: {new_user}")
                logging.info(f"Updated user: {new_user}")

            print(f"Event {event['event_name']} is in 5 hours, setting ball_duty to 'selected'")
            logging.info(f"Event {event['event_name']} is in 5 hours, setting ball_duty to 'selected'")
            event['ball_duty'] = 'selected'
            event['ball_duty_event_id'] = new_event_id
            event['ball_duty_selected_users'] = selected_users
            event['ball_duty_queue'] = sorted_accepted_users[ball_duty_count:]
            await delete_one({ 'event_id': event['event_id'] }, 'events')
            await insert_one(event, 'events')
            print(f"New event: {event}")
            logging.info(f"New event: {event}")

    return opener
    

async def handle_update_event_states(opener, event, users, queue_actions):
    
    accepted = event['accepted']
    queue = event['queue']
    max_participants = event['max_participants']
    requires_update = False
    members_added_to_ball_duty = []
    members_added_to_queue = []
    members_removed_from_queue = []
    members_got_spot = []
    for action in queue_actions:
        if 'ball_duty_event_id' in event and action['event_id'] == event['ball_duty_event_id']:
            if action['action_type'] == 'declined':
                if action['member_id'] in [member['member_id'] for member in event['ball_duty_selected_users']]:
                    # Find and remove the member from ball_duty_selected_users
                    for member in event['ball_duty_selected_users']:
                        if member['member_id'] == action['member_id']:
                            event['ball_duty_selected_users'].remove(member)
                            logging.info(f"Removed member: {member}")
                            print(f"Removed member: {member}")
                            break
                    else:
                        logging.error(f"Member with ID {action['member_id']} not found in ball duty selected users.")
                    # reduce ball duty count for user
                    user = [user for user in users if user['member_id'] == action['member_id']][0]
                    user['ball_duty_count'] -= 1
                    print(f"New user ball duty count: {user['ball_duty_count']}")
                    logging.info(f"New user ball duty count: {user['ball_duty_count']}")
                    await delete_one({ 'member_id': user['member_id'] }, 'users')
                    await insert_one(user, 'users')
                    
                    # pop queue
                    if len(event['ball_duty_queue']) > 0:
                        event['ball_duty_selected_users'].append(event['ball_duty_queue'].pop(0))
                        print(f"Adding {event['ball_duty_selected_users'][-1]['member_name']} to ball duty")
                        logging.info(f"Adding {event['ball_duty_selected_users'][-1]['member_name']} to ball duty")
                        # increase ball duty count for user
                        user = [user for user in users if user['member_id'] == event['ball_duty_selected_users'][-1]['member_id']][0]
                        user['ball_duty_count'] += 1
                        print(f"New user ball duty count: {user['ball_duty_count']}")
                        logging.info(f"New user ball duty count: {user['ball_duty_count']}")
                        await delete_one({ 'member_id': user['member_id'] }, 'users')
                        await insert_one(user, 'users')
                        members_added_to_ball_duty.append({ 'member_id': user['member_id'], 'member_name': user['member_name'], 'event_id': event['event_id'], 'event_name': event['event_name'] })
                    else:
                        event['ball_duty'] = 'failed'
                        print(f"Event {event['event_name']} failed ball duty")
                        logging.info(f"Event {event['event_name']} failed ball duty")
                    requires_update = True
        elif action['event_id'] == event['event_id']:
            if action['action_type'] == 'accepted' and action['member_id'] not in [member['member_id'] for member in accepted]:
                print(f"Someone accepted the event {event['event_name']}! Max participants: {max_participants}, Current participants: {len(accepted)}")
                logging.info(f"Someone accepted the event {event['event_name']}! Max participants: {max_participants}, Current participants: {len(accepted)}")
                if len(accepted) < max_participants or max_participants == -1:
                    print(f"Adding {action['member_name']} to accepted list")
                    accepted.append({ 'member_id': action['member_id'], 'member_name': action['member_name'], 'event_id': action['event_id'], 'event_name': action['event_name'] })
                    requires_update = True
                else:
                    if action['member_id'] not in [member['member_id'] for member in queue]:
                        queue.append({ 'member_id': action['member_id'], 'member_name': action['member_name'], 'event_id': action['event_id'], 'event_name': action['event_name'] })
                        members_added_to_queue.append({ 'member_id': action['member_id'], 'member_name': action['member_name'], 'event_id': action['event_id'], 'event_name': action['event_name'] })
                        requires_update = True
                    else:
                        try: 
                          queue.remove({ 'member_id': action['member_id'], 'member_name': action['member_name'], 'event_id': action['event_id'], 'event_name': action['event_name'] })
                          members_removed_from_queue.append({ 'member_id': action['member_id'], 'member_name': action['member_name'], 'event_id': action['event_id'], 'event_name': action['event_name'] })
                          requires_update = True
                        except:
                          print(f"Error removing {action['member_name']} from queue")
                          logging.info(f"Error removing {action['member_name']} from queue")
                            
            elif action['action_type'] == 'declined':
                if action['member_id'] in [member['member_id'] for member in accepted]:
                    try:
                      accepted.remove({ 'member_id': action['member_id'], 'member_name': action['member_name'], 'event_id': action['event_id'], 'event_name': action['event_name'] })
                      if len(queue) > 0:
                          accepted_member = queue.pop(0)
                          accepted.append(accepted_member)
                          members_got_spot.append(accepted_member)
                      requires_update = True
                    except:
                      print(f"Error removing {action['member_name']} from accepted")
                      logging.info(f"Error removing {action['member_name']} from accepted")

    if requires_update:
        new_event = event
        new_event.update({ 'accepted': accepted, 'queue': queue })
        print(f"Updating event to {new_event}")
        logging.info(f"Updating event to {new_event}")
        await delete_one({ 'event_id': event['event_id'] }, 'events')
        await insert_one(new_event, 'events')
        for member in members_added_to_queue:
            opener = notify_person(opener, member['member_id'], member['member_name'], member['event_name'], 'queue', queue.index(member) + 1)
            opener = change_person_status(opener, member['member_name'], member['event_id'], 'decline')
        for member in members_removed_from_queue:
            opener = notify_person(opener, member['member_id'], member['member_name'], member['event_name'], 'remove')
            opener = change_person_status(opener, member['member_name'], member['event_id'], 'decline')
        for member in members_got_spot:
            opener = notify_person(opener, member['member_id'], member['member_name'], member['event_name'], 'spot')
            opener = change_person_status(opener, member['member_name'], member['event_id'], 'accept')
        for member in members_added_to_ball_duty:
            opener = invite_members_to_ball_duty(event['ball_duty_event_id'], event['event_date'], opener, [member])
        return new_event, opener
    
    if 'ball_duty' in event:
        opener = await check_ball_duty(opener, event, users)
    return event, opener

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

    response = opener.open(dashboard_req)
    decompressed_dashboard_data = get_decoded_response(response)
    dashboard_js = decompressed_dashboard_data.decode('utf-8')
    dashboard_html = dashboard_js.split('html("')[1].split('");')[0]
    dashboard_html = dashboard_html.replace("\\'", "'")
    dashboard_html = dashboard_html.replace('\\"', '"')
    ul_month_split = dashboard_html.split('<ul class="month">')
    if len(ul_month_split) < 2:
        return []
    ul_month_split = ul_month_split[1]
    li_splits = ul_month_split.split('<li>')[1:]
    li_splits.reverse()

    return li_splits