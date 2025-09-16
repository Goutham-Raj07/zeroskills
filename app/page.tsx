import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen, Brain, Users, Award, Target, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Target className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-primary">CareerPath AI</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#assessments" className="text-sm font-medium hover:text-primary transition-colors">
              Assessments
            </Link>
            <Link href="#recommendations" className="text-sm font-medium hover:text-primary transition-colors">
              Recommendations
            </Link>
            <Link href="#resources" className="text-sm font-medium hover:text-primary transition-colors">
              Resources
            </Link>
            <Link href="#alumni" className="text-sm font-medium hover:text-primary transition-colors">
              Alumni Network
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-4">
              AI-Powered Career Guidance
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Discover Your Perfect <span className="text-primary">Career Path</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty max-w-2xl mx-auto">
              Get personalized career recommendations based on your academic records, aptitude tests, and interests.
              Connect with alumni, try courses, and make informed decisions about your future.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/assessment">
                <Button size="lg" className="h-12 px-8">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="h-12 px-8 bg-transparent">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
              Complete Career Guidance Journey
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Our comprehensive 9-step process ensures you make the right career choice
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="outline">Step 1-2</Badge>
                </div>
                <CardTitle>Academic Analysis</CardTitle>
                <CardDescription>
                  Upload your DigiLocker documents for comprehensive academic record analysis and aptitude assessment
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                    <Brain className="h-5 w-5 text-secondary" />
                  </div>
                  <Badge variant="outline">Step 3</Badge>
                </div>
                <CardTitle>AI Recommendations</CardTitle>
                <CardDescription>
                  Get personalized career paths with college suggestions, entrance exams, and career outcomes
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="outline">Step 4-6</Badge>
                </div>
                <CardTitle>Expert Validation</CardTitle>
                <CardDescription>
                  Connect with alumni, get counselor validation, and receive detailed AI-generated reports
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                    <Award className="h-5 w-5 text-secondary" />
                  </div>
                  <Badge variant="outline">Step 7-8</Badge>
                </div>
                <CardTitle>Trial & Testing</CardTitle>
                <CardDescription>
                  Experience trial courses and virtual labs to test your interest and aptitude in real scenarios
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="outline">Step 9</Badge>
                </div>
                <CardTitle>Final Decision</CardTitle>
                <CardDescription>
                  Involve parents in the final meeting and make an informed decision about your career path
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative overflow-hidden border-primary/20 bg-primary/5">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Target className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <Badge>Complete Journey</Badge>
                </div>
                <CardTitle>Your Future Awaits</CardTitle>
                <CardDescription>
                  Start your personalized career guidance journey today and unlock your potential
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/assessment">
                  <Button className="w-full">
                    Begin Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">10,000+</div>
              <div className="text-sm text-muted-foreground">Students Guided</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Partner Colleges</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">Ready to Shape Your Future?</h2>
            <p className="mt-4 text-lg text-primary-foreground/80 text-pretty">
              Join thousands of students who have found their perfect career path with our AI-powered guidance system.
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Link href="/assessment">
                <Button size="lg" variant="secondary" className="h-12 px-8">
                  Start Free Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Target className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold text-primary">CareerPath AI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering students to make informed career decisions through AI-powered guidance and expert counseling.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Assessments
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Recommendations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Trial Courses
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Alumni Network
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Career Guide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    College Database
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Entrance Exams
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Success Stories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2024 CareerPath AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
