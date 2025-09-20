"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Download, Play, BookOpen } from "lucide-react"

interface PreparationResource {
  title: string
  url: string
  type: "youtube" | "pdf" | "website"
  description?: string
}

interface PreparationGuideProps {
  examId: string
  examName: string
  isOpen: boolean
  onClose: () => void
}

const preparationResources: Record<string, {
  youtube: PreparationResource[]
  previousPapers: PreparationResource[]
  studyMaterials: PreparationResource[]
}> = {
  "jee-main": {
    youtube: [
      {
        title: "MUST DO JEE Main Previous Year Papers as Mocks",
        url: "https://www.youtube.com/playlist?list=PLCtUyOrCJbxwwZ0bZHIx435dubxPziRFy",
        type: "youtube",
        description: "Complete playlist of JEE Main previous year papers"
      },
      {
        title: "JEE Main Previous Year Question Paper with Solution - Vedantu",
        url: "https://www.youtube.com/playlist?list=PLCtUyOrCJbxwwZ0bZHIx435dubxPziRFy",
        type: "youtube",
        description: "Detailed solutions for JEE Main papers"
      },
      {
        title: "JEE Mains Past Papers Playlist",
        url: "https://www.youtube.com/results?search_query=JEE+Mains+past+papers+playlist",
        type: "youtube",
        description: "Comprehensive past papers collection"
      },
      {
        title: "2023/2024 Solved Papers",
        url: "https://www.youtube.com/results?search_query=JEE+Main+2023+2024+solved+papers",
        type: "youtube",
        description: "Recent year solved papers"
      }
    ],
    previousPapers: [
      {
        title: "JEE Main Previous Year Papers (2019-2024)",
        url: "https://www.mathongo.com/iit-jee/jee-main-previous-year-question-paper",
        type: "website",
        description: "Comprehensive JEE Main previous year papers collection"
      },
      {
        title: "JEE Main Question Papers with Solutions PDF",
        url: "https://www.mathongo.com/iit-jee/jee-main-previous-year-question-paper",
        type: "pdf",
        description: "Downloadable PDFs with detailed solutions"
      }
    ],
    studyMaterials: [
      {
        title: "NCERT Books (Physics, Chemistry, Mathematics)",
        url: "https://ncert.nic.in/textbook.php",
        type: "website",
        description: "Official NCERT textbooks for Class 11 & 12"
      },
      {
        title: "JEE Main Syllabus & Pattern",
        url: "https://jeemain.nta.nic.in/syllabus/",
        type: "website",
        description: "Complete syllabus and exam pattern"
      }
    ]
  },
  "neet-ug": {
    youtube: [
      {
        title: "38 Years NEET Previous Year Question Paper - Must Have",
        url: "https://www.youtube.com/results?search_query=38+years+NEET+previous+year+papers",
        type: "youtube",
        description: "Comprehensive 38-year NEET paper collection"
      },
      {
        title: "Best 37 Year Solve PYQs for NEET 2025",
        url: "https://www.youtube.com/results?search_query=37+year+NEET+PYQ+solved+2025",
        type: "youtube",
        description: "Solved previous year questions for 2025"
      },
      {
        title: "36 Years NEET UG Previous Year Solved Papers",
        url: "https://www.youtube.com/results?search_query=36+years+NEET+UG+solved+papers",
        type: "youtube",
        description: "Detailed solutions for 36 years of papers"
      }
    ],
    previousPapers: [
      {
        title: "NEET Previous Year Papers (2013-2024)",
        url: "https://www.shiksha.com/medicine-health-sciences/articles/neet-question-paper-in-english-pdf-download-blogId-95399",
        type: "website",
        description: "NEET question papers in English PDF download"
      },
      {
        title: "NEET Question Papers with Solutions PDF",
        url: "https://www.vedantu.com/neet/neet-previous-year-question-paper",
        type: "pdf",
        description: "Downloadable PDFs with solutions"
      }
    ],
    studyMaterials: [
      {
        title: "NCERT Biology, Physics, Chemistry Books",
        url: "https://ncert.nic.in/textbook.php",
        type: "website",
        description: "Official NCERT textbooks for Class 11 & 12"
      },
      {
        title: "NEET Syllabus & Pattern",
        url: "https://neet.nta.nic.in/syllabus/",
        type: "website",
        description: "Complete NEET syllabus and exam pattern"
      }
    ]
  },
  "clat-ug": {
    youtube: [
      {
        title: "CLAT Previous Year Solutions & Strategy",
        url: "https://www.youtube.com/results?search_query=CLAT+previous+year+solutions+strategy",
        type: "youtube",
        description: "CLAT preparation strategy and solutions"
      },
      {
        title: "CLAT 2025 Preparation Guide",
        url: "https://www.youtube.com/results?search_query=CLAT+2025+preparation+guide",
        type: "youtube",
        description: "Complete CLAT 2025 preparation guide"
      }
    ],
    previousPapers: [
      {
        title: "CLAT Previous Year Papers (2008-2025) - LawPrepTutorial",
        url: "https://www.careerindia.com/exam/clat-question-papers-e29.html",
        type: "pdf",
        description: "Complete collection of CLAT papers"
      },
      {
        title: "CLAT 2025-2016 Question Papers - CollegeDunia",
        url: "https://collegedunia.com/exams/clat/question-paper",
        type: "pdf",
        description: "Recent year papers with answer keys"
      },
      {
        title: "CLAT PYQs 2013-2024 - Testbook",
        url: "https://testbook.com/clat/previous-year-papers",
        type: "pdf",
        description: "Testbook's CLAT previous year papers"
      },
      {
        title: "Free CLAT & AILET Papers - Oswaal360",
        url: "https://oswaal360.com/clat-previous-year-papers",
        type: "pdf",
        description: "Free downloadable CLAT papers"
      }
    ],
    studyMaterials: [
      {
        title: "CLAT Syllabus & Pattern",
        url: "https://consortiumofnlus.ac.in/clat-2026/ug-syllabus.html",
        type: "website",
        description: "Official CLAT syllabus and exam pattern"
      },
      {
        title: "Legal Reasoning Study Material",
        url: "https://clatbuddy.com/legal-reasoning-notes-for-clat/",
        type: "website",
        description: "Official study materials for CLAT"
      }
    ]
  },
  "cuet-ug": {
    youtube: [
      {
        title: "CUET Previous Year Solutions & Guide",
        url: "https://www.youtube.com/results?search_query=CUET+previous+year+solutions+guide",
        type: "youtube",
        description: "CUET preparation guide and solutions"
      },
      {
        title: "CUET 2025 Preparation Strategy",
        url: "https://www.youtube.com/results?search_query=CUET+2025+preparation+strategy",
        type: "youtube",
        description: "Complete CUET 2025 preparation strategy"
      }
    ],
    previousPapers: [
      {
        title: "CUET Previous Year Papers - Mockers.in",
        url: "https://collegedunia.com/exams/cuet/question-paper",
        type: "pdf",
        description: "CUET papers with answers (2025, 2022 etc)"
      },
      {
        title: "CUET Question Papers - Official NTA",
        url: "https://collegedunia.com/exams/cuet/question-paper",
        type: "website",
        description: "Official CUET previous year papers"
      }
    ],
    studyMaterials: [
      {
        title: "CUET Syllabus & Pattern",
        url: "https://cuet.nta.nic.in/syllabus/",
        type: "website",
        description: "Complete CUET syllabus and exam pattern"
      },
      {
        title: "NCERT Books for CUET Preparation",
        url: "https://ncert.nic.in/textbook.php",
        type: "website",
        description: "NCERT textbooks for domain subjects"
      }
    ]
  },
  "nda": {
    youtube: [
      {
        title: "NDA Previous Year Papers Solutions",
        url: "https://www.youtube.com/results?search_query=NDA+previous+year+papers+solutions",
        type: "youtube",
        description: "NDA paper solutions and strategies"
      },
      {
        title: "NDA Mathematics & GAT Preparation",
        url: "https://www.youtube.com/results?search_query=NDA+mathematics+GAT+preparation",
        type: "youtube",
        description: "Complete NDA preparation guide"
      }
    ],
    previousPapers: [
      {
        title: "NDA Previous Year Papers - Oswaal360",
        url: "https://www.oswaal360.com/pages/nda-previous-year-question-papers-with-solution-free-pdf-download",
        type: "pdf",
        description: "Free NDA papers with solutions"
      },
      {
        title: "NDA Question Papers - UPSC Official",
        url: "https://upsc.gov.in/examinations/previous-question-papers/archives?field_exam_name_value=National%20Defence%20Academy",
        type: "website",
        description: "Official UPSC NDA papers"
      }
    ],
    studyMaterials: [
      {
        title: "NDA Syllabus & Pattern",
        url: "https://www.shiksha.com/exams/nda-exam-pattern",
        type: "website",
        description: "Official NDA syllabus and exam pattern"
      },
      {
        title: "Mathematics & GAT Study Material",
        url: "https://prepp.in/nda-exam/study-material",
        type: "website",
        description: "Study materials for NDA subjects"
      }
    ]
  },
  "ssc-chsl": {
    youtube: [
      {
        title: "SSC CHSL Previous Year Papers Solutions",
        url: "https://www.youtube.com/results?search_query=SSC+CHSL+previous+year+papers+solutions",
        type: "youtube",
        description: "SSC CHSL paper solutions and tips"
      },
      {
        title: "SSC CHSL Preparation Strategy",
        url: "https://www.youtube.com/results?search_query=SSC+CHSL+preparation+strategy",
        type: "youtube",
        description: "Complete SSC CHSL preparation guide"
      }
    ],
    previousPapers: [
      {
        title: "SSC CHSL Previous Year Papers - Testbook",
        url: "https://www.careerpower.in/ssc-chsl-previous-year-question-paper.html",
        type: "pdf",
        description: "Tier I & II papers with solutions"
      },
      {
        title: "SSC CHSL Papers - Examsnet",
        url: "https://www.careerpower.in/ssc-chsl-previous-year-question-paper.html",
        type: "pdf",
        description: "Memory-based paper banks"
      },
      {
        title: "SSC CHSL Papers - Official SSC",
        url: "https://ssc.nic.in/",
        type: "website",
        description: "Official SSC previous year papers"
      }
    ],
    studyMaterials: [
      {
        title: "SSC CHSL Syllabus & Pattern",
        url: "https://ssc.nic.in/syllabus/",
        type: "website",
        description: "Complete SSC CHSL syllabus and pattern"
      },
      {
        title: "General Awareness Study Material",
        url: "https://ssc.nic.in/study-material/",
        type: "website",
        description: "SSC study materials and resources"
      }
    ]
  },
  "rrb": {
    youtube: [
      {
        title: "RRB Previous Year Papers Solutions",
        url: "https://www.youtube.com/results?search_query=RRB+previous+year+papers+solutions",
        type: "youtube",
        description: "Railway recruitment paper solutions"
      },
      {
        title: "RRB NTPC Past Paper Guide",
        url: "https://www.youtube.com/results?search_query=RRB+NTPC+past+paper+guide",
        type: "youtube",
        description: "RRB NTPC preparation guide"
      }
    ],
    previousPapers: [
      {
        title: "RRB Previous Year Papers - Testbook",
        url: "https://prepp.in/rrb-recruitment-exam/practice-papers",
        type: "pdf",
        description: "Railway recruitment papers collection"
      },
      {
        title: "RRB Question Papers - Official",
        url: "https://prepp.in/rrb-recruitment-exam/practice-papers",
        type: "website",
        description: "Official RRB previous year papers"
      }
    ],
    studyMaterials: [
      {
        title: "RRB Syllabus & Pattern",
        url: "https://www.shiksha.com/exams/rrb-exam-pattern",
        type: "website",
        description: "Railway recruitment syllabus and pattern"
      },
      {
        title: "Technical & Non-Technical Study Material",
        url: "https://www.adda247.com/not-found",
        type: "website",
        description: "RRB study materials and resources"
      }
    ]
  }
}

