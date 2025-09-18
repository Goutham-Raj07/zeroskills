"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ExternalLink, Play, Youtube } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { VirtualLab } from "@/components/virtual-lab"
import {
  Search,
  Filter,
  Code2,
  Microscope,
  Monitor,
  Beaker,
  Calculator,
  Palette,
  Briefcase,
  Clock,
  Users,
  Star,
  Target,
  ChevronRight,
  BookOpen,
  Trophy,
  CheckCircle,
  Zap,
  Brain,
  Atom,
  Cpu,
  Database,
  Globe,
  Shield,
  Lightbulb,
} from "lucide-react"

const virtualLabCourses = [
  {
    id: "CS-PYTHON-101",
    title: "Python Programming Lab",
    description: "Master Python fundamentals through hands-on coding exercises and real-world projects.",
    type: "coding" as const,
    duration: "2 hours",
    difficulty: "Beginner" as const,
    rating: 4.9,
    enrolled: 2500,
    category: "Computer Science",
    icon: <Code2 className="h-6 w-6" />,
    color: "bg-blue-500",
    skills: ["Python Syntax", "Data Types", "Control Flow", "Functions", "OOP"],
    projects: ["Calculator App", "Data Analyzer", "Web Scraper"],
    prerequisites: ["Basic computer literacy"],
    labCount: 8,
    completionRate: 94,
  },
  {
    id: "BIO-MOLECULAR-201",
    title: "Molecular Biology Lab",
    description: "Explore DNA, RNA, and protein structures through interactive virtual experiments.",
    type: "experiment" as const,
    duration: "3 hours",
    difficulty: "Intermediate" as const,
    rating: 4.7,
    enrolled: 1200,
    category: "Life Sciences",
    icon: <Microscope className="h-6 w-6" />,
    color: "bg-green-500",
    skills: ["DNA Extraction", "PCR Techniques", "Gel Electrophoresis", "Protein Analysis"],
    projects: ["Gene Mapping", "Protein Structure Analysis", "Mutation Detection"],
    prerequisites: ["Basic biology knowledge"],
    labCount: 12,
    completionRate: 89,
  },
  {
    id: "PHYSICS-SIM-301",
    title: "Physics Simulation Lab",
    description: "Visualize complex physics concepts through interactive simulations and experiments.",
    type: "simulation" as const,
    duration: "2.5 hours",
    difficulty: "Advanced" as const,
    rating: 4.8,
    enrolled: 800,
    category: "Physics",
    icon: <Atom className="h-6 w-6" />,
    color: "bg-purple-500",
    skills: ["Mechanics", "Thermodynamics", "Electromagnetism", "Quantum Physics"],
    projects: ["Pendulum Simulation", "Wave Interference", "Particle Physics"],
    prerequisites: ["High school physics"],
    labCount: 15,
    completionRate: 76,
  },
  {
    id: "CHEM-ORGANIC-201",
    title: "Organic Chemistry Lab",
    description: "Perform virtual chemical reactions and understand organic compound structures.",
    type: "experiment" as const,
    duration: "4 hours",
    difficulty: "Intermediate" as const,
    rating: 4.6,
    enrolled: 1500,
    category: "Chemistry",
    icon: <Beaker className="h-6 w-6" />,
    color: "bg-orange-500",
    skills: ["Synthesis", "Reaction Mechanisms", "Spectroscopy", "Purification"],
    projects: ["Drug Synthesis", "Polymer Creation", "Catalyst Design"],
    prerequisites: ["General chemistry"],
    labCount: 10,
    completionRate: 82,
  },
  {
    id: "MATH-CALC-301",
    title: "Calculus Visualization Lab",
    description: "Understand calculus concepts through interactive graphs and mathematical simulations.",
    type: "simulation" as const,
    duration: "2 hours",
    difficulty: "Advanced" as const,
    rating: 4.5,
    enrolled: 600,
    category: "Mathematics",
    icon: <Calculator className="h-6 w-6" />,
    color: "bg-indigo-500",
    skills: ["Derivatives", "Integrals", "Limits", "Series", "Differential Equations"],
    projects: ["Optimization Problems", "Area Calculations", "Population Models"],
    prerequisites: ["Pre-calculus"],
    labCount: 6,
    completionRate: 71,
  },
  {
    id: "AI-ML-401",
    title: "Machine Learning Lab",
    description: "Build and train machine learning models using interactive coding environments.",
    type: "coding" as const,
    duration: "5 hours",
    difficulty: "Advanced" as const,
    rating: 4.9,
    enrolled: 1800,
    category: "Artificial Intelligence",
    icon: <Brain className="h-6 w-6" />,
    color: "bg-pink-500",
    skills: ["Python", "TensorFlow", "Data Preprocessing", "Model Training", "Evaluation"],
    projects: ["Image Classifier", "Sentiment Analysis", "Recommendation System"],
    prerequisites: ["Python programming", "Statistics"],
    labCount: 20,
    completionRate: 68,
  },
  {
    id: "DESIGN-UI-101",
    title: "UI/UX Design Lab",
    description: "Create beautiful user interfaces and learn design principles through hands-on projects.",
    type: "simulation" as const,
    duration: "3 hours",
    difficulty: "Beginner" as const,
    rating: 4.8,
    enrolled: 2200,
    category: "Design",
    icon: <Palette className="h-6 w-6" />,
    color: "bg-rose-500",
    skills: ["Figma", "Design Systems", "User Research", "Prototyping", "Accessibility"],
    projects: ["Mobile App Design", "Website Redesign", "Design System"],
    prerequisites: ["Basic design sense"],
    labCount: 8,
    completionRate: 91,
  },
  {
    id: "CYBER-SEC-301",
    title: "Cybersecurity Lab",
    description: "Learn ethical hacking and security concepts through controlled virtual environments.",
    type: "simulation" as const,
    duration: "4 hours",
    difficulty: "Advanced" as const,
    rating: 4.7,
    enrolled: 900,
    category: "Cybersecurity",
    icon: <Shield className="h-6 w-6" />,
    color: "bg-red-500",
    skills: ["Penetration Testing", "Network Security", "Cryptography", "Incident Response"],
    projects: ["Vulnerability Assessment", "Security Audit", "Threat Analysis"],
    prerequisites: ["Networking basics", "Linux"],
    labCount: 12,
    completionRate: 73,
  },
  {
    id: "DATA-ANALYSIS-201",
    title: "Data Science Lab",
    description: "Analyze real datasets and create visualizations using modern data science tools.",
    type: "coding" as const,
    duration: "3.5 hours",
    difficulty: "Intermediate" as const,
    rating: 4.6,
    enrolled: 1600,
    category: "Data Science",
    icon: <Database className="h-6 w-6" />,
    color: "bg-teal-500",
    skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter"],
    projects: ["Sales Analysis", "Customer Segmentation", "Predictive Modeling"],
    prerequisites: ["Python basics", "Statistics"],
    labCount: 14,
    completionRate: 85,
  },
  {
    id: "WEB-DEV-101",
    title: "Full-Stack Web Development Lab",
    description: "Build complete web applications using modern frameworks and technologies.",
    type: "coding" as const,
    duration: "6 hours",
    difficulty: "Intermediate" as const,
    rating: 4.8,
    enrolled: 2000,
    category: "Web Development",
    icon: <Globe className="h-6 w-6" />,
    color: "bg-cyan-500",
    skills: ["React", "Node.js", "MongoDB", "Express", "API Development"],
    projects: ["E-commerce Site", "Social Media App", "Task Manager"],
    prerequisites: ["HTML/CSS", "JavaScript"],
    labCount: 16,
    completionRate: 78,
  },
]

