import { NextResponse } from 'next/server'
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

// Resume content directly in the API route
const resumeContent = `Sai Manoj Kartala

SUMMARY
Passionate and innovative software developer with expertise in full-stack development, AI/ML, and cloud technologies. Proven track record of delivering high-quality solutions and leading technical initiatives.

SKILLS
Programming Languages: JavaScript, TypeScript, Python, Java, C++
Web Technologies: React.js, Next.js, Node.js, Express.js, HTML5, CSS3
Cloud & DevOps: AWS, Docker, Kubernetes, CI/CD
AI/ML: TensorFlow, PyTorch, Scikit-learn, NLP
Databases: MongoDB, PostgreSQL, MySQL
Tools: Git, JIRA, Figma

EXPERIENCE
Software Developer | Various Projects
• Developed and deployed full-stack web applications using React, Next.js, and Node.js
• Implemented AI/ML solutions for natural language processing and computer vision
• Designed and optimized database schemas for improved performance
• Led technical initiatives and collaborated with cross-functional teams

EDUCATION
Bachelor's in Computer Science
Relevant coursework: Data Structures, Algorithms, Software Engineering, AI/ML

PROJECTS
Portfolio Website
• Built a modern portfolio website using Next.js, TypeScript, and Tailwind CSS
• Implemented AI-powered chat functionality using Google's Gemini API
• Optimized performance and accessibility following best practices

AI Resume Parser
• Developed an intelligent resume parsing system using NLP techniques
• Integrated with various APIs for enhanced functionality
• Improved accuracy and processing speed by 40%

CERTIFICATIONS
• AWS Certified Developer
• Google Cloud Professional Developer
• Microsoft Certified: Azure Developer

INTERESTS
• Artificial Intelligence and Machine Learning
• Cloud Computing and DevOps
• Open Source Development
• Technical Writing`

export async function POST(req: Request) {
  try {
    const { question } = await req.json()

    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      )
    }

    try {
      // Create a prompt that includes the resume content and the question
      const prompt = `You are a helpful AI assistant for Sai Manoj Kartala's portfolio website. 
Based on the following resume content, please provide a concise and relevant answer to the question.
Keep your responses professional and focused on Sai's professional experience and skills.

Resume Content:
${resumeContent}

Question: ${question}

Please provide a clear and concise answer based only on the information in the resume.`

      // Generate response using Gemini
      const result = await model.generateContent(prompt)
      const response = await result.response
      return NextResponse.json({ answer: response.text() })
    } catch (error: any) {
      console.error('Error generating answer:', error?.message || error)
      return NextResponse.json(
        { error: 'Failed to generate answer', details: error?.message },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Error in resume QA:', error?.message || error)
    return NextResponse.json(
      { error: 'Internal server error', details: error?.message },
      { status: 500 }
    )
  }
} 