import { NextResponse } from 'next/server'
import { initializeQASystem, answerQuestion } from '@/utils/pdf_qa'
import path from 'path'
import fs from 'fs'

let isInitialized = false

export async function POST(req: Request) {
  try {
    // Initialize the QA system if not already done
    if (!isInitialized) {
      // Try different possible PDF locations
      const possiblePaths = [
        path.join(process.cwd(), 'public', 'resume.pdf'),
        path.join(process.cwd(), '.next', 'public', 'resume.pdf'),
        path.join(process.cwd(), 'out', 'public', 'resume.pdf'),
        // Add Vercel specific paths
        process.env.VERCEL ? path.join('/vercel/path0', 'public', 'resume.pdf') : null,
        process.env.VERCEL ? path.join('/vercel/path0', '.next', 'public', 'resume.pdf') : null,
      ].filter(Boolean) as string[]

      let pdfPath: string | null = null
      for (const path of possiblePaths) {
        if (fs.existsSync(path)) {
          pdfPath = path
          break
        }
      }

      if (!pdfPath) {
        console.error('Resume PDF not found in any of these locations:', possiblePaths)
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

  } catch (error: any) {
    console.error('Error in resume QA:', error?.message || error)
    return NextResponse.json(
      { error: 'Internal server error', details: error?.message },
      { status: 500 }
    )
  }
} 