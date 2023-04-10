# Team Metrics
Author: **William Bigert**

Skills: **Python, NumPy, Pandas, PIL, MatPlotLib, Seaborn, MongoDB, Discord.py**
 
A data collection tool with report generation and data visualization I built during my time at TellusTalk AB. Assists developers and interns working remotely by simplifying the session logging process.
 
## Demo: Data visualization
![alt text](https://github.com/wbigert/portfolio/blob/main/team-metrics/demo/demoGraphs.jpg)
 
## Demo: Report
![alt text]( https://github.com/wbigert/portfolio/blob/main/team-metrics/demo/demoReport.png)

## Demo: Session logging assistance
![alt text]( https://github.com/wbigert/portfolio/blob/main/team-metrics/demo/demoAssistant.png)
 
## Data Collection
The Discord Bot will repeatedly poll all relevant voice channels of registered servers and check for active sessions of registered employees. If an ongoing session is ended, a session document will be inserted into a MongoDB collection containing the following features:
#### \<id\>
Discord user id. The id of the user who has finished this session.
#### \<duration\>
The duration in seconds of this session.
#### \<date\>
The Python datetime of when this session was finished (used to generate date interval reports).

The Discord Bot may also create a log message in a dedicated Discord text channel once a session is started or ended if this feature is enabled.

## Session Logging Assistance
Once a session of a registered emploee is completed, that employee will receive a direct message from the Discord Bot containing the session duration as well as a link to that employee's Jira time tracking page (see the **Demo** section). This simplifies the process of employees with per-hour contracts so that they don't have to time their sessions themselves.

## Reports
Reports can be generated through the use of the **!reports** command. The report will show the total time logged of all employees concerned (see the **Demo** section). Command **flags** can be added to the command to customize it. See section **Flags** for more information. 

## Graphs
Graphs can be generated through the use of the **!graphs** command. Multiple groups of people and any combination of employees can be selected to be included and compared in these graphs. Command **flags** can be added to the command to customize it. See section **Flags** for more information.

Several modules have been implemented that will parse the concerned MongoDB session documents on a per-minute precision and generate the following data frames:
- **Per weekday hourly time series statistics** (total hours logged per hour of each weekday)
- **Per day statistics** (total hours logged per weekday in total)
- **Per hour statistics** (total hours logged per hour in total across all weekdays)
- **Per week statistics** (total hours logged per week)
- **Correlation with other employees** (total hours logged that overlap with a specific other employee, for each employee included in the report)

These are then used to plot graphs using Seaborn and MatPlotLib (see the **Demo** section), which are then converted into a singular SVG image and eventually posted in the Discord text channel that the command was originally issued in. The image will be accomanied with a report mentioning the number of sessions that were handled, how long it took, and which employees were included in the image.

## Flags
All commands can be customized by adding flags.

For example, a specific time interval can be requested by adding an **-i** or **-interval** flag to the command followed by a specific time interval. Example use:
 ```
!report -i 2022 01 01 2023 01 01
 ```
 
The above would request a report for the time interval 2022/01/01 to 2023/01/01.
 
Specific group of employees can be selected by adding a **-g** or  **-group** flag followed by the specified group. Example use:
```
!graphs -i 2022 01 01 2023 01 01 -g UX-Designers
```

The above would request graphs for the time interval 2022/01/01 to 2023/01/01 for the employees in the UX-Designers group.

Singular employees can be appended to the report by adding a **-e** or **-employee** flag followed by a Discord mention of that registered employee. Example use:
```
!report -i 2022 01 01 2023 01 01 -g UX-Designers -e <@someones_discord_id>
```

The above would request a report for the time interval 2022/01/01 to 2023/01/01 for the employees in the UX-Designers group as well as for an extra employee specified by <@someones_discord_id>.

## Employee management commands

### !add employee \<id\> \<group\> \<name\>
Adds an employee to the 'employees' collection.

Example usage: 
```
!add employee 149253253014487041 developers Billy Boy
```

### !add jira \<jira_url\>
Updates the jira_url attribute of the employee document linked to the user sending this command.

Example usage: 
```
!add jira https://studentkuvos.atlassian.net/jira/software/c/projects/TRACK/boards/6
```

### !remove employee \<id\>
Removes the employee linked to this Discord user id.

Example usage: 
```
!remove employee 149253253014487041
```

## Setup
To set this bot up you will need to edit the .env file with your own **DISCORD_TOKEN**, **CONNECTION_STRING**, and **DB_NAME**. Where the latter two concern your MongoDB cluster and database. The database needs an 'employees' collection as well as a 'session_logs' collection to work properly. Further, edit the appData dictionary in main.py and add your server id in 'guilds_to_track', your discord user ids in 'authorized_users', and your preferred employee groups in 'allowed_groups', as well as which channel id the bot should mention ongoing sessions in for each group name in 'report_channels'.
