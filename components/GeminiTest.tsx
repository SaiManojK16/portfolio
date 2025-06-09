'use client';

import React, { useState } from 'react';
import { Paper, TextField, Button, Typography, CircularProgress } from '@mui/material';

export const GeminiTest = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setError('');
    setResponse('');

    try {
      console.log('Sending request to Gemini API...');
      const res = await fetch('http://localhost:3001/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to get response');
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to get response');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Paper className="p-6 max-w-2xl mx-auto">
      <Typography variant="h5" className="mb-4">
        Test Gemini API
      </Typography>

      <div className="space-y-4">
        <TextField
          fullWidth
          multiline
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your prompt here..."
          disabled={loading}
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!prompt.trim() || loading}
          className="w-full"
        >
          {loading ? <CircularProgress size={24} /> : 'Send'}
        </Button>

        {error && (
          <Typography color="error" className="mt-4">
            Error: {error}
          </Typography>
        )}

        {response && (
          <Paper className="p-4 bg-primary/5 mt-4">
            <Typography variant="body1" className="whitespace-pre-wrap">
              {response}
            </Typography>
          </Paper>
        )}
      </div>
    </Paper>
  );
}; 