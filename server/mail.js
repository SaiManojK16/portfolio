const nodemailer = require('nodemailer');

// Email configuration
const createTransporter = async () => {
  // Debug environment variables
  console.log('Email Config:', {
    user: process.env.EMAIL_USER ? 'Set' : 'Not Set',
    pass: process.env.EMAIL_PASS ? 'Set' : 'Not Set',
    to: process.env.EMAIL_TO ? 'Set' : 'Not Set'
  });

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Email configuration is missing. Please check your environment variables.');
  }

  // Create transporter with retry logic
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // Add TLS options
    tls: {
      rejectUnauthorized: true
    },
    // Add pooling for better performance
    pool: true,
    maxConnections: 3,
    maxMessages: 100,
    rateDelta: 1000,
    rateLimit: 5
  });

  // Verify SMTP connection configuration
  try {
    await transporter.verify();
    console.log('SMTP Connection verified successfully!');
    return transporter;
  } catch (error) {
    console.error('SMTP Connection Error:', error);
    throw error;
  }
};

async function sendEmail({ name, email, message }) {
  try {
    const transporter = await createTransporter();

    // Email content
    const mailOptions = {
      from: {
        name: name,
        address: process.env.EMAIL_USER
      },
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Portfolio Contact: Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
      // Add text version for better deliverability
      text: `
New Contact Form Submission
--------------------------
Name: ${name}
Email: ${email}

Message:
${message}
      `.trim(),
    };

    console.log('Attempting to send email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
    });

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(
      error instanceof Error 
        ? `Failed to send email: ${error.message}`
        : 'Failed to send email: Unknown error'
    );
  }
}

module.exports = { sendEmail }; 