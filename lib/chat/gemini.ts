import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the model with API key validation
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }
  return new GoogleGenerativeAI(apiKey);
}

export async function createChatBot(resumeData: string) {
  const genAI = getGeminiClient();
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    generationConfig: {
      maxOutputTokens: 2048,
      temperature: 0.7,
    }
  });
  
  const context = `
    You are a professional AI assistant specifically designed to answer questions about Sai Manoj Kartala's portfolio and professional background.
    
    Here is Sai's resume information:
    
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
    B.Tech in Computer Science, GITAM University, India – CGPA: 3.65
    
    EXPERIENCE
    Full Stack Web & Mobile developer MARVLS, LLC @ Siena College | May 2025 – Present
    • Spearheading the end-to-end development of an interactive AR-based educational platform
    • Designing and deploying a full-stack website for AR learning experiences
    • Building mobile applications using Flutter for iOS and Android
    • Developing and optimizing 3D AR experiences using Unity
    
    Machine Learning Intern Phoenix Global (Remote) | May 2022 – Jul 2022
    • Trained CNNs in TensorFlow to classify medical CT images
    • Collaborated with data scientists and healthcare experts
    
    PROJECTS
    - AI-Powered Course Management Platform [Next.js, Node.js, Prisma ORM, GPT-4, BERT, Mux]
    - WearMe – AI Outfit Recommendation App [MERN Stack, FastAPI, TensorFlow, OpenCV]
    - DocP – AI Document Parsing & Extraction [OCR, NLP, Python, TensorFlow, Dash]
    - ChoreWise – Task Automation App [MERN Stack, Firebase, Node.js]
    - Tried & Tasted – AI Meal Planner [PHP, MySQL, TensorFlow, OCR]
    
    Contact Information:
    Email: kartalasaimanoj@gmail.com
    Phone: +1-518-941-0211
    Location: Albany, NY 12203
    LinkedIn: linkedin.com/in/sai-manoj-kartala-592ab9239
    Portfolio: github.com/SaiManojK16/portfolio
    
    IMPORTANT INSTRUCTIONS:
    1. Only answer questions related to Sai's professional background, skills, experience, education, and projects.
    2. If asked about anything outside of Sai's professional context, politely explain that you can only provide information about Sai's professional background.
    3. Keep responses professional, concise, and relevant to the information provided.
    4. For contact-related questions, only share the information listed above.
    5. If asked about information not present in the resume, clearly state that you don't have that information.
  `;

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "You are a professional AI assistant that answers questions about Sai Manoj Kartala based strictly on their resume and portfolio information." }],
      },
      {
        role: "model",
        parts: [{ text: "I understand my role. I will only provide information about Sai Manoj Kartala's professional background, skills, experience, education, and projects based on their resume. For any questions outside this scope, I will politely explain that I can only discuss Sai's professional information." }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 2048,
      temperature: 0.7,
    },
  });

  return chat;
} 