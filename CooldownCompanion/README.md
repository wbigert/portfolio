# Cooldown Companion
**Author: William Bigert**

**Skills: Python, BeautifulSoup, Google Cloud API, MongoDB, DigitalOcean (cloud hosting), Discord.py, various Riot Games APIs**

Real-time verbal assistance in the game League of Legends using a Python Client and a Discord Bot. It can be used simultaneously by all players in your team, as long as you are in the same Discord Voice channel.

## Illustration
![alt](https://github.com/wbigert/Portfolio/blob/main/CooldownCompanion/demo/illustration.png)

## How the Python Client works
### Initializing
1. The client will be run by one or more concurrent users.
2. Each client will automatically detect when the user enters a game of League of Legends by polling the Riot Games Live Client API.
3. Once connected, the client will initialize and obtain all relevant runes, champions, cooldowns and summoners spells. Some of this information is scraped from 3rd-party websites such as leagueoflegends.fandom.com and euw.op.gg. This is necessary as I don't have the required production API keys to obtain some of this information live, while other websites do.
### Usage
1. The user can activate hotkeys to track either the flash summoner spell or the ultimate ability of any opposing player. This is done by inserting a timer document into a MongoDB collection which contains the start time and the exact calculated duration of the ability type.
    - CTRL + SHIFT + 1/2/3/4/5 to time an opponent's Flash (numbers indicate original scoreboard order of enemy team)
    - CTRL + ALT + 1/2/3/4/5 to time an opponent's Ultimate Ability (numbers indicate original scoreboard order of enemy team)
    - CTRL + SHIFT + S to ping the Discord Bot (to check that it's working)
2. The client will also automatically detect if any opponent has purchased a Stopwatch or Zhonya's Hourglass and will indicate this by inserting a document which the Discord Bot will consume. The Discord Bot then warns the players verbally about this fact.
3. The client will automatically detect when a game is over, and will signal this to the Discord Bot so that it clears the existing timers.

## How the Discord Bot works
Personally, I host this Discord Bot on a DigitalOcean droplet running Ubuntu.

### Commands
Use the **join** command (no prefix) to make the Discord Bot join your voice channel.

Use the **leave** command (no prefix) to make the Discord Bot disconnect from its current voice channel.
### Client Feedback
1. The Discord Bot will poll the relevant MongoDB collection for timer documents.
2. If the timer document indicate that a timer is nearing its end, the Discord Bot will prepare a dynamic text meant to warn the users in the channel. The Discord Bot will then convert the text into speech using Google TTS API and play the resulting mp3 in its connected voice channel.
3. If the timer of the document has reached its end it is removed from the collection and the Discord Bot will verbally warn that the ability cooldown is now finished (Google TTS API).
4. Once a "clear all documents" instruction is received when a game has ended, the Discord Bot will clear the entire collection and wait for further instructions.

## Is it cheating?
Riot Games employees have previously made statements that as long as the timers are started as a consequense of manual action (such as activating a hotkey), it is not considered cheating. For example, you could start a timer on your phone by yourself and it wouldn't be cheating. However, if the client would automatically detect (with for example image recognition) when an opponent uses abilities and automatically start a timer, that would be considered cheating.

## Setup
You will have to host the Discord Bot yourself. Additionally, you will have to host a MongoDB database with a "league_tools" collection. You will also need your own Google Cloud API billing and enable the TTS service and obtain the client_service_key.json and place it in the "discord_bot" directory. Next, for each directory, change to .env files to your needs:
- CONNECTION_STRING (MongoDB connection string)
- DB_NAME (MongoDB database name)
- DISCORD_TOKEN (Your own Discord Bot token)
- GOOGLE_APPLICATION_CREDENTIALS (relative location of client_service_key.json)

Some dependencies that you need installed are:
1. ffmpeg (to change mp3 output volume, probably overkill, but that's what I used)
This can be installed easily using:
```
pip install ffmpeg-downloader
ffdl install --add-path
```
2. Various Python Libraries:
```
pip install discord
pip install pymongo
pip install google-api-python-client
pip install google-cloud-texttospeech
pip install pydub
pip install Pillow
pip install charset-normalizer
pip install charset
```
If the Bot fails to speak unexpectedly, you may have to run **pip install --upgrade --force-reinstall discord**

I hope this setup will work, but if things go wrong, I wish you the best of luck!

## Distribution
The client_compact directory contains all of the client files put into a single Client.py file. Once configured, I recommend you use:
```
pyinstaller -F -i python.ico Client.py --uac-admin
```
To create an executable that can be distributed to your Discord friends who want to use this tool alongside you.
