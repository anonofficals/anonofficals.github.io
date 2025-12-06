export interface OpenSourceProject {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  category: string;
  languages: string[];
  stars: number;
  forks: number;
  contributors: number;
  license: string;
  lastUpdated: string;
  githubUrl: string;
  docsUrl?: string;
  image?: string;
  featured?: boolean;
}

export const opensourceProjects: OpenSourceProject[] = [
  {
    id: "semantic-kernel",
    name: "Semantic Kernel",
    description: "Integrate cutting-edge LLM technology quickly and easily into your apps",
    longDescription: "Semantic Kernel is an SDK that integrates Large Language Models (LLMs) like OpenAI, Azure OpenAI, and Hugging Face with conventional programming languages like C#, Python, and Java.",
    category: "AI/ML",
    languages: ["C#", "Python", "Java"],
    stars: 18500,
    forks: 2800,
    contributors: 234,
    license: "MIT",
    lastUpdated: "2024-01-15",
    githubUrl: "https://github.com/microsoft/semantic-kernel",
    featured: true,
  },
  {
    id: "powertoys",
    name: "PowerToys",
    description: "Windows system utilities to maximize productivity",
    longDescription: "Microsoft PowerToys is a set of utilities for power users to tune and streamline their Windows experience for greater productivity.",
    category: "Utilities",
    languages: ["C#", "C++", "XAML"],
    stars: 98000,
    forks: 5600,
    contributors: 456,
    license: "MIT",
    lastUpdated: "2024-01-14",
    githubUrl: "https://github.com/microsoft/PowerToys",
    featured: true,
  },
  {
    id: "global-country-data",
    name: "Global Country Data",
    description: "Comprehensive dataset of world countries with metadata",
    longDescription: "A comprehensive and regularly updated dataset containing information about all countries including demographics, geography, and economic data.",
    category: "Data",
    languages: ["TypeScript", "JSON"],
    stars: 1250,
    forks: 320,
    contributors: 45,
    license: "Apache-2.0",
    lastUpdated: "2024-01-10",
    githubUrl: "https://github.com/anon/global-country-data",
    featured: false,
  },
  {
    id: "zmap",
    name: "ZMap",
    description: "Fast single packet network scanner designed for Internet-wide surveys",
    longDescription: "ZMap is a fast single packet network scanner designed for Internet-wide network surveys. On a typical desktop computer with a gigabit Ethernet connection, ZMap is capable of scanning the entire public IPv4 address space in under 45 minutes.",
    category: "Security",
    languages: ["C", "CMake"],
    stars: 5200,
    forks: 890,
    contributors: 78,
    license: "Apache-2.0",
    lastUpdated: "2024-01-08",
    githubUrl: "https://github.com/zmap/zmap",
    featured: true,
  },
  {
    id: "react-components",
    name: "React Components",
    description: "A collection of reusable React components with TypeScript support",
    category: "Frontend",
    languages: ["TypeScript", "React", "CSS"],
    stars: 3400,
    forks: 560,
    contributors: 89,
    license: "MIT",
    lastUpdated: "2024-01-12",
    githubUrl: "https://github.com/anon/react-components",
    featured: false,
  },
  {
    id: "api-gateway",
    name: "API Gateway",
    description: "High-performance API gateway with rate limiting and caching",
    category: "Backend",
    languages: ["Go", "Docker"],
    stars: 7800,
    forks: 1200,
    contributors: 156,
    license: "Apache-2.0",
    lastUpdated: "2024-01-11",
    githubUrl: "https://github.com/anon/api-gateway",
    featured: true,
  },
];

export const projectCategories = [
  "All",
  "AI/ML",
  "Utilities",
  "Data",
  "Security",
  "Frontend",
  "Backend",
];
