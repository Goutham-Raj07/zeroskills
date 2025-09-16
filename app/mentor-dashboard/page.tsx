"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Users, FileText, Clock, CheckCircle, AlertCircle, Star, MessageSquare, Video } from "lucide-react"

const mockAppointments = [
  {
    id: "1",
    student: "Arjun Patel",
    time: "10:00 AM - 11:00 AM",
    date: "Today",
    type: "Career Guidance",
    status: "confirmed",
    avatar: "/student-avatar-1.png",
  },
  {
    id: "2",
    student: "Sneha Reddy",
    time: "2:00 PM - 3:00 PM",
    date: "Tomorrow",
    type: "Progress Review",
    status: "pending",
    avatar: "/student-avatar-2.png",
  },
  {
    id: "3",
    student: "Karan Singh",
    time: "4:00 PM - 5:00 PM",
    date: "Jan 15",
    type: "Parent Meeting",
    status: "confirmed",
    avatar: "/student-avatar-3.png",
  },
]

const mockStudentReports = [
  {
    id: "1",
    student: "Arjun Patel",
    reportType: "Career Assessment",
    generatedDate: "2024-01-12",
    status: "completed",
    aiScore: 95,
    recommendations: 3,
    nextAction: "Schedule follow-up",
  },
  {
    id: "2",
    student: "Sneha Reddy",
    reportType: "Skills Analysis",
    generatedDate: "2024-01-10",
    status: "in-review",
    aiScore: 88,
    recommendations: 2,
    nextAction: "Validate recommendations",
  },
  {
    id: "3",
    student: "Karan Singh",
    reportType: "Progress Report",
    generatedDate: "2024-01-08",
    status: "completed",
    aiScore: 92,
    recommendations: 4,
    nextAction: "Parent consultation",
  },
]

const mentorStats = {
  totalStudents: 45,
  appointmentsToday: 3,
  pendingReports: 8,
  completedSessions: 127,
  averageRating: 4.8,
  responseTime: "< 2 hours",
}

export default function MentorDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "in-review":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mentor Dashboard</h1>
            <p className="text-gray-600">Manage your students and appointments</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              <Users className="mr-1 h-3 w-3" />
              Professional Mentor
            </Badge>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{mentorStats.totalStudents}</div>
              <div className="text-xs text-gray-600">Total Students</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{mentorStats.appointmentsToday}</div>
              <div className="text-xs text-gray-600">Today's Sessions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <FileText className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{mentorStats.pendingReports}</div>
              <div className="text-xs text-gray-600">Pending Reports</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{mentorStats.completedSessions}</div>
              <div className="text-xs text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{mentorStats.averageRating}</div>
              <div className="text-xs text-gray-600">Avg Rating</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
              <div className="text-sm font-bold">{mentorStats.responseTime}</div>
              <div className="text-xs text-gray-600">Response Time</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="reports">AI Reports</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Today's Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Today's Appointments</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockAppointments.slice(0, 2).map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={appointment.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {appointment.student
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{appointment.student}</p>
                            <p className="text-xs text-gray-600">{appointment.time}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Reports */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Recent AI Reports</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockStudentReports.slice(0, 2).map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{report.student}</p>
                          <p className="text-xs text-gray-600">{report.reportType}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-blue-600">{report.aiScore}%</div>
                          <Badge className={getStatusColor(report.status)} size="sm">
                            {report.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Appointments</CardTitle>
                <CardDescription>Manage your upcoming and past student sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={appointment.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {appointment.student
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{appointment.student}</p>
                          <p className="text-sm text-gray-600">{appointment.type}</p>
                          <p className="text-xs text-gray-500">
                            {appointment.date} • {appointment.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Video className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Student Reports</CardTitle>
                <CardDescription>Review and validate AI-generated career guidance reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockStudentReports.map((report) => (
                    <div key={report.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{report.student}</h4>
                          <p className="text-sm text-gray-600">{report.reportType}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">{report.aiScore}%</div>
                          <p className="text-xs text-gray-500">AI Confidence</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                        <div>
                          <span className="text-gray-600">Generated:</span>
                          <p className="font-medium">{report.generatedDate}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Recommendations:</span>
                          <p className="font-medium">{report.recommendations}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Next Action:</span>
                          <p className="font-medium">{report.nextAction}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge className={getStatusColor(report.status)}>
                          {report.status === "completed" && <CheckCircle className="mr-1 h-3 w-3" />}
                          {report.status === "in-review" && <AlertCircle className="mr-1 h-3 w-3" />}
                          {report.status}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            Review Report
                          </Button>
                          <Button size="sm">Validate & Send</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Schedule</CardTitle>
                <CardDescription>Manage your availability and upcoming sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Schedule Management</h3>
                  <p className="text-gray-600 mb-4">Calendar integration coming soon</p>
                  <Button>Set Availability</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
