"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GraduationCap, Users, BookOpen, Target, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignInPage() {
  const [userType, setUserType] = useState<"student" | "mentor" | "alumni">("student")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()

  const handleSignIn = async () => {
    setIsLoading(true)
    // Simple authentication simulation
    try {
      setErrorMessage("")
      const res = await fetch("http://localhost:8000/api/accounts/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password, role: userType }),
      })
      if (!res.ok) {
        let msg = "Login failed"
        try {
          const err = await res.json()
          msg = err?.detail || err?.non_field_errors?.[0] || msg
        } catch {}
        throw new Error(msg)
      }
      const data = await res.json()
      const role = data.user?.role || "student"
      // store tokens (demo: localStorage). In production consider httpOnly cookies via Next API route proxy.
      localStorage.setItem("accessToken", data.access)
      localStorage.setItem("refreshToken", data.refresh)
      document.cookie = `role=${role}; path=/; max-age=${60 * 60 * 24 * 7}`

      if (role === "student") router.push("/")
      else if (role === "mentor") router.push("/mentor-dashboard")
      else router.push("/alumni")
    } catch (error: any) {
      console.error("Sign in error:", error)
      setErrorMessage(error?.message || "Invalid credentials. Please try again.")
    } finally {
      setIsLoading(false)
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
        <div className="grid grid-cols-3 gap-4">
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

          <Card
            className={`cursor-pointer transition-all ${userType === "alumni" ? "ring-2 ring-amber-500 bg-amber-50" : "hover:bg-gray-50"}`}
            onClick={() => setUserType("alumni")}
          >
            <CardContent className="p-4 text-center">
              <GraduationCap className="h-8 w-8 mx-auto mb-2 text-amber-600" />
              <p className="font-medium">Alumni</p>
              <p className="text-xs text-gray-600">Share experiences & mentor students</p>
            </CardContent>
          </Card>
        </div>

        {/* Sign In Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {userType === "student" && <GraduationCap className="h-5 w-5 text-blue-600" />}
              {userType === "mentor" && <Users className="h-5 w-5 text-purple-600" />}
              {userType === "alumni" && <GraduationCap className="h-5 w-5 text-amber-600" />}
              <span>Sign In as {userType === "student" ? "Student" : userType === "mentor" ? "Mentor" : "Alumni"}</span>
            </CardTitle>
            <CardDescription>
              {userType === "student"
                ? "Access your personalized learning dashboard and career recommendations"
                : "Manage student appointments, generate reports, and provide guidance"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {errorMessage && (
              <Alert variant="destructive">
                <AlertTitle>Sign in failed</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </Label>
              </div>
              <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot password?
              </Link>
            </div>
            <Button 
              className="w-full" 
              onClick={handleSignIn} 
              disabled={!email || !password || isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </CardContent>
        </Card>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign up here
            </Link>
          </p>
        </div>

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