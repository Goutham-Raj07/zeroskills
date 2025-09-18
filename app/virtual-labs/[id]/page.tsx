"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VirtualLab } from "@/components/virtual-lab"
import {
  ArrowLeft,
  Play,
  Clock,
  Users,
  Star,
  Target,
  CheckCircle,
  BookOpen,
  Code2,
  Microscope,
  Monitor,
  Beaker,
  Calculator,
  Palette,
  Briefcase,
  Brain,
  Atom,
  Cpu,
  Database,
  Globe,
  Shield,
  Lightbulb,
  Download,
  Share2,
  Trophy,
  Zap,
  ChevronRight,
  FileText,
  Video,
  Settings,
  HelpCircle,
  MessageCircle,
  ExternalLink,
  Search,
} from "lucide-react"

const virtualLabCourses = {
  "CS-PYTHON-101": {
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
    instructor: "Dr. Sarah Chen",
    instructorTitle: "Senior Software Engineer",
    instructorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    modules: [
      {
        id: "module-1",
        title: "Python Basics",
        duration: "30 minutes",
        description: "Learn Python syntax, variables, and basic operations",
        labs: [
          { id: "lab-1-1", title: "Hello World & Variables", duration: "10 min", completed: false },
          { id: "lab-1-2", title: "Data Types & Operations", duration: "10 min", completed: false },
          { id: "lab-1-3", title: "Input & Output", duration: "10 min", completed: false },
        ]
      },
      {
        id: "module-2",
        title: "Control Flow",
        duration: "45 minutes",
        description: "Master if statements, loops, and conditional logic",
        labs: [
          { id: "lab-2-1", title: "If-Else Statements", duration: "15 min", completed: false },
          { id: "lab-2-2", title: "For & While Loops", duration: "15 min", completed: false },
          { id: "lab-2-3", title: "Loop Control", duration: "15 min", completed: false },
        ]
      },
      {
        id: "module-3",
        title: "Functions & OOP",
        duration: "45 minutes",
        description: "Create reusable functions and understand object-oriented programming",
        labs: [
          { id: "lab-3-1", title: "Function Definition", duration: "15 min", completed: false },
          { id: "lab-3-2", title: "Classes & Objects", duration: "15 min", completed: false },
          { id: "lab-3-3", title: "Inheritance", duration: "15 min", completed: false },
        ]
      }
    ],
    resources: [
      { type: "Documentation", title: "Python Official Docs", url: "#" },
      { type: "Video", title: "Python Crash Course", url: "#" },
      { type: "Cheat Sheet", title: "Python Syntax Reference", url: "#" },
    ],
    faqs: [
      {
        question: "Do I need prior programming experience?",
        answer: "No prior experience required. This lab is designed for complete beginners."
      },
      {
        question: "What tools will I use?",
        answer: "You'll use our integrated Python environment with Jupyter notebooks and real-time code execution."
      },
      {
        question: "Can I save my progress?",
        answer: "Yes, all your work is automatically saved and you can resume from where you left off."
      }
    ]
  },
  "BIO-MOLECULAR-201": {
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
    instructor: "Dr. Michael Rodriguez",
    instructorTitle: "Molecular Biologist",
    instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    modules: [
      {
        id: "module-1",
        title: "DNA Structure & Extraction",
        duration: "60 minutes",
        description: "Learn about DNA structure and perform virtual extraction",
        labs: [
          { id: "lab-1-1", title: "DNA Structure Visualization", duration: "20 min", completed: false },
          { id: "lab-1-2", title: "Virtual DNA Extraction", duration: "20 min", completed: false },
          { id: "lab-1-3", title: "DNA Quantification", duration: "20 min", completed: false },
        ]
      },
      {
        id: "module-2",
        title: "PCR Techniques",
        duration: "60 minutes",
        description: "Master Polymerase Chain Reaction through simulation",
        labs: [
          { id: "lab-2-1", title: "PCR Setup", duration: "20 min", completed: false },
          { id: "lab-2-2", title: "Thermal Cycling", duration: "20 min", completed: false },
          { id: "lab-2-3", title: "PCR Analysis", duration: "20 min", completed: false },
        ]
      },
      {
        id: "module-3",
        title: "Gel Electrophoresis",
        duration: "60 minutes",
        description: "Analyze DNA fragments using gel electrophoresis",
        labs: [
          { id: "lab-3-1", title: "Gel Preparation", duration: "20 min", completed: false },
          { id: "lab-3-2", title: "Sample Loading", duration: "20 min", completed: false },
          { id: "lab-3-3", title: "Results Analysis", duration: "20 min", completed: false },
        ]
      }
    ],
    resources: [
      { type: "Documentation", title: "Molecular Biology Guide", url: "#" },
      { type: "Video", title: "PCR Animation", url: "#" },
      { type: "Simulation", title: "Interactive DNA Model", url: "#" },
    ],
    faqs: [
      {
        question: "What background knowledge do I need?",
        answer: "Basic understanding of biology and chemistry concepts is helpful but not required."
      },
      {
        question: "Are the experiments realistic?",
        answer: "Yes, our virtual experiments closely simulate real laboratory procedures and equipment."
      },
      {
        question: "Can I repeat experiments?",
        answer: "Absolutely! You can repeat any experiment as many times as you need to master the concepts."
      }
    ]
  }
}

