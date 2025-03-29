# Nexus
Author: **William Bigert**

Skills: **React, TypeScript, CSS, HTML, Bootstrap**

The new Studs website as of 2023. As member of IT in KTH Studs 2023, I decided to create a new website from scratch\* using modern libraries such as **React 18.2** and **Vite 4.0.1**. I used TypeScript and Bootstrap to ensure that future generations of Studs would have an easy time understanding the project.

\* *The api.js file containing graphql queries was reused and refurbished from a different project. The same goes for the useModalManager.ts hook.*

You can check out <https://studs.se> which is the same website with additions/modifications/improvements made by next year's Studs members.

For the Studs repo, see <https://github.com/studieresan/nexus>.

Below are demos of the website as of 2025-03-25. The demo differ slightly from how it looked when I left studs. The color scheme is different, the front page graphic has been changed, the section breaker graphic is different, and the Studs logo is new. However, everything else (from what I can tell) is still the same, and 86% of the project contributions were still made by me.

## Demo: Website Outsider Perspective (2025-03-25)

https://github.com/user-attachments/assets/fdd77a3c-3aef-414b-ab1b-e3b008f12abe

https://github.com/user-attachments/assets/fe184533-7990-49e3-b8fd-0d9f02975e58

## Demo: Responsiveness (2025-03-25)
https://github.com/user-attachments/assets/1b79ffac-a1c7-4375-a48a-48231eb254b9

https://github.com/user-attachments/assets/6e1402fa-fe65-4bfd-970b-9abb45a32204

## Ease of Use
I implemented an intuitive GUI for administrators to add/edit/remove members, events, and blog posts (not shown in demo however, since I don't have Admin access anymore after being off-boarded). Users are given roles that automatically link their portraits to the appropriate parts of the webpage. For example, group managers automatically appear on the studs.se/groups page, making it easy for future Studs years to just add the new members, assign them their respective roles, and have the website automatically update accordingly without having to change much manually.

## Design
After I implemented the core functionality of the website and proposed an initial design, the UX-designers of Studs 2023 improved it in Figma by giving the **Logo**, **Home page**, **Navbar**, **Footer**, **Buttons** and **Login page** a more personalized design, alongside other design improvements. I then implemented this new design and made responsive versions of it.

## API
I used the Studs Overlord backend API which was built by other Studs members from previous generations. While most of the core of the backend remains untouched, I refurbished the GraphQL queries and database models quite a bit to streamline Events and BlogPosts into having the same attributes. I also removed a lot of unused/unnecessary code.

## Features
- The website supports viewing, creation, editing, and deletion of users, events, and blog posts
- The website is fully responsive to different screen sizes
- The website supports different languages

## Flaws
I've identified some flaws in my implementation. In React, my usage of states provided in a context around the entirety of the app is problematic. My previous belief was that only components that consume the context using the useContext hook would re-render when the state in the context provider is updated, but unfortunately, as the states/functions given to the context providers are defined in App.tsx, all child components will re-render regardless of if they consume it or not. To circumvent this and still enjoy globally distributed states, one can use libraries such as Redux Toolkit to efficiently define and distribute states in React similar to React contexts.

I also belived that defining app-wide states and side-effects in App.tsx (top level) would be great from a readability perspective. But for the same reason as above, I would in future projects use something like Redux Toolkit instead for app-wide states to reduce the amount of unnecessary renders top level states might cause.
