"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Share, Eye, CheckCircle, Clock, User, Calendar, TrendingUp } from "lucide-react"

const mockReports = [
  {
    id: "RPT-001",
    student: "Arjun Patel",
    counselor: "Dr. Meera Krishnan",
    generatedDate: "2024-01-12",
    status: "completed",
    type: "Comprehensive Career Analysis",
    recommendations: 3,
    validationScore: 95,
    reportSections: [
      "Executive Summary",
      "Assessment Analysis",
      "Career Recommendations",
      "Educational Pathway",
      "Action Plan",
      "Next Steps",
    ],
  },
  {
    id: "RPT-002",
    student: "Sneha Reddy",
    counselor: "Prof. Rajesh Sharma",
    generatedDate: "2024-01-10",
    status: "in-progress",
    type: "Academic Pathway Report",
    recommendations: 2,
    validationScore: 88,
    reportSections: [
      "Academic Performance Analysis",
      "Subject Strengths",
      "Recommended Streams",
      "College Suggestions",
      "Preparation Strategy",
    ],
  },
  {
    id: "RPT-003",
    student: "Karan Singh",
    counselor: "Dr. Meera Krishnan",
    generatedDate: "2024-01-08",
    status: "completed",
    type: "Skills Assessment Report",
    recommendations: 4,
    validationScore: 92,
    reportSections: [
      "Skills Inventory",
      "Aptitude Analysis",
      "Career Alignment",
      "Skill Development Plan",
      "Industry Insights",
    ],
  },
]

const sampleReport = {
  id: "RPT-001",
  student: "Arjun Patel",
  counselor: "Dr. Meera Krishnan",
  generatedDate: "2024-01-12",
  executiveSummary: `Based on comprehensive assessment and professional validation, Arjun demonstrates exceptional aptitude for technology-oriented careers. His analytical thinking, problem-solving abilities, and strong mathematical foundation make him an ideal candidate for Software Engineering and Data Science roles.

Key Strengths:
• Outstanding logical reasoning (95th percentile)
• Strong programming aptitude
• Excellent academic performance (95% in 11th grade)
• High interest in technology and innovation

Recommended Career Path: Software Engineering with specialization in Machine Learning/AI`,

  recommendations: [
    {
      career: "Software Engineering",
      validation: "Strongly Recommended",
      reasoning:
        "Exceptional programming aptitude and logical thinking align perfectly with software engineering requirements.",
      actionItems: [
        "Focus on advanced mathematics and computer science",
        "Prepare for JEE Advanced for IIT admission",
        "Build programming portfolio with personal projects",
        "Consider internships at tech companies",
      ],
    },
  ],
}

export function ReportGenerator() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("list")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "in-progress":
        return <Clock className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">AI-Generated Reports</h3>
          <p className="text-muted-foreground">
            Comprehensive career guidance reports validated by professional counselors
          </p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Generate New Report
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="list">All Reports</TabsTrigger>
          <TabsTrigger value="preview">Report Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <div className="grid gap-4">
            {mockReports.map((report) => (
              <Card key={report.id} className="relative overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg">{report.type}</CardTitle>
                        <Badge className={getStatusColor(report.status)}>
                          {getStatusIcon(report.status)}
                          <span className="ml-1 capitalize">{report.status}</span>
                        </Badge>
                      </div>
                      <CardDescription>Report ID: {report.id}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">{report.validationScore}%</div>
                      <p className="text-xs text-muted-foreground">Validation Score</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Student</p>
                        <p className="text-sm text-muted-foreground">{report.student}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-purple-600" />
                      <div>
                        <p className="text-sm font-medium">Counselor</p>
                        <p className="text-sm text-muted-foreground">{report.counselor}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">Generated</p>
                        <p className="text-sm text-muted-foreground">{report.generatedDate}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Report Sections</p>
                    <div className="flex flex-wrap gap-1">
                      {report.reportSections.map((section, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {section}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>{report.recommendations} recommendations</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedReport(report.id)
                          setActiveTab("preview")
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      {report.status === "completed" && (
                        <>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share className="mr-2 h-4 w-4" />
                            Share
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          {selectedReport ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Career Guidance Report</CardTitle>
                    <CardDescription>
                      Comprehensive analysis and recommendations for {sampleReport.student}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share className="mr-2 h-4 w-4" />
                      Share Report
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Report Header */}
                <div className="border-b pb-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm font-medium">Student Name</p>
                      <p className="text-sm text-muted-foreground">{sampleReport.student}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Counselor</p>
                      <p className="text-sm text-muted-foreground">{sampleReport.counselor}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Report Date</p>
                      <p className="text-sm text-muted-foreground">{sampleReport.generatedDate}</p>
                    </div>
                  </div>
                </div>

                {/* Executive Summary */}
                <div>
                  <h4 className="font-semibold mb-3">Executive Summary</h4>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm leading-relaxed whitespace-pre-line">{sampleReport.executiveSummary}</p>
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h4 className="font-semibold mb-3">Career Recommendations</h4>
                  {sampleReport.recommendations.map((rec, index) => (
                    <Card key={index} className="mb-4">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{rec.career}</CardTitle>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {rec.validation}
                          </Badge>
                        </div>
                        <CardDescription>{rec.reasoning}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div>
                          <p className="font-medium mb-2">Recommended Action Items:</p>
                          <ul className="space-y-1">
                            {rec.actionItems.map((item, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-start space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t pt-4 text-center text-sm text-muted-foreground">
                  <p>This report was generated by CareerPath AI and validated by certified career counselors.</p>
                  <p>
                    Report ID: {sampleReport.id} | Generated on {sampleReport.generatedDate}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Report Selected</h3>
              <p className="text-muted-foreground">Select a report from the list to preview it here</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
