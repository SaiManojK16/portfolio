import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.0-flash",
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 2048,
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

    const payload = {
      contents: chatHistory,
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 200,
      },
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
      return NextResponse.json({
        message: result.candidates[0].content.parts[0].text
      });
    } else {
      throw new Error('No valid response received from the chatbot.');
    }
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
} 