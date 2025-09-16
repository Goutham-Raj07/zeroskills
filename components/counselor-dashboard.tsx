"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserCheck, FileText, Calendar, Clock, TrendingUp, CheckCircle, AlertCircle, Star, Users } from "lucide-react"

const mockCounselors = [
  {
    id: "1",
    name: "Dr. Meera Krishnan",
    specialization: "Career Psychology",
    experience: "15 years",
    education: "Ph.D. Psychology, M.A. Career Counseling",
    rating: 4.9,
    totalStudents: 1250,
    availability: "Mon-Fri, 9 AM - 6 PM",
    languages: ["English", "Hindi", "Tamil"],
    expertise: ["Career Assessment", "Academic Planning", "Personality Analysis"],
    bio: "Certified career counselor with expertise in helping students discover their ideal career paths through scientific assessment and personalized guidance.",
    profileImage: "/counselor-woman-professional.png",
  },
  {
    id: "2",
    name: "Prof. Rajesh Sharma",
    specialization: "Educational Guidance",
    experience: "20 years",
    education: "M.Ed., Ph.D. Educational Psychology",
    rating: 4.8,
    totalStudents: 2100,
    availability: "Tue-Sat, 10 AM - 7 PM",
    languages: ["English", "Hindi"],
    expertise: ["Academic Planning", "Study Strategies", "Entrance Exam Guidance"],
    bio: "Former university professor turned career counselor, specializing in academic pathway optimization and entrance exam strategies.",
    profileImage: "/counselor-man-professional.png",
  },
]

const mockStats = {
  totalReviews: 45,
  pendingReviews: 8,
  completedReports: 37,
  averageRating: 4.8,
  responseTime: "< 24 hours",
  successRate: "94%",
}

const mockRecentActivity = [
  {
    id: "1",
    student: "Arjun Patel",
    action: "Validation completed",
    timestamp: "2 hours ago",
    status: "completed",
  },
  {
    id: "2",
    student: "Sneha Reddy",
    action: "Review in progress",
    timestamp: "4 hours ago",
    status: "in-progress",
  },
  {
    id: "3",
    student: "Karan Singh",
    action: "Appointment scheduled",
    timestamp: "1 day ago",
    status: "scheduled",
  },
]

export function CounselorDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalReviews}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.pendingReviews}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-orange-600">Requires attention</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.successRate}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">Excellent</span> validation accuracy
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Available Counselors */}
      <Card>
        <CardHeader>
          <CardTitle>Available Counselors</CardTitle>
          <CardDescription>Professional counselors ready to validate your recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {mockCounselors.map((counselor) => (
              <Card key={counselor.id} className="relative overflow-hidden">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={counselor.profileImage || "/placeholder.svg"} alt={counselor.name} />
                      <AvatarFallback>
                        {counselor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-2">
                      <div>
                        <CardTitle className="text-lg">{counselor.name}</CardTitle>
                        <CardDescription className="font-medium text-foreground">
                          {counselor.specialization}
                        </CardDescription>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{counselor.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{counselor.totalStudents} students</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Education: </span>
                      <span className="text-muted-foreground">{counselor.education}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Experience: </span>
                      <span className="text-muted-foreground">{counselor.experience}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Availability: </span>
                      <span className="text-muted-foreground">{counselor.availability}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Expertise</p>
                    <div className="flex flex-wrap gap-1">
                      {counselor.expertise.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">{counselor.bio}</p>

                  <div className="flex items-center space-x-2 pt-4 border-t">
                    <Button className="flex-1">
                      <UserCheck className="mr-2 h-4 w-4" />
                      Request Validation
                    </Button>
                    <Button variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates on your validation requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRecentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.status === "completed"
                        ? "bg-green-500"
                        : activity.status === "in-progress"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                    }`}
                  />
                  <div>
                    <p className="font-medium">{activity.student}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      activity.status === "completed"
                        ? "secondary"
                        : activity.status === "in-progress"
                          ? "default"
                          : "outline"
                    }
                    className={
                      activity.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : activity.status === "in-progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                    }
                  >
                    {activity.status === "completed" && <CheckCircle className="mr-1 h-3 w-3" />}
                    {activity.status === "in-progress" && <AlertCircle className="mr-1 h-3 w-3" />}
                    {activity.status === "scheduled" && <Calendar className="mr-1 h-3 w-3" />}
                    {activity.status.replace("-", " ")}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and next steps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Button className="h-auto p-4 justify-start bg-transparent" variant="outline">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium">Submit for Review</p>
                  <p className="text-sm text-muted-foreground">Get your recommendations validated</p>
                </div>
              </div>
            </Button>

            <Button className="h-auto p-4 justify-start bg-transparent" variant="outline">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium">Schedule Meeting</p>
                  <p className="text-sm text-muted-foreground">Book a session with a counselor</p>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
