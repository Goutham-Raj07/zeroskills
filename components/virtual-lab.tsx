"use client"

import { useState } from "react"
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

  const handleStart = () => {
    setIsRunning(true)
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
            <div className="space-y-2 font-mono text-sm">
              <div className="text-gray-400"># Python Programming Lab</div>
              <div className="text-blue-400">def calculate_fibonacci(n):</div>
              <div className="text-white ml-4">if n &lt;= 1:</div>
              <div className="text-white ml-8">return n</div>
              <div className="text-white ml-4">return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)</div>
              <div className="text-gray-400"># Test your implementation</div>
              {isRunning && (
                <div className="text-green-400 animate-pulse">&gt; Running tests... {progress}% complete</div>
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
