"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ExternalLink, Search, BookOpen, Code2, List, Shield } from "lucide-react"

const curatedLinks = [
  {
    title: "Data Structures & Algorithms",
    url: "https://www.geeksforgeeks.org/data-structures/",
    tags: ["DSA", "Foundations"],
  },
  {
    title: "DSA Self Paced Syllabus",
    url: "https://www.geeksforgeeks.org/dsa-self-paced/",
    tags: ["Course", "Roadmap"],
  },
  {
    title: "Problem of the Day",
    url: "https://www.geeksforgeeks.org/problem-of-the-day/",
    tags: ["Practice", "Daily"],
  },
  {
    title: "Python Programming Language",
    url: "https://www.geeksforgeeks.org/python-programming-language/",
    tags: ["Python", "Language"],
  },
  {
    title: "JavaScript Tutorials",
    url: "https://www.geeksforgeeks.org/javascript/",
    tags: ["JavaScript", "Frontend"],
  },
  {
    title: "Competitive Programming",
    url: "https://www.geeksforgeeks.org/competitive-programming-a-complete-guide/",
    tags: ["CP", "Guide"],
  },
]

export default function GfgResourcesPage() {
  const [url, setUrl] = useState("https://www.geeksforgeeks.org/")

  const normalizedUrl = url.startsWith("http") ? url : `https://${url}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">GeeksforGeeks Hub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore GeeksforGeeks content directly here or open in a new tab. Practice DSA, read tutorials, and follow curated learning paths.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Iframe viewer */}
          <Card className="lg:col-span-2 overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Embedded Viewer</CardTitle>
                  <CardDescription>Enter a GeeksforGeeks URL to load it here</CardDescription>
                </div>
                <Link href={normalizedUrl} target="_blank" className="inline-flex">
                  <Button variant="outline" size="sm">
                    Open Externally
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.geeksforgeeks.org/..."
                  className="pl-10"
                />
              </div>
              <div className="border rounded-lg overflow-hidden bg-white">
                {/* If GFG denies embedding, the iframe may not render; external link remains available */}
                <iframe
                  key={normalizedUrl}
                  src={normalizedUrl}
                  className="w-full h-[70vh]"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-xs text-gray-500">
                If the page doesn't load due to site restrictions, use "Open Externally".
              </div>
            </CardContent>
          </Card>

          {/* Curated links */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <CardTitle>Curated Learning Paths</CardTitle>
              </div>
              <CardDescription>Quick access to popular GfG sections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {curatedLinks.map((item) => (
                <div key={item.url} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">{item.title}</div>
                    <div className="space-x-1 mt-1">
                      {item.tags.map((t) => (
                        <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" onClick={() => setUrl(item.url)}>Preview</Button>
                    <Link href={item.url} target="_blank" className="inline-flex">
                      <Button size="sm">
                        Open
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


