
import { db } from './server/db';
import { sql } from 'drizzle-orm';
import * as schema from './server/db/schema';
import fs from 'fs';

async function restore() {
    console.log('📦 Reading backup data...');
    const data = JSON.parse(fs.readFileSync('db_backup.json', 'utf-8'));

    try {
        console.log('🧹 Clearing existing data to prevent conflicts...');
        // Delete in reverse order of dependencies
        await db.delete(schema.callbackRequests);
        await db.delete(schema.inquiries);
        await db.delete(schema.blogPosts);
        await db.delete(schema.productDocuments);
        await db.delete(schema.productImages);
        await db.delete(schema.productApplications);
        await db.delete(schema.productFeatures);
        await db.delete(schema.productCategories);
        await db.delete(schema.products);
        await db.delete(schema.applications);
        await db.delete(schema.features);
        await db.delete(schema.categories);
        await db.delete(schema.companies);
        await db.delete(schema.users);

        console.log('🚀 Restoring data...');

        // 1. Users
        if (data.users && data.users.length > 0) {
            console.log(`  - Restoring ${data.users.length} users...`);
            await db.insert(schema.users).values(data.users.map((u: any) => ({
                ...u,
                isActive: u.isActive === 1 || u.isActive === true,
                lastLogin: u.lastLogin ? new Date(u.lastLogin) : null,
                createdAt: u.createdAt ? new Date(u.createdAt) : new Date(),
                updatedAt: u.updatedAt ? new Date(u.updatedAt) : new Date(),
            })));
            // Reset sequence
            await db.execute(sql`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))`);
        }

        // 2. Companies
        if (data.companies && data.companies.length > 0) {
            console.log(`  - Restoring ${data.companies.length} companies...`);
            await db.insert(schema.companies).values(data.companies.map((c: any) => ({
                ...c,
                createdAt: c.createdAt ? new Date(c.createdAt) : new Date(),
                updatedAt: c.updatedAt ? new Date(c.updatedAt) : new Date(),
            })));
            await db.execute(sql`SELECT setval('companies_id_seq', (SELECT MAX(id) FROM companies))`);
        }

        // 3. Categories
        if (data.categories && data.categories.length > 0) {
            console.log(`  - Restoring ${data.categories.length} categories...`);
            await db.insert(schema.categories).values(data.categories.map((c: any) => ({
                ...c,
                createdAt: c.createdAt ? new Date(c.createdAt) : new Date(),
                updatedAt: c.updatedAt ? new Date(c.updatedAt) : new Date(),
            })));
            await db.execute(sql`SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories))`);
        }

        // 4. Features
        if (data.features && data.features.length > 0) {
            console.log(`  - Restoring ${data.features.length} features...`);
            await db.insert(schema.features).values(data.features.map((f: any) => ({
                ...f,
                createdAt: f.createdAt ? new Date(f.createdAt) : new Date(),
                updatedAt: f.updatedAt ? new Date(f.updatedAt) : new Date(),
            })));
            await db.execute(sql`SELECT setval('features_id_seq', (SELECT MAX(id) FROM features))`);
        }

        // 5. Applications
        if (data.applications && data.applications.length > 0) {
            console.log(`  - Restoring ${data.applications.length} applications...`);
            await db.insert(schema.applications).values(data.applications.map((a: any) => ({
                ...a,
                createdAt: a.createdAt ? new Date(a.createdAt) : new Date(),
                updatedAt: a.updatedAt ? new Date(a.updatedAt) : new Date(),
            })));
            await db.execute(sql`SELECT setval('applications_id_seq', (SELECT MAX(id) FROM applications))`);
        }

        // 6. Products
        if (data.products && data.products.length > 0) {
            console.log(`  - Restoring ${data.products.length} products...`);
            await db.insert(schema.products).values(data.products.map((p: any) => ({
                ...p,
                isActive: p.isActive === 1 || p.isActive === true,
                createdAt: p.createdAt ? new Date(p.createdAt) : new Date(),
                updatedAt: p.updatedAt ? new Date(p.updatedAt) : new Date(),
            })));
            await db.execute(sql`SELECT setval('products_id_seq', (SELECT MAX(id) FROM products))`);
        }

        // 7. Product Relations (Categories, Features, Applications)
        if (data.productCategories && data.productCategories.length > 0) {
            console.log(`  - Restoring ${data.productCategories.length} product-categories links...`);
            await db.insert(schema.productCategories).values(data.productCategories);
            await db.execute(sql`SELECT setval('product_categories_id_seq', (SELECT MAX(id) FROM product_categories))`);
        }
        if (data.productFeatures && data.productFeatures.length > 0) {
            console.log(`  - Restoring ${data.productFeatures.length} product-features links...`);
            await db.insert(schema.productFeatures).values(data.productFeatures);
            await db.execute(sql`SELECT setval('product_features_id_seq', (SELECT MAX(id) FROM product_features))`);
        }
        if (data.productApplications && data.productApplications.length > 0) {
            console.log(`  - Restoring ${data.productApplications.length} product-applications links...`);
            await db.insert(schema.productApplications).values(data.productApplications);
            await db.execute(sql`SELECT setval('product_applications_id_seq', (SELECT MAX(id) FROM product_applications))`);
        }

        // 8. Product Images & Documents
        if (data.productImages && data.productImages.length > 0) {
            console.log(`  - Restoring ${data.productImages.length} product images...`);
            await db.insert(schema.productImages).values(data.productImages.map((img: any) => ({
                ...img,
                createdAt: img.createdAt ? new Date(img.createdAt) : new Date(),
            })));
            await db.execute(sql`SELECT setval('product_images_id_seq', (SELECT MAX(id) FROM product_images))`);
        }
        if (data.productDocuments && data.productDocuments.length > 0) {
            console.log(`  - Restoring ${data.productDocuments.length} product documents...`);
            await db.insert(schema.productDocuments).values(data.productDocuments.map((doc: any) => ({
                ...doc,
                createdAt: doc.createdAt ? new Date(doc.createdAt) : new Date(),
            })));
            await db.execute(sql`SELECT setval('product_documents_id_seq', (SELECT MAX(id) FROM product_documents))`);
        }

        // 9. Blog Posts
        if (data.blogPosts && data.blogPosts.length > 0) {
            console.log(`  - Restoring ${data.blogPosts.length} blog posts...`);
            await db.insert(schema.blogPosts).values(data.blogPosts.map((post: any) => ({
                ...post,
                isPublished: post.isPublished === 1 || post.isPublished === true,
                publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
                createdAt: post.createdAt ? new Date(post.createdAt) : new Date(),
                updatedAt: post.updatedAt ? new Date(post.updatedAt) : new Date(),
            })));
            await db.execute(sql`SELECT setval('blog_posts_id_seq', (SELECT MAX(id) FROM blog_posts))`);
        }

        // 10. Inquiries & Callbacks
        if (data.inquiries && data.inquiries.length > 0) {
            console.log(`  - Restoring ${data.inquiries.length} inquiries...`);
            await db.insert(schema.inquiries).values(data.inquiries.map((inq: any) => ({
                ...inq,
                createdAt: inq.createdAt ? new Date(inq.createdAt) : new Date(),
            })));
            await db.execute(sql`SELECT setval('inquiries_id_seq', (SELECT MAX(id) FROM inquiries))`);
        }
        if (data.callbackRequests && data.callbackRequests.length > 0) {
            console.log(`  - Restoring ${data.callbackRequests.length} callback requests...`);
            await db.insert(schema.callbackRequests).values(data.callbackRequests.map((cb: any) => ({
                ...cb,
                createdAt: cb.createdAt ? new Date(cb.createdAt) : new Date(),
            })));
            await db.execute(sql`SELECT setval('callback_requests_id_seq', (SELECT MAX(id) FROM callback_requests))`);
        }

        console.log('✅ Data restoration complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Restoration failed:', error);
        process.exit(1);
    }
}

restore();
