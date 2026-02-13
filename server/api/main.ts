import { Router, Request, Response } from 'express';
import { db } from '../db';
import { companies, categories, features, applications, products, productCategories, productFeatures, productApplications, productImages, productDocuments, blogPosts, inquiries, callbackRequests } from '../db/schema';
import { eq, like, and, or, inArray, desc } from 'drizzle-orm';
import { uploadImage, uploadDocument, uploadProductImages, uploadProductDocuments } from '../middleware/upload';
import nodemailer from 'nodemailer';
import { authenticateToken } from './auth';

const router = Router();

// ===== COMPANIES API =====
// Get all companies
router.get('/companies', async (req: Request, res: Response) => {
  try {
    const allCompanies = await db.select().from(companies);
    res.json(allCompanies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});

// Get company by ID
router.get('/companies/:id', async (req: Request, res: Response) => {
  try {
    const [company] = await db.select().from(companies).where(eq(companies.id, parseInt(req.params.id)));
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch company' });
  }
});

// Create company with logo upload
router.post('/companies', uploadImage.single('logo'), async (req: Request, res: Response) => {
  try {
    const { name, description, website } = req.body;
    const logo = req.file ? `/uploads/companies/${req.file.filename}` : null;

    const [result] = await db.insert(companies).values({
      name,
      description,
      website,
      logo,
    });

    res.status(201).json({ id: result.insertId, message: 'Company created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create company' });
  }
});

// Update company
router.put('/companies/:id', uploadImage.single('logo'), async (req: Request, res: Response) => {
  try {
    const { name, description, website } = req.body;
    const updateData: any = { name, description, website };

    if (req.file) {
      updateData.logo = `/uploads/companies/${req.file.filename}`;
    }

    await db.update(companies)
      .set(updateData)
      .where(eq(companies.id, parseInt(req.params.id)));

    res.json({ message: 'Company updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update company' });
  }
});

// Delete company
router.delete('/companies/:id', async (req: Request, res: Response) => {
  try {
    await db.delete(companies).where(eq(companies.id, parseInt(req.params.id)));
    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete company' });
  }
});

// ===== CATEGORIES API =====
router.get('/categories', async (req: Request, res: Response) => {
  try {
    const allCategories = await db.select().from(categories);
    res.json(allCategories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

router.get('/categories/:id', async (req: Request, res: Response) => {
  try {
    const [category] = await db.select().from(categories).where(eq(categories.id, parseInt(req.params.id)));
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

router.post('/categories', uploadImage.single('image'), async (req: Request, res: Response) => {
  try {
    const { name, slug, description } = req.body;
    const image = req.file ? `/uploads/categories/${req.file.filename}` : null;

    const [result] = await db.insert(categories).values({
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      description,
      image,
    });

    res.status(201).json({ id: result.insertId, message: 'Category created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

router.put('/categories/:id', uploadImage.single('image'), async (req: Request, res: Response) => {
  try {
    const { name, slug, description } = req.body;
    const updateData: any = { name, slug, description };

    if (req.file) {
      updateData.image = `/uploads/categories/${req.file.filename}`;
    }

    await db.update(categories)
      .set(updateData)
      .where(eq(categories.id, parseInt(req.params.id)));

    res.json({ message: 'Category updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
});

router.delete('/categories/:id', async (req: Request, res: Response) => {
  try {
    await db.delete(categories).where(eq(categories.id, parseInt(req.params.id)));
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

// ===== FEATURES API =====
router.get('/features', async (req: Request, res: Response) => {
  try {
    const allFeatures = await db.select().from(features);
    res.json(allFeatures);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch features' });
  }
});

router.get('/features/:id', async (req: Request, res: Response) => {
  try {
    const [feature] = await db.select().from(features).where(eq(features.id, parseInt(req.params.id)));
    if (!feature) {
      return res.status(404).json({ error: 'Feature not found' });
    }
    res.json(feature);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch feature' });
  }
});

router.post('/features', uploadImage.single('image'), async (req: Request, res: Response) => {
  try {
    const { name, slug, description } = req.body;
    const image = req.file ? `/uploads/features/${req.file.filename}` : null;

    const [result] = await db.insert(features).values({
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      description,
      image,
    });

    res.status(201).json({ id: result.insertId, message: 'Feature created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create feature' });
  }
});

router.put('/features/:id', uploadImage.single('image'), async (req: Request, res: Response) => {
  try {
    const { name, slug, description } = req.body;
    const updateData: any = { name, slug, description };

    if (req.file) {
      updateData.image = `/uploads/features/${req.file.filename}`;
    }

    await db.update(features)
      .set(updateData)
      .where(eq(features.id, parseInt(req.params.id)));

    res.json({ message: 'Feature updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update feature' });
  }
});

router.delete('/features/:id', async (req: Request, res: Response) => {
  try {
    await db.delete(features).where(eq(features.id, parseInt(req.params.id)));
    res.json({ message: 'Feature deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete feature' });
  }
});

// ===== APPLICATIONS API =====
router.get('/applications', async (req: Request, res: Response) => {
  try {
    const allApplications = await db.select().from(applications);
    res.json(allApplications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

router.get('/applications/:id', async (req: Request, res: Response) => {
  try {
    const [application] = await db.select().from(applications).where(eq(applications.id, parseInt(req.params.id)));
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch application' });
  }
});

router.post('/applications', uploadImage.single('image'), async (req: Request, res: Response) => {
  try {
    const { name, slug, description } = req.body;
    const image = req.file ? `/uploads/applications/${req.file.filename}` : null;

    const [result] = await db.insert(applications).values({
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      description,
      image,
    });

    res.status(201).json({ id: result.insertId, message: 'Application created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create application' });
  }
});

router.put('/applications/:id', uploadImage.single('image'), async (req: Request, res: Response) => {
  try {
    const { name, slug, description } = req.body;
    const updateData: any = { name, slug, description };

    if (req.file) {
      updateData.image = `/uploads/applications/${req.file.filename}`;
    }

    await db.update(applications)
      .set(updateData)
      .where(eq(applications.id, parseInt(req.params.id)));

    res.json({ message: 'Application updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update application' });
  }
});

router.delete('/applications/:id', async (req: Request, res: Response) => {
  try {
    await db.delete(applications).where(eq(applications.id, parseInt(req.params.id)));
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete application' });
  }
});

// ===== BLOG POSTS API =====
// Get published posts only (for public frontend)
router.get('/blog/posts', async (req: Request, res: Response) => {
  try {
    const allPosts = await db.select().from(blogPosts).where(eq(blogPosts.isPublished, true));
    res.json(allPosts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// Get all posts (for admin)
router.get('/blog/all', async (req: Request, res: Response) => {
  try {
    const allPosts = await db.select().from(blogPosts);
    res.json(allPosts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

router.get('/blog/posts/:slug', async (req: Request, res: Response) => {
  try {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, req.params.slug));
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

router.post('/blog/posts', uploadImage.single('featuredImage'), async (req: Request, res: Response) => {
  try {
    const { title, slug, excerpt, contentHtml, seoTitle, seoDescription, isPublished } = req.body;
    const featuredImage = req.file ? `/uploads/blog/${req.file.filename}` : null;

    const [result] = await db.insert(blogPosts).values({
      title,
      slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
      excerpt,
      contentHtml,
      featuredImage,
      seoTitle,
      seoDescription,
      isPublished: isPublished === 'true',
      publishedAt: isPublished === 'true' ? new Date() : null,
    });

    res.status(201).json({ id: result.insertId, message: 'Blog post created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

router.put('/blog/posts/:id', uploadImage.single('featuredImage'), async (req: Request, res: Response) => {
  try {
    const { title, slug, excerpt, contentHtml, seoTitle, seoDescription, isPublished } = req.body;
    const updateData: any = { title, slug, excerpt, contentHtml, seoTitle, seoDescription, isPublished: isPublished === 'true' };

    if (req.file) {
      updateData.featuredImage = `/uploads/blog/${req.file.filename}`;
    }

    if (isPublished === 'true') {
      updateData.publishedAt = new Date();
    }

    await db.update(blogPosts)
      .set(updateData)
      .where(eq(blogPosts.id, parseInt(req.params.id)));

    res.json({ message: 'Blog post updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update blog post' });
  }
});

router.delete('/blog/posts/:id', async (req: Request, res: Response) => {
  try {
    await db.delete(blogPosts).where(eq(blogPosts.id, parseInt(req.params.id)));
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

// ===== CONTACT/INQUIRY API =====
router.post('/inquiries', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, company, city, productId, message } = req.body;

    // Save inquiry to database
    const [result] = await db.insert(inquiries).values({
      name,
      email,
      phone,
      company,
      city,
      productId: productId ? parseInt(productId) : null,
      message,
    });

    // Send email notification (optional - don't fail if SMTP not configured)
    try {
      if (process.env.SMTP_HOST && process.env.SMTP_USER) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const mailOptions = {
          from: process.env.SMTP_FROM || 'noreply@shashvattrading.com',
          to: process.env.CONTACT_EMAIL || 'info@shashvattrading.com',
          subject: `New Inquiry from ${name}`,
          html: `
            <h2>New Contact Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p><strong>City:</strong> ${city || 'Not provided'}</p>
            <p><strong>Product ID:</strong> ${productId || 'General inquiry'}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        };

        await transporter.sendMail(mailOptions);
      }
    } catch (emailError) {
      console.error('Email notification failed (non-critical):', emailError);
      // Continue anyway - email is optional
    }

    res.status(201).json({ success: true, id: result.insertId, message: 'Inquiry submitted successfully' });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    res.status(500).json({ error: 'Failed to submit inquiry' });
  }
});

// Get all inquiries (for admin)
router.get('/inquiries', async (req: Request, res: Response) => {
  try {
    const allInquiries = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
    res.json(allInquiries);
  } catch (error) {


    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

// ===== CALLBACKS API =====
router.post('/callbacks', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, city, requirement } = req.body;

    if (!name || !email || !phone || !city) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const [result] = await db.insert(callbackRequests).values({
      name,
      email,
      phone,
      city,
      requirement,
    });

    res.status(201).json({ success: true, id: result.insertId, message: 'Callback request submitted' });
  } catch (error) {
    console.error('Error submitting callback:', error);
    res.status(500).json({ error: 'Failed to submit callback request' });
  }
});

// Get all callback requests (for admin)
router.get('/callbacks', authenticateToken, async (req: Request, res: Response) => {
  try {
    const allCallbacks = await db.select().from(callbackRequests).orderBy(desc(callbackRequests.createdAt));
    res.json(allCallbacks);
  } catch (error) {
    console.error('Error fetching callbacks:', error);
    res.status(500).json({ error: 'Failed to fetch callbacks' });
  }
});

// Delete callback request
router.delete('/callbacks/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    await db.delete(callbackRequests).where(eq(callbackRequests.id, parseInt(req.params.id)));
    res.json({ message: 'Callback request deleted successfully' });
  } catch (error) {
    console.error('Error deleting callback:', error);
    res.status(500).json({ error: 'Failed to delete callback request' });
  }
});

export default router;
