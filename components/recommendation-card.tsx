import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Star, TrendingUp, MapPin, GraduationCap, Building2, ArrowRight, CheckCircle, Calendar } from "lucide-react"
import { MeetingScheduler } from "@/components/meeting-scheduler"

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
  careerPathways: {
    name: string
    steps: string[]
    description: string
  }[]
  mentorVerified?: boolean
  mentorName?: string
}

interface RecommendationCardProps {
  career: Career
}

export function RecommendationCard({ career }: RecommendationCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-xl">{career.title}</CardTitle>
              <Badge variant="secondary">{career.category}</Badge>
              {career.mentorVerified && (
                <Badge variant="default" className="bg-green-100 text-green-800">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Mentor Verified
                </Badge>
              )}
            </div>
            <CardDescription className="text-base">{career.description}</CardDescription>
            {career.mentorVerified && career.mentorName && (
              <p className="text-sm text-muted-foreground">
                Validated by: <span className="font-medium text-primary">{career.mentorName}</span>
              </p>
            )}
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 mb-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-lg font-bold text-primary">{career.match}%</span>
            </div>
            <p className="text-xs text-muted-foreground">Match Score</p>
          </div>
        </div>
        <Progress value={career.match} className="h-2" />
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Skills */}
        <div>
          <h4 className="font-medium mb-2">Key Skills Required</h4>
          <div className="flex flex-wrap gap-2">
            {career.skills.map((skill, index) => (
              <Badge key={index} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Career Details Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Average Salary</p>
                <p className="text-sm text-muted-foreground">{career.averageSalary}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Job Growth</p>
                <p className="text-sm text-muted-foreground">{career.jobGrowth} annually</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Work Environment</p>
                <p className="text-sm text-muted-foreground">{career.workEnvironment}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <GraduationCap className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Education Required</p>
                <p className="text-sm text-muted-foreground">{career.education}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Companies */}
        <div>
          <h4 className="font-medium mb-2">Top Hiring Companies</h4>
          <div className="flex flex-wrap gap-2">
            {career.topCompanies.map((company, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                <Building2 className="mr-1 h-3 w-3" />
                {company}
              </Badge>
            ))}
          </div>
        </div>

        {/* Career Pathways - Multiple Routes */}
        <div>
          <h4 className="font-medium mb-3">How to Reach This Career</h4>
          <div className="space-y-4">
            {career.careerPathways?.map((pathway, pathIndex) => (
              <div key={pathIndex} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-sm">{pathway.name}</h5>
                  <Badge variant="outline" className="text-xs">
                    {pathway.description}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                  {pathway.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center space-x-2 whitespace-nowrap">
                      <Badge variant="outline" className="text-xs bg-white">
                        {step}
                      </Badge>
                      {stepIndex < pathway.steps.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
                    </div>
                  ))}
                </div>
              </div>
            )) || (
              // Fallback for old format
              <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                {career.careerPath?.map((step, index) => (
                  <div key={index} className="flex items-center space-x-2 whitespace-nowrap">
                    <Badge variant="outline" className="text-xs">
                      {step}
                    </Badge>
                    {index < career.careerPath.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 pt-4 border-t">
          <Button className="flex-1" asChild>
            <a href="/trial-courses">
              Trail of the Course
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          {career.mentorVerified && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Connect with Mentor
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Schedule Mentorship Session</DialogTitle>
                  <DialogDescription>
                    Book a session with {career.mentorName} to discuss your {career.title} career path
                  </DialogDescription>
                </DialogHeader>
                <MeetingScheduler mentorName={career.mentorName || "Career Mentor"} careerField={career.title} />
              </DialogContent>
            </Dialog>
          )}
          <Button variant="outline">Save Career</Button>
        </div>
      </CardContent>
    </Card>
  )
}
