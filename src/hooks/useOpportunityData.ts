import { useState, useEffect } from 'react';
import { Brain, Code, Rocket, Globe, Trophy, Shield, Cpu } from 'lucide-react';

export interface OpportunityProgram {
  id: string;
  title: string;
  department: string;
  duration: string;
  location: string;
  stipend?: string;
  prize?: string;
  skills: string[];
  description: string;
  requirements: string[];
  icon: any;
  color: string;
  type: 'internship' | 'hackathon' | 'fellowship' | 'other';
  additionalInfo?: Array<{ label: string; value: string }>;
}

export const useOpportunityData = (type?: 'internship' | 'hackathon' | 'fellowship' | 'other') => {
  const [opportunities, setOpportunities] = useState<OpportunityProgram[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data fetch - replace with actual API call
    const allOpportunities: OpportunityProgram[] = [
      // Internships
      {
        id: "ai-intern",
        title: "AI Research Intern",
        department: "Artificial Intelligence",
        duration: "3-6 months",
        location: "Remote/Hybrid",
        stipend: "$2,000/month",
        skills: ["Python", "TensorFlow", "Machine Learning", "Data Analysis"],
        description: "Work on cutting-edge AI research projects including neural networks, computer vision, and NLP.",
        requirements: ["Computer Science/AI background", "Programming experience", "Research mindset"],
        icon: Brain,
        color: "bg-blue-500/20 text-blue-400",
        type: 'internship'
      },
      {
        id: "robotics-intern",
        title: "Robotics Engineering Intern",
        department: "Robotics Systems",
        duration: "4-6 months",
        location: "On-site",
        stipend: "$1,500/month",
        skills: ["ROS", "C++", "Hardware Design", "Control Systems"],
        description: "Design and develop autonomous robotic systems for various applications.",
        requirements: ["Mechanical/Electrical Engineering", "ROS experience", "Hardware knowledge"],
        icon: Code,
        color: "bg-green-500/20 text-green-400",
        type: 'internship'
      },
      // Hackathons
      {
        id: "ai-hackathon",
        title: "AI Innovation Hackathon",
        department: "AI & Machine Learning",
        duration: "48 hours",
        location: "San Francisco, CA",
        prize: "$50,000",
        skills: ["Python", "TensorFlow", "ML Algorithms", "Data Science"],
        description: "Build AI solutions that address real-world challenges in healthcare, climate change, and social impact.",
        requirements: ["Team of 2-4 members", "AI/ML experience", "Problem-solving skills"],
        icon: Brain,
        color: "bg-blue-500/20 text-blue-400",
        type: 'hackathon',
        additionalInfo: [{ label: "Team Size", value: "2-4" }, { label: "Spots Left", value: "45" }]
      },
      {
        id: "blockchain-hackathon",
        title: "Blockchain BuildOut",
        department: "Web3 & Blockchain",
        duration: "54 hours",
        location: "Austin, TX",
        prize: "$30,000",
        skills: ["Solidity", "Web3.js", "Smart Contracts", "DeFi"],
        description: "Create the next generation of decentralized applications and blockchain solutions.",
        requirements: ["Team of 2-5 members", "Blockchain knowledge", "Creative thinking"],
        icon: Shield,
        color: "bg-purple-500/20 text-purple-400",
        type: 'hackathon',
        additionalInfo: [{ label: "Team Size", value: "2-5" }, { label: "Spots Left", value: "67" }]
      },
      {
        id: "robotics-hackathon",
        title: "Robotics Challenge",
        department: "Robotics & Hardware",
        duration: "48 hours",
        location: "Boston, MA",
        prize: "$40,000",
        skills: ["ROS", "Python", "Hardware Integration", "Computer Vision"],
        description: "Design and build autonomous robotic systems to solve complex real-world challenges.",
        requirements: ["Team of 2-4 members", "Robotics experience", "Hardware access"],
        icon: Cpu,
        color: "bg-green-500/20 text-green-400",
        type: 'hackathon',
        additionalInfo: [{ label: "Team Size", value: "2-4" }, { label: "Spots Left", value: "35" }]
      },
      {
        id: "web-hackathon",
        title: "Full-Stack Web Hackathon",
        department: "Web Development",
        duration: "48 hours",
        location: "Remote",
        prize: "$25,000",
        skills: ["React", "Node.js", "TypeScript", "Database Design"],
        description: "Build innovative web applications that solve modern business challenges.",
        requirements: ["Team of 2-4 members", "Full-stack experience", "Modern frameworks"],
        icon: Globe,
        color: "bg-cyan-500/20 text-cyan-400",
        type: 'hackathon',
        additionalInfo: [{ label: "Team Size", value: "2-4" }, { label: "Spots Left", value: "80" }]
      },
      {
        id: "cybersecurity-hackathon",
        title: "Cybersecurity CTF Challenge",
        department: "Security & Privacy",
        duration: "36 hours",
        location: "Seattle, WA",
        prize: "$35,000",
        skills: ["Penetration Testing", "Cryptography", "Network Security", "Forensics"],
        description: "Compete in capture-the-flag challenges and build security solutions.",
        requirements: ["Team of 2-3 members", "Security knowledge", "Ethical hacking skills"],
        icon: Shield,
        color: "bg-red-500/20 text-red-400",
        type: 'hackathon',
        additionalInfo: [{ label: "Team Size", value: "2-3" }, { label: "Spots Left", value: "50" }]
      }
    ];

    const filtered = type 
      ? allOpportunities.filter(opp => opp.type === type)
      : allOpportunities;

    setOpportunities(filtered);
    setLoading(false);
  }, [type]);

  return { opportunities, loading };
};
