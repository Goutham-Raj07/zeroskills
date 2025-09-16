"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Clock, MessageCircle, Calendar } from "lucide-react"

interface Alumni {
  id: string
  name: string
  currentRole: string
  company: string
  experience: string
  education: string
  specialization: string
  location: string
  rating: number
  totalSessions: number
  responseTime: string
  languages: string[]
  expertise: string[]
  bio: string
  availability: string
  hourlyRate: string
  profileImage: string
}

interface AlumniCardProps {
  alumni: Alumni
  onConnect: () => void
}

export function AlumniCard({ alumni, onConnect }: AlumniCardProps) {
  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={alumni.profileImage || "/placeholder.svg"} alt={alumni.name} />
            <AvatarFallback>
              {alumni.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div>
              <CardTitle className="text-lg">{alumni.name}</CardTitle>
              <CardDescription className="font-medium text-foreground">
                {alumni.currentRole} at {alumni.company}
              </CardDescription>
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="font-medium">{alumni.rating}</span>
                <span>({alumni.totalSessions} sessions)</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{alumni.responseTime}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Education & Experience */}
        <div className="space-y-2">
          <div className="text-sm">
            <span className="font-medium">Education: </span>
            <span className="text-muted-foreground">{alumni.education}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium">Experience: </span>
            <span className="text-muted-foreground">{alumni.experience}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{alumni.location}</span>
          </div>
        </div>

        {/* Specialization */}
        <div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {alumni.specialization}
          </Badge>
        </div>

        {/* Expertise */}
        <div>
          <p className="text-sm font-medium mb-2">Expertise</p>
          <div className="flex flex-wrap gap-1">
            {alumni.expertise.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground line-clamp-2">{alumni.bio}</p>

        {/* Availability & Rate */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div>
              <span className="font-medium">Available: </span>
              <span className="text-muted-foreground">{alumni.availability}</span>
            </div>
            <div>
              <span className="font-medium">Rate: </span>
              <span className="text-muted-foreground">{alumni.hourlyRate}</span>
            </div>
          </div>
        </div>

        {/* Languages */}
        <div>
          <p className="text-sm font-medium mb-1">Languages</p>
          <div className="flex flex-wrap gap-1">
            {alumni.languages.map((lang, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {lang}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 pt-4 border-t">
          <Button onClick={onConnect} className="flex-1">
            <MessageCircle className="mr-2 h-4 w-4" />
            Connect
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
