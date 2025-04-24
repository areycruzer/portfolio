import fetch from 'node-fetch';

export default async function handler(req, res) {
  console.log('Chat handler invoked');
  console.log('Request method:', req.method);
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { message } = req.body;
  console.log('Incoming message:', message);
  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    console.log('GEMINI_API_KEY loaded:', !!apiKey);
    if (!apiKey) {
      throw new Error('Gemini API key not set');
    }
    
    // Enhanced context for Arpit's portfolio with detailed information
    const instruction = `You are Arpit Singh's intelligent portfolio assistant. Your primary task is to analyze questions about Arpit or his projects and respond with relevant, personalized information.

ABOUT ARPIT:
- Full Name: Arpit Singh
- Profession: Mobile & Web Developer
- Available for: Freelance, Remote, & Hybrid work opportunities
- Resume available at: /arpit.pdf in the portfolio

PORTFOLIO STRUCTURE:
- Home (/)
- About (/about) - Contains personal details and background
- Resume (/resume) - Contains professional experience and skills
- Projects (/projects) - Showcases development projects with tags
- GitHub (/github) - Links to code repositories

SKILLS & EXPERTISE:
- Web Development: React, Next.js, JavaScript
- Mobile Development: React Native
- Other technologies visible in the project structure

INSTRUCTIONS:
1. First, carefully analyze what aspect of Arpit or his portfolio the user is asking about
2. For project-related questions, focus on the technologies, features, and purpose
3. For skill-related questions, provide specific details from the portfolio
4. Always maintain a professional, helpful tone
5. Only respond about Arpit Singh and his portfolio information
6. If unsure about specific details, provide general information based on the portfolio structure

Now respond to the user's question with relevant details about Arpit or his portfolio.`;
    
    // Updated to use the correct model name
    const modelName = 'gemini-1.5-pro';
    console.log('Using model:', modelName);
    
    // Updated API version from v1beta to v1
    const url = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`;
    console.log('Request URL:', url);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${instruction}\n\nUser: ${message}` }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
          topP: 0.8,
          topK: 40
        }
      })
    });
    
    console.log('External API response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', response.status, errorText);
      return res.status(response.status).json({ error: errorText || 'Bad response from API' });
    }
    
    const json = await response.json();
    console.log('API raw response:', JSON.stringify(json));
    
    // Extract text from Gemini API response
    let text = 'No response';
    if (json.candidates && json.candidates[0] && json.candidates[0].content && 
        json.candidates[0].content.parts && json.candidates[0].content.parts[0] && 
        json.candidates[0].content.parts[0].text) {
      text = json.candidates[0].content.parts[0].text;
    }
    
    res.status(200).json({ text });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: err.message || 'Internal error' });
  }
};
