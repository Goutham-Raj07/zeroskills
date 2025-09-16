"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  GraduationCap,
  Calendar,
  Download,
  MessageCircle,
  Phone,
  Video,
  Star,
  Target,
  Users,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  BarChart3,
  Activity,
} from "lucide-react"

const studentData = {
  name: "Arjun Patel",
  grade: "12th Grade",
  school: "Delhi Public School",
  avatar: "/professional-student.png",
  assessmentProgress: 85,
  recommendationsReady: true,
  counselorMeeting: "2024-01-20",
  parentMeeting: "2024-01-22",
}

const assessmentResults = {
  aptitude: {
    score: 88,
    percentile: 92,
    strengths: ["Logical Reasoning", "Mathematical Ability", "Problem Solving"],
    areas: ["Verbal Communication", "Creative Thinking"],
  },
  personality: {
    type: "INTJ - The Architect",
    traits: ["Analytical", "Independent", "Strategic", "Detail-oriented"],
    workStyle: "Prefers structured environments, enjoys complex problems",
  },
  interests: {
    primary: ["Technology", "Engineering", "Research"],
    secondary: ["Innovation", "Problem Solving", "Data Analysis"],
  },
  skills: {
    technical: ["Programming", "Mathematics", "Data Analysis"],
    soft: ["Critical Thinking", "Time Management", "Research"],
  },
}

const careerRecommendations = [
  {
    title: "Software Engineer",
    match: 94,
    field: "Computer Science",
    description: "Design and develop software applications and systems",
    colleges: ["IIT Delhi", "IIT Bombay", "BITS Pilani"],
    exams: ["JEE Main", "JEE Advanced", "BITSAT"],
    salaryRange: "₹8-25 LPA",
    growth: "Excellent",
    demand: "Very High",
  },
  {
    title: "Data Scientist",
    match: 89,
    field: "Data Science",
    description: "Analyze complex data to help organizations make decisions",
    colleges: ["ISI Kolkata", "IIT Kharagpur", "IIIT Hyderabad"],
    exams: ["JEE Main", "ISI Admission Test", "IIIT Entrance"],
    salaryRange: "₹10-30 LPA",
    growth: "Excellent",
    demand: "Very High",
  },
  {
    title: "Research Scientist",
    match: 85,
    field: "Research & Development",
    description: "Conduct research to advance knowledge in specific fields",
    colleges: ["IISc Bangalore", "TIFR Mumbai", "IIT Madras"],
    exams: ["GATE", "NET", "IISc Entrance"],
    salaryRange: "₹6-20 LPA",
    growth: "Good",
    demand: "Moderate",
  },
]

