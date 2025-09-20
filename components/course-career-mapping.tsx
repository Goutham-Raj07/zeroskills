"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  GraduationCap, 
  Building2, 
  Briefcase, 
  BookOpen, 
  Users, 
  TrendingUp,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Target,
  Award,
  Lightbulb,
  Clock
} from "lucide-react"

interface CareerPath {
  id: string
  title: string
  type: "industry" | "government" | "private" | "entrepreneurship" | "higher_education"
  description: string
  examples: string[]
  icon: React.ReactNode
}

interface CourseStream {
  id: string
  name: string
  fullName: string
  description: string
  duration: string
  eligibility: string
  careerPaths: CareerPath[]
  icon: React.ReactNode
  color: string
}

const courseStreams: CourseStream[] = [
  {
    id: "ba",
    name: "B.A.",
    fullName: "Bachelor of Arts",
    description: "Liberal arts and humanities education",
    duration: "3 years",
    eligibility: "10+2 in any stream",
    color: "bg-blue-50 border-blue-200 text-blue-800",
    icon: <BookOpen className="h-6 w-6" />,
    careerPaths: [
      {
        id: "ba-industry",
        title: "Media & Entertainment",
        type: "industry",
        description: "Content creation, journalism, advertising",
        examples: ["Journalist", "Content Writer", "Social Media Manager", "PR Executive"],
        icon: <Building2 className="h-4 w-4" />
      },
      {
        id: "ba-government",
        title: "Government Services",
        type: "government",
        description: "Civil services and administrative roles",
        examples: ["UPSC Civil Services", "State PSC", "Banking", "Railway Recruitment"],
        icon: <Award className="h-4 w-4" />
      },
      {
        id: "ba-private",
        title: "Corporate Sector",
        type: "private",
        description: "Business and corporate roles",
        examples: ["HR Manager", "Marketing Executive", "Business Analyst", "Customer Relations"],
        icon: <Briefcase className="h-4 w-4" />
      },
      {
        id: "ba-entrepreneurship",
        title: "Creative Entrepreneurship",
        type: "entrepreneurship",
        description: "Starting creative businesses",
        examples: ["Content Agency", "Event Management", "Digital Marketing", "Publishing"],
        icon: <Lightbulb className="h-4 w-4" />
      },
      {
        id: "ba-higher",
        title: "Higher Education",
        type: "higher_education",
        description: "Advanced degrees and research",
        examples: ["M.A.", "M.Phil", "Ph.D", "Law (LLB)", "MBA"],
        icon: <GraduationCap className="h-4 w-4" />
      }
    ]
  },
  {
    id: "bsc",
    name: "B.Sc.",
    fullName: "Bachelor of Science",
    description: "Science and technology education",
    duration: "3 years",
    eligibility: "10+2 with Science",
    color: "bg-green-50 border-green-200 text-green-800",
    icon: <Target className="h-6 w-6" />,
    careerPaths: [
      {
        id: "bsc-industry",
        title: "Research & Development",
        type: "industry",
        description: "Scientific research and innovation",
        examples: ["Research Scientist", "Lab Technician", "Quality Analyst", "Data Scientist"],
        icon: <Building2 className="h-4 w-4" />
      },
      {
        id: "bsc-government",
        title: "Scientific Services",
        type: "government",
        description: "Government scientific departments",
        examples: ["ISRO", "DRDO", "CSIR", "Forest Department", "Meteorological Department"],
        icon: <Award className="h-4 w-4" />
      },
      {
        id: "bsc-private",
        title: "Technology Sector",
        type: "private",
        description: "IT and technology companies",
        examples: ["Software Developer", "Data Analyst", "Biotech Researcher", "Pharmaceutical Sales"],
        icon: <Briefcase className="h-4 w-4" />
      },
      {
        id: "bsc-entrepreneurship",
        title: "Tech Startups",
        type: "entrepreneurship",
        description: "Technology-based businesses",
        examples: ["App Development", "Biotech Startup", "Environmental Consulting", "EdTech"],
        icon: <Lightbulb className="h-4 w-4" />
      },
      {
        id: "bsc-higher",
        title: "Advanced Science",
        type: "higher_education",
        description: "Specialized science degrees",
        examples: ["M.Sc.", "M.Tech", "Ph.D", "Medical (MBBS)", "Engineering"],
        icon: <GraduationCap className="h-4 w-4" />
      }
    ]
  },
  {
    id: "bcom",
    name: "B.Com.",
    fullName: "Bachelor of Commerce",
    description: "Commerce and business education",
    duration: "3 years",
    eligibility: "10+2 in any stream",
    color: "bg-purple-50 border-purple-200 text-purple-800",
    icon: <TrendingUp className="h-6 w-6" />,
    careerPaths: [
      {
        id: "bcom-industry",
        title: "Financial Services",
        type: "industry",
        description: "Banking, insurance, and finance",
        examples: ["Banking Officer", "Insurance Agent", "Financial Advisor", "Investment Analyst"],
        icon: <Building2 className="h-4 w-4" />
      },
      {
        id: "bcom-government",
        title: "Government Finance",
        type: "government",
        description: "Government financial departments",
        examples: ["Banking Exams (IBPS, SBI)", "Railway Finance", "Customs & Excise", "Income Tax"],
        icon: <Award className="h-4 w-4" />
      },
      {
        id: "bcom-private",
        title: "Corporate Finance",
        type: "private",
        description: "Corporate accounting and finance",
        examples: ["Accountant", "Auditor", "Tax Consultant", "Financial Manager"],
        icon: <Briefcase className="h-4 w-4" />
      },
      {
        id: "bcom-entrepreneurship",
        title: "Business Ventures",
        type: "entrepreneurship",
        description: "Starting business enterprises",
        examples: ["Trading Business", "Consulting Firm", "E-commerce", "Financial Services"],
        icon: <Lightbulb className="h-4 w-4" />
      },
      {
        id: "bcom-higher",
        title: "Professional Courses",
        type: "higher_education",
        description: "Professional certifications and degrees",
        examples: ["CA", "CS", "CMA", "MBA", "M.Com"],
        icon: <GraduationCap className="h-4 w-4" />
      }
    ]
  },
  {
    id: "bba",
    name: "BBA",
    fullName: "Bachelor of Business Administration",
    description: "Business management education",
    duration: "3 years",
    eligibility: "10+2 in any stream",
    color: "bg-orange-50 border-orange-200 text-orange-800",
    icon: <Users className="h-6 w-6" />,
    careerPaths: [
      {
        id: "bba-industry",
        title: "Corporate Management",
        type: "industry",
        description: "Management roles in corporations",
        examples: ["Management Trainee", "Operations Manager", "Project Manager", "Business Development"],
        icon: <Building2 className="h-4 w-4" />
      },
      {
        id: "bba-government",
        title: "Public Administration",
        type: "government",
        description: "Government administrative roles",
        examples: ["UPSC", "State PSC", "Banking Management", "Public Sector Undertakings"],
        icon: <Award className="h-4 w-4" />
      },
      {
        id: "bba-private",
        title: "Private Sector",
        type: "private",
        description: "Private company management",
        examples: ["Sales Manager", "HR Manager", "Marketing Manager", "Operations Executive"],
        icon: <Briefcase className="h-4 w-4" />
      },
      {
        id: "bba-entrepreneurship",
        title: "Startup Leadership",
        type: "entrepreneurship",
        description: "Leading and managing startups",
        examples: ["Startup Founder", "Business Consultant", "Franchise Owner", "E-commerce"],
        icon: <Lightbulb className="h-4 w-4" />
      },
      {
        id: "bba-higher",
        title: "Advanced Management",
        type: "higher_education",
        description: "Advanced business degrees",
        examples: ["MBA", "PGDM", "M.Phil", "Ph.D in Management"],
        icon: <GraduationCap className="h-4 w-4" />
      }
    ]
  }
]

