import { PersonalInfo, Skill, Project, EducationItem, Achievement } from '../types/portfolio';
import streetLightControllerImg from '../assets/images/street_light_controller_1787213899467.jpg';

export const personalInfo: PersonalInfo = {
  name: 'YASHAS C',
  professionalTitle: 'Computer Science Student & Aspiring Software Developer',
  tagline: 'Crafting responsive web applications, embedded hardware prototypes, and scalable full-stack software.',
  bio: 'I build responsive web applications, solve programming problems, and enjoy turning ideas into practical software solutions.',
  phone: '+91 9147837927',
  email: 'yashaschandru583@gmail.com',
  githubUrl: 'https://github.com/yashas-c',
  githubUsername: 'yashas-c',
  linkedinUrl: 'https://linkedin.com/in/yashas-c',
  instagramUrl: 'https://instagram.com/yashas_c',
  location: 'Karnataka, India',
  yearsOfLearning: 3,
  projectsCompleted: 12,
  technologiesLearned: 15,
  certificationsCount: 6,
};

export const aboutDetails = {
  greeting: "Hi, I'm YASHAS C",
  headline: "Aspiring Software Developer passionate about Full-Stack Engineering & IoT Solutions",
  paragraphs: [
    "I am currently pursuing my Bachelor's degree in Computer Science & Engineering. With a solid foundation in core computer science principles—including data structures, algorithms, and database systems—I enjoy developing practical software and hardware projects that solve real-world problems.",
    "My hands-on experience spans modern full-stack web development with React, Node.js, and Express, along with embedded programming in C/C++ on Arduino microcontrollers. I'm constantly learning new frameworks and best practices to build high-performance, accessible, and user-friendly digital experiences."
  ],
  pillars: [
    {
      id: 'career',
      title: 'Career Interests',
      icon: 'Briefcase',
      description: 'Seeking software engineering roles, internships, and opportunities to build production-grade web systems and distributed software.'
    },
    {
      id: 'programming',
      title: 'Programming Interests',
      icon: 'Code2',
      description: 'Strengthening algorithmic problem solving in C++, Java, and Python with a strong focus on clean architecture and efficiency.'
    },
    {
      id: 'web-dev',
      title: 'Web Development',
      icon: 'Globe',
      description: 'Architecting modern responsive single-page applications, REST APIs, and interactive UI components with React & Node.js.'
    },
    {
      id: 'problem-solving',
      title: 'Problem-Solving & IoT',
      icon: 'Cpu',
      description: 'Connecting physical hardware sensors to cloud backends using Arduino and microcontrollers to automate real-life processes.'
    }
  ]
};

