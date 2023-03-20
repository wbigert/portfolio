# Cooldown Companion
Real-time verbal assistance in the game League of Legends using a Python Client and a Discord Bot. It can be used simultaneously by all players in your team, as long as you are in the same Discord Voice channel.

## How the Python Client works
### Initializing
1. The client will be run by one or more concurrent users.
2. Each client will automatically detect when the user enters a game of League of Legends by polling the Riot Games Live Client API.
3. Once connected, the client will initialize and obtain all relevant runes, champions, cooldowns and summoners spells. Some of this information is scraped from 3rd-party websites such as leagueoflegends.fandom.com and euw.op.gg after obtaining the summoner names of the opposing players present in the game. This is necessary as I don't have the required production API keys to obtain this information live, while other websites do.
### Usage
1. The user can activate hotkeys to track either the flash summoner spell or the ultimate ability of any opposing player. This is done by inserting a timer document into a MongoDB collection which contains the start time and the exact calculated duration of the ability type.
2. The user will be present in a Discord channel where the accompanied Discord Bot is located and will receive real-time verbal feedback regarding the status of their timers.
3. The client will also automatically detect if any opponent has purchased a Stopwatch or Zhonya's Hourglass and will verbally warn the users about this fact.
4. The client will automatically detect when a game is over, and will signal this to the Discord Bot so that it clears the existing timers.

## How the Discord Bot works
### Client Feedback
1. The Discord Bot will poll the relevant MongoDB collection for timer documents.
2. If the timer document indicate that a timer is nearing its end, the Discord Bot will prepare a dynamic text meant to warn the users in the channel. The Discord Bot will then convert the text into speech using Google TTS API and play the resulting mp3 in its connected voice channel.
3. If the timer of the document has reached its end it is removed from the collection and the Discord Bot will verbally warn that the ability cooldown is now finished (Google TTS API).
4. Once a clear all document is received, the Discord Bot will clear the entire collection and wait for further instructions.
