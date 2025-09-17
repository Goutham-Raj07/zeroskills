"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"

type Props = { onComplete?: (answers: Record<string, string>) => void }

const questions = [
  {
    id: "favorite_subjects",
    title: "Which academic subjects interest you the most?",
    options: [
      "Science (Physics/Chemistry/Biology)",
      "Mathematics",
      "Computer Science/Programming",
      "Social Studies/History",
      "Languages/Literature",
      "Commerce/Business Studies",
      "Arts/Design",
      "Sports/Physical Education",
    ],
  },
  {
    id: "skills",
    title: "Which academic activities do you excel at?",
    options: [
      "Problem-solving & calculations",
      "Scientific experiments & research",
      "Reading, writing & analysis",
      "Programming & technology",
      "Creative design & art",
      "Leadership & presentations",
      "Sports & physical activities",
      "Helping & mentoring others",
    ],
  },
  {
    id: "aspirations",
    title: "What academic field excites you for higher studies?",
    options: [
      "Engineering & Technology",
      "Medicine & Healthcare",
      "Computer Science & IT",
      "Business & Management",
      "Arts & Humanities",
      "Science & Research",
      "Sports & Physical Sciences",
      "Education & Teaching",
    ],
  },
  {
    id: "learning_style",
    title: "How do you prefer to study and learn?",
    options: [
      "Hands-on practical work",
      "Reading textbooks & theory",
      "Group study & discussions",
      "Using computers & technology",
      "Visual & creative projects",
      "Sports & physical learning",
      "One-on-one tutoring",
      "Online courses & videos",
    ],
  },
  {
    id: "values",
    title: "What matters most in your academic career choice?",
    options: [
      "High earning potential",
      "Job stability & security",
      "Helping society & others",
      "Creative freedom & expression",
      "Academic prestige & respect",
      "Work-life balance",
      "Sports & physical fitness",
      "Continuous learning & growth",
    ],
  },
]

export function ProfileQuestions({ onComplete }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const allAnswered = questions.every((q) => !!answers[q.id])

  return (
    <div className="space-y-6">
      {questions.map((q) => (
        <Card key={q.id}>
          <CardHeader>
            <CardTitle className="text-base">{q.title}</CardTitle>
            {q.id === "favorite_subjects" && (
              <CardDescription>Pick the one that resonates the most</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <RadioGroup value={answers[q.id] || ""} onValueChange={(v) => setAnswers({ ...answers, [q.id]: v })}>
              {q.options.map((opt) => (
                <div key={opt} className="flex items-center space-x-2 py-1">
                  <RadioGroupItem id={`${q.id}-${opt}`} value={opt} />
                  <Label htmlFor={`${q.id}-${opt}`}>{opt}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ))}

      <div className="pt-2">
        <Button disabled={!allAnswered} onClick={() => onComplete?.(answers)}>Continue</Button>
      </div>
    </div>
  )
}


