# Nexus
Author: **William Bigert**

Skills: **React, TypeScript, CSS, HTML, Bootstrap**

The new Studs website as of 2023. As member of IT in KTH Studs 2023, I decided to create a new website from scratch\* using modern libraries such as **React 18.2** and **Vite 4.0.1**. I used TypeScript and Bootstrap to ensure that future generations of Studs would have an easy time understanding the project.

\* *The useModalManager.ts hook was reused and refurbished from a different project.*

Please navigate to [https://nexus.wbigert.com](https://nexus.wbigert.com) for a tech demo of the website. The tech demo is a snapshot of the project from when I was still the sole contributor, and loads a statically saved snapshot of the database from that time, so API calls are disabled. You will navigate the demo from the perspective of an Administrator and will able to explore how it would look like to edit blogs, events, and users.

## Ease of Use
I implemented an intuitive GUI for administrators to add/edit/remove members, events, and blog posts. Users are given roles that automatically link their portraits to the appropriate parts of the webpage. For example, group managers automatically appear on the studs.se/groups page, making it easy for future Studs years to just add the new members, assign them their respective roles, and have the website automatically update accordingly without having to change much manually.

## Design
After I implemented the core functionality of the website and proposed an initial design, the UX-designers of Studs 2023 improved it in Figma by giving the **Logo**, **Home page**, **Navbar**, **Footer**, **Buttons** and **Login page** a more personalized design, alongside other design improvements. I then implemented this new design and made responsive versions of it.

## API
I used the Studs Overlord backend API in the original project which was built by other Studs members from previous generations. While most of the core of the backend remains untouched, I refurbished the GraphQL queries and database models quite a bit to streamline Events and BlogPosts into having the same attributes. I also removed a lot of unused/unnecessary code.

## Features
- The website supports viewing, creation, editing, and deletion of users, events, and blog posts
- The website is fully responsive to different screen sizes
- The website supports different languages

## Flaws
I've identified some flaws in my implementation. In React, my usage of states provided in a context around the entirety of the app is problematic. My previous belief was that only components that consume the context using the useContext hook would re-render when the state in the context provider is updated, but unfortunately, as the states/functions given to the context providers are defined in App.tsx, all child components will re-render regardless of if they consume it or not. To circumvent this and still enjoy globally distributed states, one can use libraries such as Redux Toolkit to efficiently define and distribute states in React similar to React contexts.

I also believed that defining app-wide states and side-effects in App.tsx (top level) would be great from a readability perspective. But for the same reason as above, I would in future projects use something like Redux Toolkit instead for app-wide states to reduce the amount of unnecessary renders top level states might cause.
