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
 Reports can be generated through the use of the !reports command. The report will show the total time logged of all emploees concerned. Several flags can be added to this command to generate customized reports. For example, a specific time interval can be requested by adding an **-i** or **-interval** flag to the command followed by a specific time interval. Example use:
 ```
!report -i 2022 01 01 2023 01 01
 ```
 
The above would request a report for the time interval 2022/01/01 to 2023/01/01.
 
Specific group of employees can be selected by adding a **-g** or  **-group** flag followed by the specified group. Example use:
```
!report -i 2022 01 01 2023 01 01 -g UX-Designers
```

The above would request a report for the time interval 2022/01/01 to 2023/01/01 for the emploees in the UX-Designers group.

Singular emploees can be appended to the report by adding a **-e** or **-employee** flag followed by a Discord mention of that registered emploee. Example use:
```
!report -i 2022 01 01 2023 01 01 -g UX-Designers -e <@someones_discord_id>
```

The above would request a report for the time interval 2022/01/01 to 2023/01/01 for the emploees in the UX-Designers group as well as for an extra emploee specified by <@someones_discord_id>.
