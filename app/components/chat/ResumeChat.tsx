'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

// Main Chat component for the resume chatbot
export const ResumeChat: React.FC = () => {
  // Your resume data
  const resumeData = `
    Sai Manoj Kartala
    Mail: kartalasaimanoj@gmail.com Phone: +1-518-941-0211 Albany, NY 12203
    LinkedIn: linkedin.com/in/sai-manoj-kartala-592ab9239 Portfolio: github.com/SaiManojK16/portfolio

    PROFESSIONAL SUMMARY
    Full-Stack Developer and AI/ML Engineer with experience designing scalable web platforms and deploying ML pipelines. Proven
    ability to automate processes, optimize data flow, and increase system efficiency. Skilled in MERN stack, FastAPI, TensorFlow,
    and cloud platforms such as AWS and Docker. Adept at cross-functional collaboration and delivering impactful tech solutions.

    TECHNICAL SKILLS
    Languages: Python, JavaScript, Java, C, SQL
    AI/ML: TensorFlow, Hugging Face, OpenCV, Scikit-learn, LangChain, FAISS, ChromaDB
    Web & Backend: MERN Stack, FastAPI, Flask, Node.js, Prisma ORM
    DevOps/Cloud: AWS (Lambda, SageMaker, EC2, S3), Docker, Kubernetes, CI/CD
    Databases & Tools: PostgreSQL, MongoDB, MySQL, Redis, Power BI, Tableau, Git, Jupyter
    Design & Misc: Figma, Unity, Blender, Mux, Postman, Gradio

    EDUCATION
    M.S. in Computer Science, SUNY Albany, NY – GPA: 3.49 
    Courses: Software Engineering, Artificial Intelligence, Operating Systems, DBMS, Algorithms & Data Structures
    2024–2025
    
    B.Tech in Computer Science, GITAM University, India – CGPA: 3.65 
    Courses: Analysis and Design of Algorithms, Data Structures, Theory of Computation, Advanced Java, Web Technology
    2019–2023

    EXPERIENCE
    Full Stack Web & Mobile developer MARVLS, LLC @ Siena College | May 2025 – Present
    • Spearheading the end-to-end development of an interactive AR-based educational platform
    • Designing and deploying a full-stack website for AR learning experiences
    • Building mobile applications using Flutter for iOS and Android
    • Developing and optimizing 3D AR experiences using Unity for STEM visualizations

    Machine Learning Intern Phoenix Global (Remote) | May 2022 – Jul 2022
    • Trained CNNs in TensorFlow to classify medical CT images, improving accuracy by 15%
    • Collaborated with data scientists and healthcare experts, validating model reliability on 5,000 clinical samples

    EXTRACURRICULAR
    Data Structures Grader SUNY Albany | Sep 2024 – May 2025
    • Evaluated weekly programming submissions for 50+ undergraduates with 99% accuracy
    • Automated grading using Python, reducing manual effort by 40%

    Computer Graphics Lab Assistant GITAM University | Dec 2019 – Apr 2022
    • Supported 10+ OpenGL projects, managing lab setups for 50+ students
    • Mentored students on graphics projects, improving success rates by 25%

    PROJECTS
    AI-Powered Course Management Platform [Next.js, Node.js, Prisma ORM, GPT-4, BERT, Mux]
    • Built academic platform with assignment submission and real-time collaboration
    • Integrated secure code execution and AI-powered document editor

    WearMe – AI Outfit Recommendation App [MERN Stack, FastAPI, TensorFlow, OpenCV]
    • Built AI styling assistant recommending weather-based outfits
    • Used MERN, FastAPI, TensorFlow with a wardrobe dashboard

    DocP – AI Document Parsing & Extraction [OCR, NLP, Python, TensorFlow, Dash]
    • Developed OCR + NLP parser improving data accuracy by 20%
    • Built AI-powered dashboards reducing decision-making time by 30%
    • Featured as Best Project at University Showcase

    ChoreWise – Task Automation App [MERN Stack, Firebase, Node.js]
    • Mobile app for roommates to manage and assign chores
    • Includes real-time chat and reduced household conflict by 40%

    Tried & Tasted – AI Meal Planner [PHP, MySQL, TensorFlow, OCR]
    • Built full-stack platform to plan meals and auto-generate shopping lists
    • Personalized with SQL logic and AI assistance
  `;

  // State management
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll effect
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim() || isLoading) return;

    setError('');
    setIsLoading(true);
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          resumeData: resumeData,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to get response (${response.status})`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages(prev => [...prev, { sender: 'bot', text: data.message }]);
    } catch (err) {
      console.error('Chat error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: 'I apologize, but I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background font-sans antialiased">
      {/* Chat Header */}
      <div className="flex items-center justify-center p-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-t-xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Chat with Sai's Resume AI
        </h1>
      </div>

      {/* Chat Messages Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-card rounded-none shadow-inner"
      >
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground italic p-4">
            Hello! I am an AI assistant specialized in answering questions about Sai Manoj Kartala's professional background.
            Feel free to ask about his skills, experience, education, or projects!
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-lg shadow ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-muted text-muted-foreground rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[75%] p-3 rounded-lg shadow bg-muted text-muted-foreground rounded-bl-none">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-foreground"></div>
                <span>Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg mx-4 mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Message Input and Send Button */}
      <div className="flex p-4 bg-card rounded-b-xl shadow">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about Sai's skills, experience, projects, or education..."
          className="flex-1 p-3 bg-background border border-input rounded-l-lg focus:outline-none focus:ring-2 focus:ring-ring"
          disabled={isLoading}
        />
        <button
          onClick={() => sendMessage(input)}
          className={`px-6 py-3 bg-primary text-primary-foreground rounded-r-lg font-semibold shadow transition-colors ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'
          }`}
          disabled={isLoading}
        >
          Send
        </button>
      </div>
    </div>
  );
}; 