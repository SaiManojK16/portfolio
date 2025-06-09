'use client';

import React, { useState, useRef, useEffect } from 'react';
import { IconSend, IconRobot, IconUser, IconMoodSmile, IconExternalLink, IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Quick reply options with emojis
const QUICK_REPLIES = [
  { emoji: '👨‍💼', text: 'About Me' },
  { emoji: '📄', text: 'View Resume' },
  { emoji: '💻', text: 'Projects' },
  { emoji: '🧠', text: 'Skills' },
  { emoji: '🎓', text: 'Education' },
  { emoji: '🏆', text: 'Achievements' },
  { emoji: '📧', text: 'Contact' }
];

// Contact information
const CONTACT_INFO = {
  email: 'kartalasaimanoj@gmail.com',
  phone: '+1-518-941-0211',
  linkedin: 'https://www.linkedin.com/in/sai-manoj-kartala-592ab9239/',
  github: 'https://github.com/SaiManojK16'
};

// Resume data that will be used by the chatbot
const RESUME_DATA = `
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
  M.S. in Computer Science, SUNY Albany, NY – GPA: 3.49 Courses: Software Engineering, Artificial Intelligence, Operating Systems, DBMS, Algorithms & Data Structures
  2024–2025
  B.Tech in Computer Science, GITAM University, India – CGPA: 3.65 Courses: Analysis and Design of Algorithms, Data Structures, Theory of Computation, Advanced Java, Web Technology
  2019–2023

  EXPERIENCE
  Full Stack Web & Mobile developer MARVLS, LLC @ Siena College | May 2025 – Present
  • Spearheading the end-to-end development of an interactive AR-based educational platform as part of the MARVLS research
  initiative.
  • Designing and deploying a full-stack website from scratch to showcase and support AR learning experiences.
  • Building mobile applications using Flutter for both iOS and Android, integrating real-time AR models with educational
  content.
  • Developing and optimizing 3D AR experiences using Unity for interactive STEM visualizations.
  Machine Learning Intern Phoenix Global (Remote) | May 2022 – Jul 2022
  • Trained CNNs in TensorFlow to classify medical CT images, improving accuracy by 15%.
  • Collaborated with data scientists and healthcare experts, validating model reliability on 5,000 clinical samples.

  EXTRACURRICULAR
  Data Structures Grader • Evaluated weekly programming submissions for 50+ undergraduates with 99% accuracy.
  • Automated grading using Python, reducing manual effort by 40%.
  SUNY Albany | Sep 2024 – May 2025
  Computer Graphics Lab Assistant • Supported 10+ OpenGL projects, managing lab setups for 50+ students.
  • Mentored students on graphics projects, improving success rates by 25%.
  GITAM University | Dec 2019 – Apr 2022

  PROJECTS
  AI-Powered Course Management Platform [Next.js, Node.js, Prisma ORM, GPT-4, BERT, Mux]
  • Built academic platform with assignment submission, real-time collaboration, and structured student–teacher interaction.
  • Integrated secure code execution and AI-powered document editor for coursework and grading workflows.
  WearMe – AI Outfit Recommendation App [MERN Stack, FastAPI, TensorFlow, OpenCV]
  • Built AI styling assistant recommending weather-based outfits with fabric, color, and occasion matching.
  • Used MERN, FastAPI, TensorFlow with a wardrobe dashboard for full-stack personalization.
  DocP – AI Document Parsing & Extraction [OCR, NLP, Python, TensorFlow, Dash]
  • Developed OCR + NLP parser improving data accuracy by 20%.
  • Built AI-powered dashboards reducing decision-making time by 30%.
  • Featured as Best Project at University Showcase.
  ChoreWise – Task Automation App [MERN Stack, Firebase, Node.js]
  • Mobile app for roommates to manage and assign chores.
  • Includes real-time chat and reduced household conflict by 40%.
  Tried & Tasted – AI Meal Planner [PHP, MySQL, TensorFlow, OCR]
  • Built full-stack platform to plan meals, auto-generate shopping lists, and scale recipes.
  • Personalized with SQL logic and AI assistance using PHP, MySQL, TensorFlow, and OCR.
`;

interface Message {
  sender: 'user' | 'bot';
  text: string;
  action?: {
    type: 'link' | 'email' | 'social';
    value?: string;
    label?: string;
    links?: Array<{
      type: string;
      url: string;
      label: string;
    }>;
  };
}

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([{
    sender: 'bot',
    text: "Hi! I'm here to walk you through Sai's portfolio. What would you like to know?"
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const quickRepliesRef = useRef<HTMLDivElement>(null);

  // Scroll handling for quick replies
  const scrollQuickReplies = (direction: 'left' | 'right') => {
    if (quickRepliesRef.current) {
      const scrollAmount = 200;
      quickRepliesRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSpecialActions = async (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    // Handle resume request
    if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
      setMessages(prev => [...prev, 
        { sender: 'user', text: message },
        { 
          sender: 'bot', 
          text: "I'll help you access Sai's resume. You can view or download it using the link below:",
          action: {
            type: 'link',
            value: '/resume.pdf',
            label: 'View Resume'
          }
        }
      ]);
      return true;
    }
    
    // Handle contact request
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach') || lowerMessage.includes('social')) {
      setMessages(prev => [...prev, 
        { sender: 'user', text: message },
        { 
          sender: 'bot', 
          text: `Here's how you can reach Sai:\n\nEmail: ${CONTACT_INFO.email}\nPhone: ${CONTACT_INFO.phone}\n\nYou can also connect with Sai on:`,
          action: {
            type: 'social',
            links: [
              { type: 'linkedin', url: CONTACT_INFO.linkedin, label: 'LinkedIn Profile' },
              { type: 'github', url: CONTACT_INFO.github, label: 'GitHub Profile' }
            ]
          }
        }
      ]);
      return true;
    }

    return false;
  };

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim() || isLoading) return;

    setError('');
    setIsLoading(true);
    setInput('');

    // Check for special actions first
    const isSpecialAction = await handleSpecialActions(userMessage);
    if (isSpecialAction) {
      setIsLoading(false);
      return;
    }

    // Regular message handling
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);

    try {
      const initialSystemInstruction = `
        You are a helpful, professional, and courteous personal assistant AI for Sai Manoj Kartala.
        Your ABSOLUTE and ONLY task is to answer questions strictly and solely based on the provided resume content.
        You MUST NOT infer, assume, or generate any information not explicitly present in the resume.
        When answering, ALWAYS use phrases like "Sai Manoj Kartala is...", "Sai has...", "Sai's experience includes...", or "According to Sai's resume..." to maintain a personal assistant tone.
        If a question CANNOT be answered directly and entirely from the resume, you MUST clearly state that you do not have that information in the resume. For example: "I apologize, but Sai Manoj Kartala's resume does not contain information about [topic]."
        Keep your responses concise, professional, and directly relevant to Sai's professional experience, skills, projects, and education mentioned in the resume.
        Do NOT engage in discussions or provide information outside the direct scope of the resume.

        Resume Content:
        ${RESUME_DATA}
      `;

      let chatHistory = [
        { role: 'user', parts: [{ text: initialSystemInstruction }] },
        { role: 'model', parts: [{ text: 'I understand. I will act as a personal assistant, providing information about Sai Manoj Kartala based strictly and solely on the provided resume. I will clearly indicate if information is not available in the resume, and will not add any external details.' }] },
      ];

      messages.forEach(msg => {
        chatHistory.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      });

      chatHistory.push({ role: 'user', parts: [{ text: userMessage }] });

      const payload = {
        contents: chatHistory,
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 200,
        },
      };

      // Get API key from environment variable
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage,
          resumeData: RESUME_DATA,
          chatHistory
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.message) {
        setMessages(prev => [...prev, { sender: 'bot', text: result.message }]);
      } else {
        throw new Error('No valid response received from the chatbot.');
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: "I apologize, but I'm having trouble processing your request right now. Could you try again in a moment?"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (text: string) => {
    sendMessage(`Tell me about Sai's ${text.toLowerCase()}`);
  };

  return (
    <div className="flex flex-col h-full max-h-[600px] bg-background rounded-lg overflow-hidden border shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-primary text-primary-foreground border-b">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center">
            <IconRobot className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Chat with Sai's AI</h2>
            <p className="text-sm opacity-90">
              Ask me about Sai's experience and skills
            </p>
          </div>
        </div>
      </div>

      {/* Quick Reply Chips */}
      <div className="border-b p-2 bg-accent/5">
        <div 
          ref={quickRepliesRef}
          className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-accent/10 scrollbar-track-transparent scroll-smooth"
        >
          {QUICK_REPLIES.map((reply, index) => (
            <button
              key={index}
              onClick={() => handleQuickReply(reply.text)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent hover:bg-accent/80 transition-colors text-sm whitespace-nowrap text-accent-foreground"
              disabled={isLoading}
            >
              <span className="text-base">{reply.emoji}</span>
              <span>{reply.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={cn(
              "flex gap-2 animate-in fade-in-0 duration-300",
              msg.sender === 'user' ? "justify-end" : "justify-start"
            )}
          >
            {msg.sender === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <IconRobot className="h-5 w-5 text-accent-foreground" />
              </div>
            )}
            <div
              className={cn(
                "max-w-[80%] p-3 rounded-lg shadow-sm break-words",
                msg.sender === 'bot'
                  ? "bg-accent text-accent-foreground rounded-tl-none"
                  : "bg-primary text-primary-foreground rounded-tr-none"
              )}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              {msg.action && (
                <div className="mt-2 pt-2 border-t border-border/50">
                  {msg.action.type === 'social' ? (
                    <div className="flex flex-col gap-2">
                      {msg.action.links?.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                        >
                          {link.type === 'linkedin' ? (
                            <IconBrandLinkedin className="h-4 w-4" />
                          ) : (
                            <IconBrandGithub className="h-4 w-4" />
                          )}
                          {link.label}
                          <IconExternalLink className="h-4 w-4" />
                        </a>
                      ))}
                    </div>
                  ) : msg.action.type === 'link' ? (
                    <a
                      href={msg.action.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                    >
                      {msg.action.label}
                      <IconExternalLink className="h-4 w-4" />
                    </a>
                  ) : (
                    <a
                      href={`mailto:${msg.action.value}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                    >
                      {msg.action.label}
                      <IconExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                <IconUser className="h-5 w-5 text-primary-foreground" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-2 animate-in fade-in-0">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
              <IconRobot className="h-5 w-5 text-accent-foreground" />
            </div>
            <div className="max-w-[80%] p-3 rounded-lg bg-accent text-accent-foreground rounded-tl-none">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-accent-foreground/50 animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 rounded-full bg-accent-foreground/50 animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 rounded-full bg-accent-foreground/50 animate-bounce" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4 bg-accent/5">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              placeholder="Ask me anything about Sai's work..."
              disabled={isLoading}
              className="w-full p-3 pr-20 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground/70"
            />
            <button
              onClick={() => setInput(prev => prev + '😊')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-accent/50 transition-colors text-muted-foreground"
              type="button"
              title="Add emoji"
            >
              <IconMoodSmile className="h-5 w-5" />
            </button>
          </div>
          <Button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            className="shrink-0 h-12 px-6"
            title="Send message"
          >
            <IconSend className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground text-center">
          Press Enter to send your message
        </p>
      </div>
    </div>
  );
}; 