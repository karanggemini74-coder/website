import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from 'fs';
import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';
import mysql from 'mysql2/promise';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists globally
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Security: Multer File Filter to prevent uploading arbitrary executable files
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, WEBP, and PDF are allowed.'));
  }
};

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Sanitize filename to prevent directory traversal
    const safeName = file.originalname.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
    const ext = path.extname(safeName);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  }
});
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit max for cyber security (prevent DoS)
  }
});

// Database Pool
let pool: mysql.Pool | null = null;

// Fallback Memory Mocks for AI Studio Preview Environment
const MOCK_DB: { plans: any[]; clients: any[]; settings: Record<string, any> } = {
  plans: [
    { id: 1, title: 'Equity Growth & Wealth Pack', subtitle: 'For Serious Investors seeking Long Term Wealth.', is_popular: 1, theme_color: 'blue', features: JSON.stringify(["Weekly Picks: 4 High-quality stock recommendations every month (Short/Medium Term).", "Monthly Wealth Report: 1 Fundamentally strong stock for Long Term Investment.", "Bonus Swing Setups: Opportunity-based swing trades (whenever market allows).", "Research Reports: Detailed rationale with every recommendation.", "Risk Level: Medium."]), price_yearly: '₹9,800', price_one_time: null, icon_name: 'TrendingUp', status: 'active', created_at: new Date().toISOString() },
    { id: 2, title: "Beginner's Kickstart Batch", subtitle: 'Learn First, Invest Later. Perfect for new entrants.', is_popular: 0, theme_color: 'teal', features: JSON.stringify(["30-Day Access: Complete Stock Market Basics Course (Video/LMS).", "Learn the Logic: Understand Why and How to invest.", "1 Solid Recommendation: Get 1 Long-Term Stock Pick (Large Cap) at the end of the course (Day 30).", "Research Report: Full fundamental analysis included.", "Risk Level: Low."]), price_yearly: null, price_one_time: '₹5,000', icon_name: 'BookOpen', status: 'active', created_at: new Date().toISOString() }
  ],
  clients: [],
  settings: {}
};

