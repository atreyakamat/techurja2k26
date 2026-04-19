export type TeamMember = {
  name: string;
  role: string;
  category: "Faculty" | "Student Council" | "Council" | "MBA" | "RoboClub" | "Designer";
  council?: string;
  email: string;
  number: number;
  image?: string;
  specialMessage?: string;
};

export const teamMembers: TeamMember[] = [
  // Student Council
  {
    name: "Yash Karekar",
    role: "General Secretary",
    category: "Student Council",
    council: "Student council",
    email: "23co79@aitdgoa.edu.in",
    number: 1,
    image: "/coordinator_pics/1.jpg"
  },
  {
    name: "Vedansh Dhargalkar",
    role: "Cultural Secretary",
    category: "Student Council",
    council: "Student council",
    email: "23co71@aitdgoa.edu.in",
    number: 2,
    image: "/coordinator_pics/2.jpg"
  },
  {
    name: "Chirag Mahale",
    role: "Sports Secretary",
    category: "Student Council",
    council: "Student council",
    email: "23me04@aitdgoa.edu.in",
    number: 3,
    image: "/coordinator_pics/3.jpg"
  },
  {
    name: "Sanvi Shetgaonkar",
    role: "Ladies Representative",
    category: "Student Council",
    council: "Student council",
    email: "25me26@aitdgoa.edu.in",
    number: 4,
    image: "/coordinator_pics/4.jpg"
  },
  {
    name: "Atreya Kamat",
    role: "Web Developer",
    category: "Student Council",
    council: "Student council",
    email: "22co06@aitdgoa.edu.in",
    number: 24,
    image: "/coordinator_pics/24.jpeg"
  },
  // Access Council
  {
    name: "Dia Ann Saji",
    role: "General Secretary",
    category: "Council",
    council: "Access council",
    email: "23co10@aitdgoa.edu.in",
    number: 5,
    image: "/coordinator_pics/5.jpg"
  },
  {
    name: "Rohan Salkar",
    role: "Chairperson",
    category: "Council",
    council: "Access council",
    email: "23co49@aitdgoa.edu.in",
    number: 6,
    image: "/coordinator_pics/6.jpg"
  },

  // Sences Council
  {
    name: "Govind Prabhu",
    role: "General Secretary",
    category: "Council",
    council: "Sences council",
    email: "23ec35@aitdgoa.edu.in",
    number: 7,
    image: "/coordinator_pics/7.png"
  },
  {
    name: "Deekshith T S",
    role: "Chairperson",
    category: "Council",
    council: "Sences council",
    email: "23ec12@aitdgoa.edu.in",
    number: 8,
    image: "/coordinator_pics/8.jpg"
  },

  // Mega Council
  {
    name: "Tukaram Naik",
    role: "General Secretary",
    category: "Council",
    council: "Mega council",
    email: "23me12@aitdgoa.edu.in",
    number: 9,
    image: "/coordinator_pics/9.jpg"
  },
  {
    name: "Rohit Wani",
    role: "Chairperson",
    category: "Council",
    council: "Mega council",
    email: "23lme10@aitdgoa.edu.in",
    number: 10,
    image: "/coordinator_pics/10.jpg"
  },

  // MBA
  {
    name: "Valora Ferrao",
    role: "Student Coordinator",
    category: "MBA",
    council: "MBA",
    email: "25mb24@aitdgoa.edu.in",
    number: 11,
    image: "/coordinator_pics/11.jpg"
  },

  // RoboClub
  {
    name: "Yash Sanikop",
    role: "President",
    category: "RoboClub",
    council: "RoboClub",
    email: "23co76@aitdgoa.edu.in",
    number: 12,
    image: "/coordinator_pics/12.png"
  },
  {
    name: "Shourya Dhupkar",
    role: "Secretary",
    category: "RoboClub",
    council: "RoboClub",
    email: "23ec49@aitdgoa.edu.in",
    number: 13,
    image: "/coordinator_pics/13.jpg"
  },

  // Staff (Faculty)
  {
    name: "Gaurish Walke",
    role: "Faculty Coordinator",
    category: "Faculty",
    council: "Staff",
    email: "gw@aitdgoa.edu.in",
    number: 14,
    image: "/coordinator_pics/14.jpg"
  },
  {
    name: "Chaitali Karekar",
    role: "Faculty Coordinator",
    category: "Faculty",
    council: "Staff",
    email: "cha@aitdgoa.edu.in",
    number: 23,
    image: "/coordinator_pics/23.jpg"
  },
  {
    name: "Saish Rivankar",
    role: "Faculty Coordinator",
    category: "Faculty",
    council: "Staff",
    email: "snr@aitdgoa.edu.in",
    number: 15,
    image: "/coordinator_pics/15.jpg"
  },
  {
    name: "Vaibhav Gaunkar",
    role: "Faculty Coordinator",
    category: "Faculty",
    council: "Staff",
    email: "vtg@aitdgoa.edu.in",
    number: 16,
    image: "/coordinator_pics/16.png"
  },
  {
    name: "Ashish Narvekar",
    role: "Faculty Coordinator",
    category: "Faculty",
    council: "Staff",
    email: "an@aitdgoa.edu.in",
    number: 17,
    image: "/coordinator_pics/17.jpg"
  },
  {
    name: "Mrunal Sawant",
    role: "Faculty Coordinator",
    category: "Faculty",
    council: "Staff",
    email: "ms@aitdgoa.edu.in",
    number: 18,
    image: "/coordinator_pics/18.jpg"
  },
  {
    name: "Krupa Pednekar",
    role: "Faculty Coordinator",
    category: "Faculty",
    council: "Staff",
    email: "kmp@aitdgoa.edu.in",
    number: 19,
    image: "/coordinator_pics/19.jpg"
  },
  {
    name: "Atmaram Joshi",
    role: "Faculty Coordinator",
    category: "Faculty",
    council: "Staff",
    email: "arj@aitdgoa.edu.in",
    number: 20,
    image: "/coordinator_pics/20.png"
  },
  {
    name: "Ulpa Waingankar",
    role: "Faculty Coordinator",
    category: "Faculty",
    council: "Staff",
    email: "uw@aitdgoa.edu.in",
    number: 21,
    image: "/coordinator_pics/21.jpg"
  },
  {
    name: "Pooja Bhosle",
    role: "Faculty Coordinator",
    category: "Faculty",
    council: "Staff",
    email: "prb@aitdgoa.edu.in",
    number: 22,
    image: "/coordinator_pics/22.jpg"
  },
];
