require("dotenv").config();
const nodemailer = require("nodemailer");

async function testEmail() {
  try {
    // Debug environment variables
    console.log('Checking environment variables...');
    const envVars = {
      EMAIL_USER: process.env.EMAIL_USER,
      EMAIL_PASS: process.env.EMAIL_PASS ? '****' : undefined,
      EMAIL_TO: process.env.EMAIL_TO
    };
    console.log('Environment variables:', envVars);

    // Validate environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Missing required environment variables. Please check your .env file:\n' +
        '- EMAIL_USER: ' + (process.env.EMAIL_USER ? '✓' : '✗') + '\n' +
        '- EMAIL_PASS: ' + (process.env.EMAIL_PASS ? '✓' : '✗') + '\n' +
        '- EMAIL_TO: ' + (process.env.EMAIL_TO ? '✓' : '✗ (optional)')
      );
    }

    // Create transporter
    console.log('Creating transporter...');
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      debug: true, // Enable debug logs
      logger: true  // Log to console
    });

    // Verify connection configuration
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('SMTP connection verified successfully!');

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: "Test Email from Portfolio",
      text: "This is a test email from your portfolio website.",
      html: `
        <h2>Test Email</h2>
        <p>This is a test email from your portfolio website.</p>
        <p>If you're receiving this, your email configuration is working correctly!</p>
        <hr>
        <p><strong>Environment Variables:</strong></p>
        <ul>
          <li>EMAIL_USER: ${process.env.EMAIL_USER ? '✓' : '✗'}</li>
          <li>EMAIL_PASS: ${process.env.EMAIL_PASS ? '✓' : '✗'}</li>
          <li>EMAIL_TO: ${process.env.EMAIL_TO ? '✓' : '✗ (optional)'}</li>
        </ul>
      `
    };

    // Send email
    console.log('Sending test email...');
    console.log('Mail options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    
    return info;
  } catch (error) {
    console.error('Error in test email:', error);
    throw error;
  }
}

// Run the test
testEmail()
  .then(() => {
    console.log('Test completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Test failed:', error);
    process.exit(1);
  }); 