import type { Express } from "express";
import { createServer, type Server } from "http";
import nodemailer from "nodemailer";
import apiRoutes from "./api/main";
import productsRoutes from "./api/products";
import authRoutes from "./api/auth";
import chatRoutes from "./api/chat";

export async function registerRoutes(app: Express): Promise<Server> {
  // Register API routes
  console.log("Registering API routes...");
  app.use("/api/auth", authRoutes);
  app.use("/api/chat", chatRoutes);
  app.use("/api", apiRoutes);
  app.use("/api/products", productsRoutes);
  console.log("API routes registered successfully");

  // Contact form endpoint (keeping legacy endpoint for compatibility)
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;
      const trimmedEmail = typeof email === "string" ? email.trim() : "";

      // Basic email format validation (RFC5322 compliant subset)
      const emailRegex = /^(?!.*\.\.)[A-Z0-9._%+-]+@[A-Z0-9-]+(\.[A-Z0-9-]+)*\.[A-Z]{2,}$/i;

      // Validate required fields are here
      if (!name || !trimmedEmail || !message) {
        return res.status(400).json({
          success: false,
          message: "Name, email, and message are required"
        });
      }

      if (!emailRegex.test(trimmedEmail)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email address"
        });
      }

      // Check if email is configured via environment variables
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        return res.status(503).json({
          success: false,
          message: "Email service not configured. Please contact administrator."
        });
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
        to: process.env.EMAIL_TO || "info@shashvattrading.com",
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

      res.json({
        success: true,
        message: "Email sent successfully"
      });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({
        success: false,
        message: "Failed to send email. Please try again later."
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
