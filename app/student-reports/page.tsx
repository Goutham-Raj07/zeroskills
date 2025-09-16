"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import {
  Trophy,
  TrendingUp,
  Target,
  Calendar,
  Download,
  Share2,
  User,
  Award,
  CheckCircle,
  ArrowRight,
  Home,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { MeetingScheduler } from "@/components/meeting-scheduler"

const studentData = {
  name: "Arjun Patel",
  grade: "12th",
  completedCourses: 3,
  totalAssessments: 5,
  overallScore: 87,
}

const skillsData = [
  { skill: "Programming", score: 92, color: "#3B82F6" },
  { skill: "Problem Solving", score: 88, color: "#10B981" },
  { skill: "Mathematics", score: 85, color: "#8B5CF6" },
  { skill: "Creative Thinking", score: 78, color: "#F59E0B" },
  { skill: "Communication", score: 82, color: "#EF4444" },
]

const progressData = [
  { month: "Sep", score: 65 },
  { month: "Oct", score: 72 },
  { month: "Nov", score: 78 },
  { month: "Dec", score: 85 },
  { month: "Jan", score: 87 },
]

const careerRecommendations = [
  { career: "Software Engineer", match: 95, trend: "+5%" },
  { career: "Data Scientist", match: 88, trend: "+3%" },
  { career: "Product Manager", match: 82, trend: "+2%" },
]

export default function StudentReportsPage() {
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false)
  const router = useRouter()

  const handleBookAppointment = () => {
    setShowAppointmentDialog(true)
  }

  const handleNext = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <h1 className="text-4xl font-bold text-gray-900">Student Progress Report</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive analysis of {studentData.name}'s learning journey and career readiness
          </p>
        </div>

        {/* Student Overview */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-6 w-6" />
              <span>Student Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{studentData.overallScore}%</div>
                <div className="text-sm text-gray-600">Overall Score</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">{studentData.completedCourses}</div>
                <div className="text-sm text-gray-600">Courses Completed</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">{studentData.totalAssessments}</div>
                <div className="text-sm text-gray-600">Assessments Taken</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-3xl font-bold text-orange-600">{studentData.grade}</div>
                <div className="text-sm text-gray-600">Current Grade</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-6 w-6" />
                <span>Skills Assessment</span>
              </CardTitle>
              <CardDescription>Detailed breakdown of your strengths and areas for improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillsData.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{skill.skill}</span>
                      <span className="text-sm text-gray-600">{skill.score}%</span>
                    </div>
                    <Progress value={skill.score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-6 w-6" />
                <span>Progress Over Time</span>
              </CardTitle>
              <CardDescription>Your learning journey and improvement trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Career Recommendations */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-6 w-6" />
              <span>Career Recommendations</span>
            </CardTitle>
            <CardDescription>AI-powered career matches based on your assessments and interests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {careerRecommendations.map((rec, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{rec.career}</h4>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {rec.trend}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Match Score</span>
                      <span className="font-bold text-blue-600">{rec.match}%</span>
                    </div>
                    <Progress value={rec.match} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-6 w-6" />
              <span>Recent Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="font-medium">Programming Course Completed</p>
                  <p className="text-sm text-gray-600">Mastered Python fundamentals</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Award className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-medium">Top 10% Performance</p>
                  <p className="text-sm text-gray-600">Aptitude test results</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Dialog open={showAppointmentDialog} onOpenChange={setShowAppointmentDialog}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Calendar className="mr-2 h-5 w-5" />
                Book Appointment with Parent
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Schedule Parent Meeting</DialogTitle>
                <DialogDescription>
                  Book a session to discuss {studentData.name}'s progress and career recommendations with parents
                </DialogDescription>
              </DialogHeader>
              <MeetingScheduler mentorName="Career Counselor" careerField="Student Progress Discussion" />
            </DialogContent>
          </Dialog>

          <Button size="lg" variant="outline" onClick={handleNext}>
            <Home className="mr-2 h-5 w-5" />
            Continue to Home
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Export Options */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Export & Share</CardTitle>
            <CardDescription>Download or share your progress report</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download PDF Report
              </Button>
              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Share with School Counselor
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