export const skillsData: Skill[] = [
  // Programming Languages
  {
    id: 'c',
    name: 'C',
    category: 'languages',
    level: 85,
    proficiency: 'Proficient',
    icon: 'Terminal',
    description: 'Procedural programming, memory management, pointers, and systems fundamentals.',
    tags: ['Systems', 'Core CS']
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'languages',
    level: 88,
    proficiency: 'Advanced',
    icon: 'FileCode',
    description: 'Object-Oriented Programming (OOP), STL containers, algorithms, and embedded development.',
    tags: ['OOP', 'STL', 'Competitive']
  },
  {
    id: 'java',
    name: 'Java',
    category: 'languages',
    level: 84,
    proficiency: 'Proficient',
    icon: 'Coffee',
    description: 'Core Java, OOP principles, multi-threading, collections framework, and JVM fundamentals.',
    tags: ['Backend', 'OOP', 'Data Structures']
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'languages',
    level: 90,
    proficiency: 'Advanced',
    icon: 'Braces',
    description: 'Modern ES6+ syntax, asynchronous programming (Promises/Async-Await), DOM manipulation, and modular code.',
    tags: ['Full Stack', 'ES6+', 'Async']
  },
  {
    id: 'python',
    name: 'Python',
    category: 'languages',
    level: 82,
    proficiency: 'Proficient',
    icon: 'Binary',
    description: 'Scripting, automated data manipulation, logic scripting, and problem solving.',
    tags: ['Scripting', 'Automation']
  },

  // Web Development
  {
    id: 'html',
    name: 'HTML5',
    category: 'web',
    level: 95,
    proficiency: 'Advanced',
    icon: 'Layout',
    description: 'Semantic markup, accessibility (a11y), responsive structures, and SEO best practices.',
    tags: ['Semantic', 'Structure']
  },
  {
    id: 'css',
    name: 'CSS3 / Tailwind',
    category: 'web',
    level: 90,
    proficiency: 'Advanced',
    icon: 'Palette',
    description: 'Flexbox, Grid, keyframe animations, media queries, Tailwind utility classes, and glassmorphism styling.',
    tags: ['Tailwind', 'Animations', 'Responsive']
  },
  {
    id: 'react',
    name: 'React.js',
    category: 'web',
    level: 88,
    proficiency: 'Advanced',
    icon: 'Atom',
    description: 'Component architecture, custom hooks, context state management, lifecycle handling, and Vite tooling.',
    tags: ['Frontend', 'Hooks', 'Single Page Apps']
  },
  {
    id: 'node',
    name: 'Node.js',
    category: 'web',
    level: 84,
    proficiency: 'Proficient',
    icon: 'Server',
    description: 'Server runtime, asynchronous event loop, npm ecosystem, and middleware pipelines.',
    tags: ['Backend', 'Runtime', 'Async I/O']
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'web',
    level: 85,
    proficiency: 'Proficient',
    icon: 'Layers',
    description: 'RESTful API routing, middleware chaining, CORS policies, error handling, and JSON payload handling.',
    tags: ['REST APIs', 'Backend', 'Middleware']
  },

  // Databases
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'database',
    level: 82,
    proficiency: 'Proficient',
    icon: 'Database',
    description: 'Relational schema design, normalization, complex JOIN queries, indexes, and ACID transactions.',
    tags: ['Relational', 'SQL', 'Schema Design']
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'database',
    level: 85,
    proficiency: 'Proficient',
    icon: 'HardDrive',
    description: 'NoSQL document modeling, Mongoose ODM, aggregation pipelines, and CRUD operations.',
    tags: ['NoSQL', 'Document DB', 'Mongoose']
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    level: 78,
    proficiency: 'Intermediate',
    icon: 'DatabaseZap',
    description: 'Advanced relational modeling, foreign keys, constraints, and structured query optimization.',
    tags: ['RDBMS', 'SQL']
  },

  // Tools & Hardware
  {
    id: 'git',
    name: 'Git',
    category: 'tools',
    level: 88,
    proficiency: 'Advanced',
    icon: 'GitBranch',
    description: 'Version control workflows, branching, commits, merging, stashing, and conflict resolution.',
    tags: ['Version Control', 'CLI']
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'tools',
    level: 90,
    proficiency: 'Advanced',
    icon: 'Github',
    description: 'Remote repositories, pull requests, code reviews, GitHub Pages hosting, and CI/CD actions.',
    tags: ['Collaboration', 'CI/CD', 'Open Source']
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'tools',
    level: 95,
    proficiency: 'Advanced',
    icon: 'Code',
    description: 'Configured developer environment, debugging tools, extensions, Emmet, and terminal integration.',
    tags: ['IDE', 'Productivity']
  },
  {
    id: 'arduino',
    name: 'Arduino',
    category: 'tools',
    level: 86,
    proficiency: 'Proficient',
    icon: 'Cpu',
    description: 'Microcontroller programming, GPIO interfaces, analog/digital sensors, actuators, and hardware prototyping.',
    tags: ['IoT', 'Microcontrollers', 'Sensors']
  }
];

