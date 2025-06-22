const dotenv = require('dotenv');
const path = require('path');

// Load .env.local file
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const Anthropic = require('@anthropic-ai/sdk');

// Debug: Check if API key is loaded
const apiKey = process.env.ANTHROPIC_API_KEY;
console.log('API Key loaded:', apiKey ? `${apiKey.slice(0, 10)}...` : 'NOT FOUND');

const anthropic = new Anthropic({ apiKey: apiKey || "" });

(async () => {
  try {
    const response = await anthropic.models.list();
    console.log('Full response:', response);
    if (response && response.models) {
      console.log('Available Claude models:');
      console.log(response.models.map(m => m.id).join('\n'));
    } else {
      console.log('No models property found in response.');
    }
  } catch (error) {
    console.error('Error fetching models:', error.message);
  }
})(); 