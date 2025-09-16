"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, Brain, CheckCircle } from "lucide-react"

interface AptitudeTestProps {
  onComplete: () => void
}

const aptitudeQuestions = [
  {
    id: 1,
    category: "Logical Reasoning",
    question: "If all roses are flowers and some flowers are red, which statement is definitely true?",
    options: ["All roses are red", "Some roses might be red", "No roses are red", "All red things are roses"],
    correct: 1,
  },
  {
    id: 2,
    category: "Mathematical Ability",
    question: "What is the next number in the sequence: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "46"],
    correct: 1,
  },
  {
    id: 3,
    category: "Verbal Reasoning",
    question: "Choose the word that best completes the analogy: Book : Author :: Painting : ?",
    options: ["Canvas", "Artist", "Gallery", "Color"],
    correct: 1,
  },
  {
    id: 4,
    category: "Spatial Reasoning",
    question: "How many cubes are there in a 3×3×3 cube structure?",
    options: ["9", "18", "27", "36"],
    correct: 2,
  },
  {
    id: 5,
    category: "Pattern Recognition",
    question: "What comes next in the pattern: A1, C3, E5, G7, ?",
    options: ["H8", "I9", "J10", "K11"],
    correct: 1,
  },
]

export function AptitudeTest({ onComplete }: AptitudeTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes
  const [isCompleted, setIsCompleted] = useState(false)

  const progress = ((currentQuestion + 1) / aptitudeQuestions.length) * 100

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers({ ...answers, [questionId]: answerIndex })
  }

  const handleNext = () => {
    if (currentQuestion < aptitudeQuestions.length - 1) {
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
    // Calculate score
    const correctAnswers = aptitudeQuestions.filter((q) => answers[q.id] === q.correct).length
    const score = (correctAnswers / aptitudeQuestions.length) * 100

    setTimeout(() => {
      onComplete()
    }, 2000)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  if (isCompleted) {
    return (
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h3 className="text-xl font-semibold">Aptitude Test Completed!</h3>
        <p className="text-muted-foreground">
          Your responses have been recorded. We'll analyze your logical reasoning, mathematical, and verbal abilities.
        </p>
      </div>
    )
  }

  const question = aptitudeQuestions[currentQuestion]

  return (
    <div className="space-y-6">
      {/* Test Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Badge variant="outline">{question.category}</Badge>
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {aptitudeQuestions.length}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Progress */}
      <Progress value={progress} className="h-2" />

      {/* Question */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
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
              <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
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
            {Object.keys(answers).length} of {aptitudeQuestions.length} answered
          </span>
        </div>

        <Button onClick={handleNext} disabled={answers[question.id] === undefined}>
          {currentQuestion === aptitudeQuestions.length - 1 ? "Submit Test" : "Next Question"}
        </Button>
      </div>
    </div>
  )
}
