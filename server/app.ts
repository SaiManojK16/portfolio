import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { generateResponse } from "./controllers/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: new URL('../.env.local', import.meta.url).pathname });

const app = express();
const port = 3008; // Fixed port to 3008

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post("/generate", generateResponse);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 