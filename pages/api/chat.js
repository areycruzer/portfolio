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
    // First try to get the Gemini API key from environment variables
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    console.log('API key available:', !!apiKey);
    
    // If no Gemini API key is available, use a fallback approach with predefined responses
    if (!apiKey) {
      console.log('No API key available, using fallback responses');
      // Simple fallback logic to ensure the chatbot always works
      const fallbackResponses = {
        // Basic information about Arpit
        'about': "I'm Arpit Singh, a Mobile & Web Developer with expertise in React, Next.js, and various frontend and backend technologies. I'm passionate about creating intuitive user experiences and solving complex problems.",
        'contact': "You can contact Arpit via email or through the contact form on this website. He's available for freelance, remote, and hybrid work opportunities.",
        'skills': "Arpit's key skills include JavaScript, React, Next.js, Node.js, Express, MongoDB, Firebase, and AWS. He also works with mobile technologies like React Native.",
        'projects': "Arpit has worked on various projects including web applications, mobile apps, and backend services. You can see details on the Projects page of this portfolio.",
        'education': "Arpit studied Computer Science at National Institute of Technology Hamirpur and is continuously learning new technologies.",
        'experience': "Details about Arpit's professional experience can be found on the Resume page. He has worked on a variety of projects for different clients and companies.",
        'default': "Thanks for your message! I'm Arpit's portfolio assistant. Feel free to ask me about Arpit's skills, projects, experience, or anything else about him."
      };
      
      // Simple matching logic to find the most relevant response
      const lowerMessage = message.toLowerCase();
      let responseText = fallbackResponses.default;
      
      // Find which category the message most likely belongs to
      Object.keys(fallbackResponses).forEach(key => {
        if (key !== 'default' && lowerMessage.includes(key)) {
          responseText = fallbackResponses[key];
        }
      });
      
      // For greetings
      if (lowerMessage.match(/^(hi|hello|hey|greetings)/i)) {
        responseText = "Hello! I'm Arpit's portfolio assistant. How can I help you today?";
      }
      
      // Return the response without calling an external API
      return res.status(200).json({ text: responseText });
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
    
    try {
      // Try Gemini API first
      const modelName = 'gemini-1.5-pro';
      console.log('Using model:', modelName);
      
      const url = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`;
      
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
        throw new Error('API request failed');
      }
      
      const json = await response.json();
      
      // Extract text from Gemini API response
      let text = 'No response';
      if (json.candidates && json.candidates[0] && json.candidates[0].content && 
          json.candidates[0].content.parts && json.candidates[0].content.parts[0] && 
          json.candidates[0].content.parts[0].text) {
        text = json.candidates[0].content.parts[0].text;
      }
      
      return res.status(200).json({ text });
    } catch (apiError) {
      console.error('API request error:', apiError);
      
      // If API call fails, use the fallback response based on keywords
      const fallbackResponses = {
        'about': "I'm Arpit Singh, a Mobile & Web Developer with expertise in React, Next.js, and various frontend and backend technologies. I'm passionate about creating intuitive user experiences and solving complex problems.",
        'contact': "You can contact Arpit via email or through the contact form on this website. He's available for freelance, remote, and hybrid work opportunities.",
        'skills': "Arpit's key skills include JavaScript, React, Next.js, Node.js, Express, MongoDB, Firebase, and AWS. He also works with mobile technologies like React Native.",
        'projects': "Arpit has worked on various projects including web applications, mobile apps, and backend services. You can see details on the Projects page of this portfolio.",
        'education': "Arpit studied Computer Science at National Institute of Technology Hamirpur and is continuously learning new technologies.",
        'experience': "Details about Arpit's professional experience can be found on the Resume page. He has worked on a variety of projects for different clients and companies.",
        'default': "Thanks for your message! I'm Arpit's portfolio assistant. Feel free to ask me about Arpit's skills, projects, experience, or anything else about him."
      };
      
      const lowerMessage = message.toLowerCase();
      let responseText = fallbackResponses.default;
      
      Object.keys(fallbackResponses).forEach(key => {
        if (key !== 'default' && lowerMessage.includes(key)) {
          responseText = fallbackResponses[key];
        }
      });
      
      if (lowerMessage.match(/^(hi|hello|hey|greetings)/i)) {
        responseText = "Hello! I'm Arpit's portfolio assistant. How can I help you today?";
      }
      
      return res.status(200).json({ text: responseText });
    }
    
    res.status(200).json({ text });
  } catch (err) {
    console.error('Chat error:', err);
    // Always provide a fallback response even if there's an error
    const fallbackResponse = "I'm sorry, I encountered a technical issue. As Arpit's portfolio assistant, I can tell you he's a skilled Mobile & Web Developer specializing in React, Next.js, and various other technologies. Please try asking something else about his skills or projects.";
    res.status(200).json({ text: fallbackResponse });
  }
};
