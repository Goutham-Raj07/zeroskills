"use client"

import { useState } from "react"
import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

type Props = {
  answers: Record<string, string>
  onComplete?: () => void
}

export function AIQuiz({ answers, onComplete }: Props) {
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState<{ question: string; options: string[] }[]>([])
  const [answersMap, setAnswersMap] = useState<Record<number, string>>({})
  const [error, setError] = useState("")
  const router = useRouter()

  const generate = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/ai-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...answers, numQuestions: 12 }),
      })
      if (!res.ok) throw new Error("Failed to generate quiz")
      const data = await res.json()
      const list: { question: string; options: string[] }[] = Array.isArray(data.questions) ? data.questions : []
      setQuestions(list.slice(0, 15))
    } catch (e: any) {
      setError(e?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  // Auto-generate on mount
  React.useEffect(() => {
    generate()
  }, [])

  const handleSubmit = async () => {
    try {
      setError("")
      // Build ordered answers array (first 10 if more)
      const ordered = Array.from({ length: Math.min(questions.length, 10) }, (_, i) => answersMap[i] || "")
      const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null
      
      if (!token) {
        throw new Error("Please sign in again")
      }
      
      console.log("Token found:", token ? "Yes" : "No")
      
      console.log("Sending request with token:", token.substring(0, 20) + "...")
      
      // Test token validity first
      const testRes = await fetch("http://localhost:8000/api/accounts/me/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!testRes.ok) {
        throw new Error("Token expired or invalid. Please sign in again.")
      }
      
      const res = await fetch("http://localhost:8000/api/recommender/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ answers: ordered }),
      })
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || `Server error: ${res.status}`)
      }
      
      const data = await res.json()
      console.log("Recommendations received:", data)
      
      // Store recommendations for recommendations page
      if (typeof window !== "undefined") {
        localStorage.setItem("recommendations", JSON.stringify(data.recommendations || []))
      }
      onComplete?.()
      router.push("/recommendations")
    } catch (e) {
      console.error("Submit error:", e)
      setError((e as any)?.message || "Could not submit answers")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personalized Quiz</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!questions.length ? (
          <div className="space-y-2">
            <p className="text-center text-muted-foreground">{loading ? "Generating personalized questions..." : "Loading..."}</p>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((q, i) => (
              <div key={i} className="p-3 border rounded-lg">
                <p className="font-medium mb-2">{i + 1}. {q.question}</p>
                <RadioGroup value={answersMap[i] || ""} onValueChange={(v) => setAnswersMap({ ...answersMap, [i]: v })}>
                  {q.options?.slice(0, 4).map((opt, idx) => (
                    <div key={idx} className="flex items-center space-x-2 py-1">
                      <RadioGroupItem id={`q${i}-o${idx}`} value={opt} />
                      <Label htmlFor={`q${i}-o${idx}`}>{opt}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
            <div className="pt-2">
              <Button onClick={handleSubmit} disabled={Object.keys(answersMap).length < Math.min(questions.length, 10)}>Submit</Button>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}