const categories = [
  "All",
  "Computer Science",
  "Life Sciences",
  "Physics",
  "Chemistry",
  "Mathematics",
  "Artificial Intelligence",
  "Design",
  "Cybersecurity",
  "Data Science",
  "Web Development",
]

const difficultyLevels = ["All", "Beginner", "Intermediate", "Advanced"]

const defaultGfgByCategory: Record<string, string> = {
  "Computer Science": "https://www.geeksforgeeks.org/data-structures/",
  "Artificial Intelligence": "https://www.geeksforgeeks.org/machine-learning/",
  "Web Development": "https://www.geeksforgeeks.org/web-development/",
  "Data Science": "https://www.geeksforgeeks.org/data-science-tutorials/",
  "Mathematics": "https://www.geeksforgeeks.org/mathematics/",
  "Physics": "https://www.geeksforgeeks.org/physics-articles/",
  "Chemistry": "https://www.geeksforgeeks.org/chemistry-articles/",
  "Life Sciences": "https://www.geeksforgeeks.org/biology-articles/",
  "Design": "https://www.geeksforgeeks.org/ui-ux-design/",
  "Cybersecurity": "https://www.geeksforgeeks.org/cybersecurity/",
}

type ResourcePlatform = 'gfg' | 'leetcode' | 'hackerrank'

const curatedGfgLinks = [
  {
    title: "Data Structures & Algorithms",
    url: "https://www.geeksforgeeks.org/data-structures/",
    tags: ["DSA", "Foundations"],
  },
  {
    title: "DSA Self Paced Syllabus",
    url: "https://www.geeksforgeeks.org/dsa-self-paced/",
    tags: ["Course", "Roadmap"],
  },
  {
    title: "Problem of the Day",
    url: "https://www.geeksforgeeks.org/problem-of-the-day/",
    tags: ["Practice", "Daily"],
  },
  {
    title: "Python Programming Language",
    url: "https://www.geeksforgeeks.org/python-programming-language/",
    tags: ["Python", "Language"],
  },
  {
    title: "JavaScript Tutorials",
    url: "https://www.geeksforgeeks.org/javascript/",
    tags: ["JavaScript", "Frontend"],
  },
  {
    title: "Competitive Programming",
    url: "https://www.geeksforgeeks.org/competitive-programming-a-complete-guide/",
    tags: ["CP", "Guide"],
  },
]

const curatedLeetCodeLinks = [
  {
    title: "Problemset",
    url: "https://leetcode.com/problemset/",
    tags: ["All", "Practice"],
  },
  {
    title: "Top Interview 150",
    url: "https://leetcode.com/studyplan/top-interview-150/",
    tags: ["Interview", "Curation"],
  },
  {
    title: "LeetCode 75",
    url: "https://leetcode.com/studyplan/leetcode-75/",
    tags: ["Roadmap", "DSA"],
  },
  {
    title: "Explore: Learn Cards",
    url: "https://leetcode.com/explore/",
    tags: ["Guided", "Topics"],
  },
]

const curatedHackerRankLinks = [
  {
    title: "Algorithms",
    url: "https://www.hackerrank.com/domains/algorithms",
    tags: ["Practice", "DSA"],
  },
  {
    title: "Interview Preparation Kit",
    url: "https://www.hackerrank.com/interview/interview-preparation-kit",
    tags: ["Interview", "Curation"],
  },
  {
    title: "30 Days of Code",
    url: "https://www.hackerrank.com/domains/tutorials/30-days-of-code",
    tags: ["Foundations", "Tutorial"],
  },
  {
    title: "Problem Solving",
    url: "https://www.hackerrank.com/domains/tutorials/10-days-of-javascript",
    tags: ["JS", "Practice"],
  },
]

