import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.0-flash",
  generationConfig: {
    temperature: 0.2,
    maxOutputTokens: 2048,
    topK: 40,
    topP: 0.8,
  }
});

// Chat history
const history: { role: string; parts: { text: string }[] }[] = [];

// Load resume data
const resumeData = `
Sai Manoj Kartala
Web Developer & AI/ML Engineer

EDUCATION
- Master's in Computer Science, University of Texas at Arlington
- Bachelor's in Computer Science, JNTUH

SKILLS
- Languages: Python, JavaScript/TypeScript, Java, C++
- Web Technologies: React, Next.js, Node.js, Express
- AI/ML: TensorFlow, PyTorch, Scikit-learn
- Cloud: AWS, Google Cloud Platform
- Databases: MongoDB, PostgreSQL
- Tools: Git, Docker, Kubernetes

EXPERIENCE
- Full Stack Developer at Various Projects
  - Developed responsive web applications using React and Next.js
  - Implemented RESTful APIs using Node.js and Express
  - Worked with databases like MongoDB and PostgreSQL
  - Utilized cloud services from AWS and Google Cloud

- AI/ML Engineer
  - Implemented machine learning models using TensorFlow and PyTorch
  - Developed computer vision applications
  - Created natural language processing solutions
  - Deployed ML models to production environments

PROJECTS
- Portfolio Website
  - Built with Next.js, TypeScript, and Tailwind CSS
  - Features modern design principles and animations
  - Implements Material Design 3 guidelines

- AI-Powered Applications
  - Developed various AI/ML applications
  - Implemented computer vision and NLP solutions
  - Created chatbots and recommendation systems

INTERESTS
- Artificial Intelligence and Machine Learning
- Web Development and Modern Technologies
- Cloud Computing and Distributed Systems
`;

export async function POST(req: NextRequest) {
  try {
    const { message, resumeData, chatHistory } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    try {
      const chat = model.startChat({
        history: chatHistory,
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 2048,
          topK: 40,
          topP: 0.8,
        },
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      const text = response.text();

      // Format the response with proper markdown
      const formattedText = text
        .replace(/\n\n/g, '\n') // Remove extra newlines
        .replace(/^/gm, '') // Remove any leading spaces
        .trim(); // Remove trailing whitespace

      return NextResponse.json({ message: formattedText });
    } catch (error: any) {
      console.error('Gemini API error:', error);
      return NextResponse.json(
        { 
          error: 'Failed to generate response',
          details: error?.message || 'Unknown error'
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Request processing error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process request',
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
} 