export const initialProjects: Project[] = [
  {
    id: 'street-light-controller',
    title: 'Automatic Street Light Controller',
    description: 'An Arduino-based smart IoT system that automatically controls street lights based on surrounding light intensity.',
    longDescription: 'Designed and built an intelligent lighting control system using an Arduino microcontroller, Light Dependent Resistor (LDR) analog sensors, and relay switches. When ambient sunlight falls below a pre-set threshold, the microcontroller triggers the high-power LED arrays, and dims/shuts them off at dawn to minimize electrical waste.',
    image: streetLightControllerImg,
    technologies: ['Arduino', 'C/C++', 'LDR Sensor', 'Relay Module', 'Hardware Prototyping'],
    category: 'iot',
    githubUrl: 'https://github.com/yashas-c/automatic-street-light-controller',
    liveDemoUrl: 'https://github.com/yashas-c/automatic-street-light-controller',
    featured: true,
    highlights: [
      'Automated illumination cycle using real-time LDR optical readings',
      'Over 40% estimated energy reduction compared to static timer setups',
      'Fail-safe manual override and surge-protected relay circuitry'
    ],
    metrics: 'Energy Efficient Automation'
  },
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio Website',
    description: 'A responsive full-stack portfolio website showcasing projects, technical skills, education, and achievements.',
    longDescription: 'A modern developer portfolio engineered with React, Vite, Tailwind CSS, and a Node.js Express backend. Features dynamic profile photo uploading with client-side crop/fit and storage, interactive skills analyzer, vertical education timeline, real-time GitHub integration, and contact form with REST API validation.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    technologies: ['React.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'Express.js'],
    category: 'fullstack',
    githubUrl: 'https://github.com/yashas-c/yashas-c-portfolio',
    liveDemoUrl: 'https://github.com/yashas-c/yashas-c-portfolio',
    featured: true,
    highlights: [
      'Client-side Profile Photo upload, preview, and local persistence',
      'Clean Express.js REST API with MongoDB support and contact endpoints',
      'Fully responsive glassmorphism dark developer UI with smooth Framer Motion'
    ],
    metrics: '100% Responsive & SEO Optimized'
  },
  {
    id: 'government-services-locator',
    title: 'Government Services Locator',
    description: 'A web/mobile application prototype that helps citizens locate nearby public government offices, civic centers, and essential services.',
    longDescription: 'Created a civic tech application aimed at simplifying how citizens find and access municipal offices, identity centers, utility offices, and emergency services. Features filterable categories, interactive location cards, distance estimations, essential documents checklists, and operational hours display.',
    image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=900&q=80',
    technologies: ['React.js', 'JavaScript', 'Node.js', 'REST API', 'Tailwind CSS'],
    category: 'web',
    githubUrl: 'https://github.com/yashas-c/government-services-locator',
    liveDemoUrl: 'https://github.com/yashas-c/government-services-locator',
    featured: true,
    highlights: [
      'Categorized search for Aadhaar centers, municipal offices, and health clinics',
      'Document requirements & step-by-step guidance for citizen services',
      'Interactive radius filter and transit guidance overview'
    ],
    metrics: 'Citizen Utility Prototype'
  },
  {
    id: 'smart-iot-campus-monitor',
    title: 'Smart Campus Environmental & Attendance Monitor',
    description: 'An IoT system combining RFID student badge scanning with temperature and air-quality monitoring for college classrooms.',
    longDescription: 'Developed an integrated hardware-software solution featuring an ESP32/Arduino microcontroller interfaced with an RC522 RFID reader and DHT11 environmental sensor. Attendance logs and temperature telemetry are pushed to a cloud dashboard for real-time facility visibility.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    technologies: ['Arduino', 'C++', 'ESP32', 'Node.js', 'MongoDB', 'IoT Sensors'],
    category: 'iot',
    githubUrl: 'https://github.com/yashas-c/smart-campus-iot-monitor',
    liveDemoUrl: 'https://github.com/yashas-c/smart-campus-iot-monitor',
    featured: false,
    highlights: [
      'Sub-second RFID badge authentication for classroom entry tracking',
      'Live temperature & humidity monitoring with threshold alerts',
      'Centralized Node.js API data aggregation'
    ],
    metrics: 'Hardware + Cloud Prototype'
  },
  {
    id: 'algo-pathfinder-visualizer',
    title: 'Algorithm & Pathfinding Visualizer',
    description: 'An interactive browser application visualizing Dijkstra, A*, Breadth-First Search (BFS), and Depth-First Search (DFS) in real time.',
    longDescription: 'Engineered a visual learning tool allowing students to place start/end nodes, draw custom obstacles/walls, and watch shortest-path algorithms execute step-by-step with adjustable animation speeds and path cost metrics.',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=900&q=80',
    technologies: ['React.js', 'JavaScript', 'HTML5 Canvas', 'Data Structures & Algorithms'],
    category: 'web',
    githubUrl: 'https://github.com/yashas-c/algorithm-pathfinder-visualizer',
    liveDemoUrl: 'https://github.com/yashas-c/algorithm-pathfinder-visualizer',
    featured: false,
    highlights: [
      'Interactive grid with Dijkstra, A*, BFS, and DFS pathfinding',
      'Step-by-step speed control and maze generation algorithms',
      'Visual breakdown of time and space complexity'
    ],
    metrics: 'Educational Tool'
  }
];

