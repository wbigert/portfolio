# Nexus
Author: **William Bigert**

Skills: **React, TypeScript, CSS, HTML, Bootstrap**

**<https://nexus.wbigert.com>**

Use the following credentials to login and try the Admin features of the website:
- Email: **william-b@studs.se**
- Password: **portfolio**

The new Studs website as of 2023. As member of IT in KTH Studs 2023, I picked the rather ambitious project of creating a new website from scratch\* using modern libraries such as **React 18.2** and **Vite 4.0.1**. I used TypeScript and Bootstrap to ensure that future generations of Studs would have an easy time understanding the project.

\* *The api.js file containing graphql queries was reused and refurbished from a different project. The same goes for the useModalManager.ts hook.*

### Design
After I implemented the core functionality of the website and proposed an initial design, the UX-designers of Studs 2023 improved it in Figma by giving the **Logo**, **Home page**, **Navbar**, **Footer**, **Buttons** and **Login page** a more personalized design. I then implemented this new design and made responsive versions of it.

### API
I used the Studs Overlord backend API which was built by other Studs members from previous generations. While the core of the backend remains untouched, I refurbished the GraphQL queries and database models quite a bit to streamline Events and BlogPosts into having the same attributes.

### Features
- The website supports viewing, creation, editing, and deletion of users, events, and blog posts
- The website is fully responsive to different screen sizes
- The website supports different languages
