"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, UserCheck, FileText, Calendar } from "lucide-react"
import Link from "next/link"
import { CounselorDashboard } from "@/components/counselor-dashboard"
import { ValidationReview } from "@/components/validation-review"
import { ReportGenerator } from "@/components/report-generator"
import { AppointmentScheduler } from "@/components/appointment-scheduler"

export default function CounselorPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/alumni" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Alumni</span>
            </Link>
            <div className="h-4 w-px bg-border" />
            <h1 className="text-lg font-semibold">Counselor Validation</h1>
          </div>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            <UserCheck className="mr-1 h-3 w-3" />
            Expert Review
          </Badge>
        </div>
      </header>

      <div className="container py-8">
        <div className="mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl font-bold text-balance">Professional Counselor Validation</h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Get your AI-generated recommendations reviewed and validated by certified career counselors with years of
              experience in student guidance.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dashboard" className="flex items-center space-x-2">
                <UserCheck className="h-4 w-4" />
                <span>Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="review" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Review Process</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Reports</span>
              </TabsTrigger>
              <TabsTrigger value="appointments" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Appointments</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <CounselorDashboard />
            </TabsContent>

            <TabsContent value="review" className="space-y-6">
              <ValidationReview />
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <ReportGenerator />
            </TabsContent>

            <TabsContent value="appointments" className="space-y-6">
              <AppointmentScheduler />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
