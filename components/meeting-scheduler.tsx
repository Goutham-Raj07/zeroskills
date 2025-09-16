"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Video, Plus, CheckCircle, AlertCircle } from "lucide-react"

const mockMeetings = [
  {
    id: "1",
    alumni: {
      name: "Priya Sharma",
      role: "Senior Software Engineer at Google",
      avatar: "/professional-woman-diverse.png",
    },
    title: "Technical Interview Preparation",
    date: "2024-01-15",
    time: "10:00 AM - 11:00 AM",
    type: "video",
    status: "confirmed",
    agenda: "System design questions, coding interview tips, Google interview process",
    meetingLink: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: "2",
    alumni: {
      name: "Rahul Gupta",
      role: "Product Manager at Microsoft",
      avatar: "/professional-man.png",
    },
    title: "Career Transition Discussion",
    date: "2024-01-18",
    time: "3:00 PM - 4:00 PM",
    type: "video",
    status: "pending",
    agenda: "Engineering to PM transition, skill development, portfolio building",
    meetingLink: null,
  },
  {
    id: "3",
    alumni: {
      name: "Ananya Patel",
      role: "Data Scientist at Netflix",
      avatar: "/professional-woman-data-scientist.png",
    },
    title: "Data Science Career Path",
    date: "2024-01-12",
    time: "2:00 PM - 3:00 PM",
    type: "video",
    status: "completed",
    agenda: "ML projects, Netflix data science culture, career growth",
    meetingLink: null,
    feedback: {
      rating: 5,
      comment: "Extremely helpful session! Got great insights about ML projects and Netflix culture.",
    },
  },
]

export function MeetingScheduler() {
  const [selectedTab, setSelectedTab] = useState<"upcoming" | "past">("upcoming")

  const upcomingMeetings = mockMeetings.filter((m) => m.status === "confirmed" || m.status === "pending")
  const pastMeetings = mockMeetings.filter((m) => m.status === "completed")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">My Meetings</h3>
          <p className="text-muted-foreground">Manage your scheduled sessions with alumni</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Schedule New Meeting
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <Button
          variant={selectedTab === "upcoming" ? "default" : "ghost"}
          size="sm"
          onClick={() => setSelectedTab("upcoming")}
        >
          Upcoming ({upcomingMeetings.length})
        </Button>
        <Button variant={selectedTab === "past" ? "default" : "ghost"} size="sm" onClick={() => setSelectedTab("past")}>
          Past ({pastMeetings.length})
        </Button>
      </div>

      {/* Meetings List */}
      <div className="space-y-4">
        {selectedTab === "upcoming" &&
          upcomingMeetings.map((meeting) => (
            <Card key={meeting.id} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={meeting.alumni.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {meeting.alumni.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                      <CardTitle className="text-lg">{meeting.title}</CardTitle>
                      <CardDescription className="font-medium">with {meeting.alumni.name}</CardDescription>
                      <p className="text-sm text-muted-foreground">{meeting.alumni.role}</p>
                    </div>
                  </div>

                  <Badge className={getStatusColor(meeting.status)}>
                    {getStatusIcon(meeting.status)}
                    <span className="ml-1 capitalize">{meeting.status}</span>
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Meeting Details */}
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">{meeting.date}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">{meeting.time}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Video className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium">Video Call</span>
                  </div>
                </div>

                {/* Agenda */}
                <div>
                  <h4 className="font-medium mb-2">Meeting Agenda</h4>
                  <p className="text-sm text-muted-foreground">{meeting.agenda}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 pt-4 border-t">
                  {meeting.status === "confirmed" && meeting.meetingLink && (
                    <Button className="flex-1">
                      <Video className="mr-2 h-4 w-4" />
                      Join Meeting
                    </Button>
                  )}
                  {meeting.status === "pending" && (
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Waiting for Confirmation
                    </Button>
                  )}
                  <Button variant="outline">Reschedule</Button>
                  <Button variant="outline">Cancel</Button>
                </div>
              </CardContent>
            </Card>
          ))}

        {selectedTab === "past" &&
          pastMeetings.map((meeting) => (
            <Card key={meeting.id} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={meeting.alumni.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {meeting.alumni.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                      <CardTitle className="text-lg">{meeting.title}</CardTitle>
                      <CardDescription className="font-medium">with {meeting.alumni.name}</CardDescription>
                      <p className="text-sm text-muted-foreground">{meeting.alumni.role}</p>
                    </div>
                  </div>

                  <Badge className={getStatusColor(meeting.status)}>
                    {getStatusIcon(meeting.status)}
                    <span className="ml-1 capitalize">{meeting.status}</span>
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Meeting Details */}
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">{meeting.date}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">{meeting.time}</span>
                  </div>
                </div>

                {/* Feedback */}
                {meeting.feedback && (
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Your Feedback</h4>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <CheckCircle
                            key={i}
                            className={`h-4 w-4 ${
                              i < meeting.feedback!.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium">{meeting.feedback.rating}/5</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{meeting.feedback.comment}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center space-x-2 pt-4 border-t">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Book Another Session
                  </Button>
                  <Button variant="outline">View Notes</Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Empty States */}
      {selectedTab === "upcoming" && upcomingMeetings.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No upcoming meetings</h3>
          <p className="text-muted-foreground mb-4">Schedule your first session with an alumni</p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Meeting
          </Button>
        </div>
      )}

      {selectedTab === "past" && pastMeetings.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No past meetings</h3>
          <p className="text-muted-foreground">Your completed sessions will appear here</p>
        </div>
      )}
    </div>
  )
}