const defaultLeetCodeByCategory: Record<string, string> = {
  "Computer Science": "https://leetcode.com/problemset/",
  "Artificial Intelligence": "https://leetcode.com/tag/machine-learning/",
  "Web Development": "https://leetcode.com/tag/javascript/",
  "Data Science": "https://leetcode.com/tag/data-structures/",
  "Mathematics": "https://leetcode.com/tag/math/",
  "Physics": "https://leetcode.com/problemset/",
  "Chemistry": "https://leetcode.com/problemset/",
  "Life Sciences": "https://leetcode.com/problemset/",
  "Design": "https://leetcode.com/problemset/",
  "Cybersecurity": "https://leetcode.com/problemset/",
}

const defaultHackerRankByCategory: Record<string, string> = {
  "Computer Science": "https://www.hackerrank.com/domains/algorithms",
  "Artificial Intelligence": "https://www.hackerrank.com/domains/ai",
  "Web Development": "https://www.hackerrank.com/domains/tutorials/10-days-of-javascript",
  "Data Science": "https://www.hackerrank.com/domains/data-structures",
  "Mathematics": "https://www.hackerrank.com/domains/mathematics",
  "Physics": "https://www.hackerrank.com/domains/algorithms",
  "Chemistry": "https://www.hackerrank.com/domains/algorithms",
  "Life Sciences": "https://www.hackerrank.com/domains/algorithms",
  "Design": "https://www.hackerrank.com/domains/algorithms",
  "Cybersecurity": "https://www.hackerrank.com/domains/security",
}

