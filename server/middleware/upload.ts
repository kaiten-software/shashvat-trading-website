import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

// Ensure upload directories exist
const uploadDirs = [
  'uploads/companies',
  'uploads/products',
  'uploads/products/documents',
  'uploads/categories',
  'uploads/features',
  'uploads/applications',
  'uploads/blog'
];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Storage configuration for images (companies, categories, features, applications, products, blog)
const imageStorage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    // Determine upload directory based on request path
    let uploadPath = 'uploads/products'; // default

    if (req.originalUrl.includes('/companies')) {
      uploadPath = 'uploads/companies';
    } else if (req.originalUrl.includes('/categories')) {
      uploadPath = 'uploads/categories';
    } else if (req.originalUrl.includes('/features')) {
      uploadPath = 'uploads/features';
    } else if (req.originalUrl.includes('/applications')) {
      uploadPath = 'uploads/applications';
    } else if (req.originalUrl.includes('/blog')) {
      uploadPath = 'uploads/blog';
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
    cb(null, 'uploads/products/documents');
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
export const uploadProductDocuments = uploadDocument.array('documents', 10); // max 10 PDFs
