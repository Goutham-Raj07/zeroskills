import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { favorite_subjects, skills, aspirations, learning_style, values, numQuestions = 12 } = body || {}
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 })
    }

    const prompt = `You are an AI academic career guidance assistant. Create ${numQuestions} personalized multiple-choice quiz questions focused on ACADEMIC CAREER CHOICES (not job careers) tailored to this student's profile. Questions should help determine suitable academic streams, college majors, and higher education paths. Each item MUST be strict JSON with keys: question (string), options (array of 4 short strings). Return a JSON array only, no extra text.\n\nStudent Profile:\n- Favorite subjects: ${favorite_subjects}\n- Academic strengths: ${skills}\n- Academic field interests: ${aspirations}\n- Learning preferences: ${learning_style}\n- Academic career values: ${values}`

    // Call to Gemini via Generative Language API (text model). Replace endpoint/model as needed.
    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    })
    if (!res.ok) {
      const errText = await res.text()
      return NextResponse.json({ error: "Gemini API error", details: errText }, { status: 500 })
    }
    const data = await res.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || ""
    // Attempt to extract JSON array from response
    let jsonText = text.trim()
    // Remove markdown fences if present
    if (jsonText.startsWith("```)")) {}
    if (jsonText.startsWith("```")) {
      const idx = jsonText.indexOf("\n")
      jsonText = jsonText.slice(idx + 1)
      const endIdx = jsonText.lastIndexOf("```")
      if (endIdx !== -1) jsonText = jsonText.slice(0, endIdx)
    }
    let questions: any[] = []
    try {
      const parsed = JSON.parse(jsonText)
      if (Array.isArray(parsed)) {
        questions = parsed
      }
    } catch {}
    return NextResponse.json({ questions, raw: text })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 })
  }
}