// Virtual Lab Videos organized by discipline
const virtualLabVideos = {
  "General/Simulation": [
    {
      title: "PhET Interactive Simulations",
      description: "Physics, chemistry, biology, math simulations",
      url: "https://www.youtube.com/user/PhETInteractiveSims",
      thumbnail: "https://img.youtube.com/vi/OwfPdmMKQr0/maxresdefault.jpg",
      duration: "Channel",
      difficulty: "Beginner"
    },
    {
      title: "Amrita Virtual Labs",
      description: "Virtual experiments in biotech, physics, chemistry, electronics",
      url: "https://www.youtube.com/user/amritavlab",
      thumbnail: "https://img.youtube.com/vi/ylc0cyhS79U/maxresdefault.jpg",
      duration: "Channel",
      difficulty: "Intermediate"
    },
    {
      title: "BioDigital Human",
      description: "3D interactive human anatomy tours and demos",
      url: "https://www.youtube.com/c/BioDigital/videos",
      thumbnail: "https://img.youtube.com/vi/_qwdNau4ovE/maxresdefault.jpg",
      duration: "Channel",
      difficulty: "Intermediate"
    },
    {
      title: "Visible Body",
      description: "Interactive anatomy software demos",
      url: "https://www.youtube.com/user/VisibleBody",
      thumbnail: "https://img.youtube.com/vi/ZMaSyXIL1Yw/maxresdefault.jpg",
      duration: "Channel",
      difficulty: "Beginner"
    },
    {
      title: "JoVE Journal",
      description: "Peer-reviewed lab video demonstrations",
      url: "https://www.youtube.com/c/JoVE",
      thumbnail: "https://img.youtube.com/vi/tpEjSJOFFyU/maxresdefault.jpg",
      duration: "Channel",
      difficulty: "Advanced"
    }
  ],
  "Biology/Medical": [
    {
      title: "UConn Virtual Anatomy Lab",
      description: "Virtual anatomy table demo with Anatomage",
      url: "https://www.youtube.com/watch?v=ylc0cyhS79U",
      thumbnail: "https://img.youtube.com/vi/ylc0cyhS79U/maxresdefault.jpg",
      duration: "10 min",
      difficulty: "Intermediate"
    },
    {
      title: "CrashCourse Anatomy & Physiology",
      description: "Introduction to human anatomy and physiology",
      url: "https://www.youtube.com/watch?v=uBGl2BujkPQ",
      thumbnail: "https://img.youtube.com/vi/uBGl2BujkPQ/maxresdefault.jpg",
      duration: "12 min",
      difficulty: "Beginner"
    },
    {
      title: "Digital Dissection Demo",
      description: "Modern digital dissection techniques",
      url: "https://www.youtube.com/watch?v=ZMaSyXIL1Yw",
      thumbnail: "https://img.youtube.com/vi/ZMaSyXIL1Yw/maxresdefault.jpg",
      duration: "15 min",
      difficulty: "Intermediate"
    },
    {
      title: "Clinical Pathology Lab VR",
      description: "360° VR lab visualization",
      url: "https://www.youtube.com/watch?v=tpEjSJOFFyU",
      thumbnail: "https://img.youtube.com/vi/tpEjSJOFFyU/maxresdefault.jpg",
      duration: "8 min",
      difficulty: "Advanced"
    }
  ],
  "Chemistry": [
    {
      title: "MIT Laboratory Chemistry",
      description: "Real lab lectures and demonstrations",
      url: "https://www.youtube.com/playlist?list=PLUl4u3cNGP63ZhyqhOGKbSBzcOovEbb6y",
      thumbnail: "https://img.youtube.com/vi/OwfPdmMKQr0/maxresdefault.jpg",
      duration: "Playlist",
      difficulty: "Advanced"
    },
    {
      title: "PhET Chemistry Experiments",
      description: "Virtual chemistry lab simulations",
      url: "https://www.youtube.com/watch?v=OwfPdmMKQr0",
      thumbnail: "https://img.youtube.com/vi/OwfPdmMKQr0/maxresdefault.jpg",
      duration: "12 min",
      difficulty: "Beginner"
    },
    {
      title: "Learning Life through Lab Chemistry",
      description: "Laboratory course demonstration",
      url: "https://www.youtube.com/watch?v=u-Ms5v20cVw",
      thumbnail: "https://img.youtube.com/vi/u-Ms5v20cVw/maxresdefault.jpg",
      duration: "20 min",
      difficulty: "Intermediate"
    }
  ],
  "Physics": [
    {
      title: "Best FREE Physics Virtual Labs",
      description: "Compilation of physics lab demos",
      url: "https://www.youtube.com/watch?v=vxnlqu1g3jE",
      thumbnail: "https://img.youtube.com/vi/vxnlqu1g3jE/maxresdefault.jpg",
      duration: "15 min",
      difficulty: "Beginner"
    },
    {
      title: "PhET Capacitor Circuits",
      description: "Interactive circuit simulation walkthrough",
      url: "https://www.youtube.com/watch?v=39HEDz6tow8",
      thumbnail: "https://img.youtube.com/vi/39HEDz6tow8/maxresdefault.jpg",
      duration: "10 min",
      difficulty: "Intermediate"
    },
    {
      title: "Virtual Optics Tutorial",
      description: "Optics lab simulation tutorial",
      url: "https://www.youtube.com/watch?v=1Jrce9JEZJw",
      thumbnail: "https://img.youtube.com/vi/1Jrce9JEZJw/maxresdefault.jpg",
      duration: "18 min",
      difficulty: "Intermediate"
    },
    {
      title: "Newton's Second Law Virtual Lab",
      description: "AP Physics simulation lab",
      url: "https://www.youtube.com/watch?v=VYVnssNUj44",
      thumbnail: "https://img.youtube.com/vi/VYVnssNUj44/maxresdefault.jpg",
      duration: "12 min",
      difficulty: "Intermediate"
    },
    {
      title: "Forces & Motion Basics",
      description: "Virtual lab for motion physics",
      url: "https://www.youtube.com/watch?v=o0ckU9qr9Po",
      thumbnail: "https://img.youtube.com/vi/o0ckU9qr9Po/maxresdefault.jpg",
      duration: "14 min",
      difficulty: "Beginner"
    }
  ],
  "Engineering": [
    {
      title: "MIT Metals Lab Casting",
      description: "Traditional casting demonstration",
      url: "https://www.youtube.com/watch?v=BJZErgSjLfA",
      thumbnail: "https://img.youtube.com/vi/BJZErgSjLfA/maxresdefault.jpg",
      duration: "25 min",
      difficulty: "Advanced"
    },
    {
      title: "Mechanical Engineering Lab Tour",
      description: "Undergraduate labs tour",
      url: "https://www.youtube.com/watch?v=3SVLoiBMvak",
      thumbnail: "https://img.youtube.com/vi/3SVLoiBMvak/maxresdefault.jpg",
      duration: "20 min",
      difficulty: "Intermediate"
    },
    {
      title: "Civil Engineering Lab Tour",
      description: "Civil engineering facilities tour",
      url: "https://www.youtube.com/watch?v=IslVaCcgj5E",
      thumbnail: "https://img.youtube.com/vi/IslVaCcgj5E/maxresdefault.jpg",
      duration: "15 min",
      difficulty: "Intermediate"
    },
    {
      title: "UCL Electrical Engineering Labs",
      description: "Electronics and embedded systems tour",
      url: "https://www.youtube.com/watch?v=HAgUs0sqOVU",
      thumbnail: "https://img.youtube.com/vi/HAgUs0sqOVU/maxresdefault.jpg",
      duration: "18 min",
      difficulty: "Intermediate"
    }
  ],
  "Computer Science/AI": [
    {
      title: "Stanford Robotics Center",
      description: "Robotics lab tour and demonstrations",
      url: "https://www.youtube.com/watch?v=a0ANLUYyRYI",
      thumbnail: "https://img.youtube.com/vi/a0ANLUYyRYI/maxresdefault.jpg",
      duration: "22 min",
      difficulty: "Advanced"
    },
    {
      title: "Virtual AI Agents Lab",
      description: "AI research lab demonstration",
      url: "https://www.youtube.com/watch?v=Yz-r7KGXbyM",
      thumbnail: "https://img.youtube.com/vi/Yz-r7KGXbyM/maxresdefault.jpg",
      duration: "16 min",
      difficulty: "Advanced"
    },
    {
      title: "PhET Circuits & Electronics",
      description: "Interactive electronics simulation",
      url: "https://www.youtube.com/watch?v=z4ggGPQbArI",
      thumbnail: "https://img.youtube.com/vi/z4ggGPQbArI/maxresdefault.jpg",
      duration: "12 min",
      difficulty: "Intermediate"
    }
  ],
  "Biotechnology": [
    {
      title: "Amrita Biotechnology Labs",
      description: "Gram staining, plasmid isolation demos",
      url: "https://www.youtube.com/playlist?list=PL10WTjZXSIlG0rNnp3kbKS1EhyXbWCBjq",
      thumbnail: "https://img.youtube.com/vi/ylc0cyhS79U/maxresdefault.jpg",
      duration: "Playlist",
      difficulty: "Intermediate"
    },
    {
      title: "Microbiology Gram Staining",
      description: "Laboratory staining techniques",
      url: "https://www.youtube.com/watch?v=ylc0cyhS79U",
      thumbnail: "https://img.youtube.com/vi/ylc0cyhS79U/maxresdefault.jpg",
      duration: "8 min",
      difficulty: "Intermediate"
    }
  ],
  "Specialized": [
    {
      title: "Sports Science Biomechanics",
      description: "Motion analysis and performance lab",
      url: "https://www.youtube.com/watch?v=MwHGhlZG8K8",
      thumbnail: "https://img.youtube.com/vi/MwHGhlZG8K8/maxresdefault.jpg",
      duration: "14 min",
      difficulty: "Intermediate"
    },
    {
      title: "Stanford Virtual Human Interaction",
      description: "Psychology and cognitive lab tour",
      url: "https://www.youtube.com/watch?v=AnmGiEg4_GQ",
      thumbnail: "https://img.youtube.com/vi/AnmGiEg4_GQ/maxresdefault.jpg",
      duration: "12 min",
      difficulty: "Advanced"
    },
    {
      title: "SLAC National Lab Tour",
      description: "Large facility instrumentation tour",
      url: "https://www.youtube.com/watch?v=EoU-kjGsBcM",
      thumbnail: "https://img.youtube.com/vi/EoU-kjGsBcM/maxresdefault.jpg",
      duration: "30 min",
      difficulty: "Advanced"
    },
    {
      title: "VR Anatomy & Physiology",
      description: "Virtual reality lab demonstration",
      url: "https://www.youtube.com/watch?v=s8mwz0_VVUY",
      thumbnail: "https://img.youtube.com/vi/s8mwz0_VVUY/maxresdefault.jpg",
      duration: "10 min",
      difficulty: "Intermediate"
    }
  ]
}

