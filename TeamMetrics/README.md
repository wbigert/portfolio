# Team Metrics
**Author: William Bigert**

**Skills: Python, NumPy, Pandas, PIL, MatPlotLib, Seaborn, MongoDB, Discord.py**
 
A data collection tool with report generation and data visualization. Assists developers and interns working remotely by simplifying the session logging process. I was the sole responsible developer for building this project.
 
## Demo: Data visualization
![alt text](https://github.com/AFlyingRhino/ResumeProjects/blob/main/TeamMetrics/demoGraphs.jpg)
 
## Demo: Report
![alt text]( https://github.com/AFlyingRhino/ResumeProjects/blob/main/TeamMetrics/reportDemo.png)

## Demo: Session logging assistance
![alt text]( https://github.com/AFlyingRhino/ResumeProjects/blob/main/TeamMetrics/demoAssistant.png)

## NDA (non disclosure agreement)
This project was built by me during work hours, and as such I cannot disclose the source code.
 
## Features
 
### Data Collection
The Discord Bot will repeatedly poll all relevant voice channels of registered servers and check for active sessions of registered employees. If an ongoing session is ended, a session document will be inserted into a MongoDB collection containing the following features:
#### \<id\>
Discord user id. The id of the user who has finished this session.
#### \<duration\>
The duration in seconds of this session.
#### \<date\>
The Python datetime of when this session was finished (used to generate date interval reports).

The Discord Bot may also create a log message in a dedicated Discord text channel once a session is started or ended if this feature is enabled .
 
### Reports
Reports can be generated through the use of the *!reports* command. The report will show the total time logged of all employees concerned. Several flags can be added to this command to generate customized reports. For example, a specific time interval can be requested by adding an **-i** or **-interval** flag to the command followed by a specific time interval. Example use:
 ```
!report -i 2022 01 01 2023 01 01
 ```
 
The above would request a report for the time interval 2022/01/01 to 2023/01/01.
 
Specific group of employees can be selected by adding a **-g** or  **-group** flag followed by the specified group. Example use:
```
!report -i 2022 01 01 2023 01 01 -g UX-Designers
```

The above would request a report for the time interval 2022/01/01 to 2023/01/01 for the employees in the UX-Designers group.

Singular employees can be appended to the report by adding a **-e** or **-employee** flag followed by a Discord mention of that registered employee. Example use:
```
!report -i 2022 01 01 2023 01 01 -g UX-Designers -e <@someones_discord_id>
```

The above would request a report for the time interval 2022/01/01 to 2023/01/01 for the employees in the UX-Designers group as well as for an extra employee specified by <@someones_discord_id>.

### Graphs
Graphs can be generated through the use of the **!graphs** command. Multiple groups of people and any combination of employees can be selected to be included and compared in these graphs.

!! **All of the above flags apply to the !graphs command** !!

These are **-i** or **-interval** for time intervals, **-g** or **-group** for groups, **-e** or **-employees** for including extra emplyoees.

Several modules have been implemented that will parse the concerned MongoDB session documents on a per-minute precision and generate the following data packages:
- **Per weekday hourly time series statistics** (total hours logged per hour for each weekday)
- **Per day statistics** (total hours logged per weekday in total)
- **Per hour statistics** (total hours logged per hour in total across all weekdays)
- **Per week statistics** (total hours logged per week)
- **Correlation with other employees** (total hours logged at the same time for every other employee included in the report)

These are then used to plot graphs using Seaborn and MatPlotLibs (see the Demo section), which are then converted into a singular SVG image and eventually posted in the Discord text channel that the command was originally issued in. The image will be accomanied with a report mentioning the number of sessions that were handled, how long it took, and which employees were included in the image.
