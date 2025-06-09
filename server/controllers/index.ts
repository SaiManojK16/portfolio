import { Request, Response } from "express";
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from "dotenv";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
dotenv.config({ path: new URL('../../.env.local', import.meta.url).pathname });

// GoogleGenerativeAI required config
const configuration = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Model initialization
const model = configuration.getGenerativeModel({ 
  model: "gemini-2.0-flash",
  generationConfig: {
    maxOutputTokens: 2048,
    temperature: 0.7,
  }
});

// These arrays are to maintain the history of the conversation
const conversationContext: [string, string][] = [];
const currentMessages: { role: string; parts: { text: string }[] }[] = [];

// Controller function to handle chat conversation
export const generateResponse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      res.status(400).json({ message: "Prompt is required" });
      return;
    }

    // Restore the previous context
    for (const [inputText, responseText] of conversationContext) {
      currentMessages.push({ role: "user", parts: [{ text: inputText }] });
      currentMessages.push({ role: "model", parts: [{ text: responseText }] });
    }

    const chat = model.startChat({
      history: currentMessages,
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage([{ text: prompt }]);
    const response = await result.response;
    const responseText = response.text();

    // Stores the conversation
    conversationContext.push([prompt, responseText]);
    res.json({ response: responseText });

  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      message: "Internal server error",
      details: err instanceof Error ? err.message : "Unknown error"
    });
  }
}; 