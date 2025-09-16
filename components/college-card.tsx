import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { MapPin, Trophy, IndianRupee, TrendingUp, GraduationCap, Star, Users } from "lucide-react"
import { MeetingScheduler } from "@/components/meeting-scheduler"

interface College {
  id: string
  name: string
  location: string
  ranking: number
  type: string
  courses: string[]
  fees: string
  placements: string
  cutoff: string
  facilities: string[]
}

interface CollegeCardProps {
  college: College
}

export function CollegeCard({ college }: CollegeCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-lg">{college.name}</CardTitle>
              <Badge variant={college.type === "Government" ? "default" : "secondary"}>{college.type}</Badge>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{college.location}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 mb-1">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="font-bold text-primary">#{college.ranking}</span>
            </div>
            <p className="text-xs text-muted-foreground">NIRF Ranking</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Courses */}
        <div>
          <h4 className="font-medium mb-2">Available Courses</h4>
          <div className="flex flex-wrap gap-2">
            {college.courses.map((course, index) => (
              <Badge key={index} variant="outline">
                {course}
              </Badge>
            ))}
          </div>
        </div>

        {/* Key Information Grid */}
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex items-center space-x-2">
            <IndianRupee className="h-4 w-4 text-green-600" />
            <div>
              <p className="text-sm font-medium">Annual Fees</p>
              <p className="text-sm text-muted-foreground">{college.fees}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <div>
              <p className="text-sm font-medium">Placements</p>
              <p className="text-sm text-muted-foreground">{college.placements}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 md:col-span-2">
            <GraduationCap className="h-4 w-4 text-purple-600" />
            <div>
              <p className="text-sm font-medium">Admission Cutoff</p>
              <p className="text-sm text-muted-foreground">{college.cutoff}</p>
            </div>
          </div>
        </div>

        {/* Facilities */}
        <div>
          <h4 className="font-medium mb-2">Key Facilities</h4>
          <div className="flex flex-wrap gap-2">
            {college.facilities.map((facility, index) => (
              <Badge key={index} variant="secondary" className="bg-green-50 text-green-700">
                <Star className="mr-1 h-3 w-3" />
                {facility}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 pt-4 border-t">
          <Button className="flex-1">View Details</Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Connect with Alumni
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Connect with {college.name} Alumni</DialogTitle>
                <DialogDescription>
                  Schedule a session with alumni from {college.name} to learn about campus life, courses, and career
                  opportunities
                </DialogDescription>
              </DialogHeader>
              <MeetingScheduler mentorName={`${college.name} Alumni`} careerField="College Experience" />
            </DialogContent>
          </Dialog>
          <Button variant="outline">Compare</Button>
        </div>
      </CardContent>
    </Card>
  )
}
