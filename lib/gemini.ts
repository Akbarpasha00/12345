import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function generateSummary(data: any): Promise<string> {
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `
      You are an AI assistant for a Training and Placement Office (TPO) at a college.
      Analyze the following placement data and provide a comprehensive summary with insights:
      
      ${JSON.stringify(data, null, 2)}
      
      Please include:
      1. An overview of the placement statistics
      2. Key insights and trends
      3. Recommendations for improving placement rates
      4. Areas that need attention
      
      Format your response in HTML with proper headings, paragraphs, and bullet points for readability.
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return text
  } catch (error) {
    console.error("Error generating summary with Gemini:", error)
    return "<p>Unable to generate summary. Please try again later.</p>"
  }
}

