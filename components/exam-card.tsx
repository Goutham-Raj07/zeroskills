"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, BookOpen, GraduationCap, AlertCircle } from "lucide-react"
import { PreparationGuideModal } from "@/components/preparation-guide-modal"

interface Exam {
  id: string
  name: string
  type: string
  eligibility: string
  examDate: string
  applicationDeadline: string
  difficulty: string
  colleges: string[]
  subjects: string[]
  pattern: string
  duration: string
  prepUrl?: string
}

interface ExamCardProps {
  exam: Exam
}

export function ExamCard({ exam }: ExamCardProps) {
  const [isGuideOpen, setIsGuideOpen] = useState(false)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "very high":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-green-100 text-green-800"
    }
  }

  const openGoogleCalendar = () => {
    const title = encodeURIComponent(`Reminder: ${exam.name}`)
    const details = encodeURIComponent(
      exam.prepUrl ? `Preparation guide: ${exam.prepUrl}` : "Prepare for the exam"
    )
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <>
    <Card className="relative overflow-hidden">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-lg">{exam.name}</CardTitle>
              <Badge variant="outline">{exam.type}</Badge>
            </div>
            <CardDescription>{exam.eligibility}</CardDescription>
          </div>
          <Badge className={getDifficultyColor(exam.difficulty)}>{exam.difficulty} Difficulty</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Important Dates */}
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-blue-600" />
            <div>
              <p className="text-sm font-medium">Exam Date</p>
              <p className="text-sm text-foreground">{exam.examDate}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <div>
              <p className="text-sm font-medium">Application Deadline</p>
              <p className="text-sm text-foreground">{exam.applicationDeadline}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4 text-green-600" />
            <div>
              <p className="text-sm font-medium">Exam Pattern</p>
              <p className="text-sm text-muted-foreground">{exam.pattern}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-purple-600" />
            <div>
              <p className="text-sm font-medium">Duration</p>
              <p className="text-sm text-muted-foreground">{exam.duration}</p>
            </div>
          </div>
        </div>

        {/* Subjects */}
        <div>
          <h4 className="font-medium mb-2">Exam Subjects</h4>
          <div className="flex flex-wrap gap-2">
            {exam.subjects.map((subject, index) => (
              <Badge key={index} variant="outline">
                {subject}
              </Badge>
            ))}
          </div>
        </div>

        {/* Colleges */}
        <div>
          <h4 className="font-medium mb-2">Accepting Colleges</h4>
          <div className="flex flex-wrap gap-2">
            {exam.colleges.map((college, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                <GraduationCap className="mr-1 h-3 w-3" />
                {college}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 pt-4 border-t">
          <Button className="flex-1" onClick={() => setIsGuideOpen(true)}>
            Preparation Guide
          </Button>
          <Button variant="outline" onClick={openGoogleCalendar}>Set Reminder</Button>
        </div>
      </CardContent>
    </Card>
    
    <PreparationGuideModal
      examId={exam.id}
      examName={exam.name}
      isOpen={isGuideOpen}
      onClose={() => setIsGuideOpen(false)}
    />
    </>
  )
}
