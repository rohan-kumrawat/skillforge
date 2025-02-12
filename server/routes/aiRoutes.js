import { Router } from 'express';
import OpenAI from 'openai';
import { authMiddleware } from '../utils/authMiddleware.js';

const router = Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// AI-Powered Learning Path Generator
router.post('/generate-path', authMiddleware, async (req, res) => {
  const { goal, level } = req.body;
  
  try {
    const prompt = `
      Create a personalized 6-month learning roadmap for a ${level} level developer 
      aiming to become a ${goal}. Include monthly milestones, resources, and projects.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    res.json({ path: response.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ error: 'AI Service Error' });
  }
});

export default router;