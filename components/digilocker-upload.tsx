"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, CheckCircle, AlertCircle, ExternalLink } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface DigiLockerUploadProps {
  onComplete: () => void
}

export function DigiLockerUpload({ onComplete }: DigiLockerUploadProps) {
  const [digiLockerId, setDigiLockerId] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const requiredDocuments = [
    "10th Grade Marksheet",
    "12th Grade Marksheet",
    "Entrance Exam Scores",
    "Academic Certificates",
    "Skill Certifications",
  ]

  const handleDigiLockerConnect = async () => {
    if (!digiLockerId.trim()) return

    setIsConnecting(true)
    // Simulate DigiLocker connection
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsConnected(true)
    setUploadedFiles(requiredDocuments)
    setIsConnecting(false)
    setTimeout(onComplete, 1000)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newFiles = Array.from(files).map((file) => file.name)
      setUploadedFiles([...uploadedFiles, ...newFiles])
      if (uploadedFiles.length + newFiles.length >= requiredDocuments.length) {
        setTimeout(onComplete, 500)
      }
    }
  }

  return (
    <div className="space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          We analyze your academic records to provide personalized career recommendations. Your data is secure and
          encrypted.
        </AlertDescription>
      </Alert>

      {/* DigiLocker Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ExternalLink className="h-5 w-5" />
            <span>Connect DigiLocker</span>
          </CardTitle>
          <CardDescription>
            Connect your DigiLocker account to automatically import your academic documents
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="digilocker-id">DigiLocker ID / Aadhaar Number</Label>
            <Input
              id="digilocker-id"
              placeholder="Enter your DigiLocker ID"
              value={digiLockerId}
              onChange={(e) => setDigiLockerId(e.target.value)}
              disabled={isConnected}
            />
          </div>
          <Button
            onClick={handleDigiLockerConnect}
            disabled={!digiLockerId.trim() || isConnecting || isConnected}
            className="w-full"
          >
            {isConnecting ? (
              "Connecting..."
            ) : isConnected ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Connected Successfully
              </>
            ) : (
              <>
                <ExternalLink className="mr-2 h-4 w-4" />
                Connect DigiLocker
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Manual Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Manual Upload</span>
          </CardTitle>
          <CardDescription>Or upload your documents manually if you prefer</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <div className="space-y-2">
              <p className="text-sm font-medium">Drop files here or click to upload</p>
              <p className="text-xs text-muted-foreground">PDF, JPG, PNG files up to 10MB each</p>
            </div>
            <Input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="mt-4"
              disabled={isConnected}
            />
          </div>
        </CardContent>
      </Card>

      {/* Required Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Required Documents</CardTitle>
          <CardDescription>We need these documents for comprehensive analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {requiredDocuments.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{doc}</span>
                </div>
                {uploadedFiles.includes(doc) ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Uploaded
                  </Badge>
                ) : (
                  <Badge variant="outline">Required</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {uploadedFiles.length > 0 && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Great! We've received {uploadedFiles.length} document(s). Our AI will analyze your academic performance and
            suggest suitable career paths.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
