"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Play,
  Clock,
  Users,
  Star,
  BookOpen,
  Code,
  Microscope,
  Calculator,
  Palette,
  Briefcase,
  ChevronRight,
  Trophy,
  Target,
  CheckCircle,
} from "lucide-react"
import { useRouter } from "next/navigation"

const trialCourses = [
  {
    id: "CS-101",
    title: "Introduction to Programming",
    field: "Computer Science",
    duration: "2 weeks",
    difficulty: "Beginner",
    rating: 4.8,
    enrolled: 1250,
    description: "Learn the fundamentals of programming with Python. Build real projects and understand core concepts.",
    icon: <Code className="h-6 w-6" />,
    color: "bg-blue-500",
    labs: ["Python Basics Lab", "Data Structures Lab", "Algorithm Design Lab"],
    skills: ["Python Programming", "Problem Solving", "Logical Thinking"],
    projects: ["Calculator App", "To-Do List", "Simple Game"],
    progress: 0,
  },
  {
    id: "BIO-201",
    title: "Molecular Biology Fundamentals",
    field: "Life Sciences",
    duration: "3 weeks",
    difficulty: "Intermediate",
    rating: 4.6,
    enrolled: 890,
    description: "Explore the molecular mechanisms of life through virtual lab experiments and simulations.",
    icon: <Microscope className="h-6 w-6" />,
    color: "bg-green-500",
    labs: ["DNA Extraction Lab", "PCR Simulation", "Protein Analysis Lab"],
    skills: ["Laboratory Techniques", "Data Analysis", "Scientific Method"],
    projects: ["Gene Expression Study", "Mutation Analysis", "Protein Modeling"],
    progress: 0,
  },
  {
    id: "MATH-301",
    title: "Applied Mathematics",
    field: "Mathematics",
    duration: "4 weeks",
    difficulty: "Advanced",
    rating: 4.7,
    enrolled: 650,
    description: "Apply mathematical concepts to solve real-world problems in engineering and science.",
    icon: <Calculator className="h-6 w-6" />,
    color: "bg-purple-500",
    labs: ["Calculus Applications", "Statistics Lab", "Linear Algebra Lab"],
    skills: ["Mathematical Modeling", "Statistical Analysis", "Problem Solving"],
    projects: ["Optimization Model", "Data Prediction", "Engineering Simulation"],
    progress: 0,
  },
  {
    id: "ART-101",
    title: "Digital Design Fundamentals",
    field: "Creative Arts",
    duration: "2 weeks",
    difficulty: "Beginner",
    rating: 4.9,
    enrolled: 1100,
    description: "Learn digital design principles and create stunning visual content using industry tools.",
    icon: <Palette className="h-6 w-6" />,
    color: "bg-pink-500",
    labs: ["Photoshop Basics", "Illustrator Workshop", "UI Design Lab"],
    skills: ["Visual Design", "Creative Thinking", "Digital Tools"],
    projects: ["Logo Design", "Website Mockup", "Brand Identity"],
    progress: 0,
  },
  {
    id: "BUS-201",
    title: "Business Strategy Basics",
    field: "Business",
    duration: "3 weeks",
    difficulty: "Intermediate",
    rating: 4.5,
    enrolled: 980,
    description: "Understand business fundamentals and develop strategic thinking skills.",
    icon: <Briefcase className="h-6 w-6" />,
    color: "bg-orange-500",
    labs: ["Market Analysis Lab", "Financial Modeling", "Strategy Simulation"],
    skills: ["Strategic Thinking", "Market Analysis", "Leadership"],
    projects: ["Business Plan", "Market Research", "Case Study Analysis"],
    progress: 0,
  },
]