export const educationData: EducationItem[] = [
  {
    id: 'btech-cse',
    degree: 'Bachelor of Engineering in Computer Science & Engineering',
    institution: 'Engineering College & Technology Institute',
    university: 'Visvesvaraya Technological University (VTU)',
    location: 'Karnataka, India',
    period: '2022 – 2026 (Expected)',
    grade: 'Current CGPA: 8.4 / 10',
    description: 'Pursuing comprehensive undergraduate coursework in computer science theory, systems programming, and modern software development.',
    coursework: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming (Java/C++)',
      'Database Management Systems (DBMS)',
      'Operating Systems',
      'Computer Networks',
      'Software Engineering & Agile',
      'Microcontrollers & Embedded Systems'
    ],
    achievements: [
      'Active member of the Department Technical Club & Coding Society',
      'Co-organized departmental workshops on Web Development and Arduino Hardware',
      'Recognized for exceptional academic performance in Data Structures and DBMS'
    ]
  },
  {
    id: 'puc-science',
    degree: 'Pre-University Course (PUC) - Science (PCMB)',
    institution: 'Pre-University Composite College',
    location: 'Karnataka, India',
    period: '2020 – 2022',
    grade: 'First Class with Distinction',
    description: 'Rigorous preparatory coursework in Physics, Chemistry, Mathematics, and Biology with strong foundations in analytical reasoning.',
    coursework: [
      'Advanced Mathematics (Calculus, Algebra, Vectors)',
      'Physics (Mechanics, Electricity, Magnetism)',
      'Chemistry & Analytical Sciences'
    ],
    achievements: [
      'Scored distinction in Mathematics and Physics',
      'Participated in State-level Science Talent Search examinations'
    ]
  },
  {
    id: 'sslc-school',
    degree: 'Secondary School Leaving Certificate (10th Standard)',
    institution: 'High School',
    location: 'Karnataka, India',
    period: 'Completed 2020',
    grade: 'High Distinction',
    description: 'Foundational education covering Mathematics, Science, Social Studies, and English communication.',
    coursework: [
      'General Mathematics',
      'Basic Physical & Natural Sciences',
      'Computer Literacy Fundamentals'
    ],
    achievements: [
      'School topper in Science and Mathematics',
      'Active participant in inter-school quiz and science exhibitions'
    ]
  }
];