export default function ParentDashboardPage() {
  const [selectedTab, setSelectedTab] = useState<"overview" | "assessments" | "recommendations" | "reports">("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
            <p className="text-gray-600">Monitor your child's career guidance journey</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact Counselor
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </div>
        </div>

        {/* Student Info Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={studentData.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {studentData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-semibold">{studentData.name}</h2>
                  <p className="text-gray-600">
                    {studentData.grade} • {studentData.school}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Assessment Complete
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800">
                      <Target className="h-3 w-3 mr-1" />
                      Recommendations Ready
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="text-sm text-gray-600">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Counselor Meeting: {studentData.counselorMeeting}
                </div>
                <div className="text-sm text-gray-600">
                  <Users className="h-4 w-4 inline mr-1" />
                  Parent Meeting: {studentData.parentMeeting}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Activity className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{assessmentResults.aptitude.score}</div>
              <div className="text-sm text-gray-600">Aptitude Score</div>
              <div className="text-xs text-green-600 mt-1">{assessmentResults.aptitude.percentile}th percentile</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{careerRecommendations.length}</div>
              <div className="text-sm text-gray-600">Career Matches</div>
              <div className="text-xs text-blue-600 mt-1">Top match: {careerRecommendations[0].match}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <GraduationCap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-sm text-gray-600">College Options</div>
              <div className="text-xs text-purple-600 mt-1">Across 3 fields</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">3</div>
              <div className="text-sm text-gray-600">Days to Decision</div>
              <div className="text-xs text-orange-600 mt-1">Meeting scheduled</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as any)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assessments">Assessment Results</TabsTrigger>
            <TabsTrigger value="recommendations">Career Recommendations</TabsTrigger>
            <TabsTrigger value="reports">Final Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Progress Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Assessment Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Academic Records</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Aptitude Test</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Personality Assessment</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Skills Evaluation</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Alumni Interaction</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Strengths */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5" />
                    <span>Key Strengths</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {assessmentResults.aptitude.strengths.map((strength, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium">{strength}</span>
                        <Badge className="bg-green-100 text-green-800">Strong</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Upcoming Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Counselor Validation Meeting</p>
                      <p className="text-xs text-gray-600">Review AI recommendations with expert</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Jan 20</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Parent-Student Decision Meeting</p>
                      <p className="text-xs text-gray-600">Final career path discussion</p>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">Jan 22</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">College Application Deadline</p>
                      <p className="text-xs text-gray-600">Submit applications for recommended colleges</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">Feb 15</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Communication */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5" />
                    <span>Communication</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Schedule Call with Counselor
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Video className="h-4 w-4 mr-2" />
                    Join Video Session
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message to Team
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="assessments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Aptitude Results */}
              <Card>
                <CardHeader>
                  <CardTitle>Aptitude Assessment</CardTitle>
                  <CardDescription>Cognitive abilities and problem-solving skills</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{assessmentResults.aptitude.score}/100</div>
                    <div className="text-sm text-gray-600">{assessmentResults.aptitude.percentile}th percentile</div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Strengths</h4>
                    <div className="space-y-1">
                      {assessmentResults.aptitude.strengths.map((strength, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Areas for Development</h4>
                    <div className="space-y-1">
                      {assessmentResults.aptitude.areas.map((area, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-orange-600" />
                          <span className="text-sm">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personality Results */}
              <Card>
                <CardHeader>
                  <CardTitle>Personality Assessment</CardTitle>
                  <CardDescription>Work style and behavioral preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{assessmentResults.personality.type}</div>
                    <div className="text-sm text-gray-600">Personality Type</div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Key Traits</h4>
                    <div className="flex flex-wrap gap-2">
                      {assessmentResults.personality.traits.map((trait, index) => (
                        <Badge key={index} variant="secondary">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Work Style</h4>
                    <p className="text-sm text-gray-600">{assessmentResults.personality.workStyle}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Interests */}
              <Card>
                <CardHeader>
                  <CardTitle>Interest Profile</CardTitle>
                  <CardDescription>Areas of natural curiosity and engagement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Primary Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {assessmentResults.interests.primary.map((interest, index) => (
                        <Badge key={index} className="bg-green-100 text-green-800">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Secondary Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {assessmentResults.interests.secondary.map((interest, index) => (
                        <Badge key={index} variant="outline">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skills Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills Evaluation</CardTitle>
                  <CardDescription>Current abilities and competencies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Technical Skills</h4>
                    <div className="space-y-2">
                      {assessmentResults.skills.technical.map((skill, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{skill}</span>
                          <Progress value={85 - index * 5} className="w-20 h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Soft Skills</h4>
                    <div className="space-y-2">
                      {assessmentResults.skills.soft.map((skill, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{skill}</span>
                          <Progress value={80 - index * 3} className="w-20 h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="space-y-6">
              {careerRecommendations.map((career, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{career.title}</CardTitle>
                        <CardDescription>{career.field}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{career.match}%</div>
                        <div className="text-sm text-gray-600">Match Score</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{career.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Salary Range</h4>
                        <p className="text-sm text-gray-600">{career.salaryRange}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">Growth Potential</h4>
                        <Badge className="bg-green-100 text-green-800">{career.growth}</Badge>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">Market Demand</h4>
                        <Badge className="bg-blue-100 text-blue-800">{career.demand}</Badge>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">Match Rank</h4>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">#{index + 1} Recommendation</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Recommended Colleges</h4>
                      <div className="flex flex-wrap gap-2">
                        {career.colleges.map((college, idx) => (
                          <Badge key={idx} variant="outline">
                            {college}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Entrance Exams</h4>
                      <div className="flex flex-wrap gap-2">
                        {career.exams.map((exam, idx) => (
                          <Badge key={idx} className="bg-purple-100 text-purple-800">
                            {exam}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Comprehensive Report */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Comprehensive Career Report</span>
                  </CardTitle>
                  <CardDescription>Complete analysis and recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Executive Summary</p>
                        <p className="text-xs text-gray-600">Key findings and recommendations</p>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Assessment Results</p>
                        <p className="text-xs text-gray-600">Detailed test scores and analysis</p>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Career Pathways</p>
                        <p className="text-xs text-gray-600">Recommended career options</p>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Action Plan</p>
                        <p className="text-xs text-gray-600">Next steps and timeline</p>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Full Report (PDF)
                  </Button>
                </CardContent>
              </Card>

              {/* Counselor Validation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5" />
                    <span>Counselor Validation</span>
                  </CardTitle>
                  <CardDescription>Expert review and approval</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/counselor-woman-professional.png" />
                      <AvatarFallback>MK</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Dr. Meera Krishnan</p>
                      <p className="text-sm text-gray-600">Senior Career Counselor</p>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-800 font-medium mb-2">Validation Status: Approved</p>
                    <p className="text-sm text-gray-700">
                      "The AI recommendations align well with Arjun's assessment results. His strong analytical skills
                      and interest in technology make software engineering an excellent career choice. I recommend
                      focusing on IIT preparation while exploring programming through trial courses."
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Validated on: Jan 18, 2024</span>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Parent Feedback */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Parent Feedback Form</span>
                  </CardTitle>
                  <CardDescription>Share your thoughts and concerns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium text-sm mb-1">Satisfaction with Process</p>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">Excellent</span>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium text-sm mb-1">Confidence in Recommendations</p>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <Star className="h-4 w-4 text-gray-300" />
                        <span className="text-sm text-gray-600 ml-2">Very Good</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Provide Additional Feedback
                  </Button>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Next Steps</span>
                  </CardTitle>
                  <CardDescription>Recommended actions for parents</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-start space-x-3 p-2 bg-blue-50 rounded-lg">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        1
                      </div>
                      <div>
                        <p className="font-medium text-sm">Review Recommendations Together</p>
                        <p className="text-xs text-gray-600">Discuss career options with your child</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-2 bg-purple-50 rounded-lg">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-sm">Attend Parent-Student Meeting</p>
                        <p className="text-xs text-gray-600">Scheduled for Jan 22, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-2 bg-green-50 rounded-lg">
                      <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-sm">Plan College Applications</p>
                        <p className="text-xs text-gray-600">Start preparation for entrance exams</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