async function initDB() {
  try {
    const tempPool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'test',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    
    // Check connection actively
    await tempPool.query('SELECT 1');
    pool = tempPool;

    // Create clients table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS clients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        full_name VARCHAR(100),
        email VARCHAR(100),
        phone VARCHAR(20),
        pan_number VARCHAR(20),
        dob VARCHAR(20),
        city VARCHAR(100),
        state VARCHAR(100),
        plan_name VARCHAR(50),
        plan_price VARCHAR(20),
        payment_method VARCHAR(50),
        kra_status VARCHAR(50),
        mitc_status VARCHAR(50),
        invoice_path VARCHAR(255),
        agreement_path VARCHAR(255),
        pan_path VARCHAR(255),
        aadhaar_front_path VARCHAR(255),
        aadhaar_back_path VARCHAR(255)
      )
    `;
    await pool.query(createTableQuery);

    // Create blogs table for SEO-friendly content CMS
    const createBlogsTableQuery = `
      CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        content LONGTEXT NOT NULL,
        cover_image VARCHAR(255),
        seo_title VARCHAR(255),
        seo_description TEXT,
        seo_keywords TEXT,
        status ENUM('published', 'draft') DEFAULT 'published'
      )
    `;
    await pool.query(createBlogsTableQuery);
    
    // Create plans table for dynamic services
    const createPlansTableQuery = `
      CREATE TABLE IF NOT EXISTS plans (
        id INT AUTO_INCREMENT PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255),
        is_popular BOOLEAN DEFAULT false,
        theme_color ENUM('blue', 'teal', 'purple', 'emerald', 'indigo') DEFAULT 'blue',
        features TEXT, /* JSON array of features */
        price_monthly VARCHAR(50),
        price_quarterly VARCHAR(50),
        price_half_yearly VARCHAR(50),
        price_yearly VARCHAR(50),
        price_one_time VARCHAR(50),
        icon_name ENUM('TrendingUp', 'BookOpen', 'Shield', 'Lock', 'Star', 'Briefcase', 'LineChart') DEFAULT 'TrendingUp',
        status ENUM('active', 'inactive') DEFAULT 'active'
      )
    `;
    await pool.query(createPlansTableQuery);
    
    try {
      await pool.query(`ALTER TABLE plans ADD COLUMN status ENUM('active', 'inactive') DEFAULT 'active'`);
    } catch(e) {}

    // Create Settings table for configuration (Complaints etc)
    const createSettingsTableQuery = `
      CREATE TABLE IF NOT EXISTS settings (
        setting_key VARCHAR(100) PRIMARY KEY,
        setting_value JSON
      )
    `;
    await pool.query(createSettingsTableQuery);

    // Seed default plans if empty
    const [planRows]: any = await pool.query('SELECT COUNT(*) as count FROM plans');
    if (planRows[0].count === 0) {
      await pool.query(`
        INSERT INTO plans (title, subtitle, is_popular, theme_color, features, price_yearly, price_one_time, icon_name)
        VALUES 
        ('Equity Growth & Wealth Pack', 'For Serious Investors seeking Long Term Wealth.', true, 'blue', '["Weekly Picks: 4 High-quality stock recommendations every month (Short/Medium Term).", "Monthly Wealth Report: 1 Fundamentally strong stock for Long Term Investment.", "Bonus Swing Setups: Opportunity-based swing trades (whenever market allows).", "Research Reports: Detailed rationale with every recommendation.", "Risk Level: Medium."]', '₹9,800', NULL, 'TrendingUp'),
        ('Beginner\\'s Kickstart Batch', 'Learn First, Invest Later. Perfect for new entrants.', false, 'teal', '["30-Day Access: Complete Stock Market Basics Course (Video/LMS).", "Learn the Logic: Understand Why and How to invest.", "1 Solid Recommendation: Get 1 Long-Term Stock Pick (Large Cap) at the end of the course (Day 30).", "Research Report: Full fundamental analysis included.", "Risk Level: Low."]', NULL, '₹5,000', 'BookOpen')
      `);
      console.log('Seeded default plans.');
    }

    console.log('MySQL Database configured successfully.');
  } catch (error: any) {
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
        console.log('---');
        console.log('ℹ️ Running AI Studio Preview with Local Mock Database!');
        console.log('   The MySQL connection will dynamically succeed when the code is deployed inside Hostinger.');
        console.log('---');
    } else {
        console.log('⚠️ MySQL Connection failed (Check Hostinger / .env credentials):', error.message);
    }
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security Middlewares to prevent Cyber Attacks
  app.use(helmet({
    contentSecurityPolicy: false, // Disabling so Vite/Razorpay iframes don't break in dev/prod
    crossOriginEmbedderPolicy: false
  }));

  // DDoS & Brute Force protection
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes.',
    standardHeaders: true, 
    legacyHeaders: false,
  });
  // Apply the rate limiting middleware to all requests
  app.use(limiter);

  // Initialize DB
  await initDB();

  app.use(cors());
  app.use(express.json());
  
  // Admin Authentication Setup
  const getAdminPassword = () => {
    const pwd = process.env.ADMIN_PASSWORD || process.env.VITE_ADMIN_PASSWORD || 'admin123';
    return pwd.trim();
  };

  app.post('/api/login', (req, res) => {
    const currentPassword = getAdminPassword();
    const providedPassword = req.body.password ? req.body.password.trim() : '';
    console.log(`Login attempt - success: ${providedPassword === currentPassword}`);
    if (providedPassword === currentPassword) {
      res.json({ success: true, token: currentPassword });
    } else {
      res.status(401).json({ success: false, error: 'Invalid password' });
    }
  });

  const requireAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const currentPassword = getAdminPassword();
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.trim() === `Bearer ${currentPassword}`) {
      next();
    } else {
      res.status(401).json({ error: 'Unauthorized: Invalid or missing token' });
    }
  };

  app.use('/api/admin', requireAdmin);

  // Serve uploads publicly so admin can view them securely
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
  });

  app.post('/api/submit-onboarding', upload.fields([
    { name: 'panImage', maxCount: 1 },
    { name: 'aadhaarFront', maxCount: 1 },
    { name: 'aadhaarBack', maxCount: 1 }
  ]), async (req, res) => {
    try {
      const formData = req.body;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      console.log('Received Onboarding Submission for:', formData.fullName);
      
      const panPath = files['panImage'] ? files['panImage'][0].filename : '';
      const aadhaarFrontPath = files['aadhaarFront'] ? files['aadhaarFront'][0].filename : '';
      const aadhaarBackPath = files['aadhaarBack'] ? files['aadhaarBack'][0].filename : '';

      // 1. Generate Invoice PDF
      const invoiceFilename = `Invoice_${formData.fullName.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
      const invoicePath = path.join(process.cwd(), 'uploads', invoiceFilename);
      await createInvoicePDF(formData, invoicePath);

      // 2. Generate Agreement / MITC PDF
      const agreementFilename = `Agreement_${formData.fullName.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
      const agreementPath = path.join(process.cwd(), 'uploads', agreementFilename);
      await createAgreementPDF(formData, agreementPath);

      console.log('PDFs Generated successfully');

      // 3. Save to MySQL Database
      if (pool) {
        try {
          const insertQuery = `
            INSERT INTO clients 
            (full_name, email, phone, pan_number, dob, city, state, plan_name, plan_price, payment_method, kra_status, mitc_status, invoice_path, agreement_path, pan_path, aadhaar_front_path, aadhaar_back_path)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;
          
          await pool.execute(insertQuery, [
            formData.fullName,
            formData.email,
            formData.phone,
            formData.panNumber,
            formData.dob,
            formData.city,
            formData.state,
            formData.Selected_Plan,
            formData.Subscription_Price,
            formData.paymentMethod,
            formData.KRA_Status,
            formData.MITC_eSign_Status,
            invoiceFilename,
            agreementFilename,
            panPath,
            aadhaarFrontPath,
            aadhaarBackPath
          ]);
          console.log('Saved to MySQL Database.');
        } catch (dbErr: any) {
          console.error('MySQL Insert Error:', dbErr.message);
        }
      } else {
        // Fallback save to memory mock so it's visible in admin UI during preview
        MOCK_DB.clients.push({
            id: Date.now(),
            created_at: new Date().toISOString(),
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            pan_number: formData.panNumber,
            dob: formData.dob,
            city: formData.city,
            state: formData.state,
            plan_name: formData.Selected_Plan,
            plan_price: formData.Subscription_Price,
            payment_method: formData.paymentMethod,
            kra_status: formData.KRA_Status,
            mitc_status: formData.MITC_eSign_Status,
            invoice_path: invoiceFilename,
            agreement_path: agreementFilename,
            pan_path: panPath,
            aadhaar_front_path: aadhaarFrontPath,
            aadhaar_back_path: aadhaarBackPath
        });
        console.log('Saved Client to Mock In-Memory Database (No MySQL available).');
      }

      // 4. Send Email via Nodemailer
      try {
        if ((process.env.SMTP_USER && process.env.SMTP_PASS) || (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD)) {
           console.log('Sending Email to Client...');
           await sendClientEmail(formData.email, formData.fullName, invoicePath, agreementPath);
        } else {
          console.warn('Email credentials missing, skipping Email dispatch.');
        }
      } catch (e: any) {
        console.error('Email Dispatch Failed:', e.message);
      }
      
      res.status(200).json({ success: true, message: 'Onboarding completed successfully' });
    } catch (error: any) {
      console.error('Submission Error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // --- RAZORPAY API ENDPOINTS ---

  // 1. Create Razorpay Order
  app.post('/api/create-order', express.json(), async (req, res) => {
    try {
      const { amount, currency = 'INR', receipt } = req.body;
      
      if (!amount || amount < 100) {
        return res.status(400).json({ error: 'Minimum amount must be 100 paise' });
      }

      const options = {
        amount: Math.round(amount), // Ensure it's an integer
        currency,
        receipt: receipt || `rcpt_${Date.now()}`,
      };

      const order = await razorpay.orders.create(options);
      res.json({
        order_id: order.id,
        amount: order.amount,
        currency: order.currency
      });
    } catch (error: any) {
      console.error('Razorpay Create Order Error:', error);
      const errorMsg = error.error?.description || error.description || error.message || 'Error communicating with Razorpay API';
      // If unauthorized due to bad keys, Razorpay might return 401
      if (error.statusCode === 401) {
          return res.status(401).json({ error: 'Invalid Razorpay API Keys' });
      }
      res.status(500).json({ error: errorMsg });
    }
  });

  // 2. Verify Razorpay Payment Signature
  app.post('/api/verify-payment', express.json(), (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ success: false, error: 'Missing payment details' });
      }

      const keySecret = process.env.RAZORPAY_KEY_SECRET;
      
      if (!keySecret) {
         return res.status(500).json({ success: false, error: 'Razorpay secret key not configured' });
      }

      const generatedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest('hex');

      if (generatedSignature === razorpay_signature) {
        console.log(`Payment verify success! Order ID: ${razorpay_order_id}, Payment ID: ${razorpay_payment_id}`);
        // Optionally update DB here
        return res.json({ success: true, message: 'Payment verified successfully' });
      } else {
        console.warn('Payment signature verification failed');
        return res.status(400).json({ success: false, error: 'Invalid signature. Payment verification failed.' });
      }
    } catch (error: any) {
      console.error('Razorpay Verify Signature Error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // 3. Razorpay Webhook (Listens for payment success, etc) - optional payload webhook here
  app.post('/api/razorpay-webhook', express.json({type: 'application/json'}), async (req, res) => {
    try {
      const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || 'dummy_webhook_secret';
      
      const signature = req.headers['x-razorpay-signature'] as string;
      const body = JSON.stringify(req.body);

      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(body)
        .digest('hex');

      if (expectedSignature === signature) {
        console.log('Webhook verified successfully');
        const event = req.body.event;

        if (event === 'payment.captured' || event === 'order.paid') {
          // Extract payment & order details
          const paymentEntity = req.body.payload.payment.entity;
          const orderId = paymentEntity.order_id;
          const paymentId = paymentEntity.id;
          const email = paymentEntity.email;
          const phone = paymentEntity.contact;

          console.log(`Payment successful for Order: ${orderId}, Payment ID: ${paymentId}`);

          // You can perform DB updates here. For example:
          if (pool) {
            // e.g. update status to paid where email/phone matches or if you stored orderId in clients table
            // In a real application, you'd usually have an `orders` table to track this.
            console.log(`Triggering DB updates/Email for successful payment...`);
          }
        }

        res.status(200).send('OK');
      } else {
        console.warn('Invalid Webhook Signature');
        res.status(400).send('Invalid signature');
      }
    } catch (error: any) {
      console.error('Razorpay Webhook Error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Admin View API (To fetch clients)
  app.get('/api/admin/clients', async (req, res) => {
    try {
      if (!pool) return res.json(MOCK_DB.clients);
      const [rows] = await pool.query('SELECT * FROM clients ORDER BY created_at DESC');
      res.json(rows);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- PLANS API ENDPOINTS ---
  
  // Public - Get active plans
  app.get('/api/plans', async (req, res) => {
    try {
      if (!pool) return res.json(MOCK_DB.plans.filter(p => p.status === 'active' || !p.status));
      const [rows] = await pool.query('SELECT * FROM plans WHERE status = "active" OR status IS NULL ORDER BY created_at ASC');
      res.json(rows);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Admin - Get all plans
  app.get('/api/admin/plans', async (req, res) => {
    try {
      if (!pool) return res.json(MOCK_DB.plans);
      const [rows] = await pool.query('SELECT * FROM plans ORDER BY created_at ASC');
      res.json(rows);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Admin - Restore Default Plans
  app.post('/api/admin/plans/restore-defaults', async (req, res) => {
    try {
      if (!pool) {
          MOCK_DB.plans = [
            { id: 1, title: 'Equity Growth & Wealth Pack', subtitle: 'For Serious Investors seeking Long Term Wealth.', is_popular: 1, theme_color: 'blue', features: JSON.stringify(["Weekly Picks: 4 High-quality stock recommendations every month (Short/Medium Term).", "Monthly Wealth Report: 1 Fundamentally strong stock for Long Term Investment.", "Bonus Swing Setups: Opportunity-based swing trades (whenever market allows).", "Research Reports: Detailed rationale with every recommendation.", "Risk Level: Medium."]), price_yearly: '₹9,800', price_one_time: null, icon_name: 'TrendingUp', status: 'active', created_at: new Date().toISOString() },
            { id: 2, title: "Beginner's Kickstart Batch", subtitle: 'Learn First, Invest Later. Perfect for new entrants.', is_popular: 0, theme_color: 'teal', features: JSON.stringify(["30-Day Access: Complete Stock Market Basics Course (Video/LMS).", "Learn the Logic: Understand Why and How to invest.", "1 Solid Recommendation: Get 1 Long-Term Stock Pick (Large Cap) at the end of the course (Day 30).", "Research Report: Full fundamental analysis included.", "Risk Level: Low."]), price_yearly: null, price_one_time: '₹5,000', icon_name: 'BookOpen', status: 'active', created_at: new Date().toISOString() }
          ];
          return res.json({ success: true, message: 'Mock initialized' });
      }
      await pool.query(`
        INSERT INTO plans (title, subtitle, is_popular, theme_color, features, price_yearly, price_one_time, icon_name, status)
        VALUES 
        ('Equity Growth & Wealth Pack', 'For Serious Investors seeking Long Term Wealth.', true, 'blue', '["Weekly Picks: 4 High-quality stock recommendations every month (Short/Medium Term).", "Monthly Wealth Report: 1 Fundamentally strong stock for Long Term Investment.", "Bonus Swing Setups: Opportunity-based swing trades (whenever market allows).", "Research Reports: Detailed rationale with every recommendation.", "Risk Level: Medium."]', '₹9,800', NULL, 'TrendingUp', 'active'),
        ('Beginner\\'s Kickstart Batch', 'Learn First, Invest Later. Perfect for new entrants.', false, 'teal', '["30-Day Access: Complete Stock Market Basics Course (Video/LMS).", "Learn the Logic: Understand Why and How to invest.", "1 Solid Recommendation: Get 1 Long-Term Stock Pick (Large Cap) at the end of the course (Day 30).", "Research Report: Full fundamental analysis included.", "Risk Level: Low."]', NULL, '₹5,000', 'BookOpen', 'active')
      `);
      res.json({ success: true });
    } catch(err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Admin - Create a new plan
  app.post('/api/admin/plans', express.json(), async (req, res) => {
    try {
      if (!pool) {
          const newPlan = { ...req.body, id: Date.now(), features: JSON.stringify(req.body.features || []), is_popular: req.body.is_popular ? 1 : 0, status: 'active' };
          MOCK_DB.plans.push(newPlan);
          return res.json({ success: true, id: newPlan.id });
      }
      const { title, subtitle, is_popular, theme_color, features, price_monthly, price_quarterly, price_half_yearly, price_yearly, price_one_time, icon_name } = req.body;

      const insertQuery = `
        INSERT INTO plans (title, subtitle, is_popular, theme_color, features, price_monthly, price_quarterly, price_half_yearly, price_yearly, price_one_time, icon_name)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const [result]: any = await pool.execute(insertQuery, [
        title, subtitle, is_popular ? 1 : 0, theme_color || 'blue', JSON.stringify(features || []), price_monthly || null, price_quarterly || null, price_half_yearly || null, price_yearly || null, price_one_time || null, icon_name || 'TrendingUp'
      ]);
      res.json({ success: true, id: result.insertId });
    } catch (err: any) {
      console.error('Create Plan Error:', err);
      res.status(500).json({ error: err.message });
    }
  });

  // Admin - Edit an existing plan
  app.put('/api/admin/plans/:id', express.json(), async (req, res) => {
    try {
      if (!pool) {
          const idx = MOCK_DB.plans.findIndex(p => p.id == parseInt(req.params.id));
          if (idx >= 0) {
              MOCK_DB.plans[idx] = { ...MOCK_DB.plans[idx], ...req.body, features: JSON.stringify(req.body.features || []), is_popular: req.body.is_popular ? 1 : 0 };
          }
          return res.json({ success: true });
      }
      const { id } = req.params;
      const { title, subtitle, is_popular, theme_color, features, price_monthly, price_quarterly, price_half_yearly, price_yearly, price_one_time, icon_name, status } = req.body;

      const updateQuery = `
        UPDATE plans SET title = ?, subtitle = ?, is_popular = ?, theme_color = ?, features = ?, price_monthly = ?, price_quarterly = ?, price_half_yearly = ?, price_yearly = ?, price_one_time = ?, icon_name = ?, status = ?
        WHERE id = ?
      `;
      
      await pool.execute(updateQuery, [
        title, subtitle, is_popular ? 1 : 0, theme_color || 'blue', JSON.stringify(features || []), price_monthly || null, price_quarterly || null, price_half_yearly || null, price_yearly || null, price_one_time || null, icon_name || 'TrendingUp', status || 'active', id
      ]);
      res.json({ success: true });
    } catch (err: any) {
      console.error('Edit Plan Error:', err);
      res.status(500).json({ error: err.message });
    }
  });

  // Admin - Delete a plan
  app.delete('/api/admin/plans/:id', async (req, res) => {
    try {
      if (!pool) {
          MOCK_DB.plans = MOCK_DB.plans.filter(p => p.id != parseInt(req.params.id));
          return res.json({ success: true });
      }
      await pool.query('DELETE FROM plans WHERE id = ?', [req.params.id]);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- BLOG API ENDPOINTS ---
  
  // Public - Get all published blogs
  app.get('/api/blogs', async (req, res) => {
    try {
      if (!pool) return res.status(500).json({ error: 'Database not connected' });
      const [rows] = await pool.query('SELECT id, title, slug, description, cover_image, created_at FROM blogs WHERE status = "published" ORDER BY created_at DESC');
      res.json(rows);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Public - Get single blog by slug
  app.get('/api/blogs/:slug', async (req, res) => {
    try {
      if (!pool) return res.status(500).json({ error: 'Database not connected' });
      const [rows]: any = await pool.query('SELECT * FROM blogs WHERE slug = ? AND status = "published"', [req.params.slug]);
      if (rows.length === 0) return res.status(404).json({ error: 'Blog not found' });
      res.json(rows[0]);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Admin - Create a new blog
  app.post('/api/admin/blogs', upload.single('coverImage'), async (req, res) => {
    try {
      if (!pool) return res.status(500).json({ error: 'Database not connected' });
      const { title, slug, content, description, seo_title, seo_description, seo_keywords } = req.body;
      const coverImage = req.file ? req.file.filename : null;

      const insertQuery = `
        INSERT INTO blogs (title, slug, content, description, cover_image, seo_title, seo_description, seo_keywords)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const [result]: any = await pool.execute(insertQuery, [
        title, slug, content, description, coverImage, seo_title, seo_description, seo_keywords
      ]);
      res.json({ success: true, id: result.insertId });
    } catch (err: any) {
      console.error('Create Blog Error:', err);
      // Handle duplicate slug error natively
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'A blog with this slug or title already exists.' });
      }
      res.status(500).json({ error: err.message });
    }
  });

  // Settings Endpoints
  // Used for complaints status, global content etc
  app.get('/api/settings/:key', async (req, res) => {
    try {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      if (!pool) {
        return res.json(MOCK_DB.settings[req.params.key] || null);
      }
      const [rows]: any = await pool.query('SELECT setting_value FROM settings WHERE setting_key = ?', [req.params.key]);
      if (rows.length === 0) return res.json(null);
      res.json(rows[0].setting_value);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/admin/settings/:key', express.json(), async (req, res) => {
    try {
      if (!pool) {
        MOCK_DB.settings[req.params.key] = req.body;
        return res.json({ success: true, mock: true });
      }
      // Uses ON DUPLICATE KEY UPDATE or REPLACE
      const query = `
        INSERT INTO settings (setting_key, setting_value) 
        VALUES (?, ?) 
        ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)
      `;
      await pool.execute(query, [req.params.key, JSON.stringify(req.body)]);
      res.json({ success: true });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  // Admin - Upload inline image for blog content (Rich Text Editor support)
  app.post('/api/admin/upload-image', upload.single('image'), (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: 'No image provided' });
      // Return the public URL for the uploaded image
      res.json({ url: `/uploads/${req.file.filename}` });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });


  // === VITE MIDDLEWARE ===
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// =======================
// HELPER FUNCTIONS 
// =======================

async function createInvoicePDF(data: any, filePath: string) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    const rawPrice = String(data.Subscription_Price).replace(/[^0-9.]/g, '');
    const totalAmount = parseFloat(rawPrice) || 0;
    const baseAmount = totalAmount / 1.18;
    const cgst = baseAmount * 0.09;
    const sgst = baseAmount * 0.09;

    // Header
    doc.rect(0, 0, 595, 100).fill('#1e3a8a');
    doc.fillColor('#ffffff').fontSize(24).font('Helvetica-Bold').text('TAX INVOICE', 50, 40);
    doc.fontSize(10).font('Helvetica').text('Karan Vijayvargiya | SEBI Reg: INH000025470', 50, 70);

    // RA Details (Right)
    doc.fontSize(10).text('hello@karanvijayvargiya.com', 400, 40, { align: 'right' });
    doc.text('support@karanvijayvargiya.com', 400, 55, { align: 'right' });

    // Client Details
    doc.fillColor('#333333').font('Helvetica-Bold').fontSize(12).text('Billed To:', 50, 130);
    doc.font('Helvetica').fontSize(10).text(data.fullName, 50, 150);
    doc.text(data.email, 50, 165);
    doc.text(data.phone, 50, 180);
    doc.text(`${data.city}, ${data.state}`, 50, 195);
    doc.text(`PAN: ${data.panNumber}`, 50, 210);

    // Invoice Details
    doc.font('Helvetica-Bold').text('Invoice Details:', 350, 130);
    const invoiceNo = `INV-${Date.now().toString().slice(-6)}`;
    doc.font('Helvetica').text(`Invoice Number: ${invoiceNo}`, 350, 150);
    doc.text(`Invoice Date: ${new Date().toLocaleDateString('en-IN')}`, 350, 165);
    doc.text(`Payment Mode: ${data.paymentMethod || 'Razorpay / Online'}`, 350, 180);

    // Table Header
    doc.moveDown(4);
    const tableTop = 260;
    doc.rect(50, tableTop, 495, 30).fill('#f1f5f9');
    doc.fillColor('#333333').font('Helvetica-Bold');
    doc.text('Description', 60, tableTop + 10);
    doc.text('Amount (INR)', 400, tableTop + 10, { width: 135, align: 'right' });

    // Table Content
    const contentTop = tableTop + 40;
    doc.font('Helvetica');
    doc.text(`Subscription: ${data.Selected_Plan}`, 60, contentTop, { width: 300 });
    doc.text(baseAmount.toFixed(2), 400, contentTop, { width: 135, align: 'right' });

    // Divider
    doc.moveTo(50, contentTop + 40).lineTo(545, contentTop + 40).strokeColor('#e2e8f0').stroke();

    // Tax Details
    doc.text('Subtotal:', 300, contentTop + 60, { width: 90, align: 'right' });
    doc.text(baseAmount.toFixed(2), 400, contentTop + 60, { width: 135, align: 'right' });

    doc.text('CGST (9%):', 300, contentTop + 80, { width: 90, align: 'right' });
    doc.text(cgst.toFixed(2), 400, contentTop + 80, { width: 135, align: 'right' });

    doc.text('SGST (9%):', 300, contentTop + 100, { width: 90, align: 'right' });
    doc.text(sgst.toFixed(2), 400, contentTop + 100, { width: 135, align: 'right' });

    // Total Background
    doc.rect(300, contentTop + 120, 245, 30).fill('#e0e7ff');
    doc.fillColor('#1e40af').font('Helvetica-Bold');
    doc.text('Total Amount (INR):', 310, contentTop + 130, { width: 90, align: 'left' });
    doc.text(`Rs ${totalAmount.toFixed(2)}`, 400, contentTop + 130, { width: 125, align: 'right' });

    // Footer
    doc.fillColor('#64748b').font('Helvetica').fontSize(9);
    doc.text('This is a computer-generated document. No signature is required.', 50, 700, { align: 'center' });

    doc.end();
    stream.on('finish', () => resolve(true));
    stream.on('error', reject);
  });
}

async function createAgreementPDF(data: any, filePath: string) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Helper to add sections
    const addSectionHeader = (title: string) => {
      doc.moveDown();
      doc.font('Helvetica-Bold').fontSize(12).text(title);
      doc.font('Helvetica').fontSize(10).moveDown(0.5);
    };

    const addParagraph = (text: string) => {
      doc.font('Helvetica').fontSize(10).text(text, { align: 'justify' });
      doc.moveDown(0.5);
    };
    
    const addBullet = (text: string) => {
      doc.font('Helvetica').fontSize(10).text(`•  ${text}`, { align: 'justify', indent: 15 });
      doc.moveDown(0.2);
    };
    
    const addSubBullet = (text: string) => {
        doc.font('Helvetica').fontSize(10).text(`◦  ${text}`, { align: 'justify', indent: 30 });
        doc.moveDown(0.2);
    };

    // Header
    doc.fontSize(14).font('Helvetica-Bold').text('COMPREHENSIVE TERMS AND CONDITIONS FOR RESEARCH ANALYST SERVICES', { align: 'center' });
    doc.moveDown();
    
    addParagraph('Please read these Terms carefully before subscribing to or using any of Our Services. By accessing or using Our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.');

    addSectionHeader('1. Introduction');
    doc.font('Helvetica-Bold').fontSize(10).text('1.1 Parties');
    doc.moveDown(0.5);
    addBullet('Research Analyst (hereinafter "RA," "We," "Our," or "Us")');
    addSubBullet('Registered with the Securities and Exchange Board of India (SEBI) under Registration No. INH000025470 valid as of 13/03/2026');
    addSubBullet('Registered Name: Karan Vijayvargiya');
    addSubBullet('Our BSE Enlistment Number (if applicable) is _____');
    addSubBullet('Subject to all rules and regulations framed by SEBI, including the SEBI (Research Analysts) Regulations, 2014, as amended.');
    addBullet('Client or User ("You," "Your," or "Client")');
    addSubBullet('The individual or entity subscribing to or availing research services.');
    addSubBullet('Must meet the eligibility requirements set forth herein and under Indian law.');
    
    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('1.2 Purpose');
    doc.moveDown(0.5);
    addBullet('These Terms & Conditions ("T&C") govern the Client\'s use or subscription of Our research services ("Services"), including any digital platforms, mobile/web applications, or technology solutions that We or our service provider(s) operate.');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('1.3 Compliance with SEBI Circular');
    doc.moveDown(0.5);
    addBullet('This document incorporates the minimum mandatory provisions contained in the SEBI circular SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2025/004 dated January 08, 2025 ("the Circular") and relevant amendments to the SEBI (Research Analysts) Regulations, 2014 ("RA Regulations").');
    addBullet('In case of conflict between these T&C and any applicable regulations/guidelines issued by SEBI, the SEBI regulations/guidelines shall prevail.');

    addSectionHeader('2. CLIENT DETAILS');
    addParagraph('Before availing of Our Services, the Client agrees to provide the following personal details as part of the registration process and Know Your Client ("KYC") compliance:');
    addBullet(`Full Name: ${data.fullName}`);
    addBullet(`Permanent Account Number (PAN): ${data.panNumber}`);
    addBullet(`Date of Birth: ${data.dob}`);
    addBullet(`Email Address: ${data.email}`);
    addBullet(`State/City: ${data.state} / ${data.city}`);
    doc.moveDown(0.5);
    addParagraph('You affirm that all details provided are true, accurate, and complete. Inaccurate or incomplete information may result in suspension or termination of your access to Our Services.');

    addSectionHeader('3. Definitions');
    addParagraph('Unless the context otherwise requires, the following definitions apply in this T&C:');
    addBullet('"Client" or "User": Any person or entity that registers with the RA and agrees to these T&C to avail the Services.');
    addBullet('"Services": Includes (a) research reports, data, model portfolios, Recommendations or analyses pertaining to Indian-listed securities; (b) any online or offline research support (c) any communications related thereto.');
    addBullet('"Digital Platform": Includes websites, mobile or web applications, or other technology platforms (including third-party service providers) used for delivering the Services.');
    addBullet('"KYC": Know Your Customer—verification process mandated by SEBI (and other applicable laws) to establish the identity of Clients.');

    addSectionHeader('4. Scope of Services');
    doc.font('Helvetica-Bold').fontSize(10).text('4.1 Research-Only / No Execution');
    doc.moveDown(0.5);
    addBullet('The RA provides research reports, recommendations, model portfolios, analysis and related content about indian-listed securities.');
    addBullet('We do not execute trades on behalf of Clients, hold Clients\' funds, or provide any assured returns. You retain full control and discretion over any investment decision.');
    
    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('4.2 Model Portfolios');
    doc.moveDown(0.5);
    addBullet('Where offered, Our model portfolios are recommendations for basket(s) of securities with weightages. Such recommendations are for informational purposes and do not guarantee performance or returns.');
    addBullet('We will maintain compliance with SEBI\'s model portfolio guidelines (per the Circular\'s Annexure-A).');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('4.3 Use of Artificial Intelligence (AI)');
    doc.moveDown(0.5);
    addBullet('If We use AI tools (in whole or part) to generate or support research outputs, We remain solely responsible for the quality, accuracy, security, and confidentiality of data.');
    addBullet('We shall disclose the extent of AI usage to the Client when providing Services (or whenever material changes occur).');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('4.4 No Guarantee of Returns');
    doc.moveDown(0.5);
    addParagraph('All investments or trading carry market risk. Past performance is not indicative of future returns, and the RA does not assure or promise any specific gain or outcome. We do not offer any profit-sharing model or assure any returns.');

    addSectionHeader('5. Eligibility');
    doc.font('Helvetica-Bold').fontSize(10).text('5.1 Legal Capacity');
    doc.moveDown(0.5);
    addBullet('Only individuals aged 18 years or older (and otherwise competent to contract) or legally incorporated entities may register.');
    addBullet('If you are a minor or otherwise incapacitated to contract, you are not permitted to use or subscribe to the Services.');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('5.2 KYC Compliance');
    doc.moveDown(0.5);
    addBullet('Clients must provide accurate and complete information for KYC.');
    addBullet('RA shall verify or store such KYC in accordance with SEBI regulations.');
    addBullet('The RA may terminate or suspend Services if KYC requirements are not met or if the information provided is incomplete, false, or misleading.');

    addSectionHeader('6. Registration & Accounts');
    doc.font('Helvetica-Bold').fontSize(10).text('6.1 Registration Process');
    doc.moveDown(0.5);
    addBullet('To access Our paid Services, Clients must complete the registration form, provide all mandatory details, and accept these T&C.');
    addBullet('The RA reserves the right to reject or cancel registration if the information is incorrect or if the Client is ineligible under law.');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('6.2 Security of Credentials (If Applicable)');
    doc.moveDown(0.5);
    addBullet('Keep login information (username, password, etc.) confidential (if any). You are liable for unauthorized use of your account due to negligence or sharing of credentials.');
    addBullet('Notify Us immediately if you suspect any breach.');
    
    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('6.3 Use of Services');
    doc.moveDown(0.5);
    addBullet('You shall not reproduce, distribute, copy, sell, or exploit Our research content without express written consent from the RA.');
    addBullet('Any unauthorized use is grounds for termination of Services and may lead to legal action.');

    addSectionHeader('7. Fees & Payment');
    doc.font('Helvetica-Bold').fontSize(10).text('7.1 Maximum Fee for Individual/HUF Clients');
    doc.moveDown(0.5);
    addBullet('Per Regulation 15A of the RA Regulations and the Circular, We may charge fees up to INR 1,51,000 (Rupees One Lakh Fifty-One Thousand) per annum per "family of client" (for individual and HUF clients).');
    addBullet('This amount excludes any statutory taxes and charges.');
    addBullet('We may revise fees in line with the Cost Inflation Index or as specified by SEBI / RAASB every three years.');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('7.2 Fees for Non-Individual or Accredited Investors');
    doc.moveDown(0.5);
    addBullet('For corporates, institutions, or accredited investors, fees may be negotiated bilaterally without the above limit, subject to fairness and reasonableness.');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('7.3 Billing & Mode of Payment');
    doc.moveDown(0.5);
    addBullet('Payment shall be made through recognized modes: NEFT, IMPS, payment gateways (Instamojo, Cashfree, Razorpay, Stripe, Jodo), CeFCoM, cheque, UPI or any other method communicated by Us.');
    addBullet('Fees may be charged quarterly or yearly in advance or in another mutually agreed schedule, subject to the advance limit mandated by SEBI.');
    addBullet('We may offer or guide you regarding the Centralised Fee Collection Mechanism (CeFCoM) as an optional method of fee payment if made available by SEBI.');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('7.4 Refund Policy');
    doc.moveDown(0.5);
    addBullet('If Our SEBI registration is suspended for more than sixty (60) days or canceled, we shall refund the subscription fees to you on a pro-rata basis for the remaining period of the subscription.');
    addBullet('No "breakage" fee or penalty shall be imposed.');

    addSectionHeader('8. Mandatory Terms & Conditions (as per SEBI Circular Annexure-B)');
    addParagraph('Below are the minimum mandatory T&C required by the Circular. These provisions are integral to Our agreement with You:');

    doc.font('Helvetica-Bold').fontSize(10).text('8.1 Availing the Research Services');
    doc.moveDown(0.5);
    addBullet('By subscribing to or otherwise using Our research Services, You confirm that You do so at Your sole discretion.');
    addBullet('Our Services are rendered in accordance with the applicable SEBI (Research Analysts) Regulations, 2014.');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('8.2 Obligations on RA');
    doc.moveDown(0.5);
    addBullet('Both RA and Client agree to be bound by the SEBI Act, SEBI (RA) Regulations, and all rules/regulations/circulars in force from time to time.');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('8.3 Client Information & KYC');
    doc.moveDown(0.5);
    addBullet('You shall furnish all required details for KYC in the form mandated by SEBI/RAASB.');
    addBullet('We will collect, store, verify, and update KYC records as per SEBI norms.');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('8.4 Standard Terms of Service');
    doc.moveDown(0.5);
    addBullet('By giving consent (online/offline) to these T&C, You acknowledge and accept the RA\'s fee structure and disclaimers.');
    addBullet('You confirm that any reliance on research recommendations is at Your own risk and that market risks apply.');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('8.5 Consideration & Mode of Payment');
    doc.moveDown(0.5);
    addBullet('You shall pay the agreed fees plus any statutory charges via permissible methods.');
    addBullet('We shall not render any research services until the Client\'s consent is received and initial fees are paid (as applicable).');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('8.6 Risk Factors');
    doc.moveDown(0.5);
    addBullet('Investing in securities is subject to market risk, including but not limited to volatility and potential loss of principal.');
    addBullet('Market and economic conditions vary, and Past performance is no indicator of future performance, and no return is guaranteed.');
    addBullet('Recommendations or research content are purely educational and do not serve as an absolute guarantee of performance.');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('8.7 Conflict of Interest');
    doc.moveDown(0.5);
    addBullet('We will disclose any conflicts of interest as mandated by SEBI, and take steps to mitigate or avoid them.');
    addBullet('Full disclosures, if required, will be provided in each research report or at the time of giving a recommendation.');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('8.8 Termination of Service & Refund of Fees');
    doc.moveDown(0.5);
    addBullet('If Our registration is suspended or canceled by SEBI, We shall refund any residual amount for the unexpired subscription period.');
    addBullet('We may also suspend/terminate services if You breach these T&C or as otherwise allowed by law.');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('8.9 Grievance Redressal & Dispute Resolution');
    doc.moveDown(0.5);
    addBullet('For any service-related issues, including non-receipt of research reports or any other deficiency in service, please email: karanvijayvargiya29@gmail.com');
    addBullet('If you are not satisfied with the resolution, escalate the matter to the designated Grievance Officer: Karan Vijayvargiya (Research Analyst) | Email Id: karanvijayvargiya29@gmail.com | Phone No.: 8959222227');
    addBullet('For more details regarding grievance-related matters, please refer to the grievance redressal section of our website: www.karanvijayvargiya.com');
    addBullet('We will endeavor to address complaints within 7 business days (or any updated SEBI timeline).');
    addBullet('If unresolved, You may escalate the complaint to SEBI via the SCORES portal or use any other dispute resolution mechanism specified by SEBI (e.g., arbitration).');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('8.10 Mandatory Notice');
    doc.moveDown(0.5);
    addBullet('Clients must refer to the Do\'s and Don\'ts while dealing with RAs as specified by SEBI.');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('8.11 Additional Clauses');
    doc.moveDown(0.5);
    addBullet('Any additional voluntary clauses in this T&C shall not conflict with SEBI regulations/circulars.');
    addBullet('Any changes to such voluntary clauses shall be preceded by 15 days\' notice.');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('8.12 Most Important Terms & Conditions (MITC)');
    doc.moveDown(0.5);
    addBullet('We shall also disclose MITC (as standardized by the Industry Standards Forum, in consultation with SEBI/RAASB).');
    addBullet('The MITC explicitly informs Clients that the RA cannot execute trades on behalf of Clients.');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('8.13 Optional Centralised Fee Collection Mechanism (CeFCoM)');
    doc.moveDown(0.5);
    addBullet('If and when available, We will inform you of the optional CeFCoM to facilitate fee payment.');

    addSectionHeader('9. Representations & Warranties');
    doc.font('Helvetica-Bold').fontSize(10).text('9.1 RA\'s Declarations');
    doc.moveDown(0.5);
    addBullet('The RA declares that it is duly registered under the SEBI (Research Analysts) Regulations, 2014 & Registration Details are:');
    addSubBullet('Name of the RA: Karan Vijayvargiya');
    addSubBullet('SEBI Registration Number: INH000025470');
    addSubBullet('Date of Registration: 13/03/2026');
    addBullet('The RA meets or exceeds the qualification and certification requirements mandated by SEBI or NISM.');
    addBullet('The recommendations provided by the RA do not provide any assurance of returns.');
    addBullet('The RA\'s services do not conflict with or violate any law or regulation to which it is subject.');
    addBullet('The RA not engaged in any additional professional or business activities, on a whole-time basis or in an executive capacity, which may interfere with, influence, or have the potential to interfere with/influence the independence of the research report and/or recommendations contained therein.');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('9.2 Client\'s Declarations');
    doc.moveDown(0.5);
    addBullet('You represent that You are legally entitled to enter this Agreement and that Your KYC details are true and correct.');
    addBullet('You understand the nature of market risks and volatility inherent in securities investments.');

    addSectionHeader('10. Confidentiality & Data Protection');
    doc.font('Helvetica-Bold').fontSize(10).text('10.1 Privacy of Client Data');
    doc.moveDown(0.5);
    addBullet('We respect Your privacy and will not share or disclose Your personal data except as required by law or to fulfill regulatory obligations (e.g., KYC checks).');
    addBullet('However, We may share aggregated or anonymized data for research or compliance purposes, without revealing individual identities.');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('10.2 Security of Client Data');
    doc.moveDown(0.5);
    addBullet('While We endeavor to protect data transmissions, We cannot guarantee the complete security of data over the internet.');
    addBullet('You acknowledge that data transfers may be unencrypted and may pass over multiple networks.');

    addSectionHeader('11. Limitation of Liability');
    doc.font('Helvetica-Bold').fontSize(10).text('11.1 No Assured Returns');
    doc.moveDown(0.5);
    addBullet('We shall not be liable for any direct, indirect, incidental, or consequential losses, including lost profits, due to Your reliance on Our research reports, research recommendations or model portfolios.');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('11.2 Force Majeure');
    doc.moveDown(0.5);
    addBullet('The RA is not liable for failures or delays in performance arising from events beyond its control, including natural disasters, war, riots, pandemics, power outages, or disruptions in telecommunication systems.');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('11.3 Third-Party Data');
    doc.moveDown(0.5);
    addBullet('We rely on third-party market data providers. We do not audit or guarantee the correctness of such data, and shall not be held liable for inaccuracies.');

    addSectionHeader('12. Indemnification');
    addParagraph('You agree to indemnify and hold harmless the RA, its officers, employees, and affiliates from any and all claims, damages, losses, or liabilities arising out of:');
    addBullet('Your breach of these T&C or violation of law.');
    addBullet('Unauthorized or improper use of Your account or services.');
    addBullet('Third-party claims related to Your actions or inactions.');

    addSectionHeader('13. Suspension & Termination');
    doc.font('Helvetica-Bold').fontSize(10).text('13.1 Suspension');
    doc.moveDown(0.5);
    addBullet('We reserve the right to suspend Your account or access to Services with or without notice if You breach these T&C or if required by SEBI/regulators.');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('13.2 Termination');
    doc.moveDown(0.5);
    addBullet('We may terminate this Agreement immediately upon:');
    addSubBullet('Violation of T&C by You.');
    addSubBullet('Directions from SEBI or any competent regulatory authority.');
    addSubBullet('Non-payment of fees (beyond the grace period, if any).');
    addBullet('Refunds (if any) shall be governed by Section 7.4 above.');

    addSectionHeader('14. Grievances & Dispute Resolution');
    doc.font('Helvetica-Bold').fontSize(10).text('14.1 Internal Mechanism');
    doc.moveDown(0.5);
    addBullet('For any concerns, complaints, or grievances, any service-related issues, please email: karanvijayvargiya29@gmail.com');
    addBullet('If you are not satisfied with the resolution, escalate the matter to the designated Grievance Officer: Karan Vijayvargiya | Email Id: karanvijayvargiya29@gmail.com | Phone No.: 8959222227');
    addBullet('We aim to resolve such grievances within 7 business days or as per the timeline mandated by SEBI.');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('14.2 Escalation to SEBI');
    doc.moveDown(0.5);
    addBullet('If unresolved, You may approach SEBI\'s SCORES platform or seek redressal through the dispute resolution mechanisms prescribed by SEBI (e.g., arbitration).');

    addSectionHeader('15. Miscellaneous');
    doc.font('Helvetica-Bold').fontSize(10).text('15.1 Amendments');
    doc.moveDown(0.5);
    addBullet('We may modify or update these T&C in accordance with SEBI regulations. Notice of material changes will be posted on Our website/app or emailed to You. Continued use of the Services indicates Your acceptance of updated T&C.');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('15.2 Severability');
    doc.moveDown(0.5);
    addBullet('If any provision is held invalid by a competent authority, the remaining provisions shall continue in effect.');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('15.3 Governing Law & Jurisdiction');
    doc.moveDown(0.5);
    addBullet('These T&C shall be governed by and construed in accordance with the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the courts/tribunals in Maharashtra or as directed by SEBI.');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('15.4 No Agency');
    doc.moveDown(0.5);
    addBullet('Nothing in these T&C shall be deemed to constitute a partnership, agency, or joint venture between the RA and the Client.');

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(10).text('15.5 Disclaimer');
    doc.moveDown(0.5);
    addBullet('Registration granted by SEBI and certification from NISM in no way guarantee the performance of the intermediary or provide any assurance of returns to investors.');
    addBullet('Investing in stocks/ETFs is subject to market risks. Read all related documents carefully before investing. Consult a qualified financial advisor to understand suitability.');

    doc.addPage();
    doc.fontSize(14).font('Helvetica-Bold').text('Most Important Terms and Conditions (MITC)', { align: 'center' });
    doc.fontSize(10).font('Helvetica-Oblique').text('[Forming part of the Terms and Conditions for providing research services]', { align: 'center' });
    doc.moveDown(1.5);
    
    [
        '1. These terms and conditions, and consent thereon are for the research services provided by the Research Analyst (RA) and RA cannot execute/carry out any trade (purchase/sell transaction) on behalf of, the client. Thus, the clients are advised not to permit RA to execute any trade on their behalf.',
        '2. The fee charged by RA to the client will be subject to the maximum of amount prescribed by SEBI/ Research Analyst Administration and Supervisory Body (RAASB) from time to time (applicable only for Individual and HUF Clients).\nNote:\n2.1. The current fee limit is Rs 1,51,000/- per annum per family of client for all research services of the RA.\n2.2. The fee limit does not include statutory charges.\n2.3. The fee limits do not apply to a non-individual client / accredited investor.',
        '3. RA may charge fees in advance if agreed by the client. Such advance shall not exceed the period stipulated by SEBI; presently it is one quarter. In case of pre-mature termination of the RA services by either the client or the RA, the client shall be entitled to seek refund of proportionate fees only for unexpired period.',
        '4. Fees to RA may be paid by the client through any of the specified modes like cheque, online bank transfer, UPI, etc. Cash payment is not allowed. Optionally the client can make payments through Centralized Fee Collection Mechanism (CeFCoM) managed by BSE Limited (i.e. currently recognized RAASB).',
        '5. The RA is required to abide by the applicable regulations/ circulars/ directions specified by SEBI and RAASB from time to time in relation to disclosure and mitigation of any actual or potential conflict of interest. The RA will endeavor to promptly inform the client of any conflict of interest that may affect the services being rendered to the client.',
        '6. Any assured/guaranteed/fixed returns schemes or any other schemes of similar nature are prohibited by law. No scheme of this nature shall be offered to the client by the RA.',
        '7. The RA cannot guarantee returns, profits, accuracy, or risk-free investments from the use of the RA\'s research services. All opinions, projections, estimates of the RA are based on the analysis of available data under certain assumptions as of the date of preparation/publication of research report.',
        '8. Any investment made based on recommendations in research reports are subject to market risks, and recommendations do not provide any assurance of returns. There is no recourse to claim any losses incurred on the investments made based on the recommendations in the research report. Any reliance placed on the research report provided by the RA shall be as per the client\'s own judgement and assessment of the conclusions contained in the research report.',
        '9. The SEBI registration, Enlistment with RAASB, and NISM certification do not guarantee the performance of the RA or assure any returns to the client.',
        '10. For any grievances,\nStep 1: the client should first contact the RA using the details on its website or following contact details: (RA to provide details as per \'Grievance Redressal / Escalation Matrix\')\nStep 2: If the resolution is unsatisfactory, the client can also lodge grievances through SEBI\'s SCORES platform at www.scores.sebi.gov.in\nStep 3: The client may also consider the Online Dispute Resolution (ODR) through the Smart ODR portal at https://smartodr.in',
        '11. Clients are required to keep contact details, including email id and mobile number/s updated with the RA at all times.',
        '12. The RA shall never ask for the client\'s login credentials and OTPs for the client\'s Trading Account Demat Account and Bank Account. Never share such information with anyone including RA.'
    ].forEach(item => {
        addParagraph(item);
    });

    addSectionHeader('16. DECLARATION & CONSENT');
    addParagraph('By signing, or otherwise indicating assent:');
    doc.moveDown(0.5);
    addBullet('You acknowledge that you have read, understood, and agree to these Terms, including the fee structure, disclaimers and limitations of liability.');
    addBullet('You confirm that you have provided accurate personal details (Name, PAN, DOB, Email, City, State).');
    addBullet('You agree that no research service will be rendered, until your explicit consent to these Terms is received.');
    addBullet('You understand that any investments or trading made pursuant to Our research reports or recommendations are at your sole discretion and risk, and no assurance or warranty of returns or profitability is provided. There is no recourse to claim any losses incurred on the investments/Trading made based on the recommendations.');

    doc.moveDown(4);
    doc.font('Helvetica-Bold').fontSize(10).text(`Client\'s Signature / Name: ${data.fullName}`);
    doc.moveDown(1);
    doc.font('Helvetica-Oblique').text('(By digital consent and Aadhaar E-Sign, you are agreeing to the above Terms and Conditions.)');

    doc.end();

    stream.on('finish', () => resolve(true));
    stream.on('error', reject);
  });
}

async function sendClientEmail(email: string, name: string, invoicePath: string, agreementPath: string) {
  const isSmtp = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
  const user = isSmtp ? process.env.SMTP_USER : process.env.GMAIL_USER;
  const pass = isSmtp ? process.env.SMTP_PASS : process.env.GMAIL_APP_PASSWORD;

  const transporterOptions: any = isSmtp 
    ? {
        host: process.env.SMTP_HOST || 'smtp.hostinger.com',
        port: parseInt(process.env.SMTP_PORT || '465', 10),
        secure: process.env.SMTP_PORT === '465',
        auth: { user, pass }
      }
    : {
        service: 'gmail',
        auth: { user, pass }
      };

  const transporter = nodemailer.createTransport(transporterOptions);

  const adminEmail = process.env.ADMIN_EMAIL || user;
  
  const mailOptions = {
    from: user,
    to: email,
    bcc: adminEmail, // Admin copy
    subject: `Your Subscription with Karan Vijayvargiya (RA) - Invoice & Agreement`,
    text: `Dear ${name},\n\nThank you for subscribing. Please find attached your Invoice and Service Agreement PDF.\n\nRegards,\nKaran Vijayvargiya (Research Analyst - INH000025470)`,
    attachments: [
      { filename: 'Invoice.pdf', path: invoicePath },
      { filename: 'Agreement.pdf', path: agreementPath }
    ]
  };

  await transporter.sendMail(mailOptions);
}

startServer();
