"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Video, User, CheckCircle, AlertCircle } from "lucide-react"

const mockAppointments = [
  {
    id: "APT-001",
    student: "Arjun Patel",
    counselor: "Dr. Meera Krishnan",
    date: "2024-01-15",
    time: "10:00 AM - 11:00 AM",
    type: "Career Validation Session",
    status: "confirmed",
    mode: "video",
    agenda: "Review AI recommendations, discuss career alignment, provide professional guidance",
    studentNotes: "Interested in software engineering vs data science career paths",
  },
  {
    id: "APT-002",
    student: "Sneha Reddy",
    counselor: "Prof. Rajesh Sharma",
    date: "2024-01-16",
    time: "2:00 PM - 3:00 PM",
    type: "Academic Planning Session",
    status: "pending",
    mode: "video",
    agenda: "Discuss subject selection, college preferences, entrance exam strategy",
    studentNotes: "Confused between engineering and medical streams",
  },
  {
    id: "APT-003",
    student: "Karan Singh",
    counselor: "Dr. Meera Krishnan",
    date: "2024-01-18",
    time: "4:00 PM - 5:00 PM",
    type: "Follow-up Consultation",
    status: "confirmed",
    mode: "video",
    agenda: "Progress review, address concerns, update career plan",
    studentNotes: "Need guidance on skill development and internship opportunities",
  },
]

export function AppointmentScheduler() {
  const [selectedTab, setSelectedTab] = useState<"upcoming" | "past">("upcoming")

  const upcomingAppointments = mockAppointments.filter((apt) => apt.status === "confirmed" || apt.status === "pending")
  const pastAppointments = mockAppointments.filter((apt) => apt.status === "completed")

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
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Counselor Appointments</h3>
          <p className="text-muted-foreground">Schedule and manage your sessions with professional counselors</p>
        </div>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Schedule New Appointment
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <Button
          variant={selectedTab === "upcoming" ? "default" : "ghost"}
          size="sm"
          onClick={() => setSelectedTab("upcoming")}
        >
          Upcoming ({upcomingAppointments.length})
        </Button>
        <Button variant={selectedTab === "past" ? "default" : "ghost"} size="sm" onClick={() => setSelectedTab("past")}>
          Past ({pastAppointments.length})
        </Button>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {selectedTab === "upcoming" &&
          upcomingAppointments.map((appointment) => (
            <Card key={appointment.id} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">{appointment.type}</CardTitle>
                      <Badge className={getStatusColor(appointment.status)}>
                        {getStatusIcon(appointment.status)}
                        <span className="ml-1 capitalize">{appointment.status}</span>
                      </Badge>
                    </div>
                    <CardDescription>Appointment ID: {appointment.id}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Student</p>
                      <p className="text-sm text-muted-foreground">{appointment.student}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium">Counselor</p>
                      <p className="text-sm text-muted-foreground">{appointment.counselor}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Date</p>
                      <p className="text-sm text-muted-foreground">{appointment.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium">Time</p>
                      <p className="text-sm text-muted-foreground">{appointment.time}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Session Agenda</p>
                  <p className="text-sm text-muted-foreground">{appointment.agenda}</p>
                </div>

                {appointment.studentNotes && (
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm font-medium mb-1">Student Notes</p>
                    <p className="text-sm text-muted-foreground">{appointment.studentNotes}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Video className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Video Call Session</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {appointment.status === "confirmed" && (
                      <Button size="sm">
                        <Video className="mr-2 h-4 w-4" />
                        Join Session
                      </Button>
                    )}
                    {appointment.status === "pending" && (
                      <Button variant="outline" size="sm">
                        <AlertCircle className="mr-2 h-4 w-4" />
                        Awaiting Confirmation
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

        {selectedTab === "past" && pastAppointments.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Past Appointments</h3>
            <p className="text-muted-foreground">Your completed counselor sessions will appear here</p>
          </div>
        )}
      </div>

      {/* Empty State for Upcoming */}
      {selectedTab === "upcoming" && upcomingAppointments.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Upcoming Appointments</h3>
          <p className="text-muted-foreground mb-4">Schedule your first counselor session to get expert validation</p>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Appointment
          </Button>
        </div>
      )}
    </div>
  )
}
