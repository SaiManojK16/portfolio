import fs from 'fs/promises'
import pdf from 'pdf-parse'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
const model = genAI.getGenerativeModel({ 
  model: 'gemini-2.0-flash',
  generationConfig: {
    maxOutputTokens: 2048,
    temperature: 0.7,
  }
})

let pdfContent: string | null = null

export async function initializeQASystem(pdfPath: string) {
  try {
    if (!pdfContent) {
      const dataBuffer = await fs.readFile(pdfPath)
      const pdfData = await pdf(dataBuffer)
      pdfContent = pdfData.text
    }
    return true
  } catch (error: any) {
    console.error('Error initializing QA system:', error?.message || 'Unknown error')
    return false
  }
}

export async function answerQuestion(question: string): Promise<string> {
  if (!pdfContent) {
    throw new Error('QA system not initialized')
  }

  try {
    // Create a prompt that includes the resume content and the question
    const prompt = `You are a helpful AI assistant for Sai Manoj Kartala's portfolio website. 
Based on the following resume content, please provide a concise and relevant answer to the question.
Keep your responses professional and focused on Sai's professional experience and skills.

Resume Content:
${pdfContent}

Question: ${question}

Please provide a clear and concise answer based only on the information in the resume.`

    // Generate response using Gemini
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error: any) {
    console.error('Error answering question:', error?.message || 'Unknown error')
    return "I apologize, but I encountered an error while processing your question. Please try again."
  }
} 