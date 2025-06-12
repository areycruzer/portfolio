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
        // Basic information about Swyam
      'about': "I'm Swyam Sharma, a passionate Software Developer with experience in full-stack development, AI/ML, and cybersecurity. I enjoy building impactful tech solutions like smart email managers, virtual try-on tools, and real-time utilities, with a focus on clean design and meaningful user experience.",

      'contact': "You can contact me via email or through the contact form on this website. I'm open to freelance, remote, and collaborative opportunities in development, research, or innovation-driven projects.",

      'skills': "My key skills include Python, C/C++, JavaScript, React.js, Firebase, MongoDB, MySQL, TensorFlow, Tailwind CSS, Git, and tools like Google Gemini and blockchain technologies. I also work with APIs, automation, and machine learning frameworks.",

      'projects': "I've worked on several projects, including an AI-powered email assistant (Aid – Emails), a real-time clipboard app (Magic Clipboard), a virtual try-on solution (SWYF), a crypto crimes tracker, and more. Check out the Projects page for full details.",

      'education': "I'm pursuing a B.Tech in Computer Science and Engineering at GGSIPU - VIPS-TC, and actively engage in hackathons, tech workshops, and sustainability-focused tech initiatives.",

      'experience': "You can view my professional experience and project contributions on the Resume page. I've interned with Gurugram Police in cybersecurity, worked as a Sustainable Advisor at InBlue, and currently serve as Technical Head at the Career Development Centre at VIPS-TC.",

      'default': "Thanks for your message! I'm Swyam's portfolio assistant. Ask me about his projects, skills, experience, or anything else you'd like to know about his journey in tech."

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
        responseText = "Hello! I'm Swyam's portfolio assistant. How can I help you today?";
      }
      
      // Return the response without calling an external API
      return res.status(200).json({ text: responseText });
    }
    
    // Enhanced context for SWYAM's portfolio with detailed information
    const instruction = `You are Swyam Sharma's intelligent portfolio assistant. Your primary task is to analyze questions about Swyam or his projects and respond with relevant, personalized information.

ABOUT Swyam:
- Full Name: Swyam Singh
- Profession: Mobile & Web Developer
- Available for: Freelance, Remote, & Hybrid work opportunities
- Resume available at: /swyam.pdf in the portfolio

PORTFOLIO STRUCTURE:
- Home (/)
- About (/about) - Contains personal details and background
- Resume (/resume) - Contains professional experience and skills
- Projects (/projects) - Showcases development projects with tags
- GitHub (/github) - Links to code repositories

SKILLS & EXPERTISE:
- Web Development: React.js, Tailwind CSS, JavaScript, HTML, CSS
- Mobile Development: React Native (basic proficiency)
- AI/ML & Data Science: Python, TensorFlow, Pandas, NumPy, Google Gemini
- Backend & Databases: Firebase, MongoDB, MySQL
- Other Technologies: Git, WebSockets, Blockchain (basic), AR/VR (experimental), Clipboard API, API Integration


INSTRUCTIONS:
1. First, carefully analyze what aspect of Swyam or his portfolio the user is asking about
2. For project-related questions, focus on the technologies, features, and purpose
3. For skill-related questions, provide specific details from the portfolio
4. Always maintain a professional, helpful tone
5. Only respond about Swyam Sharma and his portfolio information
6. If unsure about specific details, provide general information based on the portfolio structure

Now respond to the user's question with relevant details about Swyam or his portfolio.`;
    
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
       'about': "I'm Swyam Sharma, a Software Developer skilled in full-stack development, AI/ML, and cybersecurity. I love building practical tech solutions—ranging from email automation and virtual try-ons to real-time utilities—with a focus on usability and impact.",

        'contact': "You can contact Swyam via email or through the contact form on this website. He's open to freelance, remote, and collaborative roles in tech development, research, and innovation.",

        'skills': "Swyam's key skills include Python, C/C++, JavaScript, React.js, Firebase, MongoDB, MySQL, Tailwind CSS, TensorFlow, Git, and Google Gemini. He also explores AR/VR, automation tools, and basic blockchain integration.",

        'projects': "Swyam has developed diverse projects including Aid – an AI-powered email assistant, Magic Clipboard – a real-time clipboard sharing app, SWYF – a virtual try-on fashion tool, and a crypto crime tracker. Visit the Projects page for more details.",

        'education': "Swyam is currently pursuing a B.Tech in Computer Science and Engineering at GGSIPU - VIPS-TC. He actively participates in hackathons, tech communities, and sustainability-driven innovation.",

      'experience': "Details about Swyam's professional journey can be found on the Resume page. His experience includes interning with Gurugram Police in cybersecurity, serving as Sustainable Advisor at InBlue, and currently working as Technical Head at the Career Development Centre (VIPS-TC).",

      'default': "Thanks for your message! I'm Swyam's portfolio assistant. You can ask me about his skills, projects, experience, or anything else about his tech journey."

      };
      
      const lowerMessage = message.toLowerCase();
      let responseText = fallbackResponses.default;
      
      Object.keys(fallbackResponses).forEach(key => {
        if (key !== 'default' && lowerMessage.includes(key)) {
          responseText = fallbackResponses[key];
        }
      });
      
      if (lowerMessage.match(/^(hi|hello|hey|greetings)/i)) {
        responseText = "Hello! I'm Swyam's portfolio assistant. How can I help you today?";
      }
      
      return res.status(200).json({ text: responseText });
    }
    
    res.status(200).json({ text });
  } catch (err) {
    console.error('Chat error:', err);
    // Always provide a fallback response even if there's an error
    const fallbackResponse = "I'm sorry, I encountered a technical issue. As Swyam's portfolio assistant, I can tell you he's a skilled Mobile & Web Developer specializing in React, Next.js, and various other technologies. Please try asking something else about his skills or projects.";
    res.status(200).json({ text: fallbackResponse });
  }
};
