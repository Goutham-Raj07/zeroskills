"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Download,
  Share2,
  FileText,
  BarChart3,
  PieChart,
  TrendingUp,
  User,
  GraduationCap,
  Target,
  Award,
  Calendar,
  CheckCircle,
} from "lucide-react"

export function FinalReportGenerator() {
  const reportSections = [
    {
      title: "Student Profile",
      description: "Personal information and academic background",
      icon: <User className="h-5 w-5" />,
      status: "complete",
      pages: 2,
    },
    {
      title: "Assessment Results",
      description: "Comprehensive test scores and analysis",
      icon: <BarChart3 className="h-5 w-5" />,
      status: "complete",
      pages: 8,
    },
    {
      title: "Career Recommendations",
      description: "AI-generated career matches and pathways",
      icon: <Target className="h-5 w-5" />,
      status: "complete",
      pages: 6,
    },
    {
      title: "College & Exam Guide",
      description: "Recommended institutions and entrance exams",
      icon: <GraduationCap className="h-5 w-5" />,
      status: "complete",
      pages: 4,
    },
    {
      title: "Skills Development Plan",
      description: "Personalized learning and growth roadmap",
      icon: <TrendingUp className="h-5 w-5" />,
      status: "complete",
      pages: 3,
    },
    {
      title: "Counselor Validation",
      description: "Expert review and professional recommendations",
      icon: <Award className="h-5 w-5" />,
      status: "complete",
      pages: 2,
    },
  ]

  const totalPages = reportSections.reduce((sum, section) => sum + section.pages, 0)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-6 w-6" />
            <span>Comprehensive Career Guidance Report</span>
          </CardTitle>
          <CardDescription>Complete analysis and recommendations for Arjun Patel's career journey</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Report Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{totalPages}</div>
              <div className="text-sm text-gray-600">Total Pages</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">6</div>
              <div className="text-sm text-gray-600">Sections</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">3</div>
              <div className="text-sm text-gray-600">Career Options</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">100%</div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>

          {/* Report Sections */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Report Contents</h3>
            <div className="space-y-3">
              {reportSections.map((section, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">{section.icon}</div>
                    <div>
                      <p className="font-medium">{section.title}</p>
                      <p className="text-sm text-gray-600">{section.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500">{section.pages} pages</span>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Generation Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Report Generation</span>
              <span className="text-sm text-gray-600">100% Complete</span>
            </div>
            <Progress value={100} className="h-2" />
          </div>

          {/* Download Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Download Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button className="h-auto p-4 justify-start">
                <div className="flex items-center space-x-3">
                  <Download className="h-5 w-5" />
                  <div className="text-left">
                    <p className="font-medium">Complete Report (PDF)</p>
                    <p className="text-xs text-gray-200">Full {totalPages}-page comprehensive report</p>
                  </div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 justify-start bg-transparent">
                <div className="flex items-center space-x-3">
                  <PieChart className="h-5 w-5" />
                  <div className="text-left">
                    <p className="font-medium">Executive Summary</p>
                    <p className="text-xs text-gray-600">Key findings and recommendations only</p>
                  </div>
                </div>
              </Button>
            </div>
          </div>

          {/* Sharing Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Share Report</h3>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share with School Counselor
              </Button>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Discussion Meeting
              </Button>
            </div>
          </div>

          {/* Report Validity */}
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-800">Professionally Validated</span>
            </div>
            <p className="text-sm text-green-700">
              This report has been reviewed and validated by certified career counselors. Valid for college applications
              and career planning for the next 2 years.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
