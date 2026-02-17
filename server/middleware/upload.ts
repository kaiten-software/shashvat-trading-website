import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

// Storage configuration for images (companies, categories, features, applications, products, blog)
const imageStorage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    // Detect upload type from request path or body
    let type = req.params.type || req.body.type;

    // Check if this is a blog upload based on the request URL
    if (!type && req.originalUrl && req.originalUrl.includes('/blog/')) {
      type = 'blog';
      console.log('🔍 Blog upload detected from URL:', req.originalUrl);
    }

    // Default to products/images if no type specified
    if (!type) {
      type = 'products/images';
    }

    console.log('📁 Upload destination type:', type, 'for file:', file.originalname);

    const uploadPath = path.join('uploads', type as string);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
      console.log('✅ Created directory:', uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Storage configuration for documents (PDFs only)
const documentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/products/documents';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for images
const imageFileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp, svg)'));
  }
};

// File filter for PDFs
const pdfFileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'));
  }
};

// Multer instances
export const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit for images
  },
});

export const uploadDocument = multer({
  storage: documentStorage,
  fileFilter: pdfFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit for PDFs
  },
});

// Middleware for handling multiple product images
export const uploadProductImages = uploadImage.array('images', 10); // max 10 images

// Middleware for handling multiple product documents
export const uploadProductDocuments = uploadDocument.array('documents', 5); // max 5 PDFs
