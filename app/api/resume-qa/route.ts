import { NextResponse } from 'next/server'
import { initializeQASystem, answerQuestion } from '@/utils/pdf_qa'
import path from 'path'
import fs from 'fs'

let isInitialized = false

export async function POST(req: Request) {
  try {
    // Initialize the QA system if not already done
    if (!isInitialized) {
      const pdfPath = path.join(process.cwd(), 'public', 'resume.pdf')
      
      // Check if file exists
      if (!fs.existsSync(pdfPath)) {
        console.error('Resume PDF not found at:', pdfPath)
        return NextResponse.json(
          { error: 'Resume file not found' },
          { status: 404 }
        )
      }

      isInitialized = await initializeQASystem(pdfPath)
      
      if (!isInitialized) {
        return NextResponse.json(
          { error: 'Failed to initialize QA system' },
          { status: 500 }
        )
      }
    }

    const { question } = await req.json()

    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      )
    }

    const answer = await answerQuestion(question)
    return NextResponse.json({ answer })

  } catch (error) {
    console.error('Error in resume QA:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 