export const achievementsData: Achievement[] = [
  {
    id: 'cert-fullstack',
    title: 'Full-Stack Web Development Specialization',
    issuer: 'Online Professional Academy',
    date: '2024',
    category: 'certification',
    description: 'Completed in-depth specialization covering React.js, Express.js REST API creation, MongoDB aggregation, and modern async programming.',
    credentialUrl: 'https://github.com/yashas-c',
    badgeColor: 'indigo'
  },
  {
    id: 'cert-cpp-dsa',
    title: 'Data Structures & Algorithms in C++',
    issuer: 'Coding Platform Certification',
    date: '2024',
    category: 'certification',
    description: 'Mastered linked lists, binary search trees, graph traversals, dynamic programming, and algorithm optimization in C++.',
    credentialUrl: 'https://github.com/yashas-c',
    badgeColor: 'blue'
  },
  {
    id: 'hackathon-finalist',
    title: 'State Level Tech Hackathon Finalist',
    issuer: 'Inter-Collegiate Innovation Challenge',
    date: '2023',
    category: 'hackathon',
    description: 'Designed and demonstrated an IoT-based smart energy management prototype within a 24-hour hackathon, securing a top-5 finalist rank.',
    badgeColor: 'purple'
  },
  {
    id: 'workshop-arduino',
    title: 'Embedded Systems & Arduino Prototyping Workshop',
    issuer: 'IEEE Student Chapter',
    date: '2023',
    category: 'workshop',
    description: 'Hands-on intensive training on microcontroller interfaces, sensor data acquisition, relay switching, and serial communication protocols.',
    badgeColor: 'emerald'
  },
  {
    id: 'cert-python',
    title: 'Python for Problem Solving & Automation',
    issuer: 'Tech Learning Institute',
    date: '2023',
    category: 'certification',
    description: 'Verified skills in scripting, object-oriented programming in Python, file I/O operations, and basic algorithmic problem solving.',
    credentialUrl: 'https://github.com/yashas-c',
    badgeColor: 'cyan'
  },
  {
    id: 'academic-excellence',
    title: 'Academic Excellence Award in Computer Science',
    issuer: 'College Department of Computer Science',
    date: '2023',
    category: 'academic',
    description: 'Honored for outstanding semester performance and continuous contribution to peer peer-learning coding circles.',
    badgeColor: 'amber'
  }
];

export const defaultGitHubData = {
  username: 'yashas-c',
  name: 'YASHAS C',
  bio: 'Computer Science Student & Aspiring Software Developer',
  public_repos: 14,
  followers: 28,
  following: 34,
  created_at: '2022-04-12T00:00:00Z',
  pinnedRepos: [
    {
      id: 101,
      name: 'automatic-street-light-controller',
      description: 'Arduino based automatic street light controller using LDR light sensors and relays.',
      html_url: 'https://github.com/yashas-c/automatic-street-light-controller',
      language: 'C++',
      stargazers_count: 18,
      forks_count: 5,
      updated_at: '2024-11-15T00:00:00Z',
      topics: ['arduino', 'embedded', 'iot', 'sensors', 'c-plus-plus']
    },
    {
      id: 102,
      name: 'yashas-c-portfolio',
      description: 'Full-stack responsive developer portfolio built with React, Vite, Tailwind CSS, and Express.js.',
      html_url: 'https://github.com/yashas-c/yashas-c-portfolio',
      language: 'TypeScript',
      stargazers_count: 24,
      forks_count: 8,
      updated_at: '2025-01-20T00:00:00Z',
      topics: ['react', 'portfolio', 'vite', 'tailwind', 'express']
    },
    {
      id: 103,
      name: 'government-services-locator',
      description: 'Web prototype helping citizens locate and navigate nearby municipal and governmental civic services.',
      html_url: 'https://github.com/yashas-c/government-services-locator',
      language: 'JavaScript',
      stargazers_count: 15,
      forks_count: 3,
      updated_at: '2024-09-10T00:00:00Z',
      topics: ['civic-tech', 'react', 'nodejs', 'citizen-services']
    },
    {
      id: 104,
      name: 'dsa-cpp-solutions',
      description: 'Clean, optimized solutions to standard Data Structures and Algorithms problems in C++.',
      html_url: 'https://github.com/yashas-c/dsa-cpp-solutions',
      language: 'C++',
      stargazers_count: 31,
      forks_count: 12,
      updated_at: '2025-02-02T00:00:00Z',
      topics: ['algorithms', 'data-structures', 'cpp', 'competitive-programming']
    }
  ]
};
