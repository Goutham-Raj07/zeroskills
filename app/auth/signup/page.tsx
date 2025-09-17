"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GraduationCap, Users, Mail, Lock, User as UserIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const [role, setRole] = useState<"student" | "mentor" | "alumni">("student")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const isValid = () => {
    if (!name || !email || !password || !confirmPassword) return false
    if (password !== confirmPassword) return false
    return true
  }

  const handleSignUp = async () => {
    setIsLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 1000))
      const res = await fetch("http://localhost:8000/api/accounts/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          email,
          first_name: name,
          last_name: "",
          password,
          role,
        }),
      })
      if (!res.ok) throw new Error("Signup failed")
      // auto login after signup
      const loginRes = await fetch("http://localhost:8000/api/accounts/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      })
      if (!loginRes.ok) throw new Error("Auto login failed")
      const data = await loginRes.json()
      const backendRole = data.user?.role || role
      localStorage.setItem("accessToken", data.access)
      localStorage.setItem("refreshToken", data.refresh)
      document.cookie = `role=${backendRole}; path=/; max-age=${60 * 60 * 24 * 7}`
      if (backendRole === "student") router.push("/assessment")
      else if (backendRole === "mentor") router.push("/mentor-dashboard")
      else router.push("/alumni")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Create your account</h1>
          <p className="text-gray-600">Join as a student, mentor, or alumni</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card
            className={`cursor-pointer transition-all ${role === "student" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"}`}
            onClick={() => setRole("student")}
          >
            <CardContent className="p-4 text-center">
              <GraduationCap className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="font-medium">Student</p>
            </CardContent>
          </Card>
          <Card
            className={`cursor-pointer transition-all ${role === "mentor" ? "ring-2 ring-purple-500 bg-purple-50" : "hover:bg-gray-50"}`}
            onClick={() => setRole("mentor")}
          >
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="font-medium">Mentor</p>
            </CardContent>
          </Card>
          <Card
            className={`cursor-pointer transition-all ${role === "alumni" ? "ring-2 ring-amber-500 bg-amber-50" : "hover:bg-gray-50"}`}
            onClick={() => setRole("alumni")}
          >
            <CardContent className="p-4 text-center">
              <GraduationCap className="h-8 w-8 mx-auto mb-2 text-amber-600" />
              <p className="font-medium">Alumni</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign up as {role.charAt(0).toUpperCase() + role.slice(1)}</CardTitle>
            <CardDescription>Start your journey with CareerPath AI</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <div className="relative">
                <Input id="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                <UserIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm password</Label>
              <div className="relative">
                <Input id="confirm" type="password" placeholder="Re-enter password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              {password && confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-600">Passwords do not match</p>
              )}
            </div>
            <Button className="w-full" onClick={handleSignUp} disabled={!isValid() || isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}


