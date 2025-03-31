# Portfolio 
Welcome to my portfolio! Here, you'll find a selection of coding projects that I have personally developed. 

While I've collaborated with UX designers or used existing APIs in some of these projects, all the code showcased here is solely my own work (with few exceptions). For more information and demonstrations, please visit the respective directories of each project.

# Projects

## [Nexus](https://github.com/wbigert/portfolio/tree/main/nexus) [Project for Studs 2023]
Skills: **React, TypeScript, CSS, HTML, Bootstrap**

The new Studs website as of 2023. As member of IT in KTH Studs 2023, I decided on creating a new website using modern libraries such as **React 18.2** and **Vite 4.0.1**.

## [KTH Volleyball Tryouts Assistance Tool](https://github.com/wbigert/portfolio/tree/main/kthvb-web) [Hobby Project for KTH Volleyball]
Skills: **Python, TypeScript, React, MongoDB, WebSocket, CSS, HTML, Bootstrap**

KTH Volleyball is the largest sports association of KTH and receives hundreds of applicants for their tryouts. Keeping track of every applicant's performance during tryouts and mentally associating their names and numbers with faces is incredibly difficult. To solve this problem, I developed a fullstack application that allows KTH Volleyball members to easily manage applicants and to identify them and give them feedback on their performance live as they play. The feedback is automatically compiled and available for captains and board members to review in order to make fair decisions about what applicants to proceed with every semester.

## [Team Metrics](https://github.com/wbigert/portfolio/tree/main/team-metrics) [Project for TellusTalk AB]
Skills: **Python, NumPy, Pandas, PIL, MatPlotLib, Seaborn, MongoDB, Discord.py**

A data collection tool with report generation and data visualization I built during my time at TellusTalk AB. Assists developers and interns working remotely by simplifying the session logging process.

## [Cooldown Companion](https://github.com/wbigert/portfolio/tree/main/cooldown-companion) [Hobby project]
Skills: **Python, BeautifulSoup, Google Cloud API, MongoDB, Discord.py**

Real-time verbal assistance in the game League of Legends using a Python Client and a Discord Bot. I built this for fun and as a way for me and my friends to improve our  performance while playing the game together. It can be used simultaneously by all players in your team, as long as you are in the same Discord Voice channel. It calculates exact cooldowns of summoner spells and ultimate abilities, taking into account things like ability levels, items, runes and masteries through web scraping and API calls.

## [Java Game Engine](https://github.com/wbigert/portfolio/tree/main/java-game-engine) [Hobby project]
Skills: **Java, Java Foundation Libraries (AWT and Swing)**

A 2D game engine that I built from scratch using core Java libraries during the summer of 2020 with the sole purpose of improving my Java skills.

## [KTH Volleyball Practice Helper](https://github.com/wbigert/portfolio/tree/main/kthvb-teamer) [Hobby Project for KTH Volleyball]
Skills: **Python, MongoDB**

KTH Volleyball is the largest sports association of KTH and uses Teamer for scheduling practices and taking attendance. However, Teamer has a flawed queue system that doesn't allow members to place themselves in the queue. Further, KTH Volleyball has a ball-duty system where 3 people attending needs to grab equipment from our storage and carry it back afterwards. To automate the system of scheduling ball-duty and to allow us to use a queue system that fits us, I developed an elaborate Python script that involves several modules.
- As Teamer events are scheduled and appear on the Teamer dashboard, the script registers this as it continuously scrapes the dashboard HTML, and adds the events to its own internal MongoDB database once detected.
- As Members accept and decline events, the script registers this via the dashboard HTML and keeps track of accepted/declined lists for each event in its own internal MongoDB database.
- The script keeps track of event titles, and listens for keywords in the title, such as <\#\_ball\_duty\_participants>BD and <max\_\#\_participants>PPL. So a regular practice with a maximum of 28 participants, and 3 ball duty participants would be registered on Teamer by an administrator with the name "Practice 28PPL 3BD" and the script would pick it up.
- As the event date nears, the script will identify the 3 members that have had the least amount of ball duties this season, and (painstakingly, due to CSRF-tokens for every mimicked Teamer request, and due to the absense of a documented API) create a new Teamer event, invite those people to the event, and notify them via email that they were invited.
- Further, if an event reaches its maximum acceptance count, and an additional members accepts the practice, they will be marked as declined by the script via request mimicry, and will have a Teamer Team Talk chat made for them that notifies them of how the queue system works.
- When a member among the accepted list declines the practice, the next person in queue will automatically be marked as accepted by the script via request mimicry, and will be notified again via a Teamer Team Talk.
