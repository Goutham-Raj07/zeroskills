import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TrendingUp, IndianRupee, Users, MapPin, BarChart3, Calendar, BookOpen } from "lucide-react"
import { MeetingScheduler } from "@/components/meeting-scheduler"
import Link from "next/link"

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

interface CareerOutcomeCardProps {
  career: Career
}

export function CareerOutcomeCard({ career }: CareerOutcomeCardProps) {
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
            {career.careerPath.map((step, index) => {
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

        {/* Actions */}
        <div className="flex items-center space-x-2 pt-4 border-t">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1">
                <Calendar className="mr-2 h-4 w-4" />
                Connect with Professionals
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Connect with {career.title} Professionals</DialogTitle>
                <DialogDescription>
                  Schedule a session with industry professionals to learn more about {career.title} career opportunities
                </DialogDescription>
              </DialogHeader>
              <MeetingScheduler mentorName="Industry Professional" careerField={career.title} />
            </DialogContent>
          </Dialog>
          <Link href="/trial-courses">
            <Button variant="outline">
              <BookOpen className="mr-2 h-4 w-4" />
              Trail Course
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
