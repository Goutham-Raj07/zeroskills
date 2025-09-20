import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, IndianRupee, Users, MapPin, BarChart3, Calendar, BookOpen, Video, Clock, User, Phone, Mail, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface Career {
  id: string
  title: string
  match: number
  category: string
  description: string
  skills: string[]
  averageSalary: string
  jobGrowth: string
  workEnvironment: string
  education: string
  topCompanies: string[]
  careerPath: string[]
}

interface Professional {
  id: string
  name: string
  title: string
  company: string
  experience: string
  rating: number
  nextAvailable: string
  meetingLink?: string
  phone?: string
  email?: string
  specialties: string[]
}

interface CareerOutcomeCardProps {
  career: Career
}

export function CareerOutcomeCard({ career }: CareerOutcomeCardProps) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  // Mock data for professionals in this career field
  const getProfessionalsForCareer = (careerTitle: string): Professional[] => {
    const professionalData: { [key: string]: Professional[] } = {
      "Software Engineer": [
        {
          id: "1",
          name: "Dr. Priya Sharma",
          title: "Senior Software Engineer",
          company: "Google",
          experience: "8 years",
          rating: 4.9,
          nextAvailable: "Today, 2:00 PM",
          meetingLink: "https://meet.google.com/abc-defg-hij",
          phone: "+91-98765-43210",
          email: "priya.sharma@google.com",
          specialties: ["Full Stack Development", "System Design", "Technical Leadership"]
        },
        {
          id: "2",
          name: "Arjun Patel",
          title: "Tech Lead",
          company: "Microsoft",
          experience: "7 years",
          rating: 4.8,
          nextAvailable: "Tomorrow, 10:00 AM",
          meetingLink: "https://teams.microsoft.com/l/meetup-join/xyz",
          phone: "+91-98765-43211",
          email: "arjun.patel@microsoft.com",
          specialties: ["Cloud Architecture", "DevOps", "Team Management"]
        },
        {
          id: "3",
          name: "Dr. Ananya Singh",
          title: "Principal Engineer",
          company: "Amazon",
          experience: "10 years",
          rating: 4.9,
          nextAvailable: "Friday, 3:30 PM",
          meetingLink: "https://zoom.us/j/123456789",
          phone: "+91-98765-43212",
          email: "ananya.singh@amazon.com",
          specialties: ["Machine Learning", "Distributed Systems", "Career Growth"]
        }
      ],
      "Data Scientist": [
        {
          id: "1",
          name: "Dr. Rajesh Kumar",
          title: "Senior Data Scientist",
          company: "Netflix",
          experience: "6 years",
          rating: 4.8,
          nextAvailable: "Today, 4:00 PM",
          meetingLink: "https://meet.google.com/netflix-data-ai",
          phone: "+91-98765-43220",
          email: "rajesh.kumar@netflix.com",
          specialties: ["Machine Learning", "Recommendation Systems", "Big Data"]
        },
        {
          id: "2",
          name: "Dr. Sneha Reddy",
          title: "Lead Data Scientist",
          company: "Uber",
          experience: "8 years",
          rating: 4.9,
          nextAvailable: "Tomorrow, 11:00 AM",
          meetingLink: "https://teams.microsoft.com/uber-data-team",
          phone: "+91-98765-43221",
          email: "sneha.reddy@uber.com",
          specialties: ["Deep Learning", "Computer Vision", "Mentoring"]
        },
        {
          id: "3",
          name: "Vikram Joshi",
          title: "Principal Data Scientist",
          company: "Spotify",
          experience: "9 years",
          rating: 4.7,
          nextAvailable: "Thursday, 2:00 PM",
          meetingLink: "https://zoom.us/j/spotify-ml-team",
          phone: "+91-98765-43222",
          email: "vikram.joshi@spotify.com",
          specialties: ["NLP", "Music Recommendation", "Career Transition"]
        }
      ],
      "Product Manager": [
        {
          id: "1",
          name: "Dr. Kavya Nair",
          title: "Senior Product Manager",
          company: "Meta",
          experience: "7 years",
          rating: 4.8,
          nextAvailable: "Today, 3:00 PM",
          meetingLink: "https://meet.google.com/meta-product-team",
          phone: "+91-98765-43230",
          email: "kavya.nair@meta.com",
          specialties: ["Product Strategy", "User Research", "Team Leadership"]
        },
        {
          id: "2",
          name: "Rohit Agarwal",
          title: "Principal Product Manager",
          company: "LinkedIn",
          experience: "9 years",
          rating: 4.9,
          nextAvailable: "Tomorrow, 9:00 AM",
          meetingLink: "https://teams.microsoft.com/linkedin-product",
          phone: "+91-98765-43231",
          email: "rohit.agarwal@linkedin.com",
          specialties: ["B2B Products", "Growth Strategy", "Mentoring"]
        },
        {
          id: "3",
          name: "Dr. Meera Iyer",
          title: "Director of Product",
          company: "Stripe",
          experience: "11 years",
          rating: 4.9,
          nextAvailable: "Wednesday, 1:00 PM",
          meetingLink: "https://zoom.us/j/stripe-product-leadership",
          phone: "+91-98765-43232",
          email: "meera.iyer@stripe.com",
          specialties: ["Fintech", "Product Vision", "Executive Leadership"]
        }
      ],
      "Marketing Manager": [
        {
          id: "1",
          name: "Dr. Suresh Gupta",
          title: "Head of Marketing",
          company: "Zomato",
          experience: "8 years",
          rating: 4.7,
          nextAvailable: "Today, 5:00 PM",
          meetingLink: "https://meet.google.com/zomato-marketing",
          phone: "+91-98765-43240",
          email: "suresh.gupta@zomato.com",
          specialties: ["Digital Marketing", "Brand Strategy", "Growth Hacking"]
        },
        {
          id: "2",
          name: "Dr. Pooja Mehta",
          title: "Senior Marketing Manager",
          company: "Swiggy",
          experience: "6 years",
          rating: 4.8,
          nextAvailable: "Tomorrow, 2:00 PM",
          meetingLink: "https://teams.microsoft.com/swiggy-marketing",
          phone: "+91-98765-43241",
          email: "pooja.mehta@swiggy.com",
          specialties: ["Content Marketing", "Social Media", "Campaign Management"]
        },
        {
          id: "3",
          name: "Amit Desai",
          title: "VP of Marketing",
          company: "Paytm",
          experience: "12 years",
          rating: 4.9,
          nextAvailable: "Friday, 10:00 AM",
          meetingLink: "https://zoom.us/j/paytm-marketing-vp",
          phone: "+91-98765-43242",
          email: "amit.desai@paytm.com",
          specialties: ["Fintech Marketing", "Leadership", "Mentoring"]
        }
      ],
      "default": [
        {
          id: "1",
          name: "Dr. Neha Verma",
          title: "Senior Professional",
          company: "Tech Corp",
          experience: "7 years",
          rating: 4.8,
          nextAvailable: "Today, 2:00 PM",
          meetingLink: "https://meet.google.com/tech-corp-mentor",
          phone: "+91-98765-43250",
          email: "neha.verma@techcorp.com",
          specialties: ["Career Guidance", "Industry Insights", "Mentoring"]
        },
        {
          id: "2",
          name: "Dr. Ravi Khanna",
          title: "Industry Expert",
          company: "Innovation Labs",
          experience: "9 years",
          rating: 4.7,
          nextAvailable: "Tomorrow, 11:00 AM",
          meetingLink: "https://teams.microsoft.com/innovation-labs",
          phone: "+91-98765-43251",
          email: "ravi.khanna@innovationlabs.com",
          specialties: ["Strategic Planning", "Leadership", "Career Development"]
        },
        {
          id: "3",
          name: "Dr. Shilpa Rao",
          title: "Senior Consultant",
          company: "Global Solutions",
          experience: "8 years",
          rating: 4.9,
          nextAvailable: "Thursday, 3:00 PM",
          meetingLink: "https://zoom.us/j/global-solutions-consulting",
          phone: "+91-98765-43252",
          email: "shilpa.rao@globalsolutions.com",
          specialties: ["Business Strategy", "Career Transition", "Mentoring"]
        }
      ]
    }

    // Find matching professionals based on career title
    for (const [key, professionals] of Object.entries(professionalData)) {
      if ((careerTitle && careerTitle.toLowerCase().includes(key.toLowerCase())) || key === "default") {
        return professionals
      }
    }
    
    return professionalData["default"]
  }

  const professionals = getProfessionalsForCareer(career.title)

  const handleJoinMeeting = (professional: Professional) => {
    if (professional.meetingLink) {
      window.open(professional.meetingLink, '_blank', 'noopener,noreferrer')
    }
  }

  const handleReschedule = (professional: Professional) => {
    console.log('Rescheduling meeting with:', professional.name)
    // Open Google Meet to create a new meeting
    const meetingTitle = `Reschedule Meeting with ${professional.name} - ${career.title}`
    const googleMeetUrl = `https://meet.google.com/new?hs=179&pli=1&authuser=0&text=${encodeURIComponent(meetingTitle)}`
    window.open(googleMeetUrl, '_blank', 'noopener,noreferrer')
    showSuccess(`Google Meet opened for rescheduling with ${professional.name}`)
  }

  const handleScheduleNew = (professional: Professional) => {
    console.log('Scheduling new meeting with:', professional.name)
    // Open Google Meet to create a new meeting
    const meetingTitle = `New Meeting with ${professional.name} - ${career.title}`
    const googleMeetUrl = `https://meet.google.com/new?hs=179&pli=1&authuser=0&text=${encodeURIComponent(meetingTitle)}`
    window.open(googleMeetUrl, '_blank', 'noopener,noreferrer')
    showSuccess(`Google Meet opened for new meeting with ${professional.name}`)
  }

  const showSuccess = (message: string) => {
    setSuccessMessage(message)
    setShowSuccessMessage(true)
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 3000)
  }

  return (
    <Card className="relative overflow-hidden">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg">{career.title}</CardTitle>
            <CardDescription>Career outcomes and growth prospects</CardDescription>
          </div>
          <Badge variant="secondary">{career.category}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Salary & Growth Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <IndianRupee className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-green-700">{career.averageSalary}</div>
            <p className="text-xs text-green-600">Average Salary</p>
          </div>

          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <TrendingUp className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-blue-700">{career.jobGrowth}</div>
            <p className="text-xs text-blue-600">Annual Growth</p>
          </div>

          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-purple-700">High</div>
            <p className="text-xs text-purple-600">Job Demand</p>
          </div>
        </div>

        {/* Career Progression Timeline */}
        <div>
          <h4 className="font-medium mb-3 flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            Career Progression & Salary Growth
          </h4>
          <div className="space-y-3">
            {(career.careerPath || []).map((step, index) => {
              const salaryRanges = ["₹3-6 LPA", "₹6-12 LPA", "₹12-25 LPA", "₹25-50 LPA"]
              const experience = ["0-2 years", "2-5 years", "5-10 years", "10+ years"]

              return (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{step}</p>
                      <p className="text-sm text-muted-foreground">{experience[index] || "10+ years"}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {salaryRanges[index] || "₹50+ LPA"}
                  </Badge>
                </div>
              )
            })}
          </div>
        </div>

        {/* Work Environment & Benefits */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h4 className="font-medium mb-2 flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              Work Environment
            </h4>
            <p className="text-sm text-muted-foreground mb-2">{career.workEnvironment}</p>
            <div className="space-y-1">
              <Badge variant="outline" className="mr-2">
                Flexible Hours
              </Badge>
              <Badge variant="outline" className="mr-2">
                Remote Options
              </Badge>
              <Badge variant="outline">Growth Opportunities</Badge>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Industry Outlook</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Job Security</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  High
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Innovation Level</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Very High
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Work-Life Balance</span>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Good
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Connection Section */}
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <h4 className="font-medium flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Connect with {career.title} Professionals
            </h4>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {professionals.length} Available
              </Badge>
              <Button
                size="sm"
                onClick={() => {
                  // Schedule with the first available professional
                  if (professionals.length > 0) {
                    handleScheduleNew(professionals[0])
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Video className="h-3 w-3 mr-1" />
                Schedule Meeting
              </Button>
            </div>
          </div>

          {/* Professionals List */}
          <div className="space-y-3">
            {professionals.map((professional) => (
              <Card key={professional.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {professional.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h5 className="font-semibold">{professional.name}</h5>
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm text-gray-600">{professional.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{professional.title} at {professional.company}</p>
                      <p className="text-xs text-gray-500">{professional.experience} experience</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {professional.specialties.slice(0, 2).map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">Next Available</p>
                      <p className="text-xs text-gray-600">{professional.nextAvailable}</p>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <div className="flex space-x-2">
                        {professional.meetingLink && (
                          <Button
                            size="sm"
                            onClick={() => handleJoinMeeting(professional)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Video className="h-3 w-3 mr-1" />
                            Join Meeting
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReschedule(professional)}
                        >
                          <Video className="h-3 w-3 mr-1" />
                          Reschedule
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleScheduleNew(professional)}
                        className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                      >
                        <Video className="h-3 w-3 mr-1" />
                        New Meeting
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t">
            <Button variant="outline" className="justify-start">
              <Phone className="h-4 w-4 mr-2" />
              Call Support
            </Button>
            <Button variant="outline" className="justify-start">
              <Mail className="h-4 w-4 mr-2" />
              Email Support
            </Button>
            <Link href="/trial-courses">
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="h-4 w-4 mr-2" />
                Trial Course
              </Button>
            </Link>
          </div>
        </div>


        {/* Success Notification */}
        {showSuccessMessage && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-in slide-in-from-right-2 duration-300">
            <CheckCircle className="h-5 w-5" />
            <span>{successMessage}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