export default function VirtualLabsPage() {
  const [selectedTab, setSelectedTab] = useState<"all" | "coding" | "simulation" | "experiment">("all")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [enrolledLabs, setEnrolledLabs] = useState<string[]>([])
  const [completedLabs, setCompletedLabs] = useState<string[]>([])
  const [selectedResourcePlatform, setSelectedResourcePlatform] = useState<ResourcePlatform>('gfg')
  const [resourceUrl, setResourceUrl] = useState<string>("https://www.geeksforgeeks.org/")
  const [selectedVideoCategory, setSelectedVideoCategory] = useState<string>("General/Simulation")
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [videoSearchQuery, setVideoSearchQuery] = useState<string>("")
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false)

  const filteredLabs = virtualLabCourses.filter((lab) => {
    const matchesTab = selectedTab === "all" || lab.type === selectedTab
    const matchesCategory = selectedCategory === "All" || lab.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "All" || lab.difficulty === selectedDifficulty
    const matchesSearch = lab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lab.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lab.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesTab && matchesCategory && matchesDifficulty && matchesSearch
  })

  const handleEnroll = (labId: string) => {
    setEnrolledLabs((prev) => [...prev, labId])
  }

  const handleComplete = (labId: string) => {
    setCompletedLabs((prev) => [...prev, labId])
    setEnrolledLabs((prev) => prev.filter((id) => id !== labId))
  }

  const searchEducationalVideos = async (query: string) => {
    if (!query.trim()) return
    
    setIsSearching(true)
    try {
      // Search YouTube for educational content
      const searchResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query + ' educational tutorial learn')}&type=video&maxResults=8&key=AIzaSyDxoVfu0zC3V4MFlFZvcKuscVLevcssN5Y&order=relevance&videoDuration=medium&videoDefinition=high`
      )
      
      const searchData = await searchResponse.json()
      
      if (searchData.items && searchData.items.length > 0) {
        // Get video details for duration
        const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',')
        const detailsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds}&key=AIzaSyDxoVfu0zC3V4MFlFZvcKuscVLevcssN5Y`
        )
        
        const detailsData = await detailsResponse.json()
        
        // Combine search results with video details
        const videos = searchData.items.map((item: any, index: number) => {
          const details = detailsData.items[index]
          const duration = details?.contentDetails?.duration || 'PT0S'
          const formattedDuration = formatDuration(duration)
          
          return {
            title: item.snippet.title,
            description: item.snippet.description.substring(0, 150) + '...',
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            channel: item.snippet.channelTitle,
            duration: formattedDuration,
            difficulty: getDifficultyFromTitle(item.snippet.title),
            thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url
          }
        })
        
        setSearchResults(videos)
        setShowSearchResults(true)
      } else {
        throw new Error('No videos found')
      }
    } catch (error) {
      console.error('Error searching YouTube videos:', error)
      // Fallback to real educational YouTube videos
      const fallbackVideos = getFallbackEducationalVideos(query)
      setSearchResults(fallbackVideos)
      setShowSearchResults(true)
    } finally {
      setIsSearching(false)
    }
  }

  const formatDuration = (duration: string) => {
    // Convert ISO 8601 duration (PT4M13S) to readable format (4:13)
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
    if (!match) return 'Unknown'
    
    const hours = parseInt(match[1] || '0')
    const minutes = parseInt(match[2] || '0')
    const seconds = parseInt(match[3] || '0')
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    } else if (minutes > 0) {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`
    } else {
      return `${seconds}s`
    }
  }

  const getDifficultyFromTitle = (title: string) => {
    const titleLower = title.toLowerCase()
    if (titleLower.includes('beginner') || titleLower.includes('basic') || titleLower.includes('introduction') || titleLower.includes('tutorial')) {
      return 'Beginner'
    } else if (titleLower.includes('advanced') || titleLower.includes('expert') || titleLower.includes('master') || titleLower.includes('complete course')) {
      return 'Advanced'
    } else {
      return 'Intermediate'
    }
  }

  const getFallbackEducationalVideos = (query: string) => {
    const queryLower = query.toLowerCase()
    
    // Real educational YouTube videos based on common topics
    const educationalVideos: any[] = []
    
    if (queryLower.includes('math') || queryLower.includes('calculus') || queryLower.includes('algebra')) {
      educationalVideos.push(
        {
          title: "Calculus 1 - Full College Course",
          description: "Complete calculus course covering derivatives, integrals, and applications",
          url: "https://www.youtube.com/watch?v=HfACrKJ_Y2w",
          channel: "freeCodeCamp.org",
          duration: "12 hours",
          difficulty: "Intermediate",
          thumbnail: "https://img.youtube.com/vi/HfACrKJ_Y2w/maxresdefault.jpg"
        },
        {
          title: "Algebra Introduction - Basic Overview",
          description: "Introduction to algebra concepts and problem solving",
          url: "https://www.youtube.com/watch?v=NybHckSEQBI",
          channel: "The Organic Chemistry Tutor",
          duration: "1 hour",
          difficulty: "Beginner",
          thumbnail: "https://img.youtube.com/vi/NybHckSEQBI/maxresdefault.jpg"
        }
      )
    }
    
    if (queryLower.includes('physics') || queryLower.includes('mechanics') || queryLower.includes('thermodynamics')) {
      educationalVideos.push(
        {
          title: "Physics - Basic Introduction",
          description: "Fundamental physics concepts and principles",
          url: "https://www.youtube.com/watch?v=b1t41Q3xRM8",
          channel: "The Organic Chemistry Tutor",
          duration: "53 min",
          difficulty: "Beginner",
          thumbnail: "https://img.youtube.com/vi/b1t41Q3xRM8/maxresdefault.jpg"
        },
        {
          title: "Thermodynamics Explained",
          description: "Understanding heat, energy, and thermodynamic processes",
          url: "https://www.youtube.com/watch?v=8N1BxHgsoOw",
          channel: "CrashCourse",
          duration: "10 min",
          difficulty: "Intermediate",
          thumbnail: "https://img.youtube.com/vi/8N1BxHgsoOw/maxresdefault.jpg"
        }
      )
    }
    
    if (queryLower.includes('chemistry') || queryLower.includes('organic') || queryLower.includes('reaction')) {
      educationalVideos.push(
        {
          title: "General Chemistry 1 - Full Course",
          description: "Complete general chemistry course covering atoms, molecules, and reactions",
          url: "https://www.youtube.com/watch?v=5yw1YH7YA7c",
          channel: "freeCodeCamp.org",
          duration: "11 hours",
          difficulty: "Intermediate",
          thumbnail: "https://img.youtube.com/vi/5yw1YH7YA7c/maxresdefault.jpg"
        },
        {
          title: "Organic Chemistry - Basic Introduction",
          description: "Introduction to organic chemistry and carbon compounds",
          url: "https://www.youtube.com/watch?v=B_ketdzJtY8",
          channel: "The Organic Chemistry Tutor",
          duration: "41 min",
          difficulty: "Beginner",
          thumbnail: "https://img.youtube.com/vi/B_ketdzJtY8/maxresdefault.jpg"
        }
      )
    }
    
    if (queryLower.includes('biology') || queryLower.includes('cell') || queryLower.includes('genetics')) {
      educationalVideos.push(
        {
          title: "Biology - Introduction to Biology",
          description: "Fundamental concepts in biology and life sciences",
          url: "https://www.youtube.com/watch?v=QnQe0xW_JY4",
          channel: "CrashCourse",
          duration: "12 min",
          difficulty: "Beginner",
          thumbnail: "https://img.youtube.com/vi/QnQe0xW_JY4/maxresdefault.jpg"
        },
        {
          title: "Cell Biology - Introduction to Cells",
          description: "Understanding cell structure and function",
          url: "https://www.youtube.com/watch?v=8IlzKri08kk",
          channel: "CrashCourse",
          duration: "11 min",
          difficulty: "Intermediate",
          thumbnail: "https://img.youtube.com/vi/8IlzKri08kk/maxresdefault.jpg"
        }
      )
    }
    
    if (queryLower.includes('programming') || queryLower.includes('coding') || queryLower.includes('python') || queryLower.includes('javascript')) {
      educationalVideos.push(
        {
          title: "Python for Beginners - Full Course",
          description: "Complete Python programming course for beginners",
          url: "https://www.youtube.com/watch?v=kqtD5dpn9C8",
          channel: "freeCodeCamp.org",
          duration: "4 hours",
          difficulty: "Beginner",
          thumbnail: "https://img.youtube.com/vi/kqtD5dpn9C8/maxresdefault.jpg"
        },
        {
          title: "JavaScript Tutorial for Beginners",
          description: "Learn JavaScript programming from scratch",
          url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
          channel: "freeCodeCamp.org",
          duration: "3 hours",
          difficulty: "Beginner",
          thumbnail: "https://img.youtube.com/vi/PkZNo7MFNFg/maxresdefault.jpg"
        }
      )
    }
    
    if (queryLower.includes('history') || queryLower.includes('world war') || queryLower.includes('ancient')) {
      educationalVideos.push(
        {
          title: "World History - Crash Course",
          description: "Overview of world history from ancient times to modern era",
          url: "https://www.youtube.com/watch?v=Yocja_N5s1I",
          channel: "CrashCourse",
          duration: "12 min",
          difficulty: "Beginner",
          thumbnail: "https://img.youtube.com/vi/Yocja_N5s1I/maxresdefault.jpg"
        }
      )
    }
    
    if (queryLower.includes('economics') || queryLower.includes('finance') || queryLower.includes('business')) {
      educationalVideos.push(
        {
          title: "Economics - Crash Course",
          description: "Introduction to economic principles and concepts",
          url: "https://www.youtube.com/watch?v=3ez10ADR_gM",
          channel: "CrashCourse",
          duration: "12 min",
          difficulty: "Beginner",
          thumbnail: "https://img.youtube.com/vi/3ez10ADR_gM/maxresdefault.jpg"
        }
      )
    }
    
    // Default educational videos if no specific topic matches
    if (educationalVideos.length === 0) {
      educationalVideos.push(
        {
          title: "How to Study Effectively - Study Tips",
          description: "Learn effective study techniques and strategies",
          url: "https://www.youtube.com/watch?v=IlU-zDU6aQ0",
          channel: "CrashCourse",
          duration: "10 min",
          difficulty: "Beginner",
          thumbnail: "https://img.youtube.com/vi/IlU-zDU6aQ0/maxresdefault.jpg"
        },
        {
          title: "Learning How to Learn - Coursera",
          description: "Powerful mental tools to help you master tough subjects",
          url: "https://www.youtube.com/watch?v=O96fE1E-rf8",
          channel: "Coursera",
          duration: "4 min",
          difficulty: "Beginner",
          thumbnail: "https://img.youtube.com/vi/O96fE1E-rf8/maxresdefault.jpg"
        },
        {
          title: "The Science of Learning",
          description: "Understanding how the brain learns and retains information",
          url: "https://www.youtube.com/watch?v=rhgwIhB58p4",
          channel: "TED-Ed",
          duration: "5 min",
          difficulty: "Intermediate",
          thumbnail: "https://img.youtube.com/vi/rhgwIhB58p4/maxresdefault.jpg"
        }
      )
    }
    
    return educationalVideos.slice(0, 6) // Return up to 6 videos
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "coding":
        return <Code2 className="h-4 w-4" />
      case "simulation":
        return <Monitor className="h-4 w-4" />
      case "experiment":
        return <Beaker className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Virtual Lab Courses</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience hands-on learning through interactive virtual labs. Code, experiment, and simulate real-world scenarios.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Code2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">50+</div>
              <div className="text-sm text-gray-600">Coding Labs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Microscope className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">30+</div>
              <div className="text-sm text-gray-600">Experiment Labs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Monitor className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">40+</div>
              <div className="text-sm text-gray-600">Simulation Labs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">15K+</div>
              <div className="text-sm text-gray-600">Active Learners</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search labs, skills, or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficultyLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as any)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Labs ({filteredLabs.length})</TabsTrigger>
            <TabsTrigger value="coding">Coding Labs</TabsTrigger>
            <TabsTrigger value="simulation">Simulations</TabsTrigger>
            <TabsTrigger value="experiment">Experiments</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="space-y-6">
            {filteredLabs.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Labs Found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
                <Button onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                  setSelectedDifficulty("All")
                }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredLabs.map((lab) => (
                  <Card key={lab.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${lab.color} text-white`}>{lab.icon}</div>
                          <div>
                            <CardTitle className="text-lg">{lab.title}</CardTitle>
                            <CardDescription>{lab.category}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getDifficultyColor(lab.difficulty)}>{lab.difficulty}</Badge>
                          <Badge variant="outline" className="flex items-center space-x-1">
                            {getTypeIcon(lab.type)}
                            <span className="capitalize">{lab.type}</span>
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">{lab.description}</p>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{lab.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{lab.enrolled.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{lab.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm mb-2">Key Skills:</h4>
                        <div className="flex flex-wrap gap-1">
                          {lab.skills.slice(0, 4).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {lab.skills.length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                              +{lab.skills.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Labs:</span>
                          <span className="ml-1 font-medium">{lab.labCount}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Completion Rate:</span>
                          <span className="ml-1 font-medium text-green-600">{lab.completionRate}%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Prerequisites:</span> {lab.prerequisites.join(", ")}
                        </div>
                        <div className="flex space-x-2">
                          {!enrolledLabs.includes(lab.id) && !completedLabs.includes(lab.id) && (
                            <Button onClick={() => handleEnroll(lab.id)} className="flex items-center space-x-2">
                              <Play className="h-4 w-4" />
                              <span>Start Lab</span>
                            </Button>
                          )}
                          {enrolledLabs.includes(lab.id) && (
                            <Button 
                              onClick={() => handleComplete(lab.id)}
                              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                              <span>Mark Complete</span>
                            </Button>
                          )}
                          {completedLabs.includes(lab.id) && (
                            <Button variant="outline" className="flex items-center space-x-2">
                              <Trophy className="h-4 w-4" />
                              <span>Completed</span>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Featured Lab Demo */}
        {filteredLabs.length > 0 && (
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">Try a Lab Now</h3>
              </div>
              <p className="text-blue-700">Experience our virtual lab environment with this interactive demo</p>
            </CardHeader>
            <CardContent>
              <VirtualLab
                labId="demo-python"
                title="Python Basics Demo"
                description="Get started with Python programming in our interactive environment"
                type="coding"
                duration="15 minutes"
                difficulty="Beginner"
              />
            </CardContent>
          </Card>
        )}

        {/* Coding Platforms Panel (Tabs: GfG, LeetCode, HackerRank) */}
        <Tabs value={selectedResourcePlatform} onValueChange={(v) => setSelectedResourcePlatform(v as ResourcePlatform)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="gfg">GeeksforGeeks</TabsTrigger>
            <TabsTrigger value="leetcode">LeetCode</TabsTrigger>
            <TabsTrigger value="hackerrank">HackerRank</TabsTrigger>
          </TabsList>

          {(
            [
              {
                key: 'gfg' as ResourcePlatform,
                title: 'GeeksforGeeks',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg',
                placeholder: 'https://www.geeksforgeeks.org/...',
                curated: curatedGfgLinks,
                recommended: (category: string) => defaultGfgByCategory[category] || 'https://www.geeksforgeeks.org/',
              },
              {
                key: 'leetcode' as ResourcePlatform,
                title: 'LeetCode',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png',
                placeholder: 'https://leetcode.com/...',
                curated: curatedLeetCodeLinks,
                recommended: (category: string) => defaultLeetCodeByCategory[category] || 'https://leetcode.com/problemset/',
              },
              {
                key: 'hackerrank' as ResourcePlatform,
                title: 'HackerRank',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png',
                placeholder: 'https://www.hackerrank.com/...',
                curated: curatedHackerRankLinks,
                recommended: (category: string) => defaultHackerRankByCategory[category] || 'https://www.hackerrank.com/domains/algorithms',
              },
            ]
          ).map((platformConfig) => (
            <TabsContent key={platformConfig.key} value={platformConfig.key} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Embedded Viewer */}
                <Card className="lg:col-span-2 overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <img src={platformConfig.logo} alt={platformConfig.title} className="h-5" />
                        <span>{platformConfig.title} Viewer</span>
                      </CardTitle>
                      <a
                        href={(resourceUrl.startsWith('http') ? resourceUrl : `https://${resourceUrl}`)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex"
                      >
                        <Button variant="outline" size="sm">
                          Open Externally
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                      </a>
                    </div>
                    <CardDescription>Enter a URL to load it here</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        value={resourceUrl}
                        onChange={(e) => setResourceUrl(e.target.value)}
                        placeholder={platformConfig.placeholder}
                        className="w-full pl-9 pr-2 py-2 border rounded-md text-sm"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setResourceUrl(platformConfig.recommended(selectedCategory))}
                      >
                        Use Recommended
                      </Button>
                      <a
                        href={(resourceUrl.startsWith('http') ? resourceUrl : `https://${resourceUrl}`)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex"
                      >
                        <Button size="sm">
                          Open Externally
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                      </a>
                    </div>
                    <div className="border rounded-lg overflow-hidden bg-white">
                      <iframe
                        key={resourceUrl + platformConfig.key}
                        src={resourceUrl.startsWith('http') ? resourceUrl : `https://${resourceUrl}`}
                        className="w-full h-64 lg:h-[70vh]"
                        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="text-xs text-gray-500">
                      If the page doesn't load due to site restrictions, use "Open Externally".
                    </div>
                  </CardContent>
                </Card>

                {/* Curated Links */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      <CardTitle>Curated Learning Paths</CardTitle>
                    </div>
                    <CardDescription>Quick access to popular sections</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {platformConfig.curated.map((item) => (
                      <div key={item.url} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-sm">{item.title}</div>
                          <div className="space-x-1 mt-1">
                            {item.tags.map((t: string) => (
                              <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" onClick={() => setResourceUrl(item.url)}>Preview</Button>
                          <a href={item.url} target="_blank" className="inline-flex">
                            <Button size="sm">
                              Open
                              <ExternalLink className="h-4 w-4 ml-2" />
                            </Button>
                          </a>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Virtual Lab Videos Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Youtube className="h-6 w-6 text-red-600" />
                  <span>Virtual Lab Videos</span>
                </CardTitle>
                <CardDescription>Explore real lab demonstrations and virtual experiments from top institutions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search for educational videos on any topic..."
                    value={videoSearchQuery}
                    onChange={(e) => setVideoSearchQuery(e.target.value)}
                    className="pl-10"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        searchEducationalVideos(videoSearchQuery)
                      }
                    }}
                  />
                </div>
                <Button
                  onClick={() => searchEducationalVideos(videoSearchQuery)}
                  disabled={!videoSearchQuery.trim() || isSearching}
                  className="flex items-center space-x-2"
                >
                  {isSearching ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      <span>Search</span>
                    </>
                  )}
                </Button>
              </div>
              {showSearchResults && (
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Search Results for "{videoSearchQuery}"</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowSearchResults(false)
                      setVideoSearchQuery("")
                    }}
                  >
                    Clear Search
                  </Button>
                </div>
              )}
            </div>

            {/* Category Selection */}
            {!showSearchResults && (
              <div className="flex flex-wrap gap-2">
                {Object.keys(virtualLabVideos).map((category) => (
                  <Button
                    key={category}
                    variant={selectedVideoCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedVideoCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            )}

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {showSearchResults ? (
                // Search Results
                searchResults.map((video, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                        <Button
                          size="lg"
                          className="opacity-0 hover:opacity-100 transition-opacity duration-200"
                          onClick={() => setSelectedVideo(video.url)}
                        >
                          <Play className="h-6 w-6 mr-2" />
                          Watch Now
                        </Button>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="text-xs">
                          {video.duration}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2">{video.title}</h3>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{video.description}</p>
                      <p className="text-xs text-blue-600 mb-3">{video.channel}</p>
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            video.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                            video.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          {video.difficulty}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedVideo(video.url)}
                          >
                            <Play className="h-3 w-3 mr-1" />
                            Watch
                          </Button>
                          <a href={video.url} target="_blank" rel="noreferrer">
                            <Button size="sm">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Open
                            </Button>
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                // Category Videos
                virtualLabVideos[selectedVideoCategory as keyof typeof virtualLabVideos]?.map((video, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                        <Button
                          size="lg"
                          className="opacity-0 hover:opacity-100 transition-opacity duration-200"
                          onClick={() => setSelectedVideo(video.url)}
                        >
                          <Play className="h-6 w-6 mr-2" />
                          Watch Now
                        </Button>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="text-xs">
                          {video.duration}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2">{video.title}</h3>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            video.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                            video.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          {video.difficulty}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedVideo(video.url)}
                          >
                            <Play className="h-3 w-3 mr-1" />
                            Watch
                          </Button>
                          <a href={video.url} target="_blank" rel="noreferrer">
                            <Button size="sm">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Open
                            </Button>
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Video Player Modal */}
            {selectedVideo && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-semibold">Virtual Lab Video</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedVideo(null)}
                    >
                      Close
                    </Button>
                  </div>
                  <div className="p-4">
                    <div className="aspect-video">
                      <iframe
                        src={selectedVideo.includes('watch?v=') ? 
                          selectedVideo.replace('watch?v=', 'embed/') :
                          selectedVideo.includes('playlist?') ?
                          selectedVideo.replace('playlist?', 'embed/videoseries?') :
                          selectedVideo.includes('user/') ?
                          selectedVideo.replace('user/', 'embed/') :
                          selectedVideo.includes('c/') ?
                          selectedVideo.replace('c/', 'embed/') :
                          selectedVideo
                        }
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedVideo(null)}
                      >
                        Close
                      </Button>
                      <a href={selectedVideo} target="_blank" rel="noreferrer">
                        <Button>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open in YouTube
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
