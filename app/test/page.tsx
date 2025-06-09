'use client';

import { useState } from 'react';
import { Button, Paper, Typography, CircularProgress } from '@mui/material';

export default function TestPage() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    try {
      setLoading(true);
      setError(null);
      setResult('');

      console.log('Testing Gemini connection...');
      const response = await fetch('http://localhost:3008/api/test-gemini', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      console.log('Response status:', response.status);
      const contentType = response.headers.get('content-type');
      console.log('Content type:', contentType);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (!data.success) {
        throw new Error(data.error || 'Test failed');
      }

      setResult(data.message);
    } catch (err) {
      console.error('Test error:', err);
      setError(err instanceof Error ? err.message : 'Failed to test connection');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Paper className="p-6 max-w-2xl mx-auto">
        <Typography variant="h4" className="mb-4">
          Gemini API Connection Test
        </Typography>
        
        <Button 
          variant="contained" 
          onClick={testConnection}
          disabled={loading}
          className="mb-4"
        >
          {loading ? <CircularProgress size={24} /> : 'Test Connection'}
        </Button>

        {error && (
          <Typography color="error" className="mb-2 whitespace-pre-wrap">
            Error: {error}
          </Typography>
        )}

        {result && (
          <Typography className="p-4 bg-primary/10 rounded whitespace-pre-wrap">
            Response: {result}
          </Typography>
        )}
      </Paper>
    </div>
  );
} 