"use client"
import React, { useState, useRef, useEffect } from 'react';

// Main App component for the chatbot
export default function App() {
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

  // State to store chat messages
  const [messages, setMessages] = useState([]);
  // State for the current input message
  const [input, setInput] = useState('');
  // State to manage loading status during API calls
  const [isLoading, setIsLoading] = useState(false);
  // State to store any error messages
  const [error, setError] = useState('');

  // Ref for the chat container to enable auto-scrolling
  const chatContainerRef = useRef(null);

  // Scroll to the bottom of the chat container when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  /**
   * Handles sending a message to the Gemini API.
   * @param userMessage The message typed by the user.
   */
  const sendMessage = async (userMessage) => {
    if (!userMessage.trim()) return; // Don't send empty messages

    setError(''); // Clear any previous errors
    setIsLoading(true); // Set loading state to true
    // Add user's message to the chat history
    setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: userMessage }]);
    setInput(''); // Clear the input field

    try {
      // The core instruction for the Gemini model
      const initialSystemInstruction = `
        You are a helpful, professional, and courteous personal assistant AI for Sai Manoj Kartala.
        Your primary task is to answer questions about Sai Manoj Kartala based ONLY on the provided resume content.
        When answering, use phrases like "Sai Manoj Kartala is...", "Sai has...", "Sai's experience includes...", or "According to Sai's resume..." to maintain a personal assistant tone.
        If a question cannot be answered from the resume, clearly state that you do not have that information in the resume (e.g., "I apologize, but Sai Manoj Kartala's resume does not contain information about...").
        Keep your responses concise, professional, and directly relevant to Sai's professional experience, skills, projects, and education mentioned in the resume.
        Do not engage in discussions outside the scope of the resume.

        Resume Content:
        ${resumeData}
      `;

      // Prepare chat history for the API request
      // The initial system instruction is added as the very first 'user' and 'model' exchange
      // to prime the model with its role and the context.
      let chatHistory = [
        { role: 'user', parts: [{ text: initialSystemInstruction }] },
        { role: 'model', parts: [{ text: 'I understand. I will act as a personal assistant, providing information about Sai Manoj Kartala based strictly on the provided resume. I will clearly indicate if information is not available in the resume.' }] },
      ];

      // Append previous conversation turns
      messages.forEach(msg => {
        chatHistory.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      });

      // Add the current user message to the history for this request
      chatHistory.push({ role: 'user', parts: [{ text: userMessage }] });


      // Payload for the Gemini API request
      const payload = {
        contents: chatHistory,
        generationConfig: {
          temperature: 0.7, // Adjust creativity (0.0 - 1.0). Keep lower for factual adherence.
          maxOutputTokens: 200, // Limit response length
        },
      };

      // API key is handled by the Canvas environment for security
      const apiKey = ""; // Leave as empty string for Canvas to inject API key
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`; // Ensure correct model

      // Make the fetch call to the Gemini API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // Check if the response was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Extract the text response from the API result
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const botResponse = result.candidates[0].content.parts[0].text;
        // Add bot's response to the chat history
        setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: botResponse }]);
      } else {
        setError('No valid response received from the chatbot.');
        setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: 'Error: No valid response.' }]);
      }
    } catch (err) {
      console.error('Error during API call:', err);
      setError(`Failed to get a response: ${err.message}`);
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: `Error: ${err.message}` }]);
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  /**
   * Handles the click event for the send button or Enter key press.
   */
  const handleSendClick = () => {
    sendMessage(input);
  };

  /**
   * Handles the key press event in the input field.
   * @param e KeyboardEvent
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendClick();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans antialiased p-4 sm:p-6 lg:p-8">
      {/* Chat Header */}
      <div className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-xl shadow-lg mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Resume AI Assistant
        </h1>
      </div>

      {/* Chat Messages Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white rounded-xl shadow-lg mb-4 space-y-4 border border-gray-200"
      >
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 italic p-4">
            Hello! I am an AI assistant here to answer questions about Sai Manoj Kartala's resume.
            Ask me about his skills, experience, or education!
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-lg shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[75%] p-3 rounded-lg shadow-md bg-gray-200 text-gray-800 rounded-bl-none">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                Thinking...
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4 shadow-md" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Message Input and Send Button */}
      <div className="flex p-2 bg-white rounded-xl shadow-lg border border-gray-200">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask a question about Sai's resume..."
          className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          disabled={isLoading}
        />
        <button
          onClick={handleSendClick}
          className={`px-6 py-3 bg-blue-600 text-white rounded-r-lg font-semibold shadow-md transition duration-300 ease-in-out ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 active:bg-blue-800'
          }`}
          disabled={isLoading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