export function PreparationGuideModal({ examId, examName, isOpen, onClose }: PreparationGuideProps) {
  const resources = preparationResources[examId] || {
    youtube: [],
    previousPapers: [],
    studyMaterials: []
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "youtube":
        return <Play className="h-4 w-4" />
      case "pdf":
        return <Download className="h-4 w-4" />
      case "website":
        return <ExternalLink className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "youtube":
        return "destructive"
      case "pdf":
        return "secondary"
      case "website":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{examName} - Preparation Guide</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="youtube" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="youtube" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              YouTube Guides
            </TabsTrigger>
            <TabsTrigger value="papers" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Previous Papers
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Study Materials
            </TabsTrigger>
          </TabsList>

          <TabsContent value="youtube" className="space-y-4">
            <div className="grid gap-4">
              {resources.youtube.map((resource, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        {resource.description && (
                          <CardDescription className="mt-1">{resource.description}</CardDescription>
                        )}
                      </div>
                      <Badge variant={getBadgeVariant(resource.type)} className="ml-2">
                        {getIcon(resource.type)}
                        <span className="ml-1">YouTube</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full">
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        <Play className="mr-2 h-4 w-4" />
                        Watch Video Guide
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
              {resources.youtube.length === 0 && (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">No YouTube guides available for this exam.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="papers" className="space-y-4">
            <div className="grid gap-4">
              {resources.previousPapers.map((resource, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        {resource.description && (
                          <CardDescription className="mt-1">{resource.description}</CardDescription>
                        )}
                      </div>
                      <Badge variant={getBadgeVariant(resource.type)} className="ml-2">
                        {getIcon(resource.type)}
                        <span className="ml-1">{resource.type.toUpperCase()}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full">
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        {resource.type === "pdf" ? (
                          <>
                            <Download className="mr-2 h-4 w-4" />
                            Download Papers
                          </>
                        ) : (
                          <>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Visit Website
                          </>
                        )}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
              {resources.previousPapers.length === 0 && (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">No previous year papers available for this exam.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="materials" className="space-y-4">
            <div className="grid gap-4">
              {resources.studyMaterials.map((resource, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        {resource.description && (
                          <CardDescription className="mt-1">{resource.description}</CardDescription>
                        )}
                      </div>
                      <Badge variant={getBadgeVariant(resource.type)} className="ml-2">
                        {getIcon(resource.type)}
                        <span className="ml-1">Study Material</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full">
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Access Study Material
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
              {resources.studyMaterials.length === 0 && (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">No study materials available for this exam.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
