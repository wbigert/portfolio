import urllib.parse
from session import obtain_session
from handlers import populate_latest_actions, handle_schedule_event, handle_member_event_status, handle_update_event_states, obtain_activities_html
import time
from backend import get_all, insert_one
import sys
import asyncio
import logging
import traceback
import datetime
import pytz

def setup_logging(log_file_path):
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler(log_file_path, mode='a'),  # Append mode
            logging.StreamHandler(sys.stdout)  # Log to console
        ]
    )

async def run():
    queue_actions = await get_all('queue_actions')
    events = await get_all('events')
    users = await get_all('users')

    iter = 0
    while True:
        try:
            logging.info("Fetching session...")
            opener = obtain_session()

            logging.info("Session obtained, starting main loop...")

            while True:
                latest_actions = []
                activities_html = obtain_activities_html(opener)
                for li in activities_html:
                    latest_actions = populate_latest_actions(li, latest_actions)  # Populates the actions list with dictionaries containing information about the actions
                
                for idx, action in enumerate(latest_actions):
                    action_type = action['action_type']
                    if action_type == 'scheduled':
                        events, queue_actions = await handle_schedule_event(action, events, queue_actions, opener)
                    if action_type == 'accepted' or action_type == 'declined':
                        queue_actions = await handle_member_event_status(action, latest_actions, idx, events, queue_actions)
                
                new_events = []
                stockholm_tz = pytz.timezone('Europe/Stockholm')
                now = datetime.datetime.now(stockholm_tz)
                now_str = now.strftime("%Y-%m-%dT%H:%M:%S")

                for event in events:
                    if "event_date" not in event or event["event_date"] < now_str:
                        new_events.append(event)
                    else:
                        new_event, opener = await handle_update_event_states(opener, event, users, queue_actions)
                        new_events.append(new_event)
                
                events = new_events
                if iter % 1000 == 0:
                    logging.info(f"Finished Iteration {iter} - Sleeping for 5 seconds...")
                iter += 1

                # Sleep for 5 seconds between iterations
                await asyncio.sleep(5)
        
        except Exception as e:
            logging.exception("Error in main loop:")
            await asyncio.sleep(5)


async def monitored_run():
    while True:
        try:
            # Set a timeout of 60 seconds for the `run` function to prevent blocking
            await asyncio.wait_for(run(), timeout=60)
        except asyncio.TimeoutError:
            logging.warning("Main loop iteration timed out after 60 seconds, restarting the loop.")
        except Exception as e:
            logging.exception("Error in monitored_run loop, restarting:")
            await asyncio.sleep(5)

def main():
    log_file_path = 'logfile.txt'
    setup_logging(log_file_path)

    asyncio.run(monitored_run())

if __name__ == '__main__':
    main()