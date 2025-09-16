"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GraduationCap, Users, BookOpen, Target } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const [userType, setUserType] = useState<"student" | "mentor">("student")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = () => {
    // Simple authentication simulation
    if (userType === "student") {
      router.push("/")
    } else {
      router.push("/mentor-dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600">Sign in to continue your career journey</p>
        </div>

        {/* User Type Selection */}
        <div className="grid grid-cols-2 gap-4">
          <Card
            className={`cursor-pointer transition-all ${userType === "student" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"}`}
            onClick={() => setUserType("student")}
          >
            <CardContent className="p-4 text-center">
              <GraduationCap className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="font-medium">Student</p>
              <p className="text-xs text-gray-600">Access assessments & reports</p>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer transition-all ${userType === "mentor" ? "ring-2 ring-purple-500 bg-purple-50" : "hover:bg-gray-50"}`}
            onClick={() => setUserType("mentor")}
          >
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="font-medium">Mentor</p>
              <p className="text-xs text-gray-600">Manage appointments & reports</p>
            </CardContent>
          </Card>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {userType === "student" ? (
                <GraduationCap className="h-5 w-5 text-blue-600" />
              ) : (
                <Users className="h-5 w-5 text-purple-600" />
              )}
              <span>Sign In as {userType === "student" ? "Student" : "Mentor"}</span>
            </CardTitle>
            <CardDescription>
              {userType === "student"
                ? "Access your personalized learning dashboard and career recommendations"
                : "Manage student appointments, generate reports, and provide guidance"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full" onClick={handleLogin} disabled={!email || !password}>
              Sign In
            </Button>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">{userType === "student" ? "Student Features" : "Mentor Features"}</h3>
            <div className="space-y-2">
              {userType === "student" ? (
                <>
                  <div className="flex items-center space-x-2 text-sm">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                    <span>Take career assessments</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Target className="h-4 w-4 text-green-600" />
                    <span>Get personalized recommendations</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <GraduationCap className="h-4 w-4 text-purple-600" />
                    <span>Access trial courses</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span>Manage student appointments</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                    <span>Generate AI reports</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Target className="h-4 w-4 text-green-600" />
                    <span>Track student progress</span>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
