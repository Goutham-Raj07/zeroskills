"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, Brain, GraduationCap, Building, Trophy, TrendingUp } from "lucide-react"
import Link from "next/link"
import { RecommendationCard } from "@/components/recommendation-card"
import { CollegeCard } from "@/components/college-card"
import { ExamCard } from "@/components/exam-card"
import { CareerOutcomeCard } from "@/components/career-outcome-card"

const mockRecommendations = [
  {
    id: "software-engineering",
    title: "Software Engineering",
    match: 95,
    category: "Technology",
    description: "Design, develop, and maintain software systems and applications",
    skills: ["Programming", "Problem Solving", "System Design", "Algorithms"],
    averageSalary: "₹8-25 LPA",
    jobGrowth: "+22%",
    workEnvironment: "Office/Remote",
    education: "B.Tech/B.E. in Computer Science",
    topCompanies: ["Google", "Microsoft", "Amazon", "Flipkart"],
    careerPathways: [
      {
        name: "Traditional Engineering Route",
        description: "Most Common",
        steps: ["12th Science", "JEE/Engineering Entrance", "B.Tech Computer Science", "Software Engineer"],
      },
      {
        name: "Diploma + Engineering Route",
        description: "Alternative Path",
        steps: ["10th", "Diploma in Computer Science", "B.Tech (Lateral Entry)", "Software Engineer"],
      },
      {
        name: "Vocational + Engineering Route",
        description: "Skill-Based",
        steps: ["12th", "Vocational Course (Programming)", "B.Tech/BCA", "Software Engineer"],
      },
    ],
    careerPath: ["Junior Developer", "Senior Developer", "Tech Lead", "Engineering Manager"],
    mentorVerified: true,
    mentorName: "Rahul Sharma (Senior SDE at Google)",
  },
  {
    id: "data-science",
    title: "Data Science",
    match: 88,
    category: "Analytics",
    description: "Extract insights from data to drive business decisions",
    skills: ["Statistics", "Machine Learning", "Python", "Data Visualization"],
    averageSalary: "₹6-20 LPA",
    jobGrowth: "+31%",
    workEnvironment: "Office/Hybrid",
    education: "B.Tech/M.Tech in CS/Statistics",
    topCompanies: ["Netflix", "Uber", "Swiggy", "Paytm"],
    careerPathways: [
      {
        name: "Engineering + Specialization Route",
        description: "Technical Path",
        steps: ["12th Science", "B.Tech Computer Science", "M.Tech Data Science", "Data Scientist"],
      },
      {
        name: "Statistics + Programming Route",
        description: "Math-Heavy",
        steps: ["12th Science", "B.Sc Statistics/Math", "Data Science Certification", "Data Scientist"],
      },
      {
        name: "Business + Analytics Route",
        description: "Business Focus",
        steps: ["12th Any Stream", "BBA/B.Com", "MBA Analytics", "Business Analyst"],
      },
    ],
    careerPath: ["Data Analyst", "Data Scientist", "Senior Data Scientist", "Chief Data Officer"],
    mentorVerified: true,
    mentorName: "Priya Patel (Lead Data Scientist at Flipkart)",
  },
  {
    id: "product-management",
    title: "Product Management",
    match: 82,
    category: "Business",
    description: "Guide product development from conception to launch",
    skills: ["Strategic Thinking", "Communication", "Analytics", "Leadership"],
    averageSalary: "₹10-30 LPA",
    jobGrowth: "+19%",
    workEnvironment: "Office",
    education: "Any Bachelor's + MBA (preferred)",
    topCompanies: ["Zomato", "PhonePe", "Razorpay", "Byju's"],
    careerPathways: [
      {
        name: "Engineering + MBA Route",
        description: "Technical PM",
        steps: ["12th Science", "B.Tech Any Branch", "MBA", "Product Manager"],
      },
      {
        name: "Business + Experience Route",
        description: "Business PM",
        steps: ["12th Any Stream", "BBA/B.Com", "Work Experience", "Product Manager"],
      },
      {
        name: "Design + Business Route",
        description: "Design-Led PM",
        steps: ["12th Any Stream", "Design Degree", "Business Certification", "Product Manager"],
      },
    ],
    careerPath: ["Associate PM", "Product Manager", "Senior PM", "VP Product"],
    mentorVerified: true,
    mentorName: "Arjun Singh (VP Product at Razorpay)",
  },
]

const mockColleges = [
  {
    id: "iit-bombay",
    name: "IIT Bombay",
    location: "Mumbai, Maharashtra",
    ranking: 1,
    type: "Government",
    courses: ["B.Tech Computer Science", "B.Tech Electronics", "M.Tech AI"],
    fees: "₹2.5 LPA",
    placements: "₹25 LPA average",
    cutoff: "JEE Advanced Rank 1-500",
    facilities: ["Research Labs", "Industry Partnerships", "International Exchange"],
  },
  {
    id: "iisc-bangalore",
    name: "IISc Bangalore",
    location: "Bangalore, Karnataka",
    ranking: 2,
    type: "Government",
    courses: ["B.S. Research", "M.Tech", "Ph.D Programs"],
    fees: "₹1.8 LPA",
    placements: "₹22 LPA average",
    cutoff: "KVPY/JEE Advanced/GATE",
    facilities: ["World-class Research", "Innovation Hub", "Startup Incubator"],
  },
  {
    id: "bits-pilani",
    name: "BITS Pilani",
    location: "Pilani, Rajasthan",
    ranking: 15,
    type: "Private",
    courses: ["B.E. Computer Science", "B.E. Electronics", "Dual Degree"],
    fees: "₹4.5 LPA",
    placements: "₹18 LPA average",
    cutoff: "BITSAT Score 350+",
    facilities: ["Industry Connect", "Global Exposure", "Flexible Curriculum"],
  },
]

