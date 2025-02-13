import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateLearningPath = async (req, res) => { 
  const { goal, level } = req.body;

  // Mock Response (अगर API Key नहीं है)
  if (!process.env.GEMINI_API_KEY) {
    const mockPath = `
      Month 1: HTML/CSS Basics → Portfolio Website
      Month 2: JavaScript → Todo App
      Month 3: React → Weather App
      Month 4: Node.js → REST API
      Month 5: MongoDB → Database Project
      Month 6: Full-Stack Project (E-commerce)
    `;
    return res.json({ path: mockPath, isMock: true });
  }

  // Real Gemini API Call
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Create a 6-month personalized learning path for a ${level} developer 
      aiming to become a ${goal}. Include monthly topics, projects, and resources.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ 
      path: text,
      isMock: false 
    });

  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'AI Service Failed' });
  }
};
