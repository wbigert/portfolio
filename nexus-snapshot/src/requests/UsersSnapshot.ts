import { User, UserRole, Permission } from "@/models/User"

export const UsersSnapshot: User[] = [
  {
    id: "5fb278e69fca82b6f5faf801",
    firstName: "Martin",
    lastName: "Hyberg",
    studsYear: 2020,
    info: {
      role: UserRole.InfoGroup,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf7ec",
    firstName: "Klara",
    lastName: "Eserstam",
    studsYear: 2020,
    info: {
      role: UserRole.FinanceGroup,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf806",
    firstName: "Glenn",
    lastName: "Olsson",
    studsYear: 2021,
    info: {
      role: UserRole.ItGroup,
      email: "glennholsson@gmail.com",
      github: "github.com/GlennOlsson",
      phone: "073-504 91 98",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/glenn.jpg",
      master: "Computer Science",
      permissions: [Permission.Admin]
    }
  },
  {
    id: "5fb278e69fca82b6f5faf7ea",
    firstName: "Josefin",
    lastName: "Nilsson",
    studsYear: 2020,
    info: {
      role: UserRole.ProjectManager,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf7ee",
    firstName: "Carl",
    lastName: "Nordling",
    studsYear: 2020,
    info: {
      role: UserRole.TravelGroup,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf802",
    firstName: "Jacob",
    lastName: "Stachowicz",
    studsYear: 2020,
    info: {
      role: UserRole.InfoGroup,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf807",
    firstName: "Axel",
    lastName: "Lindeberg",
    studsYear: 2021,
    info: {
      role: UserRole.None,
      email: "axel.ew.lindeberg@gmail.com",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/axel.jpg",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf803",
    firstName: "Christina",
    lastName: "Sunneg\u00e5rdh",
    studsYear: 2020,
    info: {
      role: UserRole.InfoGroup,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "617951b1874bf80015f93f52",
    firstName: "Emelie",
    lastName: "Lindborg",
    studsYear: 2022,
    info: {
      role: UserRole.EventGroup,
      email: "emelie@studs.se",
      linkedIn: "https://www.linkedin.com/in/emelielindborg",
      picture: "https://studs22.s3.eu-north-1.amazonaws.com/leaderGroupImages/emelie.jpg",
      permissions: [Permission.Events]
    }
  },
  {
    id: "619ceb0b08dc1200161ea5c2",
    firstName: "Erik",
    lastName: "Henriksson",
    studsYear: 2022,
    info: {
      role: UserRole.SalesGroup,
      email: "erik-h@studs.se",
      linkedIn: "https://www.linkedin.com/in/erik-henriksson-76665b64/",
      github: "https://github.com/ErikChHenriksson?tab=repositories",
      picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/erik.jpg",
      master: "Cognitive Systems",
      permissions: []
    }
  },
  {
    id: "619ceb4308dc1200161ea5c3",
    firstName: "Daniel",
    lastName: "Helle",
    studsYear: 2022,
    info: {
      role: UserRole.SalesGroup,
      email: "daniel@studs.se",
      linkedIn: "www.linkedin.com/in/daniel-helle-7b3649a5",
      github: "https://github.com/DanielHelle",
      picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/daniel.jpg",
      master: "Computer Science",
      permissions: []
    }
  },
  {
    id: "6318c8b668f1c00016841e30",
    firstName: "Emmy",
    lastName: "Yin",
    studsYear: 2023,
    info: {
      role: UserRole.TravelGroupManager,
      email: "emmy@studs.se",
      linkedIn: "https://www.linkedin.com/in/emmyyin",
      github: "",
      phone: "",
      picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/emmy.png",
      master: "",
      permissions: []
    }
  },
  {
    id: "637fd9d708d924036862bc2e",
    firstName: "Michael",
    lastName: "Morales Sundstedt",
    studsYear: 2023,
    info: {
      role: UserRole.EventGroup,
      email: "michael@studs.se",
      picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/michael.png",
      permissions: [Permission.Events]
    }
  },
  {
    id: "637fda7b08d924036862bc33",
    firstName: "Tora",
    lastName: "Waller\u00f6",
    studsYear: 2023,
    info: {
      role: UserRole.TravelGroup,
      email: "tora@studs.se",
      linkedIn: "https://www.linkedin.com/in/tora-wallero",
      picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/tora.png",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf823",
    firstName: "Sebastian",
    lastName: "Buvari",
    studsYear: 2021,
    info: {
      role: UserRole.SalesGroup,
      email: "sebastian@studs.se",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/sebastian.jpg",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf7f8",
    firstName: "Malcolm",
    lastName: "Tivelius",
    studsYear: 2020,
    info: {
      role: UserRole.FinanceGroup,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf804",
    firstName: "Daniel ",
    lastName: "Dahlgren",
    studsYear: 2020,
    info: {
      role: UserRole.InfoGroup,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf805",
    firstName: "Victor",
    lastName: "Wiklund",
    studsYear: 2020,
    info: {
      role: UserRole.InfoGroup,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf818",
    firstName: "Emma",
    lastName: "Sch\u00fcldt",
    studsYear: 2021,
    info: {
      role: UserRole.TravelGroup,
      email: "emma@studs.se",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/emma.jpg",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf81a",
    firstName: "Elin",
    lastName: "Ryman",
    studsYear: 2021,
    info: {
      role: UserRole.EventGroup,
      email: "elin@studs.se",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/elin.jpg",
      permissions: [Permission.Events]
    }
  },
  {
    id: "5fb278e69fca82b6f5faf81c",
    firstName: "Sarah",
    lastName: "Narrowe Danielsson",
    studsYear: 2021,
    info: {
      role: UserRole.EventGroup,
      email: "sarah@studs.se",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/sarah.jpg",
      permissions: [Permission.Events]
    }
  },
  {
    id: "619ceaca08dc1200161ea5be",
    firstName: "Samuel",
    lastName: "S\u00f6derberg",
    studsYear: 2022,
    info: {
      role: UserRole.EventGroup,
      email: "samuel@studs.se",
      picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/samuel.jpg",
      permissions: [Permission.Events]
    }
  },
  {
    id: "6318c78a68f1c00016841e2f",
    firstName: "Tania",
    lastName: "Sayyah",
    studsYear: 2023,
    info: {
      role: UserRole.InfoGroupManager,
      email: "tania@studs.se",
      linkedIn: "www.linkedin.com/in/tania-sayyah",
      github: "",
      phone: "",
      picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/tania.png",
      master: "",
      permissions: [Permission.Events, Permission.Admin]
    }
  },
  {
    id: "637fda8808d924036862bc34",
    firstName: "William",
    lastName: "Bigert",
    studsYear: 2023,
    info: {
      role: UserRole.ItGroup,
      email: "william-b@studs.se",
      linkedIn: "https://www.linkedin.com/in/wbigert",
      github: "https://github.com/wbigert",
      phone: "0705642323",
      picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/william-b.png",
      biography: "",
      master: "",
      permissions: [Permission.Admin]
    }
  },
  {
    id: "5fb278e69fca82b6f5faf813",
    firstName: "Johanna",
    lastName: "Simfors",
    studsYear: 2021,
    info: {
      role: UserRole.InfoGroup,
      email: "johanna@studs.se",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/johanna.jpg",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf80a",
    firstName: "Lisa",
    lastName: "Tran",
    studsYear: 2021,
    info: {
      role: UserRole.EventGroup,
      email: "lisatpriv@gmail.com",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/lisa.jpg",
      permissions: [Permission.Events]
    }
  },
  {
    id: "5fb278e69fca82b6f5faf819",
    firstName: "Olle",
    lastName: "Hovmark",
    studsYear: 2021,
    info: {
      role: UserRole.TravelGroup,
      email: "olle@studs.se",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/olle.jpg",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf81d",
    firstName: "Vilma",
    lastName: "Ahlholm",
    studsYear: 2021,
    info: {
      role: UserRole.EventGroup,
      email: "vilma@studs.se",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/vilma.jpg",
      permissions: [Permission.Events]
    }
  },
  {
    id: "6318b1ef77039b0016c4259d",
    firstName: "Marcus",
    lastName: "Nordstedt",
    studsYear: 2023,
    info: {
      role: UserRole.ProjectManager,
      email: "marcus@studs.se",
      linkedIn: "https://www.linkedin.com/in/marcus-nordstedt-25969b25a/",
      picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/marcus.png\n",
      permissions: []
    }
  },
  {
    id: "637fd51f08d924036862bc22",
    firstName: "Artur",
    lastName: "Amcoff",
    studsYear: 2023,
    info: {
      role: UserRole.SalesGroup,
      email: "artur@studs.se",
      linkedIn: "https://www.linkedin.com/in/artur-amcoff-564b54193/",
      phone: "0766452028",
      picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/artur.png",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf7f3",
    firstName: "Emma",
    lastName: "Olsson",
    studsYear: 2020,
    info: {
      role: UserRole.SalesGroup,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "6179520f874bf80015f93f55",
    firstName: "Vilma",
    lastName: "Jalava",
    studsYear: 2022,
    info: {
      role: UserRole.TravelGroup,
      email: "vilma-j@studs.se",
      picture: "https://studs22.s3.eu-north-1.amazonaws.com/leaderGroupImages/vilma.jpg",
      permissions: []
    }
  },
  {
    id: "619cea3d08dc1200161ea5b8",
    firstName: "Mahmoud",
    lastName: "Sherzad",
    studsYear: 2022,
    info: {
      role: UserRole.TravelGroup,
      email: "mahmoud@studs.se",
      picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/mahmoud.jpg",
      permissions: []
    }
  },
  {
    id: "6318a80c3ef1f5366b6bd9fe",
    firstName: "Gustav",
    lastName: "Ekner",
    studsYear: 2023,
    info: {
      role: UserRole.ItGroupManager,
      email: "gustav@studs.se",
      linkedIn: "https://www.linkedin.com/in/ekner",
      github: "https://github.com/ekner",
      phone: "",
      picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/gustav-e.png",
      master: "",
      permissions: [Permission.Admin, Permission.Events]
    }
  },
  {
    id: "6318b20977039b0016c4259e",
    firstName: "Daniel",
    lastName: "Gr\u00fcnler",
    studsYear: 2023,
    info: {
      role: UserRole.ProjectManager,
      email: "daniel-g@studs.se",
      linkedIn: "https://www.linkedin.com/in/daniel-gr%C3%BCnler-66617a25a/",
      picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/daniel.png",
      permissions: []
    }
  },
  {
    id: "637fd98208d924036862bc29",
    firstName: "Gustav",
    lastName: "Axelsson",
    studsYear: 2023,
    info: {
      role: UserRole.InfoGroup,
      email: "gustav-a@studs.se",
      linkedIn: "",
      github: "",
      phone: "",
      picture: "https://studs-stage.s3.amazonaws.com/uploads/1682727201834/DSC01892 alteranative-2.jpg",
      master: "",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf80d",
    firstName: "Albin",
    lastName: "Winkelmann",
    studsYear: 2021,
    info: {
      role: UserRole.ProjectManager,
      email: "albin@studs.se",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/albin.jpg",
      permissions: []
    }
  },
  {
    id: "61794c12f2dd200015a52463",
    firstName: "Melvin",
    lastName: "Lundqvist",
    studsYear: 2022,
    info: {
      role: UserRole.ProjectManager,
      email: "melvin@studs.se",
      linkedIn: "https://www.linkedin.com/in/melvinlundqvist/",
      picture: "https://studs22.s3.eu-north-1.amazonaws.com/leaderGroupImages/melvin.jpg",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf7e9",
    firstName: "Helena",
    lastName: "Alinder",
    studsYear: 2020,
    info: {
      role: UserRole.ProjectManager,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf7ed",
    firstName: "Samuel",
    lastName: "Hertzberg",
    studsYear: 2020,
    info: {
      role: UserRole.InfoGroup,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf7ef",
    firstName: "Cristian",
    lastName: "Osorio Bretti",
    studsYear: 2020,
    info: {
      role: UserRole.SalesGroup,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf7f4",
    firstName: "Lovisa",
    lastName: "Carlberg",
    studsYear: 2020,
    info: {
      role: UserRole.SalesGroup,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf7f5",
    firstName: "Anton",
    lastName: "Ivarsson",
    studsYear: 2020,
    info: {
      role: UserRole.SalesGroup,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf7f9",
    firstName: "Nicole",
    lastName: "Jagelid",
    studsYear: 2020,
    info: {
      role: UserRole.TravelGroup,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf7fc",
    firstName: "Carl",
    lastName: "Dath",
    studsYear: 2020,
    info: {
      role: UserRole.TravelGroup,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf80f",
    firstName: "Fanny",
    lastName: "Curtsson",
    studsYear: 2021,
    info: {
      role: UserRole.ItGroup,
      email: "fanny@studs.se",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/fanny.jpg",
      permissions: [Permission.Admin]
    }
  },
  {
    id: "5fb278e69fca82b6f5faf811",
    firstName: "Ellinor",
    lastName: " Bakhuizen",
    studsYear: 2021,
    info: {
      role: UserRole.InfoGroup,
      email: "ellinor@studs.se",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/ellinor.jpg",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf824",
    firstName: "Moa",
    lastName: "Engquist",
    studsYear: 2021,
    info: {
      role: UserRole.FinanceGroup,
      email: "moa-e@studs.se",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/moa-e.jpg",
      permissions: []
    }
  },
  {
    id: "613b19b0cdbdab001597b72c",
    firstName: "Artin",
    lastName: "Mirzaian",
    studsYear: 2022,
    info: {
      role: UserRole.ItGroup,
      email: "artin@studs.se",
      linkedIn: "https://www.linkedin.com/in/artin-mirzaian-a54516162/",
      picture: "https://studs22.s3.eu-north-1.amazonaws.com/leaderGroupImages/it.jpg",
      permissions: []
    }
  },
  {
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
  },
  {
    id: "619ceaa708dc1200161ea5bc",
    firstName: "Amanda",
    lastName: "Berg",
    studsYear: 2022,
    info: {
      role: UserRole.EventGroup,
      email: "amanda-b@studs.se",
      linkedIn: "https://www.linkedin.com/in/amanda-josefin-berg/",
      picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/amanda-b.jpg",
      permissions: [Permission.Events]
    }
  },
  {
    id: "619ceaba08dc1200161ea5bd",
    firstName: "Julius",
    lastName: "Albiz",
    studsYear: 2022,
    info: {
      role: UserRole.EventGroup,
      email: "julius@studs.se",
      picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/julius.jpg",
      permissions: [Permission.Events]
    }
  },
  {
    id: "619cec8d08dc1200161ea5c5",
    firstName: "Lisa",
    lastName: "Balzar",
    studsYear: 2022,
    info: {
      role: UserRole.SalesGroup,
      email: "lisa-b@studs.se",
      linkedIn: "https://www.linkedin.com/in/lisabalzar/",
      github: "https://github.com/lisabalzar",
      phone: "0735645450",
      picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/lisa.jpg",
      master: "Interactive Media Technology",
      permissions: []
    }
  },
  {
    id: "637fd99308d924036862bc2a",
    firstName: "Jonas",
    lastName: "Hulth\u00e9n",
    studsYear: 2023,
    info: {
      role: UserRole.EventGroup,
      email: "jonas@studs.se",
      linkedIn: "https://www.linkedin.com/in/jonas-hulthen",
      phone: "0723229892",
      picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/jonas.png",
      permissions: [Permission.Events]
    }
  },
  {
    id: "637fd9b208d924036862bc2c",
    firstName: "Kunal",
    lastName: "Bhatnagar",
    studsYear: 2023,
    info: {
      role: UserRole.SalesGroup,
      email: "kunal@studs.se",
      picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/kunal.png",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf7f2",
    firstName: "Anton",
    lastName: "Stagge",
    studsYear: 2020,
    info: {
      role: UserRole.ItGroup,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf808",
    firstName: "Andreas",
    lastName: "Wallstr\u00f6m",
    studsYear: 2021,
    info: {
      role: UserRole.SalesGroup,
      email: "awallst@kth.se",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/andreas.jpg",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf809",
    firstName: "Bella",
    lastName: "Tapper",
    studsYear: 2021,
    info: {
      role: UserRole.FinanceGroup,
      email: "itapper@kth.se",
      linkedIn: "https://www.linkedin.com/in/bella-tapper-a3879a157/",
      phone: "070-267 99 90",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/bella.jpg",
      master: "Machine Learning",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf80e",
    firstName: "Fredrik",
    lastName: "Norlin",
    studsYear: 2021,
    info: {
      role: UserRole.ItGroup,
      email: "fredrik-n@studs.se",
      phone: "0727273715",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/fredrik-n.jpg",
      permissions: [Permission.Admin]
    }
  },
  {
    id: "5fb278e69fca82b6f5faf812",
    firstName: "Fredrik",
    lastName: "Ekstedt Karpers",
    studsYear: 2021,
    info: {
      role: UserRole.InfoGroup,
      email: "fredrik-k@studs.se",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/fredrik-k.jpg",
      permissions: []
    }
  },
  {
    id: "619cea9308dc1200161ea5bb",
    firstName: "Luciano",
    lastName: "Zapata",
    studsYear: 2022,
    info: {
      role: UserRole.EventGroup,
      email: "luciano@studs.se",
      picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/luciano.jpg",
      permissions: [Permission.Events]
    }
  },
  {
    id: "619ceaee08dc1200161ea5c0",
    firstName: "Hilda",
    lastName: "Robertsson",
    studsYear: 2022,
    info: {
      role: UserRole.SalesGroup,
      email: "hilda@studs.se",
      linkedIn: "https://www.linkedin.com/in/hilda-robertsson",
      picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/hilda.jpg",
      permissions: []
    }
  },
  {
    id: "619ceaff08dc1200161ea5c1",
    firstName: "Johan",
    lastName: "Rudelius",
    studsYear: 2022,
    info: {
      role: UserRole.SalesGroup,
      email: "johan-r@studs.se",
      linkedIn: "https://www.linkedin.com/in/johanrudelius/",
      phone: "0739175009",
      picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/johan.jpg",
      master: "Datalogi + Accounting p\u00e5 Handels",
      permissions: []
    }
  },
  {
    id: "619cecac08dc1200161ea5c7",
    firstName: "Tobias",
    lastName: "Fr\u00f6berg",
    studsYear: 2022,
    info: {
      role: UserRole.FinanceGroup,
      email: "tobias@studs.se",
      linkedIn: "https://www.linkedin.com/in/tobias-fr%C3%B6berg-a762a6225/",
      picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/tobias.jpg",
      permissions: []
    }
  },
  {
    id: "637fd8e808d924036862bc24",
    firstName: "Chih-Wei",
    lastName: "Wu",
    studsYear: 2023,
    info: {
      role: UserRole.InfoGroup,
      email: "chih-wei@studs.se",
      picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/chihwei.png",
      permissions: []
    }
  },
  {
    id: "637fd92508d924036862bc26",
    firstName: "Damla",
    lastName: "G\u00f6z\u00fck",
    studsYear: 2023,
    info: {
      role: UserRole.InfoGroup,
      email: "damla@studs.se",
      linkedIn: "https://www.linkedin.com/in/damlagozuk/",
      phone: "+46727895917",
      picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/damla.png",
      master: "Cybersecurity",
      permissions: []
    }
  },
  {
    id: "637fda6a08d924036862bc32",
    firstName: "Shashank",
    lastName: "Shirol",
    studsYear: 2023,
    info: {
      role: UserRole.InfoGroup,
      email: "shashank@studs.se",
      linkedIn: "https://www.linkedin.com/in/shashankshirol/",
      github: "https://github.com/shashankshirol",
      phone: "+46 734932814",
      picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/shashank.png",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf7f6",
    firstName: "Vera",
    lastName: "Blomkvist Karlsson",
    studsYear: 2020,
    info: {
      role: UserRole.SalesGroup,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf7fe",
    firstName: "Anna",
    lastName: "Nyqvist",
    studsYear: 2020,
    info: {
      role: UserRole.EventGroup,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "617950ff874bf80015f93f51",
    firstName: "Isabel",
    lastName: "Redtzer",
    studsYear: 2022,
    info: {
      role: UserRole.ProjectManager,
      email: "isabel@studs.se",
      linkedIn: "https://www.linkedin.com/in/isabel-redtzer/",
      picture: "https://studs22.s3.eu-north-1.amazonaws.com/leaderGroupImages/isabel.jpg",
      permissions: []
    }
  },
  {
    id: "619ce9d808dc1200161ea5b5",
    firstName: "Henrik",
    lastName: "Jol\u00e9rus",
    studsYear: 2022,
    info: {
      role: UserRole.InfoGroup,
      email: "henrik@studs.se",
      picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/henrik.jpg",
      permissions: []
    }
  },
  {
    id: "619cec8108dc1200161ea5c4",
    firstName: "Ludwig",
    lastName: "Nordstr\u00f6m",
    studsYear: 2022,
    info: {
      role: UserRole.SalesGroup,
      email: "ludwig@studs.se",
      linkedIn: "https://www.linkedin.com/in/ludwig-nordstr%C3%B6m-a0b313227/",
      picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/ludwig.jpg",
      permissions: []
    }
  },
  {
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
      permissions: [Permission.Events]
    }
  },
  {
    id: "637fd90808d924036862bc25",
    firstName: "Claudia",
    lastName: "Berlin",
    studsYear: 2023,
    info: {
      role: UserRole.TravelGroup,
      email: "claudia@studs.se",
      phone: "0790739168",
      picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/claudia.png",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf810",
    firstName: "David",
    lastName: "Norrman",
    studsYear: 2021,
    info: {
      role: UserRole.InfoGroup,
      email: "david@studs.se",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/david.jpg",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf822",
    firstName: "Kristina",
    lastName: "Andersson",
    studsYear: 2021,
    info: {
      role: UserRole.SalesGroup,
      email: "kristina@studs.se",
      linkedIn: "https://www.linkedin.com/in/kristina-andersson/",
      github: "https://github.com/anderssonk",
      phone: "0765766802",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/kristina.jpg",
      master: "Interaktiv Medieteknik",
      permissions: []
    }
  },
  {
    id: "619d261e5b96650016eb4b0c",
    firstName: "Rasmus",
    lastName: "Nygren",
    studsYear: 2022,
    info: {
      role: UserRole.FinanceGroup,
      email: "rasmus@studs.se",
      linkedIn: "https://www.linkedin.com/in/rasmus-nygren-5aa6351a5/",
      picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/rasmus.jpg",
      permissions: []
    }
  },
  {
    id: "637fd4f508d924036862bc21",
    firstName: "Ali",
    lastName: "Asbai",
    studsYear: 2023,
    info: {
      role: UserRole.SalesGroup,
      email: "ali@studs.se",
      linkedIn: "https://www.linkedin.com/in/ali-asbai-97939112b/",
      github: "https://github.com/AliAsbai",
      phone: "0736899210",
      picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/ali.png",
      master: "Computer Science",
      permissions: []
    }
  },
  {
    id: "637fd94208d924036862bc27",
    firstName: "Emilia",
    lastName: "Rosenqvist",
    studsYear: 2023,
    info: {
      role: UserRole.FinanceGroup,
      email: "emilia@studs.se",
      linkedIn: "https://www.linkedin.com/in/emiliarosenqvist/",
      picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/emilia.png",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf821",
    firstName: "Johan",
    lastName: "Besseling",
    studsYear: 2021,
    info: {
      role: UserRole.SalesGroup,
      email: "johan@studs.se",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/johan.jpg",
      permissions: []
    }
  },
  {
    id: "619cea6108dc1200161ea5ba",
    firstName: "Nicky",
    lastName: "Obreykov",
    studsYear: 2022,
    info: {
      role: UserRole.TravelGroup,
      email: "nicky@studs.se",
      linkedIn: "https://www.linkedin.com/in/nicky-obreykov/",
      picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/nicky.jpg",
      permissions: []
    }
  },
  {
    id: "637fd9a408d924036862bc2b",
    firstName: "Kevin",
    lastName: "Huang",
    studsYear: 2023,
    info: {
      role: UserRole.EventGroup,
      email: "kevin@studs.se",
      linkedIn: "https://www.linkedin.com/in/kevin-huang-22b495197/",
      picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/kevin.png",
      permissions: [Permission.Events]
    }
  },
  {
    id: "637fd9f008d924036862bc2f",
    firstName: "Mimmi",
    lastName: "Andreasson",
    studsYear: 2023,
    info: {
      role: UserRole.InfoGroup,
      email: "mimmi@studs.se",
      linkedIn: "https://www.linkedin.com/in/mimmi-andreasson",
      phone: "",
      picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/mimmi.png",
      permissions: []
    }
  },
  {
    id: "637fda0208d924036862bc30",
    firstName: "Paula",
    lastName: "Ru\u00df",
    studsYear: 2023,
    info: {
      role: UserRole.TravelGroup,
      email: "paula@studs.se",
      linkedIn: "https://www.linkedin.com/in/paula-russ",
      phone: "+46764357732",
      picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/paula.png",
      master: "Computer Science",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf81b",
    firstName: "Moa",
    lastName: "Andersson",
    studsYear: 2021,
    info: {
      role: UserRole.EventGroup,
      email: "moa-a@studs.se",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/moa-a.jpg",
      permissions: [Permission.Events]
    }
  },
  {
    id: "637fd96708d924036862bc28",
    firstName: "Gabriel",
    lastName: "Acar",
    studsYear: 2023,
    info: {
      role: UserRole.SalesGroup,
      email: "gabriel@studs.se",
      linkedIn: "https://www.linkedin.com/in/gabriel-acar-734048168/",
      phone: "+46700533631",
      picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/gabriel.png",
      master: "Software Engineering",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf7eb",
    firstName: "Christine",
    lastName: "Rosquist",
    studsYear: 2020,
    info: {
      role: UserRole.EventGroup,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf7f1",
    firstName: "Fredrik",
    lastName: "Omstedt",
    studsYear: 2020,
    info: {
      role: UserRole.ItGroup,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "619ce9c508dc1200161ea5b4",
    firstName: "Humam",
    lastName: "Behnam",
    studsYear: 2022,
    info: {
      role: UserRole.InfoGroup,
      email: "humam@studs.se",
      picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/humam.jpg",
      permissions: []
    }
  },
  {
    id: "619cecce08dc1200161ea5c8",
    firstName: "Philip",
    lastName: "Song",
    studsYear: 2022,
    info: {
      role: UserRole.ItGroup,
      email: "philip@studs.se",
      picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/philip.jpg",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf7f0",
    firstName: "Marko",
    lastName: "Lazic",
    studsYear: 2020,
    info: {
      role: UserRole.ItGroup,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf7f7",
    firstName: "Adel",
    lastName: "Mojtahedi",
    studsYear: 2020,
    info: {
      role: UserRole.SalesGroup,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf7fa",
    firstName: "Gustave",
    lastName: "Rousselet",
    studsYear: 2020,
    info: {
      role: UserRole.TravelGroup,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf7fb",
    firstName: "Timas",
    lastName: "Ljungdahl",
    studsYear: 2020,
    info: {
      role: UserRole.TravelGroup,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf80b",
    firstName: "Louise",
    lastName: "Hellberg",
    studsYear: 2021,
    info: {
      role: UserRole.TravelGroup,
      email: "thebestloj@gmail.com",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/louise.jpg",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf80c",
    firstName: "Per",
    lastName: "Fahlander",
    studsYear: 2021,
    info: {
      role: UserRole.InfoGroup,
      email: "per.fahlander@gmail.com",
      linkedIn: "linkedin.com/in/perfah/",
      github: "https://github.com/perfah",
      phone: "+46738305598",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/per.jpg",
      master: "Computer Science",
      permissions: [Permission.Admin]
    }
  },
  {
    id: "5fb278e69fca82b6f5faf814",
    firstName: "Kristoffer",
    lastName: "Gunnarsson",
    studsYear: 2021,
    info: {
      role: UserRole.InfoGroup,
      email: "kristoffer@studs.se",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/kristoffer.jpg",
      permissions: []
    }
  },
  {
    id: "619ce95c08dc1200161ea5b1",
    firstName: "Amanda",
    lastName: "Krohn",
    studsYear: 2022,
    info: {
      role: UserRole.InfoGroup,
      email: "amanda-k@studs.se",
      linkedIn: "https://www.linkedin.com/in/amanda-krohn-6810871a1/",
      picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/amanda.jpg",
      permissions: []
    }
  },
  {
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
  },
  {
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
  },
  {
    id: "6318c8d868f1c00016841e31",
    firstName: "Tobias",
    lastName: "Vinsa",
    studsYear: 2023,
    info: {
      role: UserRole.SalesGroupManager,
      email: "tobias-v@studs.se",
      linkedIn: "",
      github: "",
      phone: "",
      picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/tobias.png",
      master: "",
      permissions: []
    }
  },
  {
    id: "637fd8d308d924036862bc23",
    firstName: "Arvid",
    lastName: "Eriksson",
    studsYear: 2023,
    info: {
      role: UserRole.InfoGroup,
      email: "arvid@studs.se",
      linkedIn: "https://www.linkedin.com/in/arvid-eriksson-142854186/",
      picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/arvid.png",
      permissions: []
    }
  },
  {
    id: "637fd9c508d924036862bc2d",
    firstName: "Lucas",
    lastName: "Eren",
    studsYear: 2023,
    info: {
      role: UserRole.TravelGroup,
      email: "lucas@studs.se",
      linkedIn: "https://www.linkedin.com/in/lucas-eren-4541881b9/",
      picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/lucas.png",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf7fd",
    firstName: "Sandy",
    lastName: "L\u00f6vgren",
    studsYear: 2020,
    info: {
      role: UserRole.EventGroup,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf815",
    firstName: "Lara",
    lastName: "Rostami",
    studsYear: 2021,
    info: {
      role: UserRole.InfoGroup,
      email: "lara@studs.se",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/lara.jpg",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf816",
    firstName: "Agnes",
    lastName: "Forsberg",
    studsYear: 2021,
    info: {
      role: UserRole.TravelGroup,
      email: "agnes@studs.se",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/agnes.jpg",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf817",
    firstName: "Anders",
    lastName: "Nilsson",
    studsYear: 2021,
    info: {
      role: UserRole.TravelGroup,
      email: "anders@studs.se",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/anders.jpg",
      permissions: []
    }
  },
  {
    id: "617951c7874bf80015f93f53",
    firstName: "Eva",
    lastName: "Despinoy",
    studsYear: 2022,
    info: {
      role: UserRole.InfoGroup,
      email: "eva@studs.se",
      linkedIn: "https://www.linkedin.com/in/despinoy/",
      phone: "0709650510",
      picture: "https://studs22.s3.eu-north-1.amazonaws.com/leaderGroupImages/eva.jpg",
      master: "Computer Science",
      permissions: [Permission.Admin]
    }
  },
  {
    id: "61795235874bf80015f93f56",
    firstName: "Julia",
    lastName: "Bystr\u00f6m",
    studsYear: 2022,
    info: {
      role: UserRole.SalesGroup,
      email: "julia@studs.se",
      linkedIn: "https://www.linkedin.com/in/juliabystrom/",
      github: "https://github.com/juliaBystrom",
      picture: "https://studs22.s3.eu-north-1.amazonaws.com/leaderGroupImages/julia.jpg",
      permissions: []
    }
  },
  {
    id: "619cea5008dc1200161ea5b9",
    firstName: "Sara",
    lastName: "Videfors",
    studsYear: 2022,
    info: {
      role: UserRole.TravelGroup,
      email: "sara@studs.se",
      picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/sara.jpg",
      permissions: []
    }
  },
  {
    id: "637fda5708d924036862bc31",
    firstName: "Sanherib",
    lastName: "Elia",
    studsYear: 2023,
    info: {
      role: UserRole.EventGroup,
      email: "sanherib@studs.se",
      linkedIn: "https://www.linkedin.com/in/sanherib-elia/",
      picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/sanherib.png\n",
      permissions: [Permission.Events]
    }
  },
  {
    id: "5fb278e69fca82b6f5faf7ff",
    firstName: "Shapour",
    lastName: "Jahanshahi",
    studsYear: 2020,
    info: {
      role: UserRole.EventGroup,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf81f",
    firstName: "Erik",
    lastName: "Handberg",
    studsYear: 2021,
    info: {
      role: UserRole.SalesGroup,
      email: "erik@studs.se",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/erik.jpg",
      permissions: []
    }
  },
  {
    id: "619cea1f08dc1200161ea5b7",
    firstName: "Mateo",
    lastName: "Florez",
    studsYear: 2022,
    info: {
      role: UserRole.TravelGroup,
      email: "mateo@studs.se",
      picture: "https://studs22.s3.eu-north-1.amazonaws.com/projectGroupImages/mateo.jpg",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf800",
    firstName: "Fabienne",
    lastName: "Reitz",
    studsYear: 2020,
    info: {
      role: UserRole.InfoGroup,
      email: "missing@missing.com",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf81e",
    firstName: "Caroline",
    lastName: "Larsen",
    studsYear: 2021,
    info: {
      role: UserRole.SalesGroup,
      email: "caroline@studs.se",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/caroline.jpg",
      permissions: []
    }
  },
  {
    id: "5fb278e69fca82b6f5faf820",
    firstName: "Fredrik",
    lastName: "Hernqvist",
    studsYear: 2021,
    info: {
      role: UserRole.SalesGroup,
      email: "fredrik-h@studs.se",
      picture: "https://studs21.s3.eu-north-1.amazonaws.com/profile_pictures/fredrik-h.jpg",
      permissions: []
    }
  },
  {
    id: "617951f0874bf80015f93f54",
    firstName: "Simon",
    lastName: "Osnes",
    studsYear: 2022,
    info: {
      role: UserRole.FinanceGroup,
      email: "simon@studs.se",
      linkedIn: "https://www.linkedin.com/in/simon-osnes/",
      picture: "https://studs22.s3.eu-north-1.amazonaws.com/leaderGroupImages/simon.jpg",
      master: "Computer Science",
      permissions: []
    }
  },
  {
    id: "6318c75168f1c00016841e2d",
    firstName: "William",
    lastName: "Nilsson",
    studsYear: 2023,
    info: {
      role: UserRole.FinanceGroupManager,
      email: "william@studs.se",
      linkedIn: "https://www.linkedin.com/in/nilsson-william/",
      github: "https://github.com/NilssonWilliam",
      phone: "+46760773343",
      picture: "https://studs23.s3.eu-north-1.amazonaws.com/projectGroupImages/william-n.png",
      master: "Cybersecurity",
      permissions: []
    }
  }
];
