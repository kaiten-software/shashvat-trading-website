import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import nodemailer from "nodemailer";

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: "Method not allowed" })
    };
  }

  try {
    const { name, email, phone, message } = JSON.parse(event.body || "{}");
    const trimmedEmail = typeof email === "string" ? email.trim() : "";

    // Basic email format validation (RFC5322 compliant subset)
    const emailRegex = /^(?!.*\.\.)[A-Z0-9._%+-]+@[A-Z0-9-]+(\.[A-Z0-9-]+)*\.[A-Z]{2,}$/i;

    // Validate required fields
    if (!name || !trimmedEmail || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          message: "Name, email, and message are required" 
        })
      };
    }

    if (!emailRegex.test(trimmedEmail)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "Please enter a valid email address"
        })
      };
    }

    // Check if email is configured via environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      return {
        statusCode: 503,
        body: JSON.stringify({ 
          success: false, 
          message: "Email service not configured. Please contact administrator." 
        })
      };
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || "info@rajgreenenergy.com",
      subject: `Contact Request from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${trimmedEmail}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>This email was sent from the Shizensui website contact form.</small></p>
      `,
      replyTo: trimmedEmail
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: "Email sent successfully" 
      })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        message: "Failed to send email. Please try again later." 
      })
    };
  }
};
