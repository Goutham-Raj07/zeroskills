"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  AlertCircle,
  XCircle,
  FileText,
  User,
  GraduationCap,
  TrendingUp,
  MessageSquare,
} from "lucide-react"

const mockValidationRequest = {
  id: "VR-001",
  student: {
    name: "Arjun Patel",
    age: 17,
    class: "12th Grade",
    location: "Mumbai, Maharashtra",
    profileImage: "/student-profile.png",
  },
  submissionDate: "2024-01-10",
  status: "pending",
  aiRecommendations: [
    {
      career: "Software Engineering",
      match: 95,
      reasoning: "Strong analytical skills, excellent programming aptitude, high interest in technology",
      colleges: ["IIT Bombay", "IIT Delhi", "BITS Pilani"],
      exams: ["JEE Advanced", "BITSAT"],
    },
    {
      career: "Data Science",
      match: 88,
      reasoning: "Good mathematical foundation, interest in statistics, problem-solving abilities",
      colleges: ["IISc Bangalore", "IIT Kharagpur", "ISI Kolkata"],
      exams: ["JEE Advanced", "ISI Admission Test"],
    },
  ],
  assessmentData: {
    aptitudeScore: 92,
    personalityType: "Analytical Thinker",
    interests: ["Technology", "Mathematics", "Problem Solving"],
    skills: ["Programming", "Logical Reasoning", "Data Analysis"],
    academicPerformance: "Excellent (95% in 11th grade)",
  },
}

export function ValidationReview() {
  const [selectedRecommendation, setSelectedRecommendation] = useState(0)
  const [validationStatus, setValidationStatus] = useState<"approved" | "modified" | "rejected" | null>(null)
  const [counselorNotes, setCounselorNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitValidation = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    // Handle success
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Validation Review</h3>
          <p className="text-muted-foreground">Review and validate AI-generated career recommendations</p>
        </div>
        <Badge variant="outline" className="bg-yellow-50 text-yellow-800">
          <AlertCircle className="mr-1 h-3 w-3" />
          Pending Review
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Student Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Student Profile</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold">{mockValidationRequest.student.name}</h4>
              <p className="text-sm text-muted-foreground">
                {mockValidationRequest.student.class} • {mockValidationRequest.student.location}
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Assessment Score</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Progress value={mockValidationRequest.assessmentData.aptitudeScore} className="flex-1" />
                  <span className="text-sm font-medium">{mockValidationRequest.assessmentData.aptitudeScore}%</span>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Personality Type</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {mockValidationRequest.assessmentData.personalityType}
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium">Academic Performance</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {mockValidationRequest.assessmentData.academicPerformance}
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium">Key Interests</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {mockValidationRequest.assessmentData.interests.map((interest, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Skills</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {mockValidationRequest.assessmentData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>AI Recommendations</span>
            </CardTitle>
            <CardDescription>Review each recommendation and provide your professional validation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {mockValidationRequest.aiRecommendations.map((recommendation, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all ${
                  selectedRecommendation === index ? "border-primary bg-primary/5" : "hover:border-primary/50"
                }`}
                onClick={() => setSelectedRecommendation(index)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{recommendation.career}</CardTitle>
                      <CardDescription>{recommendation.reasoning}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {recommendation.match}% Match
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label className="text-sm font-medium flex items-center space-x-1">
                        <GraduationCap className="h-4 w-4" />
                        <span>Recommended Colleges</span>
                      </Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {recommendation.colleges.map((college, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {college}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium flex items-center space-x-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>Entrance Exams</span>
                      </Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {recommendation.exams.map((exam, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {exam}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {selectedRecommendation === index && (
                    <div className="border-t pt-4 space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Counselor Validation</Label>
                        <RadioGroup
                          value={validationStatus || ""}
                          onValueChange={(value) => setValidationStatus(value as any)}
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="approved" id="approved" />
                            <Label htmlFor="approved" className="flex items-center space-x-2 cursor-pointer">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span>Approve Recommendation</span>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="modified" id="modified" />
                            <Label htmlFor="modified" className="flex items-center space-x-2 cursor-pointer">
                              <AlertCircle className="h-4 w-4 text-yellow-600" />
                              <span>Approve with Modifications</span>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="rejected" id="rejected" />
                            <Label htmlFor="rejected" className="flex items-center space-x-2 cursor-pointer">
                              <XCircle className="h-4 w-4 text-red-600" />
                              <span>Reject Recommendation</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div>
                        <Label htmlFor="counselor-notes" className="text-sm font-medium">
                          Professional Notes & Recommendations
                        </Label>
                        <Textarea
                          id="counselor-notes"
                          placeholder="Provide your professional insights, modifications, or additional recommendations..."
                          value={counselorNotes}
                          onChange={(e) => setCounselorNotes(e.target.value)}
                          rows={4}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {/* Submit Validation */}
            <div className="flex items-center justify-between pt-6 border-t">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                <span>Review ID: {mockValidationRequest.id}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline">Save Draft</Button>
                <Button onClick={handleSubmitValidation} disabled={!validationStatus || isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Validation"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
