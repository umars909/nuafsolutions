import express, { Request, Response } from 'express';
import path from 'path';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  urgency?: string;
  message: string;
  status: 'New' | 'Contacted' | 'Scheduled' | 'Completed';
  createdAt: string;
  emailSent: boolean;
  emailError?: string;
}

// In-memory store for leads/inquiries
const inquiriesStore: Inquiry[] = [
  {
    id: 'lead-101',
    name: 'Umar Farooq',
    email: 'umar.f@example.com',
    phone: '+447700900077',
    service: 'Leak Repairs',
    urgency: 'Emergency (24 Hours)',
    message: 'Active water leak under kitchen sink pipe joint. Needs urgent repair.',
    status: 'New',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    emailSent: true
  },
  {
    id: 'lead-100',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    phone: '+447812345678',
    service: 'General Maintenance',
    urgency: 'Standard',
    message: 'Need help fitting a new bathroom radiator and fixing a slow-draining tub.',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    emailSent: true
  }
];

const SMTP_SERVER = process.env.SMTP_SERVER || 'smtp.hotmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || '587');
const YOUR_EMAIL = process.env.YOUR_EMAIL || 'nuafsolutions@hotmail.com';
const YOUR_APP_PASSWORD = process.env.YOUR_APP_PASSWORD || 'ccmq kltb cvot qaxq';
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL || 'nuafsolutions@hotmail.com';

// Lazy Nodemailer initialization
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_SERVER,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: YOUR_EMAIL,
        pass: YOUR_APP_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }
  return transporter;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // CORS middleware for custom clients / tunnels
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Bypass-Tunnel-Reminder');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
      return;
    }
    next();
  });

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'Nuaf Solutions Backend',
      smtpUser: YOUR_EMAIL,
      receiver: RECEIVER_EMAIL,
      timestamp: new Date().toISOString()
    });
  });

  // GET inquiries (Admin / Lead Management)
  app.get('/api/inquiries', (req: Request, res: Response) => {
    res.json({
      success: true,
      inquiries: inquiriesStore
    });
  });

  // PATCH inquiry status
  app.patch('/api/inquiries/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const inquiry = inquiriesStore.find((item) => item.id === id);
    if (!inquiry) {
      res.status(404).json({ success: false, message: 'Inquiry not found' });
      return;
    }
    if (status) {
      inquiry.status = status;
    }
    res.json({ success: true, inquiry });
  });

  // Core Submission Route (Supports both /submit-inquiry and /api/submit-inquiry)
  const handleInquirySubmission = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      if (!data || typeof data !== 'object') {
        res.status(400).json({ status: 'error', message: 'No data received' });
        return;
      }

      const name = data.name?.trim() || '';
      const email = data.email?.trim() || '';
      const message = data.message?.trim() || '';
      const phone = data.phone?.trim() || '';
      const service = data.service?.trim() || 'General Plumbing & Handyman';
      const urgency = data.urgency?.trim() || 'Standard';

      if (!name || !email || !message) {
        res.status(400).json({
          status: 'error',
          message: 'Name, email, and message details are required.'
        });
        return;
      }

      console.log(`\n📬 Processing incoming lead from: ${name} (${email})`);

      const newInquiry: Inquiry = {
        id: `lead-${Date.now()}`,
        name,
        email,
        phone,
        service,
        urgency,
        message,
        status: 'New',
        createdAt: new Date().toISOString(),
        emailSent: false
      };

      let emailSuccess = false;
      let emailErrorMsg = '';

      try {
        const mailer = getTransporter();
        const mailOptions = {
          from: `"Nuaf Solutions Website" <${YOUR_EMAIL}>`,
          to: RECEIVER_EMAIL,
          replyTo: email,
          subject: `🚨 New Lead from Nuaf Solutions Website: ${name}`,
          text: `
You have received a new plumbing/handyman inquiry.

Customer Details:
-----------------
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Service Requested: ${service}
Urgency Level: ${urgency}

Issue / Job Details:
--------------------
${message}

Submitted at: ${new Date().toLocaleString()}
`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h2 style="color: #1e3a8a; border-bottom: 2px solid #3b82f6; padding-bottom: 8px;">🚨 New Plumbing / Handyman Inquiry</h2>
              <p>You have received a new customer lead from the Nuaf Solutions website.</p>
              
              <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin: 15px 0;">
                <h3 style="margin-top: 0; color: #1e293b;">Customer Information</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Phone:</strong> ${phone ? `<a href="tel:${phone}">${phone}</a>` : 'Not provided'}</p>
                <p><strong>Service Type:</strong> ${service}</p>
                <p><strong>Urgency:</strong> <span style="color: ${urgency.includes('Emergency') ? '#dc2626' : '#2563eb'}; font-weight: bold;">${urgency}</span></p>
              </div>

              <div style="background-color: #f1f5f9; padding: 15px; border-radius: 6px;">
                <h3 style="margin-top: 0; color: #1e293b;">Job Description</h3>
                <p style="white-space: pre-wrap; color: #334155;">${message}</p>
              </div>

              <p style="font-size: 12px; color: #64748b; margin-top: 20px;">
                Direct submission time: ${new Date().toLocaleString()} | Nuaf Solutions Dispatch System
              </p>
            </div>
          `
        };

        await mailer.sendMail(mailOptions);
        emailSuccess = true;
        console.log('✅ Email sent successfully to inbox!');
      } catch (err: any) {
        console.error('❌ Error sending SMTP email:', err?.message || err);
        emailErrorMsg = err?.message || 'SMTP Dispatch failed';
      }

      newInquiry.emailSent = emailSuccess;
      if (emailErrorMsg) {
        newInquiry.emailError = emailErrorMsg;
      }

      // Add to lead store
      inquiriesStore.unshift(newInquiry);

      res.status(200).json({
        status: 'success',
        message: 'Inquiry sent directly to inbox!',
        inquiryId: newInquiry.id,
        emailSent: emailSuccess
      });
    } catch (error: any) {
      console.error('❌ Error processing submission:', error);
      res.status(500).json({
        status: 'error',
        message: error?.message || 'Processing failed.'
      });
    }
  };

  app.post('/submit-inquiry', handleInquirySubmission);
  app.post('/api/submit-inquiry', handleInquirySubmission);

  // Serve Vite in development, static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nuaf Solutions Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
