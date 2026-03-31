export type TeamMember = {
  name: string;
  role: string;
  category: "Faculty" | "Student Coordinator";
  department?: string;
  image?: string;
};

export const teamMembers: TeamMember[] = [
  // Faculty
  {
    name: "Dr. J. William",
    role: "Principal",
    category: "Faculty",
    department: "AITD",
  },
  {
    name: "Prof. Snehal Bhogan",
    role: "Event Convener",
    category: "Faculty",
    department: "Computer Engineering",
  },
  {
    name: "Prof. Basil Jose",
    role: "Tech Lead / Coordinator",
    category: "Faculty",
    department: "Computer Engineering",
  },
  
  // Student Coordinators
  {
    name: "Yash Sanikop",
    role: "Student Coordinator",
    category: "Student Coordinator",
  },
  {
    name: "Atreya Kamat",
    role: "Lead Developer",
    category: "Student Coordinator",
  },
  {
    name: "Omkar Kauthankar",
    role: "Logistics Head",
    category: "Student Coordinator",
  },
  {
    name: "Siddhesh Naik",
    role: "Robotics Coordinator",
    category: "Student Coordinator",
  },
];
