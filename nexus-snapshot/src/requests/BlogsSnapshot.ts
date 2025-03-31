import { BlogPost } from "@/models/BlogPost";
import { Permission, UserRole } from "@/models/User";

export const BlogsSnapshot: BlogPost[] = [
  {
    "id": "",
    "title": "Last day in Amsterdam",
    "description": "Our last day in Amsterdam was a chaotic one. It began with a work session in the morning where every group worked to catch up on their Studs backlog, but after that, we had the whole day to ourselves without any planned activities or events. This resulted in the forming of several smaller groups, each trying to soak up as much of the Amsterdam city life as possible before our departure to Milano the next day. Some went shopping in stores and second-hand markets, others visited the Amsterdam Chess Museum, while others rented bikes and explored the city. \n\n\\image-0\n\\image-1\n\\image-2\n",
    "date": new Date("2022-07-11T02:00:00"),
    "studsYear": 2022,
    "pictures": [
      "https://studs22.s3.amazonaws.com/uploads/1657526053232/001.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1657526053397/013.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1657526053317/004.jpg"
    ],
    "frontPicture": "https://studs22.s3.amazonaws.com/uploads/1657526041326/001.jpg",
    "published": true,
    "author": {
        id: "619ce99d08dc1200161ea5b3",
        firstName: "Aleks",
        lastName: "Petkov",
        studsYear: 2022,
        info: {
          role: UserRole.InfoGroup,
          email: "aleks@studs.se",
          linkedIn: "https://www.linkedin.com/in/aleks-petkov/",
          picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/aleks.jpg",
          permissions: []
        }
      }
  },
  {
    "id": "62ab60711c89ca0016a8b9c3",
    "title": "Iceland - second day",
    "description": "The second day of Studsresan 2022 started with the excitement of breakfast. Not necessarily excitement for the common run-of-the-mill hotel breakfast being served but rather the eagerness and satisfaction of telling everybody else about interesting events and sights seen the night prior. The plan was to eventually finish breakfast and then get going to a spa facility called Sky Lagoon, a 40-minute walk away from the hotel. With the good company of Studs and the beautiful Icelandic coastline that followed us the whole way to our destination, those 40 minutes felt like an instant and none of us noticed that our feet were tired and hurting before arriving at the spa. During the walk, we also had a workshop and discussed the differences between Iceland and Sweden, especially regarding working life.\n\n\\image-3\n\\image-4\n\nThankfully spas are one of the better places in the world to have tired and hurting feet. At first, Sky Lagoon looked like just another feature of the alien landscapes we were slowly getting used to seeing. An architectural marvel of rocky cliff-like walls and a grass roof blending in with the walls in different interesting shapes and angles. Had it not been for the parking lot, at a quick glance, one could perhaps really miss that it was a building. Not to mention the pool with its irregular natural shapes under the open blue sky, maybe just another mountain lake of which there are plenty in Iceland. \n\n\\image-6\n\nIf some of us were eager for breakfast just earlier the same morning, each and every one of us (and our tired feet) were now intensely craving the relief of letting our bodies slide into the hot water, feeling each and every muscle slowly relax and any tensions fade away. The spa had a seven-step programme, after which one felt at least seven years younger and probably something like seventy times more relaxed. It started with the hot bath in the beautiful pool, which, other than its natural mountain lake shape, had a sky edge next to the ocean where one could lean over and gaze at the horizon, perhaps having happy thoughts about being in the relaxing hot water and not among the unforgivingly cold oceanic waves just 20 meters away. However, that would have been a short-lived though as the seven-step routine continued, and one had to plunge into an amazingly cold pool and stay for at least one minute. Unbearable for many, but some discovered that keeping your feet outside the water would enable you to stay almost as long as you wish. Perhaps it was the feet that, in protest didn\u2019t want to hurt again, finally having gotten some well-deserved rest and all. However, most likely, it has to do with many surface-level veins in that area or something in that fashion. The next steps were quick yet so satisfying. A couple of minutes in a huge sauna with a huge window out to the ocean, is a very welcome step after the cold bath. Then on to a mist shower which prepared the skin pores for a sand scrub, deeply cleansing the skin and making it as soft as that of a newborn. A hot steam sauna opened the pores and assisted the scrub to further cleanse the skin. Finally, one went into a shower with a particularly strong current to wash away every last piece of sand left from the scrub, closing the pores and presenting new fresh people, seventy times more relaxed and with baby soft skin.\n\\image-0\n\\image-1\n\\image-2\n\nThe spa was the main activity of the day and, as some of us put it,\u201dan exemplary start of the trip\u201d, however, many went on afterwards to grab dinner at some nice restaurant and further explore the city of Reykjavik, talk and make friends with some locals as well as exploring some of the sights one might have missed and found out about during the breakfast earlier in the morning.\n\n\\image-5",
    "date": new Date("2022-06-16T02:00:00"),
    "studsYear": 2022,
    "pictures": [
      "https://studs22.s3.amazonaws.com/uploads/1655398438516/014.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1655398438531/027.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1655398438542/040.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1655398438462/004.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1655398438489/010.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1655398438549/041.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1655398438546/lagoon.png"
    ],
    "frontPicture": "https://studs22.s3.amazonaws.com/uploads/1655398408920/040.jpg",
    "published": true,
    "author": {
        id: "619cea0d08dc1200161ea5b6",
        firstName: "Arasp",
        lastName: "Keighobad",
        studsYear: 2022,
        info: {
          role: UserRole.InfoGroup,
          email: "arasp@studs.se",
          picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/arasp.jpg",
          permissions: [Permission.Admin]
        }
      }
  },
  {
    "id": "62b5880e8d9dbf0016514d93",
    "title": "Last day in Iceland - the bus tour",
    "description": "The last whole day in Iceland was the one in which Studs formed the most intimate relationship with its nature. An eight-hour bus trip took the group to different geological sites, each related to one of the four classical elements by the tour guide. Starting with fire, then onto water, air, and finally, earth which would end with a short hike to the bus, bringing us back to the hotel.\n\nKeri\u00f0, a volcanic crater lake, was the first stop. Although representing fire in the story told by the guide, seeing the tranquil blue water inside the caldera (bowl shape crater of a volcano) gave a false impression that no fire could have ever been present there. One has to keep in mind that days and weeks in the geological calendar as followed by planet earth, translates to centuries and millennia for us humans. It is easy to believe that the blue eye that was the lake has always been there, always surrounded by the many different colourful flowers and always gazing up to the sky, forever oblivious to the existence of fire. Looking more closely, however, one would slowly notice the traces. Red lava rock scattered among the vegetation, unbelievably light, more akin to flames than actual rocks, the caldera itself, a scar, a reminder of a violent eruption just a few weeks back in earth's calendar, although being far enough back in time for no human to be there and witness the inferno.\n\n\\image-1\n\\image-3\n\nNext up was water, enabler of life, days at the beach, and other things. Thanks to our group being back to the bus in time after Keri\u00f0, we were allowed an extra stop related to water before the main stop which would be Gullfoss. A river that had formed a small canyon with round bulb-like cliffs surrounding it. The water was intensely light blue and probably ice cold due to it being meltwater from a glacier. Unfortunately, the cliffs left the river inaccessible for any but the most adventurous types, therefore we couldn't feel how cold the water was, let alone fill our water bottles. Speaking of, there was some uncertainty among us about whether glacier water was potable or not. Our guide said it was perfectly drinkable whereas another tour guide who happened to be there advised against it. The two guides had a small argument meanwhile Studs moved on to enjoy the river from the cliffs. Many from Studs later agreed that this regrettably short extra stop was their favourite during the whole day.\n\n\\image-5\n\nGullfoss, \"Golden Falls\", was a massive waterfall which indeed displayed water and all its might. If the canyon at the previous river had taken millennia to be formed by water and its dedication, removing and carving the stone away slowly, particle by particle, standing next to Gullfoss it felt as if the current could have blown any mountain away instantly with its unforgiving ferocity, leaving nothing behind. However, this was of course not the case. In and around Gullfoss there were cliffs and rocks, tall and steady, protecting the visitors from being just that, blown away by the current.\n\n\\image-7\n\nAfter a quick stop by the road to greet some extremely cute and well-behaved Icelandic horses, probably being the hundredth tourist bus stopping by for the day, it was time for the second last destination. The one representing the air element. It was a hotspot of multiple geysers, the currently biggest and most famous of which being Strokkur. Every couple of minutes or so, Strokkur erupted in a huge 40-meter column into the air, spraying scorchingly hot hundred-degree water high in the air and leaving a trail of hot steam on its way down.\n\n\\image-2\n\nThere was a trail up a hill right next to the geysers where one could get an overview of the truly unique location. The geysers are surrounded by bushes, trees (!), and flowers in various colours, the green open vastness of the Icelandic nature in every direction, far into the distance, and finally all the tourists, among them Studs, cheering the geysers on with an amazed \"oooh\" after every eruption, perhaps encouraging them to have yet another eruption a few minutes in the future.\n\n\\image-0\n\nThe tour had come to its final stop, a small hike through a trail next to huge cliff walls with cubic rocks. A miniature mountain pass at the end of the hike reminded one of the movies where great armies are ambushed by their enemies hiding above the cliffs, doing what enemies to armies do. Perhaps some vikings in the days far gone met their fate right there, where tourists today walk back to their buses and get some last photos of the view.\n\n\\image-8\n\nThe viewpoint at the end of the hike was excellent, unbeatable. Many pictures were taken and it being the last stop implied that punctuality would not be rewarded with extra stops. Therefore, even more pictures were taken, without the pressure, stress, and the \"in, take pictures, out\" routine that had become the norm during the previous stops.\n\n\\image-6\n\nAfter a full day of listening to the memorized speech of the guide, explaining the depth of lake so and so or telling us the height of the mountain this or that, most of Studs was done for the day and rightfully so. Two adventurous lads, however, decided to not get off the tour bus at the hotel and instead get back in town to explore Reykjavik just a bit more. Realizing that it was the last night there and who knows when one finds their way back to Iceland.\n\n\\image-4\n\\image-9\n\nAmong other things, they visited the opera hall Harpan with its alluring glass tile walls. The Passenger concert that happened to be going on there was uninfiltratable as the ticket takers circled the entrances like hawks. Asking extremely nicely and politely to just enter and have a picture of the big hall was not a winning strategy either. They ate whale meat, surprised by the beef-like texture and pleased by the juicy smoky taste. Discussed how it was nothing like fish (and how that makes sense as whales are mammals and indeed more closely related to cows). Later clumsily asking a man what type interesting-looking car parking garage he is standing outside and getting the answer: \"this is the supreme court of Iceland\". On to exploring some of the darker and more depressing parts of town, regrettably seeing some disheartening things and finally ending the first country in Studsresan 2022 with waffles. Tasty tasty waffles, washing away the slight immorality of eating whale meat.\u00a0",
    "date": new Date("2022-06-24T02:00:00"),
    "studsYear": 2022,
    "pictures": [
      "https://studs22.s3.amazonaws.com/uploads/1656063750679/7.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1656063750660/1.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1656063750664/6.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1656063750677/2.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1656063750713/11.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1656063750695/3.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1656063750699/10.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1656063750716/4.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1656063750708/9.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1656063750733/12.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1656063750708/9.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1656063750733/12.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1656063750673/5.png"
    ],
    "frontPicture": "https://studs22.s3.amazonaws.com/uploads/1656064108385/5.png",
    "published": true,
    "author": {
      id: "619cea0d08dc1200161ea5b6",
      firstName: "Arasp",
      lastName: "Keighobad",
      studsYear: 2022,
      info: {
        role: UserRole.InfoGroup,
        email: "arasp@studs.se",
        picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/arasp.jpg",
        permissions: [Permission.Admin]
      }
    }
  },
  {
    "id": "62c80ad8aff8390016844cff",
    "title": "Museum, company event and boating in Amsterdam!",
    "description": "The sixth day began with a visit to the science museum. An interesting green copper building with an even more interesting inside, containing demonstrations of electricity, mechanics, forces and other things related to the sciences, presented with interactive displays where one could learn in a playful manner. \n\n\\image-3\n\\image-1\n\nAfter some free time, eating lunch and perhaps biking around the city, it was time for the second planned company visit, the one to Netlight consulting. The employees presented to Amsterdam office and their backgrounds, and afterwards, we got the chance to stay, have some drinks and talk more to the employees in order to better understand their day-to-day work.\n\n\\image-0\n\\image-5\n\nDinner this day was already planned for the whole group at the most spectacular location. Onboard a boat, smoothly riding through the inner city channels of Amsterdam, all of Studs would enjoy American pan pizza, slowly sipping on delicious Italian wine while enjoying the view of the city.\n\n\\image-4\n\\image-2\n\nAs the now solidly formed routine now mandated, evenings were reserved for leisure activities in town and rarely for rest. Different bars, clubs and restaurants were visited by studs far into the late hours of the night.",
    "date": new Date("2022-07-08T02:00:00"),
    "studsYear": 2022,
    "pictures": [
      "https://studs22.s3.amazonaws.com/uploads/1657277090211/045.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1657277090086/002.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1657277090268/096.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1657277090154/013.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1657277090264/070.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1657277090404/050.jpg"
    ],
    "frontPicture": "https://studs22.s3.amazonaws.com/uploads/1657277082202/023.jpg",
    "published": true,
    "author": {
      id: "619cea0d08dc1200161ea5b6",
      firstName: "Arasp",
      lastName: "Keighobad",
      studsYear: 2022,
      info: {
        role: UserRole.InfoGroup,
        email: "arasp@studs.se",
        picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/arasp.jpg",
        permissions: [Permission.Admin]
      }
    }
  },
  {
    "id": "62cd585147f2c0001605e644",
    "title": "An Italy summary!",
    "description": "After a short flight from Amsterdam, we arrived at Milan Bergamo Airport. From there we took a train without stepping outside, which we became aware of when the heat struck us in central Milan. At arrival time, the temperature was about 35 degrees but this didn't stop us from doing some exploring. Directly after leaving the luggage at our new hotel, we went out into the city to buy ourselves some lunch before meeting up at Accademia di belle arti di Brera. At the art academy, we got an inspiring (and sweaty) guided tour and learnt more about the studies carried out there. The heat and the travelling led to most people having a calm first night in Milan, after enjoying some Italian cuisine of course. \n\n\\image-0\n\\image-2\n\nThe exploring continued and on the second day in Milan, we visited both a science museum and the famous cathedral Duomo. The majestic cathedral that took nearly six centuries to complete impressed us all and our guide told us a lot of interesting facts about it. We also got the opportunity to go up to the roof and enjoy the view of Milan from there. Later that evening it was time to see what Milans' nightlife had to offer and it definitely did not disappoint.\n\n\\image-5\n\\image-4\n\nOn the third day in Italy, it was time to leave Milan for a day trip to Lake Como. Lake Como is the third biggest lake in Italy located just about an hour by train from Milan. Once there, we all decided to do different things - some went on a boat trip, some took the enormous stairs up in the mountains and enjoyed the amazing view, some wanted the same view but took the slightly more comfortable option to go there by the mountain tram. Others just relaxed at a beach club and enjoyed the beautiful weather and view from there. After a long day, we took the train back to Milan and took the opportunity to have a relaxing evening and prepare ourselves for tomorrow's adventure. \n\n\\image-7\n\nOn the fourth day in Italy, it was time to go to Venice and spend the night there. During the three-hour-long train ride, we participated in a workshop focusing on technical interviews. Upon arriving, most of us were hungry so everyone hurried away to find somewhere to eat lunch. Afterwards, we explored the beautiful city and it impressed us all. We stayed in the beautiful city for as long as we could until we had to take the last bus to our new hotel that was located an hour outside of Venice at the beautiful beach Lido di Jesolo. Here, we spent our first night having a midnight beach party, enjoying the sand between our toes, the surprisingly warm Mediterranean water, and above all else, each other\u2019s company. The morning after, we visited the beach so we could enjoy it in the sun as well, and then we headed back to Milan in the afternoon.\n\n\\image-8\n\\image-3\n\nOur last day in Italy we spent with Toptracer, who had planned the whole day for us, starting with a three-course meal at the golf club Castello Tolcinasco. This was followed by a golfing session and drinks at the pool. The day was rounded off with dinner at a restaurant in central Milan and then we had one last night together before our flight back to Stockholm early the next morning. \nWhen we arrived at Arlanda, our accumulated exhaustion over the last two weeks surged to the surface as everyone realized how happy they were to be back home and finally be able to get some rest. Overwhelmed by a sense of joy and gratitude for a wonderful project and an unforgettable trip, we thought back to everything we had experienced together as we shared a last, heartfelt hug, thus officially marking the end of Studs 2022.\n\n\\image-6\n\\image-9",
    "date": new Date("2022-07-12T02:00:00"),
    "studsYear": 2022,
    "pictures": [
      "https://studs22.s3.amazonaws.com/uploads/1657624525818/002.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1657624525761/000.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1657624525982/014.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1657624526007/033.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1657624526234/068.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1657624526000/015.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1657624526013/044.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1657624525936/011.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1657624526024/055.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1657624650470/003.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1657624525936/011.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1657624526024/055.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1657624650470/003.jpg"
    ],
    "frontPicture": "https://studs22.s3.amazonaws.com/uploads/1657624519288/016.jpg",
    "published": true,
    "author": {
      id: "619ce97c08dc1200161ea5b2",
      firstName: "Matilda",
      lastName: "Ryd\u00e9n",
      studsYear: 2022,
      info: {
        role: UserRole.InfoGroup,
        email: "matilda@studs.se",
        linkedIn: "https://se.linkedin.com/in/matildaryd%C3%A9n ",
        picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/matilda.jpg",
        master: "Interactive Media Technology ",
        permissions: []
      }
    }
  },
  {
    "id": "62a70cb831f7fc0016bdcdd5",
    "title": "The trip's first day!",
    "description": "With an academic year full of insightful company visits behind us, our feelings of anticipation for the trip were finally quenched by the gathering of Studs 2022 in Arlanda early morning Friday 10th of June. The hard work surrounding the tech company events in Stockholm, the city in which Studs operates, was going to be rewarded with a tour around Europe. \n\n\\image-1\n\nThe destinations, previously selected through popular vote, resulted in plans of enjoying the natural beauties of Iceland in Reykjavik, exploring the urban atmosphere of Amsterdam and finally ending the two-week-long trip in Milan, getting a taste of the extravagant Mediterranean life. \n\n\\image-0\n\nAfter a smooth and comfortable flight to Reykjavik, the consensual first impression of Iceland was that it seemingly was completely void of trees. The bus ride to our hotel further confirmed this, although granted that in place of the trees (that otherwise truly are omnipresent back in Sweden), the Icelandic landscapes offered stunningly beautiful views. Large fields of purple flowers next to vast areas filled with dark volcanic rocks next to tall glacier-ridden mountains next to the boundless view of the open sea. \n\n\\image-4\n\n\nA short \"finding our rooms\" break after arriving at the hotel was followed by eagerly taking the bus to the city centre, where we had a restaurant reservation waiting for us at Himalayan Spice. The food was splendid and toasts were given in celebration of the trip's official kickoff. Afterwards, members of Studs parted ways to explore the town in their own preferred ways. Some went straight to pubs and bars to enjoy the surprisingly active nightlife in Reykjavik. Others explored the harbour and other interesting sights in town, such as Hallgr\u00edmskirkja (which, due to its peculiar shape and us being computer scientists, got the nickname \"normal distribution church\"). \n\n\\image-3\n\\image-2\n\n\nThe first day ended very late for most of us, partly thanks to the two-hour time difference compared to home but mostly due to it being completely light out even past midnight. One could speculate that, on average, people were back at the hotel at around 03:00. Days one wishes to not end and try to enjoy that long into the night can easily be said to be successful ones. The first day of Studsresan 2022 was undeniably such a day and we are all excited to see what the rest of the trip will bring.\n\n\\image-5",
    "date": new Date("2022-06-13T02:00:00"),
    "studsYear": 2022,
    "pictures": [
      "https://studs22.s3.amazonaws.com/uploads/1655114209529/017.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1655114209790/045.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1655114209536/126.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1655114209526/055.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1655114209534/064.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1655114209593/138.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1655114209532/053.jpg"
    ],
    "frontPicture": "https://studs22.s3.amazonaws.com/uploads/1655114201103/003.jpg",
    "published": true,
    "author": {
      id: "619cea0d08dc1200161ea5b6",
      firstName: "Arasp",
      lastName: "Keighobad",
      studsYear: 2022,
      info: {
        role: UserRole.InfoGroup,
        email: "arasp@studs.se",
        picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/arasp.jpg",
        permissions: [Permission.Admin]
      }
    }
  },
  {
    "id": "62c6c2a43f0b0b00164a8d7b",
    "title": "Exploring Amsterdam",
    "description": "Breakfasts in Amsterdam were different for one important reason. Our rooms at the hotel (or actually our apartments at the aparthotel), were complete with a fully equipped kitchen, enabling us to cook anything we wished for ourselves. Sharing stories of past adventures and plans for future adventures was combined with the joy of cooking and eating together. Some rooms went for eggs and bacon, fresh fruit like watermelon, apples, oranges or simply bread, butter and jam, etc. The fifth day of Studsresan 2022 was also the day when we would have the first company visit in a place other than Stockholm. \n\n\\image-3\n\nNumbers, a company recently acquired by Visma, one of the companies visited by Studs in Stockholm, were kind enough to invite us to their office in Amsterdam for a presentation by their CEO, a teambuilding activity, and an amazing buffet lunch. \n\n\\image-0\n\\image-4\n\\image-5\n\nAfter this. we had some free time to spend before the planned visit to the Van Gogh museum.\n\n\\image-1\n\\image-2\n\nThe realization that Amsterdam is the promised land of bikes led to two of the more bike-loving members of Studs renting bikes and instead of using the trams and buses, taking a nice bike ride to the museum. During the visit in Amsterdam, it would soon be clear that more often than not, taking the bike would result in a shorter travel time than using public transport. This was mainly due to not having to wait for the next bus at connecting stations but also because many times, bike paths went the shortest route while cars had to travel a longer distance on the roads.\n\n\\image-6\n\nWith days of planned activities, the evenings were left for leisure activities. Many visited bars, restaurants, caf\u00e9s or otherwise explored Amsterdam and its interesting peculiarities.\n\n\\image-7",
    "date": new Date("2022-07-07T02:00:00"),
    "studsYear": 2022,
    "pictures": [
      "https://studs22.s3.amazonaws.com/uploads/1657193028736/006.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1657193028834/037.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1657193028838/041.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1657193028699/003.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1657193028777/013.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1657193028811/020.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1657193028841/088.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1657193028845/058.jpg"
    ],
    "frontPicture": "https://studs22.s3.amazonaws.com/uploads/1657193027473/000.jpg",
    "published": true,
    "author": {
      id: "619cea0d08dc1200161ea5b6",
      firstName: "Arasp",
      lastName: "Keighobad",
      studsYear: 2022,
      info: {
        role: UserRole.InfoGroup,
        email: "arasp@studs.se",
        picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/arasp.jpg",
        permissions: [Permission.Admin]
      }
    }
  },
  {
    "id": "62b9711df688d00016d64c15",
    "title": "On our way to Amsterdam!",
    "description": "Like the previous days, day four started with breakfast, however, now with the sad realization that we are leaving Iceland. Iceland, which had generously gifted us with its amazing landscapes, unusual geological phenomena, and friendly locals that never skipped an opportunity to talk to you to give tips about what things one should see in their beautiful country. For this, we were very thankful and many in Studs agreed that Iceland is a place one has to visit again, preferably staying longer than just three days, perhaps renting a car and driving on the beautiful scenic roads.\n\n\\image-3\n\nThe Icelandic airport was an interesting one, small and \"cute\", without the stress and constant running around that you get in bigger international airports. On the other hand, the destination of our flight was Amsterdam and Schiphol currently being the third busiest airport in the world by the number of passengers, stress and constant running around was exactly what we were met with after landing. The luggage of multiple flights was delayed - including ours. Bags and suitcases not picked up by their owners were piled up in huge towers next to the baggage belts. The whole mood and spirit of the place were undeniably more stressed than in Reykjavik, people annoyed by their bags being delayed and worried about what should happen, were they to not receive them at all. Eventually, our bags arrived and we got going to our hotel.\n\n\\image-0\n\nOn our way to the hotel, we changed trains at the connecting station Sloterdijk. Any airport sins witnessed at Schiphol were quickly forgiven and the intellectual level knowledge of how Amsterdam is the cityplanner's dream instead became wisdom and experience. Different types of intercity trains, metro lines, trams, buses, taxis [sic], all meeting there to take the inhabitants to every corner of their city in the most convenient way possible. All this while not forgetting the bike infrastructure. Bike parking lots that probably could house a full quarter of Stockholm's whole bicycle fleet, connected with bike paths that put some car roads in Sweden to shame. For the advocator of bike and human-friendly cities, this was pure paradise.\n\n\\image-1\n\nNo activity was planned for the day as we arrived rather late. After eating dinner, everybody could choose how to spend their nights freely. Some went out to start exploring Amsterdam while others stayed at the hotel to relax a bit, playing card games and socializing with their new roommates since the groupings had changed compared to Iceland. Studs was in high spirits, eager to see what Amsterdam has to offer, enthusiastic about now being young and energetic tourists in a big international city full of possibilities.\n\n\\image-2",
    "date": new Date("2022-06-27T02:00:00"),
    "studsYear": 2022,
    "pictures": [
      "https://studs22.s3.amazonaws.com/uploads/1656320048861/019.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1656320048918/027.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1656320200245/043.jpg",
      "https://studs22.s3.amazonaws.com/uploads/1656320200254/000.jpg"
    ],
    "frontPicture": "https://studs22.s3.amazonaws.com/uploads/1656319979292/006.jpg",
    "published": true,
    "author": {
      id: "619cea0d08dc1200161ea5b6",
      firstName: "Arasp",
      lastName: "Keighobad",
      studsYear: 2022,
      info: {
        role: UserRole.InfoGroup,
        email: "arasp@studs.se",
        picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/arasp.jpg",
        permissions: [Permission.Admin]
      }
    }
  }
];