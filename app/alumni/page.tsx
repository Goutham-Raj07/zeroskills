"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, Filter, Users, MessageCircle, Calendar } from "lucide-react"
import Link from "next/link"
import { AlumniCard } from "@/components/alumni-card"
import { AlumniChat } from "@/components/alumni-chat"
import { MeetingScheduler } from "@/components/meeting-scheduler"

const mockAlumni = [
  {
    id: "1",
    name: "Priya Sharma",
    currentRole: "Senior Software Engineer",
    company: "Google",
    experience: "5 years",
    education: "B.Tech CSE, IIT Delhi",
    specialization: "Machine Learning",
    location: "Bangalore",
    rating: 4.9,
    totalSessions: 127,
    responseTime: "< 2 hours",
    languages: ["English", "Hindi"],
    expertise: ["Career Guidance", "Technical Interviews", "ML/AI"],
    bio: "Passionate about helping students navigate their tech careers. Specialized in ML/AI with experience at top tech companies.",
    availability: "Weekends",
    hourlyRate: "₹500/hour",
    profileImage: "/professional-woman-software-engineer.png",
  },
  {
    id: "2",
    name: "Rahul Gupta",
    currentRole: "Product Manager",
    company: "Microsoft",
    experience: "7 years",
    education: "B.Tech EE, IIT Bombay + MBA, IIM Ahmedabad",
    specialization: "Product Strategy",
    location: "Hyderabad",
    rating: 4.8,
    totalSessions: 89,
    responseTime: "< 4 hours",
    languages: ["English", "Hindi", "Telugu"],
    expertise: ["Product Management", "Strategy", "Leadership"],
    bio: "Helping aspiring PMs understand the role and build the right skills. 7+ years in product roles at Microsoft.",
    availability: "Evenings",
    hourlyRate: "₹800/hour",
    profileImage: "/professional-product-manager.png",
  },
  {
    id: "3",
    name: "Ananya Patel",
    currentRole: "Data Scientist",
    company: "Netflix",
    experience: "4 years",
    education: "M.Tech CSE, IISc Bangalore",
    specialization: "Data Science & Analytics",
    location: "Mumbai",
    rating: 4.9,
    totalSessions: 156,
    responseTime: "< 1 hour",
    languages: ["English", "Hindi", "Gujarati"],
    expertise: ["Data Science", "Analytics", "Statistics"],
    bio: "Data science enthusiast with experience in recommendation systems and user analytics at Netflix.",
    availability: "Flexible",
    hourlyRate: "₹600/hour",
    profileImage: "/professional-woman-data-scientist.png",
  },
  {
    id: "4",
    name: "Vikram Singh",
    currentRole: "Startup Founder",
    company: "TechVenture (Acquired by Flipkart)",
    experience: "8 years",
    education: "B.Tech CSE, BITS Pilani",
    specialization: "Entrepreneurship",
    location: "Delhi",
    rating: 4.7,
    totalSessions: 203,
    responseTime: "< 6 hours",
    languages: ["English", "Hindi"],
    expertise: ["Entrepreneurship", "Startups", "Business Strategy"],
    bio: "Serial entrepreneur with successful exit. Mentoring next-gen entrepreneurs and tech professionals.",
    availability: "Weekdays",
    hourlyRate: "₹1000/hour",
    profileImage: "/professional-entrepreneur.png",
  },
]

export default function AlumniPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("browse")
  const [selectedAlumni, setSelectedAlumni] = useState<string | null>(null)

  const filteredAlumni = mockAlumni.filter((alumni) => {
    const matchesSearch =
      alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.currentRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.specialization.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilters =
      selectedFilters.length === 0 ||
      selectedFilters.some((filter) => alumni.expertise.some((exp) => exp.toLowerCase().includes(filter.toLowerCase())))

    return matchesSearch && matchesFilters
  })

  const filterOptions = [
    "Software Engineering",
    "Product Management",
    "Data Science",
    "Machine Learning",
    "Entrepreneurship",
    "Consulting",
    "Finance",
    "Design",
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/recommendations" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Recommendations</span>
            </Link>
            <div className="h-4 w-px bg-border" />
            <h1 className="text-lg font-semibold">Alumni Network</h1>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <Users className="mr-1 h-3 w-3" />
            {mockAlumni.length} Alumni Available
          </Badge>
        </div>
      </header>

      <div className="container py-8">
        <div className="mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl font-bold text-balance">Connect with Industry Professionals</h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Get real-world insights from alumni working in your target companies and roles. Schedule 1:1 sessions to
              validate your career choices.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="browse" className="flex items-center space-x-2">
                <Search className="h-4 w-4" />
                <span>Browse Alumni</span>
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>Messages</span>
              </TabsTrigger>
              <TabsTrigger value="meetings" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>My Meetings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="space-y-6">
              {/* Search and Filters */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, role, company, or specialization..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </Button>
                </div>

                {/* Filter Tags */}
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map((filter) => (
                    <Badge
                      key={filter}
                      variant={selectedFilters.includes(filter) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedFilters((prev) =>
                          prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter],
                        )
                      }}
                    >
                      {filter}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Alumni Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                {filteredAlumni.map((alumni) => (
                  <AlumniCard key={alumni.id} alumni={alumni} onConnect={() => setSelectedAlumni(alumni.id)} />
                ))}
              </div>

              {filteredAlumni.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No alumni found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="chat" className="space-y-6">
              <AlumniChat />
            </TabsContent>

            <TabsContent value="meetings" className="space-y-6">
              <MeetingScheduler />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
