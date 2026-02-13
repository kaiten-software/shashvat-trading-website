import { Router, Request, Response } from 'express';
import { db } from '../db';
import { products, productCategories, productFeatures, productApplications, productImages, productDocuments, companies, categories, features, applications } from '../db/schema';
import { eq, like, and, or, inArray, sql } from 'drizzle-orm';
import { uploadImage, uploadDocument } from '../middleware/upload';

const router = Router();

// Get all products with filters
router.get('/', async (req: Request, res: Response) => {
  try {
    const { companyId, categoryId, featureId, applicationId, search } = req.query;

    let query = db.select({
      product: products,
      company: companies,
    })
      .from(products)
      .leftJoin(companies, eq(products.companyId, companies.id))
      .$dynamic();

    // Apply filters
    const conditions = [];

    if (companyId) {
      conditions.push(eq(products.companyId, parseInt(companyId as string)));
    }

    if (search) {
      conditions.push(like(products.name, `%${search}%`));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    let results = await query;

    // Filter by category, feature, or application if specified
    if (categoryId || featureId || applicationId) {
      const productIds = results.map(r => r.product.id);

      if (categoryId) {
        const filteredByCategory = await db.select({ productId: productCategories.productId })
          .from(productCategories)
          .where(and(
            eq(productCategories.categoryId, parseInt(categoryId as string)),
            inArray(productCategories.productId, productIds)
          ));
        const allowedIds = filteredByCategory.map(r => r.productId);
        results = results.filter(r => allowedIds.includes(r.product.id));
      }

      if (featureId) {
        const filteredByFeature = await db.select({ productId: productFeatures.productId })
          .from(productFeatures)
          .where(and(
            eq(productFeatures.featureId, parseInt(featureId as string)),
            inArray(productFeatures.productId, productIds)
          ));
        const allowedIds = filteredByFeature.map(r => r.productId);
        results = results.filter(r => allowedIds.includes(r.product.id));
      }

      if (applicationId) {
        const filteredByApplication = await db.select({ productId: productApplications.productId })
          .from(productApplications)
          .where(and(
            eq(productApplications.applicationId, parseInt(applicationId as string)),
            inArray(productApplications.productId, productIds)
          ));
        const allowedIds = filteredByApplication.map(r => r.productId);
        results = results.filter(r => allowedIds.includes(r.product.id));
      }
    }

    // Get categories for each product
    const enrichedResults = await Promise.all(results.map(async (result) => {
      const productCats = await db.select({ category: categories })
        .from(productCategories)
        .leftJoin(categories, eq(productCategories.categoryId, categories.id))
        .where(eq(productCategories.productId, result.product.id));

      return {
        ...result,
        categories: productCats.map(pc => pc.category),
      };
    }));

    res.json(enrichedResults);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get product by ID or slug with all relationships
router.get('/:identifier', async (req: Request, res: Response) => {
  try {
    const identifier = req.params.identifier;
    const isNumeric = !isNaN(Number(identifier));

    const [result] = await db.select({
      product: products,
      company: companies,
    })
      .from(products)
      .leftJoin(companies, eq(products.companyId, companies.id))
      .where(isNumeric ? eq(products.id, parseInt(identifier)) : eq(products.slug, identifier));

    if (!result) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Get categories
    const productCategoriesData = await db.select({
      category: categories,
    })
      .from(productCategories)
      .leftJoin(categories, eq(productCategories.categoryId, categories.id))
      .where(eq(productCategories.productId, result.product.id));

    // Get features
    const productFeaturesData = await db.select({
      feature: features,
    })
      .from(productFeatures)
      .leftJoin(features, eq(productFeatures.featureId, features.id))
      .where(eq(productFeatures.productId, result.product.id));

    // Get applications
    const productApplicationsData = await db.select({
      application: applications,
    })
      .from(productApplications)
      .leftJoin(applications, eq(productApplications.applicationId, applications.id))
      .where(eq(productApplications.productId, result.product.id));

    // Get images
    const images = await db.select()
      .from(productImages)
      .where(eq(productImages.productId, result.product.id))
      .orderBy(productImages.sortOrder);

    // Get documents
    const documents = await db.select()
      .from(productDocuments)
      .where(eq(productDocuments.productId, result.product.id));

    res.json({
      ...result.product,
      company: result.company,
      categories: productCategoriesData.map(c => c.category),
      features: productFeaturesData.map(f => f.feature),
      applications: productApplicationsData.map(a => a.application),
      images,
      documents,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Create product
router.post('/', uploadImage.single('heroImage'), async (req: Request, res: Response) => {
  try {
    const {
      companyId,
      name,
      slug,
      shortDescription,
      contentHtml,
      seoTitle,
      seoDescription,
      categoryIds,
      featureIds,
      applicationIds,
    } = req.body;

    const heroImage = req.file ? `/uploads/products/${req.file.filename}` : null;

    // Insert product
    const [result] = await db.insert(products).values({
      companyId: parseInt(companyId),
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      heroImage,
      shortDescription,
      contentHtml,
      seoTitle,
      seoDescription,
    });

    const productId = result.insertId;

    // Insert relationships
    if (categoryIds) {
      const catIds = JSON.parse(categoryIds);
      for (const catId of catIds) {
        await db.insert(productCategories).values({
          productId,
          categoryId: parseInt(catId),
        });
      }
    }

    if (featureIds) {
      const featIds = JSON.parse(featureIds);
      for (const featId of featIds) {
        await db.insert(productFeatures).values({
          productId,
          featureId: parseInt(featId),
        });
      }
    }

    if (applicationIds) {
      const appIds = JSON.parse(applicationIds);
      for (const appId of appIds) {
        await db.insert(productApplications).values({
          productId,
          applicationId: parseInt(appId),
        });
      }
    }

    res.status(201).json({ id: productId, message: 'Product created successfully' });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update product
router.put('/:id', uploadImage.single('heroImage'), async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id);
    const {
      companyId,
      name,
      slug,
      shortDescription,
      contentHtml,
      seoTitle,
      seoDescription,
      categoryIds,
      featureIds,
      applicationIds,
    } = req.body;

    const updateData: any = {
      companyId: parseInt(companyId),
      name,
      slug,
      shortDescription,
      contentHtml,
      seoTitle,
      seoDescription,
    };

    if (req.file) {
      updateData.heroImage = `/uploads/products/${req.file.filename}`;
    }

    await db.update(products).set(updateData).where(eq(products.id, productId));

    // Update relationships - delete old ones and insert new ones
    await db.delete(productCategories).where(eq(productCategories.productId, productId));
    await db.delete(productFeatures).where(eq(productFeatures.productId, productId));
    await db.delete(productApplications).where(eq(productApplications.productId, productId));

    if (categoryIds) {
      const catIds = JSON.parse(categoryIds);
      for (const catId of catIds) {
        await db.insert(productCategories).values({
          productId,
          categoryId: parseInt(catId),
        });
      }
    }

    if (featureIds) {
      const featIds = JSON.parse(featureIds);
      for (const featId of featIds) {
        await db.insert(productFeatures).values({
          productId,
          featureId: parseInt(featId),
        });
      }
    }

    if (applicationIds) {
      const appIds = JSON.parse(applicationIds);
      for (const appId of appIds) {
        await db.insert(productApplications).values({
          productId,
          applicationId: parseInt(appId),
        });
      }
    }

    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete product
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id);

    // Delete relationships first
    await db.delete(productCategories).where(eq(productCategories.productId, productId));
    await db.delete(productFeatures).where(eq(productFeatures.productId, productId));
    await db.delete(productApplications).where(eq(productApplications.productId, productId));
    await db.delete(productImages).where(eq(productImages.productId, productId));
    await db.delete(productDocuments).where(eq(productDocuments.productId, productId));

    // Delete product
    await db.delete(products).where(eq(products.id, productId));

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Upload product images
router.post('/:id/images', async (req: Request, res: Response) => {
  uploadImage.array('images', 10)(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const productId = parseInt(req.params.id);
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No images provided' });
      }

      for (const file of files) {
        await db.insert(productImages).values({
          productId,
          imagePath: `/uploads/products/${file.filename}`,
          sortOrder: 0,
        });
      }

      res.json({ message: 'Images uploaded successfully', count: files.length });
    } catch (error) {
      console.error('Error uploading images:', error);
      res.status(500).json({ error: 'Failed to upload images' });
    }
  });
});

// Upload product documents
router.post('/:id/documents', async (req: Request, res: Response) => {
  uploadDocument.array('documents', 5)(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const productId = parseInt(req.params.id);
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No documents provided' });
      }

      for (const file of files) {
        await db.insert(productDocuments).values({
          productId,
          filePath: `/uploads/products/documents/${file.filename}`,
          fileName: file.originalname,
          fileSize: file.size,
        });
      }

      res.json({ message: 'Documents uploaded successfully', count: files.length });
    } catch (error) {
      console.error('Error uploading documents:', error);
      res.status(500).json({ error: 'Failed to upload documents' });
    }
  });
});

// Delete product image
router.delete('/:id/images/:imageId', async (req: Request, res: Response) => {
  try {
    const imageId = parseInt(req.params.imageId);
    await db.delete(productImages).where(eq(productImages.id, imageId));
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

// Delete product document
router.delete('/:id/documents/:documentId', async (req: Request, res: Response) => {
  try {
    const documentId = parseInt(req.params.documentId);
    await db.delete(productDocuments).where(eq(productDocuments.id, documentId));
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

export default router;