const getTypeColor = (type: string) => {
  switch (type) {
    case "industry":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "government":
      return "bg-green-100 text-green-800 border-green-200"
    case "private":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "entrepreneurship":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "higher_education":
      return "bg-pink-100 text-pink-800 border-pink-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case "industry":
      return "Industry"
    case "government":
      return "Government"
    case "private":
      return "Private Sector"
    case "entrepreneurship":
      return "Entrepreneurship"
    case "higher_education":
      return "Higher Education"
    default:
      return "Other"
  }
}

export function CourseCareerMapping() {
  const [selectedStream, setSelectedStream] = useState<string>("ba")
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set())

  const togglePathExpansion = (pathId: string) => {
    const newExpanded = new Set(expandedPaths)
    if (newExpanded.has(pathId)) {
      newExpanded.delete(pathId)
    } else {
      newExpanded.add(pathId)
    }
    setExpandedPaths(newExpanded)
  }

  const selectedCourse = courseStreams.find(stream => stream.id === selectedStream)

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
          <GraduationCap className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
          Course-to-Career Path Mapping
        </h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Discover your future with our comprehensive career mapping tool. Explore detailed career paths, 
          industry opportunities, government jobs, private sector roles, entrepreneurship options, and higher education pathways.
        </p>
        <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Interactive Charts</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Real-time Data</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Expert Insights</span>
          </div>
        </div>
      </div>

      <Tabs value={selectedStream} onValueChange={setSelectedStream} className="w-full">
        {/* Enhanced Tab Navigation */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl blur-3xl opacity-50"></div>
          <TabsList className="relative grid w-full grid-cols-2 md:grid-cols-4 gap-2 p-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg">
            {courseStreams.map((stream) => (
              <TabsTrigger 
                key={stream.id} 
                value={stream.id}
                className="group relative flex flex-col items-center space-y-3 p-6 rounded-xl transition-all duration-300 hover:scale-105 data-[state=active]:scale-105 data-[state=active]:shadow-lg"
              >
                <div className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${stream.color} group-data-[state=active]:scale-110`}>
                  {stream.icon}
                </div>
                <div className="text-center">
                  <div className="font-bold text-sm group-data-[state=active]:text-white">{stream.name}</div>
                  <div className="text-xs text-muted-foreground group-data-[state=active]:text-white/80">{stream.fullName}</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300"></div>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {courseStreams.map((stream) => (
          <TabsContent key={stream.id} value={stream.id} className="space-y-8">
            {/* Enhanced Course Overview */}
            <Card className={`${stream.color} border-2 relative overflow-hidden group hover:shadow-2xl transition-all duration-500`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="p-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {stream.icon}
                    </div>
                    <div className="space-y-2">
                      <CardTitle className="text-3xl font-bold">{stream.fullName}</CardTitle>
                      <CardDescription className="text-lg font-medium">{stream.description}</CardDescription>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center space-x-2">
                    <Badge variant="outline" className="bg-white/80 text-gray-700">
                      {stream.careerPaths.length} Career Paths
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/80 rounded-lg flex items-center justify-center">
                        <Clock className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Duration</h4>
                        <p className="text-sm text-gray-600">{stream.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/80 rounded-lg flex items-center justify-center">
                        <Award className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Eligibility</h4>
                        <p className="text-sm text-gray-600">{stream.eligibility}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Quick Stats</h4>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-gray-800">
                            {stream.careerPaths.filter(p => p.type === "industry").length}
                          </div>
                          <div className="text-xs text-gray-600">Industry</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-800">
                            {stream.careerPaths.filter(p => p.type === "government").length}
                          </div>
                          <div className="text-xs text-gray-600">Government</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Career Paths */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Career Pathways</h3>
                <p className="text-gray-600">Explore diverse career opportunities available after {stream.fullName}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stream.careerPaths.map((path) => (
                  <Card key={path.id} className="group relative overflow-hidden bg-white border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${getTypeColor(path.type).replace('bg-', 'from-').replace('text-', 'to-')} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    <CardHeader className="pb-4 relative">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-xl shadow-sm ${getTypeColor(path.type)} group-hover:scale-110 transition-transform duration-300`}>
                            {path.icon}
                          </div>
                          <div className="space-y-1">
                            <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                              {path.title}
                            </CardTitle>
                            <Badge variant="outline" className={`${getTypeColor(path.type)} font-medium`}>
                              {getTypeLabel(path.type)}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePathExpansion(path.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {expandedPaths.has(path.id) ? (
                            <ChevronUp className="h-4 w-4 text-gray-600" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-600" />
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0 relative">
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{path.description}</p>
                      
                      {expandedPaths.has(path.id) && (
                        <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                          <div className="border-t border-gray-100 pt-4">
                            <h5 className="font-semibold text-sm text-gray-800 mb-3 flex items-center">
                              <Target className="h-4 w-4 mr-2 text-blue-500" />
                              Career Examples
                            </h5>
                            <div className="space-y-2">
                              {path.examples.map((example, index) => (
                                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                  <ArrowRight className="h-3 w-3 text-blue-500 flex-shrink-0" />
                                  <span className="text-sm text-gray-700">{example}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {!expandedPaths.has(path.id) && (
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <span className="text-xs text-gray-500 font-medium">
                            {path.examples.length} career options available
                          </span>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs font-medium hover:bg-gray-50"
                            onClick={() => togglePathExpansion(path.id)}
                          >
                            Explore
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Enhanced Quick Stats */}
            <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-0 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
              <CardContent className="relative p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Career Opportunities Summary</h3>
                  <p className="text-gray-600">Total career paths available after {stream.fullName}</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center group">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      <Building2 className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {stream.careerPaths.filter(p => p.type === "industry").length}
                    </div>
                    <div className="text-sm font-medium text-gray-600">Industry Roles</div>
                  </div>
                  
                  <div className="text-center group">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      <Award className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {stream.careerPaths.filter(p => p.type === "government").length}
                    </div>
                    <div className="text-sm font-medium text-gray-600">Government Jobs</div>
                  </div>
                  
                  <div className="text-center group">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      <Briefcase className="h-8 w-8 text-purple-600" />
                    </div>
                    <div className="text-3xl font-bold text-purple-600 mb-1">
                      {stream.careerPaths.filter(p => p.type === "private").length}
                    </div>
                    <div className="text-sm font-medium text-gray-600">Private Sector</div>
                  </div>
                  
                  <div className="text-center group">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      <Lightbulb className="h-8 w-8 text-orange-600" />
                    </div>
                    <div className="text-3xl font-bold text-orange-600 mb-1">
                      {stream.careerPaths.filter(p => p.type === "entrepreneurship").length}
                    </div>
                    <div className="text-sm font-medium text-gray-600">Entrepreneurship</div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Live data updated in real-time</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