export default function VirtualLabDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [labProgress, setLabProgress] = useState<Record<string, boolean>>({})
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [gfgUrl, setGfgUrl] = useState("https://www.geeksforgeeks.org/")

  const labId = params.id as string
  const lab = virtualLabCourses[labId as keyof typeof virtualLabCourses]

  useEffect(() => {
    // Check if user is enrolled (in real app, this would come from API)
    const enrolled = localStorage.getItem(`enrolled-${labId}`) === 'true'
    setIsEnrolled(enrolled)
  }, [labId])

  if (!lab) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Lab Not Found</h2>
            <p className="text-gray-600 mb-4">The virtual lab you're looking for doesn't exist.</p>
            <Button onClick={() => router.push('/virtual-labs')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Labs
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleEnroll = () => {
    setIsEnrolled(true)
    localStorage.setItem(`enrolled-${labId}`, 'true')
  }

  const handleLabComplete = (labId: string) => {
    setLabProgress(prev => ({ ...prev, [labId]: true }))
    
    // Check if all labs in current module are completed
    const currentModule = lab.modules.find(m => m.id === selectedModule)
    if (currentModule) {
      const allLabsCompleted = currentModule.labs.every(l => labProgress[l.id] || l.id === labId)
      if (allLabsCompleted) {
        // Module completed
        console.log(`Module ${currentModule.title} completed!`)
      }
    }
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

  const completedLabsCount = Object.values(labProgress).filter(Boolean).length
  const totalLabsCount = lab.modules.reduce((acc, module) => acc + module.labs.length, 0)
  const progressPercentage = (completedLabsCount / totalLabsCount) * 100

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

  const curatedGfgLinks: Array<{ title: string; url: string; tags: string[] }> = (
    () => {
      switch (lab?.category) {
        case "Computer Science":
          return [
            { title: "DSA Roadmap", url: "https://www.geeksforgeeks.org/dsa-self-paced/", tags: ["DSA", "Roadmap"] },
            { title: "Problem of the Day", url: "https://www.geeksforgeeks.org/problem-of-the-day/", tags: ["Practice", "Daily"] },
            { title: "Python", url: "https://www.geeksforgeeks.org/python-programming-language/", tags: ["Language"] },
          ]
        case "Artificial Intelligence":
          return [
            { title: "ML Tutorials", url: "https://www.geeksforgeeks.org/machine-learning/", tags: ["ML", "Tutorials"] },
            { title: "DL Basics", url: "https://www.geeksforgeeks.org/deep-learning/", tags: ["Deep Learning"] },
            { title: "NumPy Guide", url: "https://www.geeksforgeeks.org/numpy-tutorial/", tags: ["NumPy"] },
          ]
        case "Web Development":
          return [
            { title: "JavaScript", url: "https://www.geeksforgeeks.org/javascript/", tags: ["JS"] },
            { title: "React", url: "https://www.geeksforgeeks.org/reactjs-tutorials/", tags: ["React"] },
            { title: "Node.js", url: "https://www.geeksforgeeks.org/nodejs/", tags: ["Node"] },
          ]
        case "Data Science":
          return [
            { title: "Pandas", url: "https://www.geeksforgeeks.org/pandas-tutorial/", tags: ["Pandas"] },
            { title: "Matplotlib", url: "https://www.geeksforgeeks.org/matplotlib-tutorial/", tags: ["Viz"] },
            { title: "Statistics", url: "https://www.geeksforgeeks.org/statistics/", tags: ["Stats"] },
          ]
        default:
          return [
            { title: "GeeksforGeeks Home", url: "https://www.geeksforgeeks.org/", tags: ["Home"] },
            { title: "Articles", url: "https://www.geeksforgeeks.org/category/featured-articles/", tags: ["Articles"] },
          ]
      }
    }
  )()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="outline" onClick={() => router.push('/virtual-labs')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Labs
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lab Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${lab.color} text-white`}>{lab.icon}</div>
                    <div>
                      <CardTitle className="text-2xl">{lab.title}</CardTitle>
                      <CardDescription className="text-lg">{lab.category}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getDifficultyColor(lab.difficulty)}>{lab.difficulty}</Badge>
                    <Badge variant="outline" className="flex items-center space-x-1">
                      <Target className="h-3 w-3" />
                      <span className="capitalize">{lab.type}</span>
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-700">{lab.description}</p>

                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{lab.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{lab.enrolled.toLocaleString()} enrolled</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{lab.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Trophy className="h-4 w-4" />
                    <span>{lab.completionRate}% completion rate</span>
                  </div>
                </div>

                {isEnrolled && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                )}

                <div className="flex items-center space-x-4">
                  {!isEnrolled ? (
                    <Button onClick={handleEnroll} size="lg" className="flex items-center space-x-2">
                      <Play className="h-5 w-5" />
                      <span>Enroll in Lab</span>
                    </Button>
                  ) : (
                    <Button size="lg" className="flex items-center space-x-2">
                      <Play className="h-5 w-5" />
                      <span>Continue Learning</span>
                    </Button>
                  )}
                  <Button variant="outline" size="lg">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Lab Interface */}
            {isEnrolled && (
              <Card>
                <CardHeader>
                  <CardTitle>Virtual Lab Environment</CardTitle>
                  <CardDescription>Interactive lab interface for hands-on learning</CardDescription>
                </CardHeader>
                <CardContent>
                  <VirtualLab
                    labId={lab.id}
                    title={lab.title}
                    description={lab.description}
                    type={lab.type}
                    duration={lab.duration}
                    difficulty={lab.difficulty}
                  />
                </CardContent>
              </Card>
            )}

            {/* Modules */}
            {isEnrolled && (
              <Card>
                <CardHeader>
                  <CardTitle>Lab Modules</CardTitle>
                  <CardDescription>Structured learning path with hands-on exercises</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={selectedModule || lab.modules[0]?.id} onValueChange={setSelectedModule}>
                    <TabsList className="grid w-full grid-cols-3">
                      {lab.modules.map((module) => (
                        <TabsTrigger key={module.id} value={module.id}>
                          {module.title}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {lab.modules.map((module) => (
                      <TabsContent key={module.id} value={module.id} className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">{module.title}</h3>
                          <p className="text-gray-600 mb-4">{module.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{module.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Target className="h-4 w-4" />
                              <span>{module.labs.length} labs</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {module.labs.map((labItem) => (
                            <div
                              key={labItem.id}
                              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                            >
                              <div className="flex items-center space-x-3">
                                {labItem.completed || labProgress[labItem.id] ? (
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                ) : (
                                  <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />
                                )}
                                <div>
                                  <h4 className="font-medium">{labItem.title}</h4>
                                  <p className="text-sm text-gray-500">{labItem.duration}</p>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => handleLabComplete(labItem.id)}
                                disabled={labItem.completed || labProgress[labItem.id]}
                              >
                                {labItem.completed || labProgress[labItem.id] ? (
                                  <>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Completed
                                  </>
                                ) : (
                                  <>
                                    <Play className="h-4 w-4 mr-2" />
                                    Start Lab
                                  </>
                                )}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* GeeksforGeeks Panel */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg" alt="GfG" className="h-5" />
                    <span>GeeksforGeeks</span>
                  </CardTitle>
                </div>
                <CardDescription>Quick reference while you learn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    value={gfgUrl}
                    onChange={(e) => setGfgUrl(e.target.value)}
                    placeholder="https://www.geeksforgeeks.org/..."
                    className="w-full pl-9 pr-2 py-2 border rounded-md text-sm"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm" onClick={() => setGfgUrl(defaultGfgByCategory[lab.category] || 'https://www.geeksforgeeks.org/')}>Use Recommended</Button>
                  <a href={gfgUrl.startsWith('http') ? gfgUrl : `https://${gfgUrl}`} target="_blank" rel="noreferrer" className="inline-flex">
                    <Button size="sm">
                      Open Externally
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                </div>
                <div className="border rounded-lg overflow-hidden bg-white">
                  <iframe
                    key={gfgUrl}
                    src={gfgUrl.startsWith('http') ? gfgUrl : `https://${gfgUrl}`}
                    className="w-full h-64"
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-2">
                  {curatedGfgLinks.map((item) => (
                    <div key={item.url} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{item.title}</div>
                        <div className="space-x-1 mt-1">
                          {item.tags.map((t) => (
                            <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => setGfgUrl(item.url)}>Preview</Button>
                        <a href={item.url} target="_blank" className="inline-flex">
                          <Button size="sm">
                            Open
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Instructor */}
            <Card>
              <CardHeader>
                <CardTitle>Instructor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={lab.instructorAvatar}
                    alt={lab.instructor}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{lab.instructor}</h4>
                    <p className="text-sm text-gray-600">{lab.instructorTitle}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Instructor
                </Button>
              </CardContent>
            </Card>

            {/* Skills & Prerequisites */}
            <Card>
              <CardHeader>
                <CardTitle>Skills You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {lab.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prerequisites</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{lab.prerequisites.join(", ")}</p>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {lab.resources.map((resource, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    {resource.type === "Documentation" && <FileText className="h-4 w-4" />}
                    {resource.type === "Video" && <Video className="h-4 w-4" />}
                    {resource.type === "Cheat Sheet" && <BookOpen className="h-4 w-4" />}
                    {resource.type === "Simulation" && <Monitor className="h-4 w-4" />}
                    <a href={resource.url} className="text-blue-600 hover:underline">
                      {resource.title}
                    </a>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {lab.faqs.map((faq, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-sm mb-1">{faq.question}</h4>
                    <p className="text-xs text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
