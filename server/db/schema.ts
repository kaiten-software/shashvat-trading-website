import { mysqlTable, varchar, text, timestamp, int, boolean } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

// Users table for authentication
export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull().default("viewer"), // admin, editor, viewer
  isActive: boolean("is_active").default(true),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// Companies table - manufacturers like LG, Formosa, etc.
export const companies = mysqlTable("companies", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  logo: varchar("logo", { length: 500 }), // path to uploaded logo
  description: text("description"),
  website: varchar("website", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// Categories table - PP, PE, PVC, etc.
export const categories = mysqlTable("categories", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  image: varchar("image", { length: 500 }),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// Features table
export const features = mysqlTable("features", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  image: varchar("image", { length: 500 }),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// Applications table - automotive, packaging, construction, etc.
export const applications = mysqlTable("applications", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  image: varchar("image", { length: 500 }),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// Products table
export const products = mysqlTable("products", {
  id: int("id").primaryKey().autoincrement(),
  companyId: int("company_id").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  heroImage: varchar("hero_image", { length: 500 }), // main display image
  shortDescription: text("short_description"),
  contentHtml: text("content_html"), // rich HTML content from AI
  seoTitle: varchar("seo_title", { length: 255 }),
  seoDescription: text("seo_description"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// Product-Category junction table (many-to-many)
export const productCategories = mysqlTable("product_categories", {
  id: int("id").primaryKey().autoincrement(),
  productId: int("product_id").notNull(),
  categoryId: int("category_id").notNull(),
});

// Product-Feature junction table (many-to-many)
export const productFeatures = mysqlTable("product_features", {
  id: int("id").primaryKey().autoincrement(),
  productId: int("product_id").notNull(),
  featureId: int("feature_id").notNull(),
});

// Product-Application junction table (many-to-many)
export const productApplications = mysqlTable("product_applications", {
  id: int("id").primaryKey().autoincrement(),
  productId: int("product_id").notNull(),
  applicationId: int("application_id").notNull(),
});

// Product images table
export const productImages = mysqlTable("product_images", {
  id: int("id").primaryKey().autoincrement(),
  productId: int("product_id").notNull(),
  imagePath: varchar("image_path", { length: 500 }).notNull(),
  sortOrder: int("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Product documents/PDFs table
export const productDocuments = mysqlTable("product_documents", {
  id: int("id").primaryKey().autoincrement(),
  productId: int("product_id").notNull(),
  filePath: varchar("file_path", { length: 500 }).notNull(),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  fileSize: int("file_size"), // in bytes
  createdAt: timestamp("created_at").defaultNow(),
});

// Blog posts table
export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  contentHtml: text("content_html").notNull(),
  featuredImage: varchar("featured_image", { length: 500 }),
  seoTitle: varchar("seo_title", { length: 255 }),
  seoDescription: text("seo_description"),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// Contact inquiries table
export const inquiries = mysqlTable("inquiries", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  city: varchar("city", { length: 255 }),
  productId: int("product_id"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Callback requests table
export const callbackRequests = mysqlTable("callback_requests", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  requirement: text("requirement"),
  status: varchar("status", { length: 50 }).default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const companiesRelations = relations(companies, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  company: one(companies, {
    fields: [products.companyId],
    references: [companies.id],
  }),
  productCategories: many(productCategories),
  productFeatures: many(productFeatures),
  productApplications: many(productApplications),
  images: many(productImages),
  documents: many(productDocuments),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  productCategories: many(productCategories),
}));

export const featuresRelations = relations(features, ({ many }) => ({
  productFeatures: many(productFeatures),
}));

export const applicationsRelations = relations(applications, ({ many }) => ({
  productApplications: many(productApplications),
}));

export const productCategoriesRelations = relations(productCategories, ({ one }) => ({
  product: one(products, {
    fields: [productCategories.productId],
    references: [products.id],
  }),
  category: one(categories, {
    fields: [productCategories.categoryId],
    references: [categories.id],
  }),
}));

export const productFeaturesRelations = relations(productFeatures, ({ one }) => ({
  product: one(products, {
    fields: [productFeatures.productId],
    references: [products.id],
  }),
  feature: one(features, {
    fields: [productFeatures.featureId],
    references: [features.id],
  }),
}));

export const productApplicationsRelations = relations(productApplications, ({ one }) => ({
  product: one(products, {
    fields: [productApplications.productId],
    references: [products.id],
  }),
  application: one(applications, {
    fields: [productApplications.applicationId],
    references: [applications.id],
  }),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

export const productDocumentsRelations = relations(productDocuments, ({ one }) => ({
  product: one(products, {
    fields: [productDocuments.productId],
    references: [products.id],
  }),
}));

export const inquiriesRelations = relations(inquiries, ({ one }) => ({
  product: one(products, {
    fields: [inquiries.productId],
    references: [products.id],
  }),
}));