const mockExams = [
  {
    id: "jee-advanced",
    name: "JEE Advanced",
    type: "Engineering Entrance",
    eligibility: "JEE Main qualified",
    examDate: "May 2024",
    applicationDeadline: "April 2024",
    difficulty: "Very High",
    colleges: ["All IITs", "IISc", "IISER"],
    subjects: ["Physics", "Chemistry", "Mathematics"],
    pattern: "Computer Based Test",
    duration: "6 hours (2 papers)",
  },
  {
    id: "gate",
    name: "GATE",
    type: "Postgraduate Entrance",
    eligibility: "B.Tech/B.E. final year",
    examDate: "February 2024",
    applicationDeadline: "October 2023",
    difficulty: "High",
    colleges: ["IITs", "NITs", "IIITs"],
    subjects: ["Computer Science", "Electronics", "Mechanical"],
    pattern: "Computer Based Test",
    duration: "3 hours",
  },
  {
    id: "cat",
    name: "CAT",
    type: "Management Entrance",
    eligibility: "Bachelor's degree",
    examDate: "November 2024",
    applicationDeadline: "September 2024",
    difficulty: "High",
    colleges: ["IIMs", "Top B-Schools"],
    subjects: ["Quantitative Aptitude", "Verbal Ability", "Data Interpretation"],
    pattern: "Computer Based Test",
    duration: "2 hours",
  },
]

export default function RecommendationsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("careers")

  useEffect(() => {
    // Simulate AI processing
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <div className="flex justify-center">
            <Brain className="h-16 w-16 text-primary animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold">AI is Analyzing Your Profile</h2>
          <p className="text-muted-foreground">
            Our advanced algorithms are processing your assessment data to generate personalized recommendations...
          </p>
          <Progress value={75} className="h-2" />
          <p className="text-sm text-muted-foreground">Almost ready...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/assessment" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Assessment</span>
            </Link>
            <div className="h-4 w-px bg-border" />
            <h1 className="text-lg font-semibold">Your Recommendations</h1>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Analysis Complete
          </Badge>
        </div>
      </header>

      <div className="container py-8">
        <div className="mx-auto max-w-6xl">
          {/* Summary Section */}
          <div className="mb-8">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl font-bold text-balance">Your Personalized Career Roadmap</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Based on your assessment results, we've identified the best career paths, colleges, and preparation
                strategies for you.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-2">
                    <Trophy className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Top Match</CardTitle>
                  <CardDescription>Software Engineering</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">95%</div>
                  <p className="text-sm text-muted-foreground">Compatibility Score</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-2">
                    <GraduationCap className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle>Recommended Colleges</CardTitle>
                  <CardDescription>Best fit institutions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary">12</div>
                  <p className="text-sm text-muted-foreground">Colleges Found</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-2">
                    <Building className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Entrance Exams</CardTitle>
                  <CardDescription>Required examinations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">5</div>
                  <p className="text-sm text-muted-foreground">Exams to Consider</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recommendations Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="careers" className="flex items-center space-x-2">
                <Brain className="h-4 w-4" />
                <span>Career Paths</span>
              </TabsTrigger>
              <TabsTrigger value="colleges" className="flex items-center space-x-2">
                <GraduationCap className="h-4 w-4" />
                <span>Colleges</span>
              </TabsTrigger>
              <TabsTrigger value="exams" className="flex items-center space-x-2">
                <Trophy className="h-4 w-4" />
                <span>Entrance Exams</span>
              </TabsTrigger>
              <TabsTrigger value="outcomes" className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Career Outcomes</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="careers" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Recommended Career Paths</h3>
                <p className="text-muted-foreground">
                  These careers align with your skills, interests, and aptitude test results.
                </p>
              </div>
              <div className="grid gap-6">
                {mockRecommendations.map((career) => (
                  <RecommendationCard key={career.id} career={career} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="colleges" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Recommended Colleges & Universities</h3>
                <p className="text-muted-foreground">
                  Top institutions that offer programs aligned with your career interests.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {mockColleges.map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="exams" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Entrance Exams to Consider</h3>
                <p className="text-muted-foreground">
                  Important examinations for admission to your target colleges and programs.
                </p>
              </div>
              <div className="grid gap-6">
                {mockExams.map((exam) => (
                  <ExamCard key={exam.id} exam={exam} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="outcomes" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Career Outcomes & Growth</h3>
                <p className="text-muted-foreground">
                  Expected career progression, salary ranges, and industry trends.
                </p>
              </div>
              <div className="grid gap-6">
                {mockRecommendations.map((career) => (
                  <CareerOutcomeCard key={career.id} career={career} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Next Steps */}
          <div className="mt-12 text-center">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle>Ready for the Next Step?</CardTitle>
                <CardDescription>
                  Connect with mentors and get expert validation for your career choices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-4">
                  <Link href="/alumni">
                    <Button size="lg">
                      Connect with Mentors
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg">
                    Download Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
