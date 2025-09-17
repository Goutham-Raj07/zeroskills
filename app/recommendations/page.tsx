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
  { id: "software-engineering", title: "Software Engineering", match: 95, category: "Technology", description: "Design, develop, and maintain software systems and applications", skills: ["Programming", "Problem Solving", "System Design", "Algorithms"], averageSalary: "₹8-25 LPA", jobGrowth: "+22%", workEnvironment: "Office/Remote", education: "B.Tech/B.E. in Computer Science", topCompanies: ["Google", "Microsoft", "Amazon", "Flipkart"], careerPathways: [ { name: "Traditional Engineering Route", description: "Most Common", steps: ["12th Science", "JEE/Engineering Entrance", "B.Tech Computer Science", "Software Engineer"] } ], careerPath: ["Junior Developer", "Senior Developer", "Tech Lead", "Engineering Manager"], mentorVerified: true, mentorName: "Rahul Sharma (Senior SDE at Google)" },
]

const mockColleges = [
  { id: "iit-bombay", name: "IIT Bombay", location: "Mumbai, Maharashtra", ranking: 1, type: "Government", courses: ["B.Tech Computer Science", "B.Tech Electronics", "M.Tech AI"], fees: "₹2.5 LPA", placements: "₹25 LPA average", cutoff: "JEE Advanced Rank 1-500", facilities: ["Research Labs", "Industry Partnerships", "International Exchange"] },
]

const mockExams = [
  { id: "jee-advanced", name: "JEE Advanced", type: "Engineering Entrance", eligibility: "JEE Main qualified", examDate: "May 2024", applicationDeadline: "April 2024", difficulty: "Very High", colleges: ["All IITs", "IISc", "IISER"], subjects: ["Physics", "Chemistry", "Mathematics"], pattern: "Computer Based Test", duration: "6 hours (2 papers)" },
]

export default function RecommendationsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("careers")
  const [recs, setRecs] = useState<Array<{ course: string; match: number }>>([])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200)
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("recommendations") : null
      if (raw) setRecs(JSON.parse(raw))
    } catch {}
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
          <p className="text-muted-foreground">Preparing personalized recommendations...</p>
          <Progress value={75} className="h-2" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
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
          <Badge variant="secondary" className="bg-green-100 text-green-800">Analysis Complete</Badge>
        </div>
      </header>

      <div className="container py-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl font-bold text-balance">Your Personalized Academic Path</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Based on your quiz answers, here are the best-fit courses and study streams.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-2"><Trophy className="h-8 w-8 text-primary" /></div>
                  <CardTitle>Top Match</CardTitle>
                  <CardDescription>{recs[0]?.course || "Software Engineering"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{recs[0]?.match ?? 95}%</div>
                  <p className="text-sm text-muted-foreground">Compatibility Score</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-2"><GraduationCap className="h-8 w-8 text-secondary" /></div>
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
                  <div className="flex justify-center mb-2"><Building className="h-8 w-8 text-primary" /></div>
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

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="careers" className="flex items-center space-x-2"><Brain className="h-4 w-4" /><span>Courses</span></TabsTrigger>
              <TabsTrigger value="colleges" className="flex items-center space-x-2"><GraduationCap className="h-4 w-4" /><span>Colleges</span></TabsTrigger>
              <TabsTrigger value="exams" className="flex items-center space-x-2"><Trophy className="h-4 w-4" /><span>Entrance Exams</span></TabsTrigger>
              <TabsTrigger value="outcomes" className="flex items-center space-x-2"><TrendingUp className="h-4 w-4" /><span>Outcomes</span></TabsTrigger>
            </TabsList>

            <TabsContent value="careers" className="space-y-6">
              <div className="grid gap-6">
                {(recs.length ? recs.map((r, idx) => ({ id: `rec-${idx}`, title: r.course, match: r.match })) : []).map((career) => (
                  <RecommendationCard key={career.id} career={{ ...career, category: "Academic", description: "Recommended academic course", skills: [], averageSalary: "-", jobGrowth: "-", workEnvironment: "-", education: career.title, topCompanies: [], careerPathways: [], careerPath: [], mentorVerified: false, mentorName: "" }} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="colleges" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {mockColleges.map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="exams" className="space-y-6">
              <div className="grid gap-6">
                {mockExams.map((exam) => (
                  <ExamCard key={exam.id} exam={exam} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="outcomes" className="space-y-6">
              <div className="grid gap-6">
                {(recs.length ? recs : [{ course: "Software Engineering", match: 95 }]).map((r, idx) => (
                  <CareerOutcomeCard key={idx} career={{ id: `out-${idx}`, title: r.course, match: r.match, category: "Academic", description: "Potential outcomes for this course", skills: [], averageSalary: "-", jobGrowth: "-", workEnvironment: "-", education: r.course, topCompanies: [], careerPathways: [], careerPath: [], mentorVerified: false, mentorName: "" }} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 text-center">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle>Ready for the Next Step?</CardTitle>
                <CardDescription>Connect with mentors and get expert validation for your academic choices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-4">
                  <Link href="/alumni"><Button size="lg">Connect with Mentors<ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
                  <Button variant="outline" size="lg">Download Report</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