export default function TrialCoursesPage() {
  const [selectedTab, setSelectedTab] = useState<"available" | "enrolled" | "completed">("available")
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([])
  const [courseProgress, setCourseProgress] = useState<Record<string, number>>({})
  const [completedCourses, setCompletedCourses] = useState<string[]>([])
  const router = useRouter()

  const handleEnroll = (courseId: string) => {
    setEnrolledCourses((prev) => [...prev, courseId])
    setCourseProgress((prev) => ({ ...prev, [courseId]: 0 }))
  }

  const handleContinueLearning = (courseId: string) => {
    const currentProgress = courseProgress[courseId] || 0
    const newProgress = Math.min(currentProgress + 25, 100)
    setCourseProgress((prev) => ({ ...prev, [courseId]: newProgress }))

    if (newProgress === 100) {
      setCompletedCourses((prev) => [...prev, courseId])
      setEnrolledCourses((prev) => prev.filter((id) => id !== courseId))
      setTimeout(() => {
        router.push("/student-reports")
      }, 1000)
    }
  }

  const handleMarkCompleted = (courseId: string) => {
    setCourseProgress((prev) => ({ ...prev, [courseId]: 100 }))
    setCompletedCourses((prev) => [...prev, courseId])
    setEnrolledCourses((prev) => prev.filter((id) => id !== courseId))
    router.push("/student-reports")
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Trial Courses & Virtual Labs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience courses before you commit. Try hands-on labs, complete projects, and discover your passion.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">50+</div>
              <div className="text-sm text-gray-600">Trial Courses</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Microscope className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">200+</div>
              <div className="text-sm text-gray-600">Virtual Labs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">10K+</div>
              <div className="text-sm text-gray-600">Active Students</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">95%</div>
              <div className="text-sm text-gray-600">Completion Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="available">Available Courses</TabsTrigger>
            <TabsTrigger value="enrolled">My Enrolled ({enrolledCourses.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {trialCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${course.color} text-white`}>{course.icon}</div>
                        <div>
                          <CardTitle className="text-lg">{course.title}</CardTitle>
                          <CardDescription>{course.field}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getDifficultyColor(course.difficulty)}>{course.difficulty}</Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{course.description}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{course.enrolled.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{course.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">What you'll learn:</h4>
                      <div className="flex flex-wrap gap-1">
                        {course.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Virtual Labs:</h4>
                      <div className="space-y-1">
                        {course.labs.slice(0, 2).map((lab, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                            <Target className="h-3 w-3" />
                            <span>{lab}</span>
                          </div>
                        ))}
                        {course.labs.length > 2 && (
                          <div className="text-xs text-gray-500">+{course.labs.length - 2} more labs</div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Free Trial</span> • Full Access
                      </div>
                      <Button
                        onClick={() => handleEnroll(course.id)}
                        disabled={enrolledCourses.includes(course.id)}
                        className="flex items-center space-x-2"
                      >
                        {enrolledCourses.includes(course.id) ? (
                          <>
                            <Trophy className="h-4 w-4" />
                            <span>Enrolled</span>
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4" />
                            <span>Start Trial</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="enrolled" className="space-y-6">
            {enrolledCourses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Enrolled Courses</h3>
                <p className="text-gray-600 mb-4">Start your first trial course to begin exploring your interests</p>
                <Button onClick={() => setSelectedTab("available")}>Browse Available Courses</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {trialCourses
                  .filter((course) => enrolledCourses.includes(course.id))
                  .map((course) => {
                    const progress = courseProgress[course.id] || 0
                    return (
                      <Card key={course.id} className="overflow-hidden">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg ${course.color} text-white`}>{course.icon}</div>
                              <div>
                                <CardTitle className="text-lg">{course.title}</CardTitle>
                                <CardDescription>{course.field}</CardDescription>
                              </div>
                            </div>
                            <Badge
                              className={progress === 100 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}
                            >
                              {progress === 100 ? (
                                <>
                                  <CheckCircle className="mr-1 h-3 w-3" />
                                  Ready to Complete
                                </>
                              ) : (
                                "In Progress"
                              )}
                            </Badge>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span>Course Progress</span>
                              <span>{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>

                          <div>
                            <h4 className="font-medium text-sm mb-2">Available Labs:</h4>
                            <div className="space-y-2">
                              {course.labs.map((lab, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                                >
                                  <div className="flex items-center space-x-2">
                                    <Microscope className="h-4 w-4 text-gray-600" />
                                    <span className="text-sm">{lab}</span>
                                  </div>
                                  <Button size="sm" variant="outline">
                                    <Play className="h-3 w-3 mr-1" />
                                    Start
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Time Remaining:</span> {course.duration}
                            </div>
                            <div className="flex space-x-2">
                              {progress < 100 ? (
                                <Button onClick={() => handleContinueLearning(course.id)}>
                                  Continue Learning
                                  <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => handleMarkCompleted(course.id)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Mark Completed
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {completedCourses.length === 0 ? (
              <div className="text-center py-12">
                <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Completed Courses</h3>
                <p className="text-gray-600 mb-4">
                  Complete your first trial course to earn certificates and unlock insights
                </p>
                <Button onClick={() => setSelectedTab("enrolled")}>View Enrolled Courses</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {trialCourses
                  .filter((course) => completedCourses.includes(course.id))
                  .map((course) => (
                    <Card key={course.id} className="overflow-hidden border-green-200">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${course.color} text-white`}>{course.icon}</div>
                            <div>
                              <CardTitle className="text-lg">{course.title}</CardTitle>
                              <CardDescription>{course.field}</CardDescription>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            <Trophy className="mr-1 h-3 w-3" />
                            Completed
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800">Course Completed Successfully!</span>
                          </div>
                          <p className="text-xs text-green-700">
                            You've mastered all concepts and completed all projects.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm mb-2">Skills Acquired:</h4>
                          <div className="flex flex-wrap gap-1">
                            {course.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-800">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Completion Date:</span> {new Date().toLocaleDateString()}
                          </div>
                          <Button variant="outline" onClick={() => router.push("/student-reports")}>
                            View Report
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
