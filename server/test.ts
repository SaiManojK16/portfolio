import fetch from 'node-fetch';

async function testGeminiAPI() {
  try {
    const response = await fetch('http://localhost:3008/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: 'Hello! Can you introduce yourself?'
      })
    });

    const data = await response.json();
    console.log('API Response:', data);
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

testGeminiAPI(); 