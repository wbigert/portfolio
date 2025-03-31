import { BlogPost } from "@/models/BlogPost"
import { EventPost } from "@/models/EventPost";
import { UserRole, Permission } from "@/models/User"

export const EventsSnapshot: EventPost[] = [
  {
    id: "644bc00b70a44a85b02a4aae",
    title: "Storykit",
    description: "Recently, Studs had the pleasure to visit Storykit for a fantastic event at their office on S\u00f6dermalm! Storykit is developing an innovative, cloud-based storytelling and video-editing platform that allows businesses and organizations to easily create meaningful and captivating videos for purposes such as marketing or official announcements. With over 70 employees and counting, Storykit is actively recruiting and they are also looking for students who want to write their master\u2019s theses.\n\nThe event started out with a presentation of the company\u2019s history, what they work with and their plans for the future. Afterwards, we competed in groups by using Storykit\u2019s own product to create videos on the topic of \u201cWhat is Studs?\u201d, and of course, the winning group got a reward! The competition was both fun and insightful, and we even got to use a brand new feature when creating the videos which hasn\u2019t been released yet! The evening concluded with us having discussions with the employees in smaller groups, casually mingling and playing some table tennis. A big thanks to Storykit for this great event and for having us again!\n\n\n\\image-0\n\\image-1\n\\image-2\n",
    date: new Date(1646931600000),
    studsYear: 2022,
    pictures: ["https://studs22.s3.amazonaws.com/uploads/1647348969881/facebook_web1.jpg", "https://studs22.s3.amazonaws.com/uploads/1647348969895/facebook_web3.jpg", "https://studs22.s3.amazonaws.com/uploads/1647348969898/facebook_web2.jpg"],
    frontPicture: "https://studs22.s3.amazonaws.com/uploads/1647348969881/facebook_web1.jpg",
    published: true,
    author: {
      id: "619cea9308dc1200161ea5bb",
      firstName: "Luciano",
      lastName: "Zapata",
      studsYear: 2022,
      info: {
        role: UserRole.EventGroup,
        email: "luciano@studs.se",
        picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/luciano.jpg",
        permissions: []
      }
    }
  },
  {
    id: "644bc00b70a44a85b02a4ab3",
    title: "Sellpy",
    description: "Most of us can probably relate to having perfectly usable things at home that are gathering dust, but that we still can\u2019t be bothered to sell. This idea laid the foundation for the company Sellpy that Studs had the opportunity to meet earlier this week. Founded in 2014, Sellpy has been simplifying the process of selling and buying clothes and other products second-hand. By creating an international e-commerce website and mobile application, they are aiming to make the second-hand market just as convenient as traditional online shopping. Since their launch, they\u2019ve sold over 25 million items all across Europe and they\u2019re growing by the day!\n\nAt the event, we learnt about how Sellpy came to be and about their entire journey to where they are now. We also learnt about the technologies they work with, the job openings that they offer and that they are even taking in Master\u2019s thesis writers! Sellpy then took us through how the entire sales process works - from the moment a product is received at the warehouse to when it is registered, photographed, packed up and ready to be sold. To do this, each of us brought something we wanted to sell and the items are now available for purchase on their website! The entire event was fascinating and we are all very excited to see how the sale of Studs\u2019 stuff goes! Thank you, Sellpy, for a great event!\n\n\\image-0\n\\image-1\n\\image-2\n",
    date: new Date(1649174400000),
    studsYear: 2022,
    pictures: ["https://studs22.s3.amazonaws.com/uploads/1649601712758/webb_fb5.jpg", "https://studs22.s3.amazonaws.com/uploads/1649601712748/webb_fb3.jpg", "https://studs22.s3.amazonaws.com/uploads/1649601712761/webb_fb1.jpg"],
    frontPicture: "https://studs22.s3.amazonaws.com/uploads/1649601712758/webb_fb5.jpg",
    published: true,
    author: {
      id: "619ceaba08dc1200161ea5bd",
      firstName: "Julius",
      lastName: "Albiz",
      studsYear: 2022,
      info: {
        role: UserRole.EventGroup,
        email: "julius@studs.se",
        picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/julius.jpg",
        permissions: []
      }
    }
  },
  {
    id: "644bc00b70a44a85b02a4aa9",
    title: "Prototyp",
    description: "Studs\u2019 first event this year was with Prototyp - a code lab that builds digital products for clients who want to break new ground. The event was held over Google Meet and it started off with a presentation of the company, their values and their ways of working. As a company driven by innovation, they consist of 35 employees whereof 31 are full-stack engineers. Prototyp believes curiosity and creativity are essential to working in a constantly changing technical landscape and they therefore always approach their development work in an experimental manner. \n\nAfter the presentation, we got to learn what this actually means in practice by trying out Prototyp\u2019s ideation process that they frequently use to improve their creativity and problem solving skills. Divided into smaller groups, we were presented with three techniques and three problems and our task was to combine these and present an innovative solution to one of the problems. This creative activity resulted in many different and crazy solutions, and many accompanying laughs. \nThe event was rounded off with a long Q&A session where Studs got the opportunity to ask questions to several employees who were present during the evening and learn even more about the company.\n\nThank you to Prototyp for an informative and fun event!\n\n\n\\image-0\n\\image-1\n",
    date: new Date(1644339600000),
    studsYear: 2022,
    pictures: ["https://studs22.s3.amazonaws.com/uploads/1645128529359/2.jpg", "https://studs22.s3.amazonaws.com/uploads/1645128529377/4.jpg"],
    frontPicture: "https://studs22.s3.amazonaws.com/uploads/1645128529359/2.jpg",
    published: true,
    author: {
      id: "619ceaca08dc1200161ea5be",
      firstName: "Samuel",
      lastName: "S\\u00f6derberg",
      studsYear: 2022,
      info: {
        role: UserRole.EventGroup,
        email: "samuel@studs.se",
        picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/samuel.jpg",
        permissions: []
      }
    }
  },
  {
    id: "644bc00b70a44a85b02a4ab5",
    title: "Tutus",
    description: "Studs recently had the opportunity to meet with Sweden\u2019s leading company in cybersecurity, Tutus Data. Since they were founded in 1992, they have been developing and selling cryptography and cybersecurity products for secure communications which have been inspected and approved. Security is at the heart of everything they do at Tutus and their products are especially suited for organizations that work with secret or sensitive information where security is critical. Their clients are therefore within the military or other civilian authorities as well as organizations and companies within the EU that require quality assured and approved products. Tutus currently has around 40 employees and they are currently expanding and offering internships, full-time positions as well as opportunities for students to write their Master\u2019s theses.\n\nThe event began with a general presentation of the company while we enjoyed our meals. We learned what Tutus work with, how they work as well as who their primary clients are. The presentation also included a very thorough and interesting summary of the whole field and history of cryptography where we learnt about the fundamentals of encryption and decryption - everything from Caesar ciphers to symmetric and asymmetric encryption algorithms like stream ciphers, block ciphers, and RSA. We even learnt about quantum computers and their potential consequences on modern cryptology. After a short break, we listened to another presentation from a developer who told us more about the technologies they work with and the interesting problems they\u2019ve had to solve.\n\nFor the final part of the event, we split up into several groups and each group visited different stations set up around the office. Here, we got to see demos of Tutus\u2019 various products like their secure mobile phones and various (very cool-looking) encryption devices. We also got to compete by deciphering messages and finding flaws in encoded messages, and the winning group members got a sweet prize to take home! A very fun, insightful and educational event -  thank you, Tutus!\n\n\\image-0\n\\image-1\n\\image-2\n",
    date: new Date(1649347200000),
    studsYear: 2022,
    pictures: ["https://studs22.s3.amazonaws.com/uploads/1650357038211/3.jpg", "https://studs22.s3.amazonaws.com/uploads/1650357077380/2.jpg", "https://studs22.s3.amazonaws.com/uploads/1650357077385/5.jpg"],
    frontPicture: "https://studs22.s3.amazonaws.com/uploads/1650357038211/3.jpg",
    published: true,
    author: {
      id: "617951b1874bf80015f93f52",
      firstName: "Emelie",
      lastName: "Lindborg",
      studsYear: 2022,
      info: {
        role: UserRole.EventGroup,
        email: "emelie@studs.se",
        linkedIn: "https://www.linkedin.com/in/emelielindborg",
        picture: "https://studs22.s3.eu-north-1.amazonaws.com/leaderGroupImages/emelie.jpg",
        permissions: []
      }
    }
  },
  {
    id: "644bc00b70a44a85b02a4ab7",
    title: "INVIDI Technology",
    description: "Another fantastic event with another fantastic company! Last week, Studs got the opportunity to meet with INVIDI Technologies, a multinational company in the television advertising business. With around 270 employees globally, 50 of which work in Stockholm, Invidi has grown considerably since their founding in the year 2000 and they are looking to expand even further. \n\nAs a market leader for over a decade, they create software that has revolutionized the TV industry by making advertisements easier to deliver to the right household at the right time while also providing a more satisfying viewing experience. Their services are device-agnostic, meaning that their ability to deliver ads is independent of the program or network one is watching or whether one is watching on a TV, laptop or any other device. Invidi\u2019s various software solutions give advertisers a greater freedom of choosing their audiences while also giving the viewers a better and more relevant viewing experience as well as increasing the value of distributors\u2019 ad inventories, thereby benefiting all parties involved. \n\nThe event began with a presentation of Invidi where we learnt all of this and more about how they work within the company and within their teams. Afterwards, it was time for freshly baked pizza and a hackathon where we competed in teams to create bots to play a slightly simplified version of the board game Risk in Java. After just over an hour of strategizing and trying to create the one bot to rule them all, it was time to let our bots fight it out over 200 rounds in an elimination tournament. After some nerve-racking games, a winning team was announced and awarded with well-deserved medals! The event was a blast, and we\u2019re incredibly grateful to Invidi for having us! \n\n\n\\image-0\n\\image-1\n\\image-2\n",
    date: new Date(1651075200000),
    studsYear: 2022,
    pictures: ["https://studs22.s3.amazonaws.com/uploads/1651657320499/1280720-3.jpg", "https://studs22.s3.amazonaws.com/uploads/1651657320482/1280720-1.jpg", "https://studs22.s3.amazonaws.com/uploads/1651657321472/1280720-2.jpg"],
    frontPicture: "https://studs22.s3.amazonaws.com/uploads/1651657320499/1280720-3.jpg",
    published: true,
    author: {
      id: "619ceaca08dc1200161ea5be",
      firstName: "Samuel",
      lastName: "S\\u00f6derberg",
      studsYear: 2022,
      info: {
        role: UserRole.EventGroup,
        email: "samuel@studs.se",
        picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/samuel.jpg",
        permissions: []
      }
    }
  },
  {
    id: "644bc00c70a44a85b02a4ac1",
    title: "Scania",
    description: "Last Tuesday Studs had the pleasure of visiting one of Sweden\u2019s biggest employers, the transport solution company Scania! Scania is a huge company with around 50 000 employees worldwide, mainly famous for their trucks and buses!\n\nDuring our visit to their newly opened office in the very center of Stockholm we experienced many interesting flavors of IT at Scania. Namely autonomous driving, design systems and the I-Talent program! We also got to try out the Scania game Ace Race as well as compete for advantages in their upcoming Code Challenge this fall.\n\nSomething that was especially welcome was how happy the employees were with their jobs and we are super happy we got the opportunity to visit Scania! Thank you for a great evening @scania \ud83d\ude9b\ud83d\udc4f! \n\n\n\\image-0\n\\image-1\n\\image-2\n\\image-3\n",
    date: new Date(1676991600000),
    studsYear: 2023,
    pictures: ["https://studs23.s3.amazonaws.com/uploads/1677747864711/DSC01737.jpg", "https://studs23.s3.amazonaws.com/uploads/1677747864651/DSC01715.jpg", "https://studs23.s3.amazonaws.com/uploads/1677747864736/DSCF2824.jpg", "https://studs23.s3.amazonaws.com/uploads/1677747864766/DSCF2873.jpg"],
    frontPicture: "https://studs23.s3.amazonaws.com/uploads/1677747864711/DSC01737.jpg",
    published: true,
    author: {
      id: "637fda5708d924036862bc31",
      firstName: "Sanherib",
      lastName: "Elia",
      studsYear: 2023,
      info: {
        role: UserRole.EventGroup,
        email: "sanherib@studs.se",
        linkedIn: "https://www.linkedin.com/in/sanherib-elia/",
        picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/sanherib.png\\n",
        permissions: []
      }
    }
  },
  {
    id: "644bc00a70a44a85b02a4aa7",
    title: "Prototyp",
    description: "Another fantastic event together with a great company! Studs got to meet Prototyp, a code lab who are driven by innovation and creativity. With offices in Stockholm, Barcelona and Uppsala, Prototyp consists of 30 employees, where 90% of them are full stack engineers. Together, they build digital products for clients and companies that aren't afraid of change. The company place a large focus on their work environment being a place where the employees can grow, develop technical skills and to take responsibility for their own work without having a boss making the decisions for them.\n\nThe Studs team got a short presentation from the CEO regarding Prototyp's history, followed by short introductions from the employees. Later, we got to try out Id\u00e9ation \u2014 a session in which groups spend a short amount of time to come up with ideas that solves some issue. This session comes from a After a round of votes from all participants, a winner was declared! The winning team had come up with a solution for making the home office a little more comfortable for all of us who work from home. An idea well worthy of its prize! \ud83c\udfc6\n\n\nThe event was finished with some discussions between Studs and Prototyp. A great event, and a great Id\u00e9ation session! Congratulations to the winners, and thanks to Prototyp for letting us share an evening with you!\n\n\\image-0\n\\image-1\n\\image-2\n",
    date: new Date(1619049600000),
    studsYear: 2021,
    pictures: ["https://studs21.s3.amazonaws.com/uploads/1620229299247/bild1-1.jpg", "https://studs21.s3.amazonaws.com/uploads/1620229299231/bild2-2.jpg", "https://studs21.s3.amazonaws.com/uploads/1620229299249/bild3-2.jpg"],
    frontPicture: "https://studs21.s3.amazonaws.com/uploads/1620229299247/bild1-1.jpg",
    published: true,
    author: {
      id: "5fb278e69fca82b6f5faf81c",
      firstName: "Sarah",
      lastName: "Narrowe Danielsson",
      studsYear: 2021,
      info: {
        role: UserRole.EventGroup,
        email: "sarah@studs.se",
        picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/sarah.jpg",
        permissions: []
      }
    }
  },
  {
    id: "644bc00b70a44a85b02a4aa8",
    title: "SVT",
    description: "Recently, Studs had an event with SVTi, the interaction department at the Swedish national broadcasting channel (SVT). Most of us who grew up in Sweden remember that it was SVT that   brought us *Bolibompa* every evening at 18:00 \u2014 a children's programme featuring the green dragon *Bolibompadraken* \ud83d\udc32 Nowadays, *Bolibompadraken* exists in many forms, including an app that you can find on your smartphone. As was explained to us during this event, there is a lot going on behind this mobile app - animation, programming, sound effects and so on. Apart from developing apps, SVT also manages Sweden's national news, Swedens national radio and other forms of broadcasting systems. A lot of engineering is required to run these services, and it was amazing to speak to some of the people who make this possible! \n\nAt the event, Studs got to meet different people from SVTi in breakout rooms. In one room, we got to hear about what it's like to work with some large chunks of data handled by SVT, such as election results and Covid-19 statistics. We also had interesting sessions about growth marketing, mob programming and got to meet one of the members of the _Bolibompa_ team at SVTi. Lots of stuff in two hours, right? But don't worry about us sitting down for too long, SVT also made sure that we got some movement in the middle of the session \ud83e\udd38\ud83c\udfcb\ufe0f Thank you SVT for an inspiring event \u2728\n\n\\image-0\n\\image-1\n\\image-2\n",
    date: new Date(1621324800000),
    studsYear: 2021,
    pictures: ["https://studs21.s3.amazonaws.com/uploads/1621948413594/bild1.jpg", "https://studs21.s3.amazonaws.com/uploads/1621948413604/bild2.jpg", "https://studs21.s3.amazonaws.com/uploads/1621948413638/bild3.jpg"],
    frontPicture: "https://studs21.s3.amazonaws.com/uploads/1621948413594/bild1.jpg",
    published: true,
    author: {
      id: "5fb278e69fca82b6f5faf80a",
      firstName: "Lisa",
      lastName: "Tran",
      studsYear: 2021,
      info: {
        role: UserRole.EventGroup,
        email: "lisatpriv@gmail.com",
        picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/lisa.jpg",
        permissions: []
      }
    }
  },
  {
    id: "644bc00b70a44a85b02a4ab2",
    title: "FindWise",
    description: "A few days ago, Studs had the pleasure of meeting with Findwise, an IT-consulting firm founded in 2005 that mainly works with data findability. This means that they help companies find, analyze and act on information using search-based applications and various AI solutions. As a part of the leading company of digital services in the Nordics, namely Tietoevry, Findwise has over 450 clients ranging from international organizations with large amounts of data to smaller and more local companies. They currently have around 80 employees and are looking to expand further with junior Java developers, data engineers and much more, including students who want to write their master\u2019s theses within fields such as search technology or AI.\n\nWe learned this and much more during the first hour of the event which started out with us chatting with employees, enjoying Indian cuisine and listening to a presentation of the company. Afterwards, we split up into groups of three or four and our searching skills were put to the test with a treasure hunt. This fun and tricky activity involved finding keys by answering various riddles, locating obscure coordinates and deciphering encoded messages. It turned out that Studs were search experts from the very beginning and almost all groups solved most of the riddles! Thank you, Findwise, for an informative and fun event!\n\n\\image-0\n\\image-1\n\\image-2\n",
    date: new Date(1648569600000),
    studsYear: 2022,
    pictures: ["https://studs22.s3.amazonaws.com/uploads/1648895202720/1280720-6.jpg", "https://studs22.s3.amazonaws.com/uploads/1648895202701/1280720-2.jpg", "https://studs22.s3.amazonaws.com/uploads/1648895202724/1280720-4.jpg"],
    frontPicture: "https://studs22.s3.amazonaws.com/uploads/1648895202720/1280720-6.jpg",
    published: true,
    author: {
      id: "619ceaca08dc1200161ea5be",
      firstName: "Samuel",
      lastName: "S\\u00f6derberg",
      studsYear: 2022,
      info: {
        role: UserRole.EventGroup,
        email: "samuel@studs.se",
        picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/samuel.jpg",
        permissions: []
      }
    }
  },
  {
    id: "644bc00b70a44a85b02a4aba",
    title: "Decerno",
    description: "Studs\u2019 event streak continues, and this time, we had the pleasure of visiting Decerno in one of their offices in Stockholm. Decerno is an IT consulting firm specializing in complex and tailor-made solutions, and they strive to make a difference with everything they do. The company was founded as early as 1984 and has since grown to around 130 employees and six offices, including one in Spain and a virtual one to enable flexible working. Decerno view themselves as digital craftsmen because of the dedication and effort they put into choosing and realizing each project. Because of this, it is not unusual for Decerno\u2019s clients to stay with them for over ten years. Decerno also takes social, ethical and environmental responsibility in their work and they abstain from working with companies in the weapon, tobacco, alcohol or gambling businesses.\n\nThe event began with a presentation from Decerno\u2019s CEO, who walked us through their core values and their journey to where they are today. We then learned about Decerno\u2019s entire work process from finding suitable clients and making the sale to designing the desired product and finally implementing it. After some mingling over a delicious dinner from Mezefabriken, it had become time for a competition! We formed teams and set out to construct a tower that is not only as high as possible, but also able to support a tennis ball, by only using paper, tape and an agile workflow. After half an hour of tireless craftsmanship and continuous deployments and assessments, a winning team was announced and they were rewarded with sweet Decerno goodie bags! Thank you, Decerno, for an insightful event and a wonderful evening!\n\n\\image-0\n\\image-1\n\\image-2\n",
    date: new Date(1651593600000),
    studsYear: 2022,
    pictures: ["https://studs22.s3.amazonaws.com/uploads/1652254731978/1280720-3.jpg", "https://studs22.s3.amazonaws.com/uploads/1652254731982/1280720-4.jpg", "https://studs22.s3.amazonaws.com/uploads/1652254731964/1280720-2.jpg"],
    frontPicture: "https://studs22.s3.amazonaws.com/uploads/1652254731978/1280720-3.jpg",
    published: true,
    author: {
      id: "619cea9308dc1200161ea5bb",
      firstName: "Luciano",
      lastName: "Zapata",
      studsYear: 2022,
      info: {
        role: UserRole.EventGroup,
        email: "luciano@studs.se",
        picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/luciano.jpg",
        permissions: []
      }
    }
  },
  {
    id: "644bc00a70a44a85b02a4a97",
    title: "Goldman Sachs",
    description: "\nStuds\u2019 first event was a zoom hangout with the Stockholm office at Goldman Sachs. The hangout began with a brief discussion about Goldman Sachs place in the world, and we later dove deeper into the technical architectures that they employ at GS.\n\n\nA big focus was their *Data Lake* - a centralised storage unit at GS (after all, the company stores a lot of data). The tech wizards at the company work with maintaining, optimising and improving this storage unit. There are many challenges with doing this, one of them being able to retrieve data quickly when you have many data samples to search in.  Even though you are working for a fintech company you might never really encounter the financial part of it, some employees said while laughing.\n\n\nAfter the tech discussions, we had some shorter discussions about the financial aspect of the company. Some might say that we even got a glimpse of how the weather can control the stock market. \n\n\nWe finished the evening with some chats with the employees.\n\n\nWe had a great time! Thanks to GS for hosting this event :)\n\n\n\\image-0\n\\image-1\n\\image-2\n",
    date: new Date(1607623200000),
    studsYear: 2021,
    pictures: ["https://studs21.s3.eu-north-1.amazonaws.com/event_uploads/GS1.jpg", "https://studs21.s3.eu-north-1.amazonaws.com/event_uploads/GS2.jpg", "https://studs21.s3.eu-north-1.amazonaws.com/event_uploads/GS3.jpg"],
    frontPicture: "https://studs21.s3.eu-north-1.amazonaws.com/event_uploads/GS1.jpg",
    published: true,
    author: {
      id: "5fb278e69fca82b6f5faf80a",
      firstName: "Lisa",
      lastName: "Tran",
      studsYear: 2021,
      info: {
        role: UserRole.EventGroup,
        email: "lisatpriv@gmail.com",
        picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/lisa.jpg",
        permissions: []
      }
    }
  },
  {
    id: "644bc00a70a44a85b02a4aa1",
    title: "Decerno",
    description: "Just before the Easter, Studs got to spend an evening with Decerno! Decerno is a consulting firm with a focus on project based solutions. The company was created 1984 and has at the moment 124 employees. With each project, Decerno aims to contribute to the Sustainable Development Goals. They describe their work as flexible, with a company culture that promotes equality among the employees and developing skills.\n\nDecerno delivers tailor-made, reliable IT systems to their customers and now have offices both in different parts of Sweden and in Sevilla in Spain. At the event, Studs got to hear about what it's like to work at Decerno, ask lots of questions and even hear about how it was to be part of Studs in the year 2000. Thank you Decerno for an amazing event!\n\n\n\n\\image-0\n\\image-1\n\\image-2\n",
    date: new Date(1617118200000),
    studsYear: 2021,
    pictures: ["https://studs21.s3.amazonaws.com/uploads/1618588172417/bild1.jpg", "https://studs21.s3.amazonaws.com/uploads/1618588181080/bild2.jpg", "https://studs21.s3.amazonaws.com/uploads/1618588181152/bild3.jpg"],
    frontPicture: "https://studs21.s3.amazonaws.com/uploads/1618588172417/bild1.jpg",
    published: true,
    author: {
      id: "5fb278e69fca82b6f5faf81c",
      firstName: "Sarah",
      lastName: "Narrowe Danielsson",
      studsYear: 2021,
      info: {
        role: UserRole.EventGroup,
        email: "sarah@studs.se",
        picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/sarah.jpg",
        permissions: []
      }
    }
  },
  {
    id: "644bc00b70a44a85b02a4ab0",
    title: "Conversionista",
    description: "Last Wednesday, Studs had the opportunity to visit Conversionista at their amazing office in central Stockholm! Conversionista was founded in 2010 and they work with Conversion Rate Optimization (CRO), which means that they help companies with their digital growth by converting their visitors to customers. Conversionista does this by helping their clients collect and analyze data showing how their website is used in order to find out what works and what doesn\u2019t. Conversionista currently has around 80 employees with expertise in fields such as data, engineering, behavioral psychology, design and human-computer interaction. Additionally, their work process relies heavily on scientific methods related to mathematics and statistics such as formulating and testing hypotheses to assess whether their work actually achieves a significant change in traffic or visitor conversion.\n\nThe event began with everyone enjoying freshly baked pizza and drinks together with company representatives. Conversionista then held a presentation where we got to learn about their different teams and what they work with, and finally, we got to try their scientific work process out for ourselves. We formed teams and competed to build the highest possible tower using building blocks similar to puzzle pieces after having formulated a hypothesis of how this should be done. This turned out to be great fun and, of course, the team with the highest tower received a nice prize! An amazing evening, rounded off with some casual mingling, Mario Kart and table tennis. Thank you, Conversionista!\n\n\\image-0\n\\image-1\n\\image-2\n",
    date: new Date(1648054800000),
    studsYear: 2022,
    pictures: ["https://studs22.s3.amazonaws.com/uploads/1648465206058/facebook_webb3.jpg", "https://studs22.s3.amazonaws.com/uploads/1648465206077/facebook_webb5.jpg", "https://studs22.s3.amazonaws.com/uploads/1648465206972/facebook_webb1.jpg"],
    frontPicture: "https://studs22.s3.amazonaws.com/uploads/1648465206058/facebook_webb3.jpg",
    published: true,
    author: {
      id: "619ceaba08dc1200161ea5bd",
      firstName: "Julius",
      lastName: "Albiz",
      studsYear: 2022,
      info: {
        role: UserRole.EventGroup,
        email: "julius@studs.se",
        picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/julius.jpg",
        permissions: []
      }
    }
  },
  {
    id: "644bc00c70a44a85b02a4abf",
    title: "Visma",
    description: "Studs 2023\u2019s first visit was at Visma! Visma delivers mission critical business software to more than one million customers across Europe and South America. They might be most famous for their bookkeeping systems as well as recruiting systems, which all help simplify common business tasks for many workplaces. They currently have more than 13 500 employees, including many developers, and they are growing rapidly!\n\nDuring the event we had delicious Lebanese food and had the opportunity to learn more about Visma. We also got to hear some wise words about KTH, Studs and life from previous Studsare Brian. Sustainability was also on the agenda and we listened to a small presentation about Vismas sustainability work before getting a more hands on experience with a case. The case was to brainstorm designs of a sustainability reporting tool using Airbnb\u2019s 11-star experience framework. It all ended in really entertaining presentations with 11-star suggestions ranging from having the tool telepathically make humans act more sustainably to the tool creating new sustainable planets. Overall a really entertaining exercise! We then rounded off with some table tennis and casual mingling. A big thank you to everyone at Visma for a great evening!\n\n\n\\image-0\n\\image-1\n\\image-2\n\\image-3\n\\image-4\n",
    date: new Date(1670950800000),
    studsYear: 2023,
    pictures: ["https://studs23.s3.amazonaws.com/uploads/1674494312496/DSC01662_Wide.jpg", "https://studs23.s3.amazonaws.com/uploads/1674494312518/DSC01672_Wide.jpg", "https://studs23.s3.amazonaws.com/uploads/1674494312545/DSCF2626_Wide.jpg", "https://studs23.s3.amazonaws.com/uploads/1674494312474/DSC01647_Wide.jpg", "https://studs23.s3.amazonaws.com/uploads/1674494312561/Visma_IG_Cover.png"],
    frontPicture: "https://studs23.s3.amazonaws.com/uploads/1674494312496/DSC01662_Wide.jpg",
    published: true,
    author: {
      id: "6318c76f68f1c00016841e2e",
      firstName: "Hanna",
      lastName: "Peters",
      studsYear: 2023,
      info: {
        role: UserRole.EventGroupManager,
        email: "hanna@studs.se",
        linkedIn: "https://www.linkedin.com/in/hanna-peters-5a18151b9/",
        github: "",
        phone: "",
        picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/hanna.png",
        master: "",
        permissions: []
      }
    }
  },
  {
    id: "644bc00c70a44a85b02a4ac2",
    title: "Modular Finance",
    description: "Studs 2023 visited Modular Finance! Modular Finance is a \u201cBusiness to business\u201d financial tech company focused on the stock market. They build different types of web applications, and systems for players in the financial industry, and public companies. Their team is more than 40 people with Developers, Account Managers, and Data Specialists teams. The company promotes employees to work from the office because they believe in learning together and from each other.\nThe company has 6 different products. For Bank and Finance, they have Holdings and Dataflow. For Investor Relations, they have MFN, Monitor, Datablocks, and Strictlog. Modular Finance was founded in 2013. This summer they will be celebrating their 10th anniversary!\nTheir motivation is to \u201cBring transparency to the market.\u201d Modular Finance expanded its teams to support Nordics and recently to the UK. They are broadening their support areas. Thus, they are looking for flexible \u201cgeneralists\u201d as they say that are comfortable with working in different development processes. \n\nThe office is located in a great location, surrounded by restaurants, and close to public transport which makes it easily accessible. At the beginning of the event, we had a warm welcome from the team and picked up food from the tasty buffet. The company prepared an entertaining and challenging CTF for us. The CTF consisted of trivia questions and programming tasks with different categories such as algorithms, network, finance and fun information about the people working there. The points were determined by the difficulty level of the question and solution speed. After the company presentation, we competed against each other in teams made of 6 members. The winning team received board games. A big thank you to everyone at Modular Finance for a great evening!\n\n\n\n\\image-0\n\\image-1\n\\image-2\n\\image-3\n\\image-4\n",
    date: new Date(1677171600000),
    studsYear: 2023,
    pictures: ["https://studs23.s3.amazonaws.com/uploads/1678279425049/DSCF2944.jpg", "https://studs23.s3.amazonaws.com/uploads/1678279425043/DSC01748.jpg", "https://studs23.s3.amazonaws.com/uploads/1678279425037/Copy of STUDS_046.png", "https://studs23.s3.amazonaws.com/uploads/1678279425033/Copy of STUDS_003.png", "https://studs23.s3.amazonaws.com/uploads/1678279425021/A MF_IG_cover 2.png"],
    frontPicture: "https://studs23.s3.amazonaws.com/uploads/1678279425049/DSCF2944.jpg",
    published: true,
    author: {
      id: "637fd99308d924036862bc2a",
      firstName: "Jonas",
      lastName: "Hulth\\u00e9n",
      studsYear: 2023,
      info: {
        role: UserRole.EventGroup,
        email: "jonas@studs.se",
        linkedIn: "https://www.linkedin.com/in/jonas-hulthen",
        phone: "0723229892",
        picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/jonas.png",
        permissions: []
      }
    }
  },
  {
    id: "644bc00b70a44a85b02a4abb",
    title: "TriOptima",
    description: "Last week, Studs had an amazing event celebrating our ten year Studsiversary\u2122 with TriOptima at their beautiful office in central Stockholm! They are an international B2B fintech company specializing in designing effective, digitalized solutions for the OTC derivatives market. Founded in 2000, TriOptima currently has around 300 employees around the world with a majority of employees in Stockholm and others in places like New York and Singapore. TriOptima\u2019s services provide critical operational and credit risk management tools, and their clients include many of the world\u2019s largest financial institutions and corporations.\n\nThe evening began with dinner while TriOptima\u2019s CTO took us on a journey back in time to the wild adventures (and wild haircuts) of Studs during the 90\u2019s and their trip to the United States. He also might have mentioned something about the history of TriOptima, their business area and their clients along the way! We then heard from two developers who talked about what it\u2019s like working at TriOptima and described the company\u2019s work culture. After these presentations, we got a tour around their huge office and then we joined small information sessions where we could talk to employees about different topics such as development, master\u2019s theses or equality and diversity. The rest of the evening was spent mingling on the rooftop terrace and playing table tennis, darts and billiards inside by the bar. An incredible evening that we only have TriOptima to thank for. Here\u2019s to ten more years with Studs!\n\n\\image-0\n\\image-1\n\\image-2\n",
    date: new Date(1651766400000),
    studsYear: 2022,
    pictures: ["https://studs22.s3.amazonaws.com/uploads/1652425723269/utvald3.jpg", "https://studs22.s3.amazonaws.com/uploads/1652425723250/utvald2.jpg", "https://studs22.s3.amazonaws.com/uploads/1652425723273/utvald5.jpg"],
    frontPicture: "https://studs22.s3.amazonaws.com/uploads/1652425723269/utvald3.jpg",
    published: true,
    author: {
      id: "619ceaba08dc1200161ea5bd",
      firstName: "Julius",
      lastName: "Albiz",
      studsYear: 2022,
      info: {
        role: UserRole.EventGroup,
        email: "julius@studs.se",
        picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/julius.jpg",
        permissions: []
      }
    }
  },
  {
    id: "644bc00b70a44a85b02a4ab8",
    title: "Visma",
    description: "Studs\u2019 next visit was at Visma! With over a million customers and around 15,000 employees, Visma is one of the top five software providers in the EU and they deliver business-critical solutions for companies and organizations of all sizes. They simplify many essential business tasks to help their clients grow and they offer both consulting services as well as products within areas such as accounting, invoicing, procurement and school administration. Due to the importance of these solutions, Visma has been able to maintain a steady profit and growth since its founding in 1996 even during the financial crisis of 2008 and the recent global pandemic.\n\nDuring the event, we got to enjoy delicious meze while learning about Visma from several of their employees and about their personal journeys and roles at the company. Afterwards, we split up in teams and were tasked with designing an e-learning platform inspired by Airbnb\u2019s 11-star experience framework. This task had us thinking of what experiences would constitute the worst possible e-learning experience - think bugs and viruses and unending targeted ads - to the best and perhaps most unrealistic 11-star experience we could think of. This great brainstorming activity led to a lot of laughter when each team presented their ideas and finally, the team with the best ideas won some nice prizes! A fantastic evening, rounded off with some table tennis, shuffleboard and casual mingling. Thank you, Visma!\n\n\n\\image-0\n\\image-1\n\\image-2\n",
    date: new Date(1651161600000),
    studsYear: 2022,
    pictures: ["https://studs22.s3.amazonaws.com/uploads/1651821427135/b37_01.jpg", "https://studs22.s3.amazonaws.com/uploads/1651821427154/b43_01.jpg", "https://studs22.s3.amazonaws.com/uploads/1651821427151/b15_01.jpg"],
    frontPicture: "https://studs22.s3.amazonaws.com/uploads/1651821427135/b37_01.jpg",
    published: true,
    author: {
      id: "617951b1874bf80015f93f52",
      firstName: "Emelie",
      lastName: "Lindborg",
      studsYear: 2022,
      info: {
        role: UserRole.EventGroup,
        email: "emelie@studs.se",
        linkedIn: "https://www.linkedin.com/in/emelielindborg",
        picture: "https://studs22.s3.eu-north-1.amazonaws.com/leaderGroupImages/emelie.jpg",
        permissions: []
      }
    }
  },
  {
    id: "644bc00b70a44a85b02a4aaa",
    title: "Mpya Digital",
    description: "Last week, Studs had the pleasure to attend an incredibly fun event with Mpya Digital at their office. Mpya is a tech-consultancy based in Stockholm that has been growing since 2018 with 59 employees and counting. Mpya's mantra is \u201cWork is joy\u201d and they follow it by focusing on personal development and establishing a non-hierarchical structure that allows them to practice self-management so that employees have a greater sense of freedom and responsibility in their work.\n\nAt first glance, one might suspect that their mantra is merely a sales pitch but as soon as the event started, we all knew this was not the case. The atmosphere of the office was festive and relaxed, and after a short introduction of the company and their employees, everyone was mingling in smaller groups. We thus had the chance to talk to their employees and ask any questions we might have. It felt like we could just relax and enjoy ourselves! They also arranged a fun competition where we got to put our CSS skills to the test by trying to replicate given images using HTML and CSS.\n\nA big thanks to Mpya for having us and for showing us the meaning of their mantra!\n\n\n\\image-0\n\\image-1\n\\image-2\n",
    date: new Date(1645713960000),
    studsYear: 2022,
    pictures: ["https://studs22.s3.amazonaws.com/uploads/1646297508833/webbsida1.jpg", "https://studs22.s3.amazonaws.com/uploads/1646297512873/webbsida2.jpg", "https://studs22.s3.amazonaws.com/uploads/1646297641503/webbsida5.jpg"],
    frontPicture: "https://studs22.s3.amazonaws.com/uploads/1646297508833/webbsida1.jpg",
    published: true,
    author: {
      id: "619cea9308dc1200161ea5bb",
      firstName: "Luciano",
      lastName: "Zapata",
      studsYear: 2022,
      info: {
        role: UserRole.EventGroup,
        email: "luciano@studs.se",
        picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/luciano.jpg",
        permissions: []
      }
    }
  },
  {
    id: "644bc00b70a44a85b02a4ab4",
    title: "ILT Education",
    description: "Last week, Studs had an amazing event with ILT Education at their office in Hammarby Sj\u00f6stad. As the name implies, ILT Education is a company working with educational technology and their primary focus is assisting children and students with foreign backgrounds or with difficulties reading and writing. Their products mainly include digital libraries of educational content and books translated into 60 languages for children in kindergarten all the way up to students in high school. These products are sold to schools and they provide teachers with additional engaging and educational ways of teaching languages. With over 80 employees, ILT Education is currently active in 10 countries around the world and their services are used in a majority of kindergartens and schools in Sweden. \n\nThe event began with mingling over drinks and snacks after which a short presentation of the company was held. We then enjoyed a fittingly international buffet with dishes from Germany, Norway, Finland, France and the USA while talking with employees and learning even more about what they do at ILT Education. When we were done, we got a tour of their large office which included 16 soundproof rooms for audiobook recordings! Finally, our coding skills were put to the test as we participated in a group coding tournament. After several rounds of elimination, a winning team was announced and a prize was awarded. The evening concluded with us having the opportunity to mingle even further, play table tennis and board games! Thank you, ILT Education, for a wonderful event!\n\n\\image-0\n\\image-1\n\\image-2\n",
    date: new Date(1649260800000),
    studsYear: 2022,
    pictures: ["https://studs22.s3.amazonaws.com/uploads/1649766657793/1280720-2.jpg", "https://studs22.s3.amazonaws.com/uploads/1649766657816/1280720-5.jpg", "https://studs22.s3.amazonaws.com/uploads/1649766658780/1280720-3.jpg"],
    frontPicture: "https://studs22.s3.amazonaws.com/uploads/1649766657793/1280720-2.jpg",
    published: true,
    author: {
      id: "617951b1874bf80015f93f52",
      firstName: "Emelie",
      lastName: "Lindborg",
      studsYear: 2022,
      info: {
        role: UserRole.EventGroup,
        email: "emelie@studs.se",
        linkedIn: "https://www.linkedin.com/in/emelielindborg",
        picture: "https://studs22.s3.eu-north-1.amazonaws.com/leaderGroupImages/emelie.jpg",
        permissions: []
      }
    }
  },
  {
    id: "644bc00c70a44a85b02a4abe",
    title: "Monterro",
    description: "Time flies when you are having fun, and last Tuesday, we had the last event of Studs 2022 before our study trip in the summer. We sure ended on a high note, as Monterro welcomed us to their office and told us about their work on the rooftop terrace over a glass of champagne. Monterro is a venture capital firm, and since their founding in 2012, they have become the leading B2B software investor in the Nordics. The partners at Monterro have long histories in the software business and are thus able to support companies in all aspects of growth, not only through investments. \n\nAfter enjoying the sun for a while, we headed into their office for dinner and listened to presentations of three companies that Monterro has invested in. First off was Pythagoras, a company working with an innovative cloud platform for property, real estate, and facility management. Next up was Viedoc, a global data management provider for pharmaceutical companies and contract research organizations conducting clinical trials. Last but not least, we learned about Lumera where they work with providing policy administration systems and digital solutions in the Nordic life and pension industry. We then participated in a Kahoot quiz about the presentations that would decide the winners of the evening\u2019s competition. The two lucky winners each got an interview at one of the three companies as well as their own bottle of champagne. A wonderful event and a perfect ending for the event season of Studs 2022! Thank you, Monterro!\n\n\\image-0\n\\image-1\n\\image-2\n",
    date: new Date(1652803200000),
    studsYear: 2022,
    pictures: ["https://studs22.s3.amazonaws.com/uploads/1653652040232/1280720-3.jpg", "https://studs22.s3.amazonaws.com/uploads/1653652040335/1280720-7.jpg", "https://studs22.s3.amazonaws.com/uploads/1653652040285/1280720-6.jpg"],
    frontPicture: "https://studs22.s3.amazonaws.com/uploads/1653652040232/1280720-3.jpg",
    published: true,
    author: {
      id: "619ceaca08dc1200161ea5be",
      firstName: "Samuel",
      lastName: "S\\u00f6derberg",
      studsYear: 2022,
      info: {
        role: UserRole.EventGroup,
        email: "samuel@studs.se",
        picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/samuel.jpg",
        permissions: []
      }
    }
  },
  {
    id: "644bc00b70a44a85b02a4aad",
    title: "Scania",
    description: "Trucks are perhaps what most people think of when they hear Scania. During last Tuesday's online event with the company, Studs learned that they work with much more than that. With over 50 thousand employees in over 100 countries, Scania is a world-leading provider of transport solutions and this is only possible due to their expertise in both software and hardware systems. They are currently working towards increasing automation, connectivity and electrification of the transportation industry and they are ultimately aiming to produce fully autonomous trucks. Consequently, Scania offers a multitude of job opportunities ranging from developing new hardware components such as sensors, to working with full stack development or machine learning.\n\nThe event began with a presentation where we learned about Scania as a company, what technologies they work with and where they are heading. Afterwards, we got to see a real-time demo of their Intelligent Control Environment that allows them to track their autonomous trucks and assign them different tracks remotely. Finally, we participated in a Q&A session and a quiz where the three winners got to qualify for the Scania Code Challenge later this year! Thank you, Scania, for an interesting and informative event!\n\n\\image-0\n\\image-1\n\\image-2\n",
    date: new Date(1646726400000),
    studsYear: 2022,
    pictures: ["https://studs22.s3.amazonaws.com/uploads/1647183060188/1_trucks1280720.jpg", "https://studs22.s3.amazonaws.com/uploads/1647183060269/3_winner1280720.jpg", "https://studs22.s3.amazonaws.com/uploads/1647183060201/2_shift1280720.jpg"],
    frontPicture: "https://studs22.s3.amazonaws.com/uploads/1647183060188/1_trucks1280720.jpg",
    published: true,
    author: {
      id: "619ceaa708dc1200161ea5bc",
      firstName: "Amanda",
      lastName: "Berg",
      studsYear: 2022,
      info: {
        role: UserRole.EventGroup,
        email: "amanda-b@studs.se",
        linkedIn: "https://www.linkedin.com/in/amanda-josefin-berg/",
        picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/amanda-b.jpg",
        permissions: []
      }
    }
  },
  {
    id: "644bc00c70a44a85b02a4ac3",
    title: "Storykit",
    description: "Studs 2023 visited Storykit! Storykit was founded in 2018 that provides a text-to-video tool for individuals and businesses to create engaging visual content. With over 130 employees, Storykit is constantly innovating its product offerings and improving its technology to better serve its customers. Their philosophy is the belief that video is a powerful medium for storytelling. The company is organized into three main product areas: Tool, Admin, and Onboard, each with a specific focus and function. The company also places a strong emphasis on technology, with dedicated teams working on Render, AI/ML, and other technical areas. Storykit encourages its employees to attend courses, seminars, and other professional development opportunities to stay up-to-date with the latest trends and best practices in the industry.\n\nThe Storykit team warmly welcomed us to their spacious office in R\u00e5dmansgatan. Before listening to CTO Roger Str\u00f6m\u2019s presentation, we picked up our amazing food and fueled ourselves for the evening. After the presentation, we were separated into teams and given a tour of the office. Storykit prepared a friendly competition for the evening. The task was to use Storykit\u2019s tool to create an informative video about the history and description of the STUDS. Each team picked a room to work in and started brainstorming for the video. Toward the end of the evening, each video was presented to the room and voted on by the participants. The winning team made a video about the great migration of STUDS students and received the best video trophy. A big thank you to everyone at Storykit for a great evening!\n\n\n\\image-0\n\\image-1\n\\image-2\n\\image-3\n\\image-4\n",
    date: new Date(1677573000000),
    studsYear: 2023,
    pictures: ["https://studs23.s3.amazonaws.com/uploads/1678696323571/DSC01766.jpg", "https://studs23.s3.amazonaws.com/uploads/1678696323591/DSC01792.jpg", "https://studs23.s3.amazonaws.com/uploads/1678696323613/DSCF3019.jpg", "https://studs23.s3.amazonaws.com/uploads/1678696323532/A IG_cover_Storykit.png", "https://studs23.s3.amazonaws.com/uploads/1678696323601/DSCF3081.jpg"],
    frontPicture: "https://studs23.s3.amazonaws.com/uploads/1678696323571/DSC01766.jpg",
    published: true,
    author: {
      id: "637fd9a408d924036862bc2b",
      firstName: "Kevin",
      lastName: "Huang",
      studsYear: 2023,
      info: {
        role: UserRole.EventGroup,
        email: "kevin@studs.se",
        linkedIn: "https://www.linkedin.com/in/kevin-huang-22b495197/",
        picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/kevin.png",
        permissions: []
      }
    }
  },
  {
    id: "644bc00b70a44a85b02a4aab",
    title: "Karma",
    description: "Last Wednesday, Studs got the opportunity to meet with Karma - Europe\u2019s leading digital platform for combating food waste and driving sustainability in restaurants. Over the last two years, Karma and the entire restaurant business have faced difficult challenges and the company has decreased in size as a consequence. Despite this, Karma now has over two million users of their service and ten thousand partners, and they are currently expanding. Karma also has an \u201cOrder & Pay\u201d system which lets restaurants take digital orders and payments to be more efficient and serve more clients. The catch is that using this system requires the restaurant to provide climate compensation for each order made, thus creating a win-win-win situation for Karma, the restaurant and the environment.\n\nDuring the event, we got to enjoy wonderful food at their office and learn about their company, their journey and what their plans are for the future. We also participated in a so-called fireside chat which served as a back-and-forth Q&A session between Karma employees and Studs members. It gave us the opportunity to ask each other more formal and serious questions and learn from the answers. A great evening rounded off with casual mingling, beer pong and table tennis. Thank you, Karma!\n\n\n\\image-0\n\\image-1\n\\image-2\n",
    date: new Date(1646238600000),
    studsYear: 2022,
    pictures: ["https://studs22.s3.amazonaws.com/uploads/1646837120839/000.jpg", "https://studs22.s3.amazonaws.com/uploads/1646837146389/2.jpg", "https://studs22.s3.amazonaws.com/uploads/1646837146385/1.jpg"],
    frontPicture: "https://studs22.s3.amazonaws.com/uploads/1646837120839/000.jpg",
    published: true,
    author: {
      id: "619cea9308dc1200161ea5bb",
      firstName: "Luciano",
      lastName: "Zapata",
      studsYear: 2022,
      info: {
        role: UserRole.EventGroup,
        email: "luciano@studs.se",
        picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/luciano.jpg",
        permissions: []
      }
    }
  },
  {
    id: "644bc00b70a44a85b02a4ab6",
    title: "Stockholm Code Group",
    description: "After a brief hiatus from Studs events for the Easter holidays, we are back with a vengeance and our first event was with Stockholm Code Group! They are a small IT consulting firm founded in 2007 that specializes in modern systems development and architecture. They have grown organically since then into a team of 18 people and are now actively looking to expand further. Stockholm Code Group values and looks for a genuine interest in technology in their employees as they consider themselves developers first and consultants second.\n\nThe event began with us enjoying our choice of the Korean specialties Bibimbap or Japchae while listening to an insightful presentation where we learnt how the company has evolved, about their values and how they work with their customers. After a small break, there was another entertaining presentation about various fun projects that they\u2019ve worked on at Stockholm Code Group. \n\nAfterwards, it was high time for an activity. We got to compete in groups by trying to replicate a rather sophisticated Lego chicken by following the instructions of one team member who got to see a blueprint of said chicken and who had to memorize it and guide the group without looking at their work. The resemblance of our final results to the original chicken were quantified using a surprisingly rigorous scoring system and the two teams with best scores won some amazing prizes. The event was wrapped up with some mingling and chatting with the employees where we even got some sweet merch like sweaters and t-shirts! Thank you for an amazing event, Stockholm Code Group! \n\n\\image-0\n\\image-1\n\\image-2\n",
    date: new Date(1650988800000),
    studsYear: 2022,
    pictures: ["https://studs22.s3.amazonaws.com/uploads/1651406968481/1280720-6.jpg", "https://studs22.s3.amazonaws.com/uploads/1651406968476/1280720-3.jpg", "https://studs22.s3.amazonaws.com/uploads/1651406968448/1280720-4.jpg"],
    frontPicture: "https://studs22.s3.amazonaws.com/uploads/1651406968481/1280720-6.jpg",
    published: true,
    author: {
      id: "619ceaa708dc1200161ea5bc",
      firstName: "Amanda",
      lastName: "Berg",
      studsYear: 2022,
      info: {
        role: UserRole.EventGroup,
        email: "amanda-b@studs.se",
        linkedIn: "https://www.linkedin.com/in/amanda-josefin-berg/",
        picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/amanda-b.jpg",
        permissions: []
      }
    }
  },
  {
    id: "644bc00c70a44a85b02a4ac0",
    title: "Etimo",
    description: "Studs 2023 continues their visit with Etimo! Etimo is an IT consulting company that develops tailor-made digital solutions and web applications. Johan, the CEO, mentioned in his presentation that the company started with the headline \u201cBetter software for a better world\u201d in 2014. Ever since then, they have focused on building a great team, all united by a passion for developing digital solutions, using modern technology with a desire to benefit society. The company currently has 20 employees. Etimo primarily works with Stockholm-based tech companies such as Blocket, SEB, and TELE 2. The company takes pride in its core values: competence, openness, and social benefit. Etimo started \u201cEtimo Ventures\u201d 2 years ago where they invest in, cooperate with startups, and become their primary development partner.\n\nThe office was cozy and felt more like a family than an office. During the presentation given by the CEO and employees, we learned more about Etimo, its values, and career opportunities. Etimo seems like they care about individual career development, skill development, creativity, and the happiness of the employees. Following the presentation, everybody enjoyed delicious pizzas and Bengali food with various drink options. During the event, Studs students had numerous activities to pick up. The most popular activities were Mario Kart and VR. Throughout the event, each student had an opportunity to chat and ask questions to the Etimo employees. They were super friendly and genuine. we would say, one word to summarise the event is SINCERE. Etimo is constantly looking for fresh and young minds so Juniors are needed! If you like an up-tempo life, Etimo might be a place for you. A big thank you to everyone at Etimo for a great evening!\n\n\n\\image-0\n\\image-1\n\\image-2\n\\image-3\n\\image-4\n",
    date: new Date(1675357200000),
    studsYear: 2023,
    pictures: ["https://studs23.s3.amazonaws.com/uploads/1677488340200/DSCF2762.jpg", "https://studs23.s3.amazonaws.com/uploads/1677488340184/DSC01686.jpg", "https://studs23.s3.amazonaws.com/uploads/1677488340206/DSCF2756.jpg", "https://studs23.s3.amazonaws.com/uploads/1677488340196/DSC01711.jpg", "https://studs23.s3.amazonaws.com/uploads/1677488340211/Etimo_IG_Cover.png"],
    frontPicture: "https://studs23.s3.amazonaws.com/uploads/1677488340200/DSCF2762.jpg",
    published: true,
    author: {
      id: "637fda5708d924036862bc31",
      firstName: "Sanherib",
      lastName: "Elia",
      studsYear: 2023,
      info: {
        role: UserRole.EventGroup,
        email: "sanherib@studs.se",
        linkedIn: "https://www.linkedin.com/in/sanherib-elia/",
        picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/sanherib.png\\n",
        permissions: []
      }
    }
  },
  {
    id: "644bc00c70a44a85b02a4abc",
    title: "FRA",
    description: "We had a unique event when F\u00f6rsvarets Radioanstalt (FRA) came to KTH to tell us about themselves. FRA is a civil authority and a part of the Swedish secret service working under the Department of Defense. As such, they could not disclose any detailed information about what they work with or how they work with it. However, their primary goal is to protect Sweden and Swedish interests, and this entails working with signals intelligence, cryptanalysis and secure information systems. FRA was founded in 1942 and currently has around 900 employees with their main office on Lov\u00f6n just outside of Stockholm.\n\nThe event started out with a short presentation where we learned about FRA\u2019s secretive work, their history as well as their thorough application and screening process. Afterward, we got to tackle problems and solve tasks that are similar to the sort of work they do at FRA. For instance, we had to decipher encoded messages and utilize graph theory to obtain information about an imaginary criminal organization. The evening was rounded off with some mingling and chatting that broadened our understanding of the exciting work that FRA employees do. Thank you, FRA, for coming to META and sharing a taste of what your work entails. It was fascinating!\n\n\n\\image-0\n\\image-1\n",
    date: new Date(1652198400000),
    studsYear: 2022,
    pictures: ["https://studs22.s3.amazonaws.com/uploads/1653296528916/1280720-5.jpg", "https://studs22.s3.amazonaws.com/uploads/1653296528920/1280720-2.jpg"],
    frontPicture: "https://studs22.s3.amazonaws.com/uploads/1653296528916/1280720-5.jpg",
    published: true,
    author: {
      id: "619ceaa708dc1200161ea5bc",
      firstName: "Amanda",
      lastName: "Berg",
      studsYear: 2022,
      info: {
        role: UserRole.EventGroup,
        email: "amanda-b@studs.se",
        linkedIn: "https://www.linkedin.com/in/amanda-josefin-berg/",
        picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/amanda-b.jpg",
        permissions: []
      }
    }
  },
  {
    id: "644bc00c70a44a85b02a4abd",
    title: "Valtech",
    description: "Studs recently had the pleasure of visiting Valtech at their unique office in Kungsholmen! Valtech is a global IT consulting agency, originally founded in France in 1993, with over 4000 employees and 51 offices in 18 different countries around the world. They help their clients grow by focusing on business transformation and creating value through technology, which is where their name comes from. Valtech is looking to expand and they are offering a 13-week tech talent program which serves as an excellent transition from the academic to the professional world. It is also possible to conduct one\u2019s Master\u2019s thesis at Valtech, where they provide you with a supervisor and help you find interesting research questions.\n\nThe event began with an amazing dinner and exciting presentations of the company, the work culture and various projects they have undertaken through the years. After these presentations and a solid Q&A session with our curious Studs\u2019 members, we got a tour of their office. It was probably the most unique office we\u2019ve been to, seeing as the building was originally built in 1850 as a royal mint that produces Swedish coins and bills. The building has been very well preserved and their offices have everything one would expect from a modern IT consultancy with the added benefit of having a cool, historical flair.\n\nWe then continued with a presentation of the Tech Girl initiative at Valtech where we learned about how they work to inspire and motivate young girls to pursue technical careers and teach them how to code. Lastly, we split into teams and competed to find out who could program a robot in Scratch to successfully navigate an obstacle course. It turned out that none of us really did, but it was great fun nonetheless and a lot of the robots came quite close to making it! Thank you, Valtech, for having us for the first time - it was terrific!\n\n\n\\image-0\n\\image-1\n\\image-2\n",
    date: new Date(1652371200000),
    studsYear: 2022,
    pictures: ["https://studs22.s3.amazonaws.com/uploads/1653484821055/B0000038.jpg", "https://studs22.s3.amazonaws.com/uploads/1653484821059/B0000104.jpg", "https://studs22.s3.amazonaws.com/uploads/1653484821034/B0000034.jpg"],
    frontPicture: "https://studs22.s3.amazonaws.com/uploads/1653484821055/B0000038.jpg",
    published: true,
    author: {
      id: "619cea9308dc1200161ea5bb",
      firstName: "Luciano",
      lastName: "Zapata",
      studsYear: 2022,
      info: {
        role: UserRole.EventGroup,
        email: "luciano@studs.se",
        picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/luciano.jpg",
        permissions: []
      }
    }
  },
  {
    id: "644bc00a70a44a85b02a4a9e",
    title: "Hidden dreams",
    description: "A while ago, Studs got to meet with Hidden Dreams, a startup factory working with digitalisation of time-consuming processes, and hidden problems, within large companies. Hidden Dreams acts as a business incubator, as an investment company and provides a network of people with similar interests and ambitions. Furthermore, Hidden Dreams helps out in building early prototypes, as well as the the real product, once the first customer has signed up. As of today, Hidden Dreams has six subsidiaries active in different industries, and aim to build 50 more in the closest years.\n\nDuring our digital event, Studs got to meet representatives both from Hidden Dreams' own team and from some of the subsidiaries. We had great conversations all around, from the topic of maintaining legacy code to working in a start-up company. The evening was finished with a round of Skribbl! \ud83d\udd8c\ufe0f\ud83c\udfa8 Thank you to Hidden Dreams for an amazing event! \ud83e\udd73\n\n\\image-0\n\\image-1\n\\image-2\n\\image-3\n",
    date: new Date(1616695200000),
    studsYear: 2021,
    pictures: ["https://studs21.s3.amazonaws.com/uploads/1620228885568/bild1-2.jpg", "https://studs21.s3.amazonaws.com/uploads/1620228894900/bild1-2.jpg", "https://studs21.s3.amazonaws.com/uploads/1620228895077/bild3-3.jpg", "https://studs21.s3.amazonaws.com/uploads/1620228894985/bild2-3.jpg"],
    frontPicture: "https://studs21.s3.amazonaws.com/uploads/1620228885568/bild1-2.jpg",
    published: true,
    author: {
      id: "5fb278e69fca82b6f5faf81c",
      firstName: "Sarah",
      lastName: "Narrowe Danielsson",
      studsYear: 2021,
      info: {
        role: UserRole.EventGroup,
        email: "sarah@studs.se",
        picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/sarah.jpg",
        permissions: []
      }
    }
  },
  {
    id: "644bc00a70a44a85b02a4aa4",
    title: "Storykit",
    description: "Recently, Studs and Storykit met over Zoom for yet another captivating digital event \ud83c\udf89 Storykit is a Stockholm-based company of 30 people, of which 5 work as developers, building a smart storytelling and video-editing platform. The cloud-based service they provide turns written text into video with an emphasis on straight-forward and tailor-made workflows \u270d\ufe0f Most of their users work with marketing, communications or sales, and Storykit provides an excellent tool that helps their customers in their daily work.\n\nDuring the event, Studs got a demo of the product to understand the workflow used by the customers, from script to video. During the evening we joined an informative presentation about the company, a Q&A session in breakout rooms and finally a nice quiz to gauge our retention. We got to meet both people from tech and talent, and even hear about an ongoing master thesis project. Thanks to Storykit for this opportunity! \ud83e\udd29\n\n\\image-0\n\\image-1\n\\image-2\n",
    date: new Date(1618876800000),
    studsYear: 2021,
    pictures: ["https://studs21.s3.amazonaws.com/uploads/1620229185249/bild2-2.jpg", "https://studs21.s3.amazonaws.com/uploads/1620229185239/bild1-1.jpg", "https://studs21.s3.amazonaws.com/uploads/1620229185251/bild3-2.jpg"],
    frontPicture: "https://studs21.s3.amazonaws.com/uploads/1620229185249/bild2-2.jpg",
    published: true,
    author: {
      id: "5fb278e69fca82b6f5faf81c",
      firstName: "Sarah",
      lastName: "Narrowe Danielsson",
      studsYear: 2021,
      info: {
        role: UserRole.EventGroup,
        email: "sarah@studs.se",
        picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/sarah.jpg",
        permissions: []
      }
    }
  },
  {
    id: "644bc00b70a44a85b02a4aac",
    title: "Toptracer",
    description: "Last week, Studs had an amazing event with Toptracer - a company founded in 2006 that develops tracing technology for golf ranges around the world. Sometimes known by the name of their parent company, Topgolf, they have revolutionized the game of golf by becoming essential to the viewing experience of any golf TV broadcast where the ball trace is now a necessity. The company traced nearly three billion shots during 2021 and it has also been shown that the average player takes more shots in a range that includes Toptracer technology than one that does not. In addition to the ball tracing, the technology also provides additional data such as initial velocity, apex and various carry distances of each shot. Despite coming across as a very niche business area, Toptracer works on several different products concurrently such as their Broadcast and Range platforms and they are becoming increasingly popular. Toptracer has grown from having 16 employees in 2016 to over 130 in 2021 and they are looking to expand even further.\n\nThe event started off with a detailed and informative presentation of the whole company where we learned everything there is to know about their different product lines as well as Toptracer\u2019s journey as a company. Afterwards, we had a chance to talk to the employees over pizza and drinks and then we proceeded with a competition in smaller groups where we performed team activities and learnt even more about the Toptracer\u2019s work. The activities included trying out their golf simulator, playing darts and mini-golf, and ultimately, the winning team was revealed and rewarded with Toptracer goody bags! The evening concluded with everyone mingling, chatting and playing some more darts, golf and table tennis. Thank you to Toptracer for a truly memorable event!\n\n\\image-0\n\\image-1\n\\image-2\n",
    date: new Date(1646326800000),
    studsYear: 2022,
    pictures: ["https://studs22.s3.amazonaws.com/uploads/1646988648706/16_9_0.jpg", "https://studs22.s3.amazonaws.com/uploads/1646988648750/16_9_2.jpg", "https://studs22.s3.amazonaws.com/uploads/1646988648698/16_9_1.jpg"],
    frontPicture: "https://studs22.s3.amazonaws.com/uploads/1646988648706/16_9_0.jpg",
    published: true,
    author: {
      id: "619cea9308dc1200161ea5bb",
      firstName: "Luciano",
      lastName: "Zapata",
      studsYear: 2022,
      info: {
        role: UserRole.EventGroup,
        email: "luciano@studs.se",
        picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/luciano.jpg",
        permissions: []
      }
    }
  },
  {
    id: "644bc00b70a44a85b02a4aaf",
    title: "Cygni",
    description: "The Studs event train keeps chugging along and our next stop was at Cygni - an IT consulting firm founded in 2006. With over 220 employees and offices in different major cities in Sweden such as Stockholm, G\u00f6teborg, Malm\u00f6 and Link\u00f6ping, Cygni has been awarded for being Europe\u2019s best workplace five years in a row by the foundation \u201cA Great Place to Work\u201d! This is not a coincidence either, because this has been Cygni\u2019s vision and primary goal since day one - to be the best possible employer for their consultants. To achieve this, they focus on personal growth and development within the company and they enable their consultants to actively choose what tasks and technologies they want to work with. This is further supported by the fact that all employees have a fixed salary, which implies that people on the sales team have no monetary incentive to try to assign a consultant a job that they do not want or that they are unsuitable for. \n\nAdditionally, Cygni are active in matters concerning the environment and equality by providing full climate compensation for their business and organizing events with Datatjej and Pride. Cygni also offers a two-year talent program for newly graduated students which is a full-time employment with the opportunity to take part in a paid, personal education plan that you create with your mentor at Cygni!\n\nNeedless to say, the event was incredibly informative and insightful! It started off with some mingling during dinner, after which we listened to a presentation of the company and what sets them apart from other consultancies. After a small break, we participated in a panel session where we got to ask the panelists questions and learn even more about what it\u2019s like working at Cygni. The evening concluded with some more casual mingling and discussions with the employees in smaller groups. A great evening and an inspiring event! Thank you, Cygni!\n\n\\image-0\n\\image-1\n\\image-2\n",
    date: new Date(1647968400000),
    studsYear: 2022,
    pictures: ["https://studs22.s3.amazonaws.com/uploads/1648213569823/1280720-9477.jpg", "https://studs22.s3.amazonaws.com/uploads/1648213569836/1280720-9516.jpg", "https://studs22.s3.amazonaws.com/uploads/1648213575468/1280720-9522.jpg"],
    frontPicture: "https://studs22.s3.amazonaws.com/uploads/1648213569823/1280720-9477.jpg",
    published: true,
    author: {
      id: "619ceaba08dc1200161ea5bd",
      firstName: "Julius",
      lastName: "Albiz",
      studsYear: 2022,
      info: {
        role: UserRole.EventGroup,
        email: "julius@studs.se",
        picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/julius.jpg",
        permissions: []
      }
    }
  },
  {
    id: "644bc00b70a44a85b02a4ab1",
    title: "Modular Finance",
    description: "Another fantastic event for Studs, this time with Modular Finance at their new office! Modular Finance is a SaaS fintech company, meaning that they offer Software as a Service within the field of financial technology. In practice, this means that they provide a range of digital products with a strong focus on customer usability to financial institutions like banks, stock brokers or other listed companies that work with equities. They currently have six different products across the two categories \u201cBank & Finance\u201d and \u201cListed companies\u201d that they offer to their 1300 customers, varying from start-ups to corporate giants. Since their launch in 2013, Modular Finance has grown to where it is today with around 35 employees and an incredible 100MSek in turnover!\n\nThe event started off with a presentation of the company and a demo of some of their different products while we enjoyed our meals. Afterwards, it was time for a competition called Capture The Flag where we competed in teams to answer trivia questions and solve programming challenges of varying difficulty to find flags that award points. It was great fun and each member of the winning team got awarded with brand new board games! The evening ended with casual mingling and a whole lot of shuffleboard! Thank you, Modular Finance, for a super fun event!\n\n\\image-0\n\\image-1\n\\image-2\n",
    date: new Date(1648141200000),
    studsYear: 2022,
    pictures: ["https://studs22.s3.amazonaws.com/uploads/1648633412604/1280720-3.jpg", "https://studs22.s3.amazonaws.com/uploads/1648633412624/1280720-4.jpg", "https://studs22.s3.amazonaws.com/uploads/1648633421512/1280720-5.jpg"],
    frontPicture: "https://studs22.s3.amazonaws.com/uploads/1648633412604/1280720-3.jpg",
    published: true,
    author: {
      id: "619ceaca08dc1200161ea5be",
      firstName: "Samuel",
      lastName: "S\\u00f6derberg",
      studsYear: 2022,
      info: {
        role: UserRole.EventGroup,
        email: "samuel@studs.se",
        picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/samuel.jpg",
        permissions: []
      }
    }
  },
  {
    id: "644bc00b70a44a85b02a4ab9",
    title: "Startup-pub",
    description: "So far, Studs has visited one new company for each of our events, but this Monday, we had the pleasure of welcoming no fewer than four amazing startups to META where we enjoyed a pub together. After some mingling over food and drinks, the companies held inspiring presentations where we learned what they work with, how they got to where they are and their plans for the future. \n\nSana Labs, founded in 2016 and with already over 40 employees, creates personalized and collaborative learning platforms for their clients across various industries. For example, Sana was used across healthcare systems worldwide during the pandemic 2020 to educate healthcare workers and help fight COVID-19. \n\nLEIA is in its earlier stages of development with a team of 5 employees and the goal of redefining postpartum health. They have a working mobile application that tracks new mothers\u2019 health and gives them health insights and information about whether their symptoms are normal or not. LEIA also plans on extending their app with the means to create communities of new and expecting mothers who can support and help each other.\n\nMilkywire was founded over three years ago with the goal of empowering people who want to have an impact and they have now grown to a total of 43 employees. Together, they are creating a digital platform to make donating to charity easier and more transparent by connecting people and companies to trusted grassroot projects around the world.\n\nAbios Gaming is a business-to-business company that provides industry-leading esports data. With nine years of industry experience and over 50 employees, they help esports enterprises grow by providing historical and live data, statistics and visualizations as well as data-driven ways of predicting the outcomes of matches.\n\nThe presentations were all very interesting and afterward, the evening turned into a classic pub where we all had the chance to hang out with each other and talk to the company representatives. The evening was very successful and we are all grateful to have been visited by these inspiring startups! \ud83d\udc4f\n\n\n\\image-0\n\\image-1\n\\image-2\n",
    date: new Date(1651507200000),
    studsYear: 2022,
    pictures: ["https://studs22.s3.amazonaws.com/uploads/1652085092026/B0000017.jpg", "https://studs22.s3.amazonaws.com/uploads/1652085092022/B0000032.jpg", "https://studs22.s3.amazonaws.com/uploads/1652085092030/B0000046.jpg"],
    frontPicture: "https://studs22.s3.amazonaws.com/uploads/1652085092026/B0000017.jpg",
    published: true,
    author: {
      id: "617951b1874bf80015f93f52",
      firstName: "Emelie",
      lastName: "Lindborg",
      studsYear: 2022,
      info: {
        role: UserRole.EventGroup,
        email: "emelie@studs.se",
        linkedIn: "https://www.linkedin.com/in/emelielindborg",
        picture: "https://studs22.s3.eu-north-1.amazonaws.com/leaderGroupImages/emelie.jpg",
        permissions: []
      }
    }
  }
];
