import { NextResponse, type NextRequest } from "next/server"

// Simple role-based redirect to ensure mentors land only on dashboard
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Read 'role' cookie set on sign-in/signup
  const role = request.cookies.get("role")?.value

  // If mentor tries to access student-facing routes, redirect to dashboard
  const studentAreas = [
    "/assessment",
    "/recommendations",
    "/trial-courses",
    "/student-reports",
    "/alumni",
    "/parent-dashboard",
    "/counselor",
    "/alumni",
  ]

  if (role === "mentor") {
    // allow dashboard itself and auth routes
    const allowedMentor = pathname === "/" || pathname.startsWith("/mentor-dashboard") || pathname.startsWith("/auth")
    const isStudentArea = studentAreas.some((p) => pathname === p || pathname.startsWith(`${p}/`))
    if (!allowedMentor && isStudentArea) {
      const url = request.nextUrl.clone()
      url.pathname = "/mentor-dashboard"
      return NextResponse.redirect(url)
    }
  }

  // Restrict mentor dashboard to mentors only
  if (pathname.startsWith("/mentor-dashboard") && role !== "mentor") {
    const url = request.nextUrl.clone()
    url.pathname = "/auth/signin"
    return NextResponse.redirect(url)
  }

  // If authenticated mentor already hitting auth pages, send to dashboard
  if (role === "mentor" && pathname.startsWith("/auth")) {
    const url = request.nextUrl.clone()
    url.pathname = "/mentor-dashboard"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/",
    "/(assessment|recommendations|trial-courses|student-reports|alumni|parent-dashboard|counselor|mentor-dashboard|auth/:path*)",
  ],
}


