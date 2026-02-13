
import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    role: varchar("role", { length: 50 }).default("viewer").notNull(),
    isActive: boolean("is_active").default(true),
    lastLogin: timestamp("last_login"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const companies = pgTable("companies", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    logo: varchar("logo", { length: 500 }),
    description: text("description"),
    website: varchar("website", { length: 500 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const categories = pgTable("categories", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    image: varchar("image", { length: 500 }),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const features = pgTable("features", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    image: varchar("image", { length: 500 }),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const applications = pgTable("applications", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    image: varchar("image", { length: 500 }),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    companyId: integer("company_id").notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    heroImage: varchar("hero_image", { length: 500 }),
    shortDescription: text("short_description"),
    contentHtml: text("content_html"),
    seoTitle: varchar("seo_title", { length: 255 }),
    seoDescription: text("seo_description"),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const productCategories = pgTable("product_categories", {
    id: serial("id").primaryKey(),
    productId: integer("product_id").notNull(),
    categoryId: integer("category_id").notNull(),
});

export const productFeatures = pgTable("product_features", {
    id: serial("id").primaryKey(),
    productId: integer("product_id").notNull(),
    featureId: integer("feature_id").notNull(),
});

export const productApplications = pgTable("product_applications", {
    id: serial("id").primaryKey(),
    productId: integer("product_id").notNull(),
    applicationId: integer("application_id").notNull(),
});

export const productDocuments = pgTable("product_documents", {
    id: serial("id").primaryKey(),
    productId: integer("product_id").notNull(),
    filePath: varchar("file_path", { length: 500 }).notNull(),
    fileName: varchar("file_name", { length: 255 }).notNull(),
    fileSize: integer("file_size"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const productImages = pgTable("product_images", {
    id: serial("id").primaryKey(),
    productId: integer("product_id").notNull(),
    imagePath: varchar("image_path", { length: 500 }).notNull(),
    sortOrder: integer("sort_order").default(0),
    createdAt: timestamp("created_at").defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
    id: serial("id").primaryKey(),
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
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const inquiries = pgTable("inquiries", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 50 }),
    company: varchar("company", { length: 255 }),
    city: varchar("city", { length: 255 }),
    productId: integer("product_id"),
    message: text("message").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const callbackRequests = pgTable("callback_requests", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 50 }).notNull(),
    city: varchar("city", { length: 255 }).notNull(),
    requirement: text("requirement"),
    createdAt: timestamp("created_at").defaultNow(),
});
