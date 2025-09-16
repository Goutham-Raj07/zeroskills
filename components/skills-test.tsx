"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Code, Palette, Calculator, Microscope, CheckCircle, ExternalLink } from "lucide-react"

interface SkillsTestProps {
  onComplete: () => void
}

const skillCategories = [
  {
    id: "technical",
    title: "Technical Skills",
    icon: Code,
    description: "Programming, software development, and technical problem-solving",
    tests: [
      { name: "Basic Programming Logic", type: "coding", duration: "15 min" },
      { name: "Algorithm Thinking", type: "problem-solving", duration: "10 min" },
      { name: "System Design Basics", type: "conceptual", duration: "10 min" },
    ],
  },
  {
    id: "creative",
    title: "Creative Skills",
    icon: Palette,
    description: "Design thinking, artistic abilities, and creative problem-solving",
    tests: [
      { name: "Design Principles", type: "visual", duration: "15 min" },
      { name: "Creative Writing", type: "writing", duration: "20 min" },
      { name: "Innovation Thinking", type: "conceptual", duration: "10 min" },
    ],
  },
  {
    id: "analytical",
    title: "Analytical Skills",
    icon: Calculator,
    description: "Data analysis, mathematical reasoning, and logical thinking",
    tests: [
      { name: "Data Interpretation", type: "analysis", duration: "15 min" },
      { name: "Statistical Reasoning", type: "math", duration: "10 min" },
      { name: "Research Methodology", type: "conceptual", duration: "10 min" },
    ],
  },
  {
    id: "scientific",
    title: "Scientific Skills",
    icon: Microscope,
    description: "Scientific method, research abilities, and experimental thinking",
    tests: [
      { name: "Scientific Method", type: "conceptual", duration: "10 min" },
      { name: "Hypothesis Testing", type: "analysis", duration: "15 min" },
      { name: "Lab Safety & Procedures", type: "practical", duration: "10 min" },
    ],
  },
]

export function SkillsTest({ onComplete }: SkillsTestProps) {
  const [selectedCategory, setSelectedCategory] = useState("technical")
  const [completedTests, setCompletedTests] = useState<string[]>([])
  const [currentTest, setCurrentTest] = useState<string | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)

  const handleTestComplete = (testName: string) => {
    if (!completedTests.includes(testName)) {
      setCompletedTests([...completedTests, testName])
    }
    setCurrentTest(null)

    // Check if all tests in at least one category are completed
    const categoryTests = skillCategories.find((cat) => cat.id === selectedCategory)?.tests || []
    const categoryCompleted = categoryTests.every(
      (test) => completedTests.includes(test.name) || test.name === testName,
    )

    if (categoryCompleted) {
      setIsCompleted(true)
      setTimeout(() => {
        onComplete()
      }, 2000)
    }
  }

  const handleExternalTest = (platform: string) => {
    // Simulate external test integration
    window.open(`https://${platform}.com`, "_blank")
    setTimeout(() => {
      handleTestComplete(`${platform} Assessment`)
    }, 3000)
  }

  if (isCompleted) {
    return (
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h3 className="text-xl font-semibold">Skills Assessment Completed!</h3>
        <p className="text-muted-foreground">
          Your technical and practical skills have been evaluated. This will help us recommend suitable career paths.
        </p>
      </div>
    )
  }

  if (currentTest) {
    return <TestInterface testName={currentTest} onComplete={() => handleTestComplete(currentTest)} />
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Skills Evaluation</h3>
        <p className="text-muted-foreground">
          Choose a skill category to assess your abilities. Complete at least one category to proceed.
        </p>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-4">
          {skillCategories.map((category) => {
            const Icon = category.icon
            return (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-1">
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{category.title.split(" ")[0]}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {skillCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <category.icon className="h-5 w-5" />
                  <span>{category.title}</span>
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {category.tests.map((test, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{test.name}</span>
                          {completedTests.includes(test.name) && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Completed
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Duration: {test.duration}</span>
                          <Badge variant="outline">{test.type}</Badge>
                        </div>
                      </div>
                      <Button
                        onClick={() => setCurrentTest(test.name)}
                        disabled={completedTests.includes(test.name)}
                        variant={completedTests.includes(test.name) ? "outline" : "default"}
                      >
                        {completedTests.includes(test.name) ? "Completed" : "Start Test"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* External Integrations */}
            <Card>
              <CardHeader>
                <CardTitle>External Skill Assessments</CardTitle>
                <CardDescription>Connect your existing skill test results from popular platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  <Button variant="outline" onClick={() => handleExternalTest("leetcode")} className="justify-start">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Import LeetCode Results
                  </Button>
                  <Button variant="outline" onClick={() => handleExternalTest("hackerrank")} className="justify-start">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Import HackerRank Results
                  </Button>
                  <Button variant="outline" onClick={() => handleExternalTest("codechef")} className="justify-start">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Import CodeChef Results
                  </Button>
                  <Button variant="outline" onClick={() => handleExternalTest("github")} className="justify-start">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Analyze GitHub Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function TestInterface({ testName, onComplete }: { testName: string; onComplete: () => void }) {
  const [answer, setAnswer] = useState("")

  const handleSubmit = () => {
    // Simulate test submission
    setTimeout(() => {
      onComplete()
    }, 1000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{testName}</CardTitle>
        <CardDescription>Complete this assessment to evaluate your skills in this area</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="test-answer">Your Solution/Answer:</Label>
          <Textarea
            id="test-answer"
            placeholder="Enter your answer or solution here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={6}
          />
        </div>
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={onComplete}>
            Skip Test
          </Button>
          <Button onClick={handleSubmit} disabled={!answer.trim()}>
            Submit Answer
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
