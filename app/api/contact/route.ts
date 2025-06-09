import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mail';
import { z } from 'zod';

// Schema for validating request body
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
});

export async function POST(request: Request) {
  console.log('Contact API route hit');

  try {
    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing email configuration');
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      );
    }

    const body = await request.json();
    console.log('Received request body:', body);
    
    // Validate request body
    const validatedData = contactSchema.parse(body);
    console.log('Validated data:', validatedData);
    
    // Send email
    const result = await sendEmail(validatedData);
    console.log('Email sent result:', result);
    
    return NextResponse.json(
      { message: 'Email sent successfully', messageId: result.messageId },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          message: 'Invalid form data', 
          errors: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      );
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to send email';
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
} 