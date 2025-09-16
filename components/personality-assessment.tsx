"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Heart, CheckCircle } from "lucide-react"

interface PersonalityAssessmentProps {
  onComplete: () => void
}

const personalityQuestions = [
  {
    id: 1,
    category: "Work Style",
    question: "I prefer to work:",
    options: [
      "Alone, focusing deeply on tasks",
      "In small, close-knit teams",
      "In large, dynamic groups",
      "Alternating between solo and team work",
    ],
  },
  {
    id: 2,
    category: "Problem Solving",
    question: "When facing a complex problem, I:",
    options: [
      "Break it down into smaller, manageable parts",
      "Look for creative, unconventional solutions",
      "Seek advice from experts or colleagues",
      "Research extensively before taking action",
    ],
  },
  {
    id: 3,
    category: "Communication",
    question: "I communicate best through:",
    options: [
      "Written reports and documentation",
      "Visual presentations and diagrams",
      "Face-to-face conversations",
      "Hands-on demonstrations",
    ],
  },
  {
    id: 4,
    category: "Learning Style",
    question: "I learn most effectively by:",
    options: [
      "Reading and studying theoretical concepts",
      "Practicing and experimenting hands-on",
      "Discussing ideas with others",
      "Observing and analyzing examples",
    ],
  },
  {
    id: 5,
    category: "Career Values",
    question: "What motivates me most in a career is:",
    options: [
      "Financial stability and security",
      "Creative expression and innovation",
      "Helping others and making a difference",
      "Recognition and professional achievement",
    ],
  },
  {
    id: 6,
    category: "Work Environment",
    question: "My ideal work environment is:",
    options: [
      "Quiet and organized office space",
      "Dynamic, fast-paced environment",
      "Outdoor or field-based work",
      "Flexible, remote-friendly setup",
    ],
  },
]

export function PersonalityAssessment({ onComplete }: PersonalityAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isCompleted, setIsCompleted] = useState(false)

  const progress = ((currentQuestion + 1) / personalityQuestions.length) * 100

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers({ ...answers, [questionId]: answerIndex })
  }

  const handleNext = () => {
    if (currentQuestion < personalityQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    setIsCompleted(true)
    setTimeout(() => {
      onComplete()
    }, 2000)
  }

  if (isCompleted) {
    return (
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h3 className="text-xl font-semibold">Personality Assessment Completed!</h3>
        <p className="text-muted-foreground">
          We've captured your work preferences and personality traits to match you with suitable career paths.
        </p>
      </div>
    )
  }

  const question = personalityQuestions[currentQuestion]

  return (
    <div className="space-y-6">
      {/* Assessment Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Badge variant="outline">{question.category}</Badge>
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {personalityQuestions.length}
          </span>
        </div>
      </div>

      {/* Progress */}
      <Progress value={progress} className="h-2" />

      {/* Question */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5" />
            <span>Question {currentQuestion + 1}</span>
          </CardTitle>
          <CardDescription className="text-base font-medium text-foreground">{question.question}</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[question.id]?.toString()}
            onValueChange={(value) => handleAnswerSelect(question.id, Number.parseInt(value))}
          >
            {question.options.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-sm">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
          Previous
        </Button>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {Object.keys(answers).length} of {personalityQuestions.length} answered
          </span>
        </div>

        <Button onClick={handleNext} disabled={answers[question.id] === undefined}>
          {currentQuestion === personalityQuestions.length - 1 ? "Complete Assessment" : "Next Question"}
        </Button>
      </div>
    </div>
  )
}
