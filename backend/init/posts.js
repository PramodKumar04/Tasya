const mongoose = require("mongoose");

const samplePosts = [
  {
    author: new mongoose.Types.ObjectId(),
    title: "Real dark will.",
    content: "Concern little and hold usually process gas. Forget parent account strong. Shake store pass believe bag maybe. Money someone candidate plan laugh science site happy.",
    video: {
      url: "",
      file: ""
    },
    image: {
      url: "https://images.unsplash.com/photo-1680159452310-a1ad0cf8b813?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      file: ""
    },
    likes: 47,
    comments: [
      new mongoose.Types.ObjectId(),
      new mongoose.Types.ObjectId()
    ],
    category: "art",
    createdAt: new Date("2024-10-04T19:53:54")
  },
  {
    author: new mongoose.Types.ObjectId(),
    title: "Discover whom city while his building heart hundred.",
    content: "Bad fear letter heart structure. Too enough alone friend mean teacher. Your color magazine kitchen. Central somebody specific trouble. Vote dog very. Off conference the subject evidence building.",
    video: {
      url: "",
      file: ""
    },
    image: {
      url: "https://images.unsplash.com/photo-1588434538854-8192be18c43a?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      file: ""
    },
    likes: 480,
    comments: [],
    category: "blog",
    createdAt: new Date("2024-11-09T13:06:50")
  },
  {
    author: new mongoose.Types.ObjectId(),
    title: "Cultural light child.",
    content: "Activity central movement probably meet marriage. Current environment western agreement. Street especially position interesting trip despite southern. Central strategy treatment. Itself between want tree. Catch next above growth lead.",
    video: {
      url: "",
      file: ""
    },
    image: {
      url: "https://images.unsplash.com/photo-1662833231337-f7c0659d0ef8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      file: ""
    },
    likes: 892,
    comments: [],
    category: "art",
    createdAt: new Date("2025-03-24T03:30:39")
  },
  {
    author: new mongoose.Types.ObjectId(),
    title: "Tree event south stop door laugh nearly.",
    content: "Hot information final north into this administration. Test home expert recognize. Say everybody talk.",
    video: {
      url: "",
      file: ""
    },
    image: {
      url: "https://images.unsplash.com/photo-1734980247542-74f081bd61f1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      file: ""
    },
    likes: 98,
    comments: [],
    category: "review",
    createdAt: new Date("2025-01-26T01:37:45")
  },
  {
    author: new mongoose.Types.ObjectId(),
    title: "Ability skin stage ball official course account.",
    content: "Bad into protect these. Successful top special west work tough. Too religious road heart meet tonight Mrs. We sister of PM. Analysis we hit very themselves stand hold page. Certain member as simple.",
    video: {
      url: "",
      file: ""
    },
    image: {
      url: "https://images.unsplash.com/photo-1628977087854-1f0588b91034?q=80&w=1212&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      file: ""
    },
    likes: 242,
    comments: [],
    category: "vlogs",
    createdAt: new Date("2025-01-22T20:34:50")
  },
  {
    author: new mongoose.Types.ObjectId(),
    title: "Catch exist social left traditional into.",
    content: "State child those only. Science early behind evening protect. City help no back. Some time finish suddenly war thus local. Subject because special leg conference example second.",
    video: {
      url: "",
      file: ""
    },
    image: {
      url: "https://images.unsplash.com/photo-1595378883545-a1d7793a020c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Q2F0Y2glMjBleGlzdCUyMHNvY2lhbCUyMGxlZnQlMjB0cmFkaXRpb25hbCUyMGludG8lMjBmcmVlfGVufDB8fDB8fHww",
      file: "Congress.jpg"
    },
    likes: 565,
    comments: [],
    category: "review",
    createdAt: new Date("2024-07-30T20:44:53")
  },
  {
    author: new mongoose.Types.ObjectId(),
    title: "Control near product bar indeed marriage population.",
    content: "Forward tell quite environmental plant public certainly. Including music reveal able. Argue eight after.",
    video: {
      url: "",
      file: "until.mp4"
    },
    image: {
      url: "https://plus.unsplash.com/premium_photo-1681841585407-8cc4d427783c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Q29udHJvbCUyMG5lYXIlMjBwcm9kdWN0JTIwYmFyJTIwaW5kZWVkJTIwbWFycmlhZ2UlMjBwb3B1bGF0aW9uJTIwZnJlZXxlbnwwfHwwfHx8MA%3D%3D",
      file: ""
    },
    likes: 336,
    comments: [],
    category: "review",
    createdAt: new Date("2024-12-31T08:24:37")
  },
];

module.exports = { data: samplePosts };
