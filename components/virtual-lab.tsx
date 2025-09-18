"use client"

import { useState, useEffect } from "react"
import { virtualLabApi } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Play,
  Pause,
  RotateCcw,
  Download,
  Share2,
  CheckCircle,
  Clock,
  Target,
  Beaker,
  Code2,
  Monitor,
} from "lucide-react"

interface VirtualLabProps {
  labId: string
  title: string
  description: string
  type: "coding" | "simulation" | "experiment"
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
}

export function VirtualLab({ labId, title, description, type, duration, difficulty }: VirtualLabProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [errors, setErrors] = useState("")
  const [testResults, setTestResults] = useState<any[]>([])
  const [score, setScore] = useState(0)
  const [hints, setHints] = useState<string[]>([])
  const [isExecuting, setIsExecuting] = useState(false)

  const getLabIcon = () => {
    switch (type) {
      case "coding":
        return <Code2 className="h-6 w-6" />
      case "simulation":
        return <Monitor className="h-6 w-6" />
      case "experiment":
        return <Beaker className="h-6 w-6" />
      default:
        return <Target className="h-6 w-6" />
    }
  }

  const getTypeColor = () => {
    switch (type) {
      case "coding":
        return "bg-blue-500"
      case "simulation":
        return "bg-purple-500"
      case "experiment":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleStart = async () => {
    setIsRunning(true)
    try {
      // Start lab session
      await virtualLabApi.startLabSession(labId)
      
      // Simulate lab progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsRunning(false)
            setIsCompleted(true)
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 1000)
    } catch (error) {
      console.error('Failed to start lab session:', error)
      setIsRunning(false)
    }
  }

  const handleExecuteCode = async () => {
    if (!code.trim()) return
    
    setIsExecuting(true)
    try {
      const result = await virtualLabApi.executeCode(code, 1) // Using exercise ID 1 for demo
      
      setOutput(result.output)
      setErrors(result.errors)
      setTestResults(result.test_results)
      setScore(result.score)
      setHints(result.hints)
      
      if (result.success && result.score >= 80) {
        setProgress(100)
        setIsCompleted(true)
        setIsRunning(false)
      }
    } catch (error) {
      console.error('Code execution failed:', error)
      setErrors('Failed to execute code. Please try again.')
    } finally {
      setIsExecuting(false)
    }
  }

  const handleReset = () => {
    setIsRunning(false)
    setProgress(0)
    setIsCompleted(false)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${getTypeColor()} text-white`}>{getLabIcon()}</div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getDifficultyColor(difficulty)}>{difficulty}</Badge>
            {isCompleted && (
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Target className="h-4 w-4" />
            <span className="capitalize">{type} Lab</span>
          </div>
        </div>

        {/* Lab Interface Simulation */}
        <div className="bg-gray-900 rounded-lg p-4 min-h-[200px] relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-green-400 text-xs font-mono">Lab Environment v2.1.0</div>
          </div>

          {type === "coding" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-green-400 text-xs font-mono">Python Environment</div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-400">Ready</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-gray-400 text-sm"># Write your Python code here</div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="# Example: print('Hello, World!')"
                  className="w-full h-32 bg-gray-800 text-white p-3 rounded font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={handleExecuteCode}
                    disabled={!code.trim() || isExecuting}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isExecuting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Executing...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Run Code
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={() => setCode("")}
                    variant="outline"
                    size="sm"
                  >
                    Clear
                  </Button>
                </div>
              </div>

              {(output || errors) && (
                <div className="space-y-2">
                  <div className="text-gray-400 text-sm">Output:</div>
                  <div className="bg-gray-800 p-3 rounded font-mono text-sm">
                    {output && (
                      <div className="text-green-400 whitespace-pre-wrap">{output}</div>
                    )}
                    {errors && (
                      <div className="text-red-400 whitespace-pre-wrap">{errors}</div>
                    )}
                  </div>
                </div>
              )}

              {testResults.length > 0 && (
                <div className="space-y-2">
                  <div className="text-gray-400 text-sm">Test Results:</div>
                  <div className="space-y-1">
                    {testResults.map((test, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <div className={`w-2 h-2 rounded-full ${test.passed ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="text-gray-300">Test {test.test_case}: {test.passed ? 'PASSED' : 'FAILED'}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-400">Score: </span>
                    <span className={`font-bold ${score >= 80 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {score.toFixed(1)}%
                    </span>
                  </div>
                </div>
              )}

              {hints.length > 0 && (
                <div className="space-y-2">
                  <div className="text-gray-400 text-sm">Hints:</div>
                  <div className="bg-yellow-900/20 border border-yellow-500/30 p-3 rounded">
                    <ul className="space-y-1 text-sm text-yellow-200">
                      {hints.map((hint, index) => (
                        <li key={index}>• {hint}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {isRunning && (
                <div className="text-green-400 animate-pulse text-sm">
                  &gt; Running tests... {progress}% complete
                </div>
              )}
            </div>
          )}

          {type === "simulation" && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto animate-pulse"></div>
                <div className="text-white text-sm">Physics Simulation</div>
                {isRunning && (
                  <div className="text-green-400 text-xs">Calculating particle interactions... {progress}%</div>
                )}
              </div>
            </div>
          )}

          {type === "experiment" && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <Beaker className="h-16 w-16 text-green-400 mx-auto" />
                <div className="text-white text-sm">Virtual Chemistry Lab</div>
                {isRunning && <div className="text-green-400 text-xs">Reaction in progress... {progress}%</div>}
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {(isRunning || progress > 0) && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Lab Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-2">
            {!isRunning && !isCompleted && (
              <Button onClick={handleStart} size="sm">
                <Play className="h-4 w-4 mr-2" />
                Start Lab
              </Button>
            )}
            {isRunning && (
              <Button onClick={() => setIsRunning(false)} size="sm" variant="outline">
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
            )}
            <Button onClick={handleReset} size="sm" variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            {isCompleted && (
              <>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Results
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
