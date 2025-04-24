const fetch = require('node-fetch');
require('dotenv').config();

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('GEMINI_API_KEY not set in .env file');
    return;
  }
  
  try {
    // Try different API versions
    const versions = ['v1', 'v1beta', 'v1beta2', 'v1beta3'];
    
    for (const version of versions) {
      console.log(`Trying API version: ${version}`);
      const url = `https://generativelanguage.googleapis.com/${version}/models?key=${apiKey}`;
      
      const response = await fetch(url);
      console.log(`Status for ${version}: ${response.status}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Available models:');
        if (data.models && data.models.length > 0) {
          data.models.forEach(model => {
            console.log(`- ${model.name} (${model.displayName})`);
            if (model.supportedGenerationMethods) {
              console.log(`  Supported methods: ${model.supportedGenerationMethods.join(', ')}`);
            }
          });
        } else {
          console.log('No models found in response');
          console.log('Full response:', JSON.stringify(data, null, 2));
        }
      } else {
        const errorText = await response.text();
        console.error(`Error for ${version}:`, errorText);
      }
      
      console.log('-----------------------------------');
    }
  } catch (error) {
    console.error('Error listing models:', error);
  }
}

listModels();
