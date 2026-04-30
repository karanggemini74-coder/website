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
  const PORT = process.env.PORT || 3000;

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
  const getAdminPassword = () => process.env.ADMIN_PASSWORD || 'admin123';

  app.post('/api/login', (req, res) => {
    const currentPassword = getAdminPassword();
    if (req.body.password === currentPassword) {
      res.json({ success: true, token: currentPassword });
    } else {
      res.status(401).json({ success: false, error: 'Invalid password' });
    }
  });

  const requireAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const currentPassword = getAdminPassword();
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader === `Bearer ${currentPassword}`) {
      next();
    } else {
      res.status(401).json({ error: 'Unauthorized: Invalid or missing token' });
    }
  };

  app.use('/api/admin', requireAdmin);

  // Serve uploads publicly so admin can view them securely
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
      const invoiceFilename = `Invoice_${formData.fullName.replace(/\\s+/g, '_')}_${Date.now()}.pdf`;
      const invoicePath = path.join(__dirname, 'uploads', invoiceFilename);
      await createInvoicePDF(formData, invoicePath);

      // 2. Generate Agreement / MITC PDF
      const agreementFilename = `Agreement_${formData.fullName.replace(/\\s+/g, '_')}_${Date.now()}.pdf`;
      const agreementPath = path.join(__dirname, 'uploads', agreementFilename);
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
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(20).text('INVOICE', { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(12).text(`Date: ${new Date().toLocaleDateString()}`);
    doc.text(`Invoice No: INV-${Math.floor(Math.random() * 100000)}`);
    doc.moveDown();

    doc.text(`Billed To:`);
    doc.text(`${data.fullName}`);
    doc.text(`${data.email}`);
    doc.text(`${data.phone}`);
    doc.text(`${data.city}, ${data.state}`);
    doc.moveDown();

    doc.text(`Service: ${data.Selected_Plan}`);
    doc.text(`Plan Amount: ${data.Subscription_Price}`);
    doc.text(`Payment Method: ${data.paymentMethod}`);
    doc.moveDown();
    
    doc.text(`Research Analyst: Karan Vijayvargiya (SEBI No. INH000025470)`);
    doc.end();

    stream.on('finish', () => resolve(true));
    stream.on('error', reject);
  });
}

async function createAgreementPDF(data: any, filePath: string) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(16).text('COMPREHENSIVE TERMS AND CONDITIONS', { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(10).text(`Client Name: ${data.fullName}`);
    doc.text(`PAN: ${data.panNumber}`);
    doc.text(`Consent E-Signed On: ${new Date().toLocaleString()}`);
    doc.text(`Aadhaar Status: ${data.MITC_eSign_Status}`);
    doc.moveDown();

    doc.text(`This document serves as proof of agreement between Karan Vijayvargiya (RA) and ${data.fullName}.`, { align: 'justify' });
    doc.moveDown();
    
    doc.text(`Services: ${data.Selected_Plan} at ${data.Subscription_Price}.`);
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
