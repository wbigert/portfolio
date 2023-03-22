# Interactive Table
**Author: William Bigert**

**Skills: React, JavaScript, HTML, CSS, C#, ASP.NET (database first), MariaDB**

A user-friendly way to interact with a database table. This was among my earliest fullstack-projects and was built as part of the TellusTalk AB summer internship of 2021.

## Demo
https://user-images.githubusercontent.com/60448436/226787130-cd030914-8c86-4235-9a4c-3ce2abef7ed2.mp4

## Features
### Table interaction
The following can be done interactively with the table.
- Cell editing
- Row deletion
- Row creation

Each interaction will be staged. All staged interactions can either be commited or reverted using the "Apply or "Revert" buttons respectively. 

When commited, the React-app performs the relevant POST/PUT/DELETE HTTP-requests to the backend.

### Backend
A backend was built in C# using ASP.NET database first scaffolding of a MariaDB table. The table schema was provided by TellusTalk AB. The scaffolding prepared simple entry points for POST/PUT/DELETE HTTP-requests.

### Distribution
I dockerized the project using Docker Compose, defining services, networks and volumes in a YAML file. I deployed the resulting image to a Kubernetes cluster hosted by TellusTalk AB. 

## NDA (non disclosure agreement)
This project was built by me during work hours at TellusTalk AB, and as such I cannot disclose the source code.
