
import { db } from './server/db';
import { users, companies, categories, features, applications, products, productCategories, productFeatures, productApplications, productImages, productDocuments, blogPosts, inquiries, callbackRequests } from './server/db/schema';
import fs from 'fs';

async function backupData() {
    try {
        const _users = await db.select().from(users);
        const _companies = await db.select().from(companies);
        const _categories = await db.select().from(categories);
        const _features = await db.select().from(features);
        const _applications = await db.select().from(applications);
        const _products = await db.select().from(products);
        const _productCategories = await db.select().from(productCategories);
        const _productFeatures = await db.select().from(productFeatures);
        const _productApplications = await db.select().from(productApplications);
        const _productImages = await db.select().from(productImages);
        const _productDocuments = await db.select().from(productDocuments);
        const _blogPosts = await db.select().from(blogPosts);
        const _inquiries = await db.select().from(inquiries);
        const _callbackRequests = await db.select().from(callbackRequests);

        const data = {
            users: _users,
            companies: _companies,
            categories: _categories,
            features: _features,
            applications: _applications,
            products: _products,
            productCategories: _productCategories,
            productFeatures: _productFeatures,
            productApplications: _productApplications,
            productImages: _productImages,
            productDocuments: _productDocuments,
            blogPosts: _blogPosts,
            inquiries: _inquiries,
            callbackRequests: _callbackRequests
        };

        fs.writeFileSync('db_backup.json', JSON.stringify(data, null, 2));
        console.log('✅ Data backup complete! Saved to db_backup.json');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error backing up data:', error);
        process.exit(1);
    }
}

backupData();
