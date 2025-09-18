const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  // Add auth token if available
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new ApiError(response.status, errorData.message || 'API request failed')
    }

    return await response.json()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(0, 'Network error occurred')
  }
}

// Virtual Lab API functions
export const virtualLabApi = {
  // Get all virtual lab courses
  getCourses: (params?: {
    category?: string
    difficulty?: string
    type?: string
    search?: string
  }) => {
    const searchParams = new URLSearchParams()
    if (params?.category) searchParams.append('category', params.category)
    if (params?.difficulty) searchParams.append('difficulty', params.difficulty)
    if (params?.type) searchParams.append('type', params.type)
    if (params?.search) searchParams.append('search', params.search)
    
    const queryString = searchParams.toString()
    return apiRequest(`/virtual-labs/${queryString ? `?${queryString}` : ''}`)
  },

  // Get specific course details
  getCourse: (courseId: string) => 
    apiRequest(`/virtual-labs/${courseId}/`),

  // Enroll in a course
  enrollInCourse: (courseId: string) =>
    apiRequest(`/virtual-labs/${courseId}/enroll/`, {
      method: 'POST',
    }),

  // Get or create lab session
  getLabSession: (courseId: string) =>
    apiRequest(`/virtual-labs/${courseId}/session/`),

  // Start lab session
  startLabSession: (courseId: string) =>
    apiRequest(`/virtual-labs/${courseId}/session/`, {
      method: 'POST',
    }),

  // Execute code
  executeCode: (code: string, exerciseId: number) =>
    apiRequest('/virtual-labs/execute-code/', {
      method: 'POST',
      body: JSON.stringify({ code, exercise_id: exerciseId }),
    }),

  // Get user enrollments
  getUserEnrollments: () =>
    apiRequest('/virtual-labs/user/enrollments/'),

  // Get lab analytics
  getLabAnalytics: (courseId: string) =>
    apiRequest(`/virtual-labs/${courseId}/analytics/`),
}

// Auth API functions
export const authApi = {
  login: (username: string, password: string, role?: string) =>
    apiRequest('/login/', {
      method: 'POST',
      body: JSON.stringify({ username, password, role }),
    }),

  signup: (userData: {
    username: string
    email: string
    password: string
    first_name: string
    last_name: string
    role: string
  }) =>
    apiRequest('/signup/', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  getMe: () =>
    apiRequest('/me/'),
}

export { ApiError }
