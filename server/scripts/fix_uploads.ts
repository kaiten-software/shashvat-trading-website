
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { db } from '../db';
import { companies, categories, features, applications, blogPosts } from '../db/schema';

// Helper to move file if needed
const moveFileIfNeeded = (dbPath: string | null, targetDirName: string) => {
    if (!dbPath) return;

    // dbPath is like '/uploads/companies/file.jpg'
    // Remove leading slash
    const relativePath = dbPath.startsWith('/') ? dbPath.slice(1) : dbPath;
    const fileName = path.basename(relativePath);

    const targetPath = path.join(process.cwd(), relativePath);
    const oldDefaultPath = path.join(process.cwd(), 'uploads', 'products', 'images', fileName);
    const newDefaultPath = path.join(process.cwd(), 'uploads', 'products', fileName);

    // If file already exists at target, we are good
    if (fs.existsSync(targetPath)) {
        // console.log(`✅ File exists: ${targetPath}`);
        return;
    }

    // Check old location
    if (fs.existsSync(oldDefaultPath)) {
        console.log(`🔄 Moving ${fileName} from products/images to ${targetDirName}...`);
        // Ensure target dir exists
        const targetDir = path.dirname(targetPath);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        // Copy then delete (safer than rename across partitions though not an issue here usually)
        fs.copyFileSync(oldDefaultPath, targetPath);
        fs.unlinkSync(oldDefaultPath);
        console.log(`✅ Moved to ${targetPath}`);
        return;
    }

    // Check new default location
    if (fs.existsSync(newDefaultPath)) {
        console.log(`🔄 Moving ${fileName} from products to ${targetDirName}...`);
        // Ensure target dir exists
        const targetDir = path.dirname(targetPath);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        fs.copyFileSync(newDefaultPath, targetPath);
        fs.unlinkSync(newDefaultPath);
        console.log(`✅ Moved to ${targetPath}`);
        return;
    }

    console.log(`❌ File missing for ${targetDirName}: ${dbPath}`);
};

async function main() {
    console.log('🔧 Starting upload fix script...');

    try {
        // 1. Check Companies
        console.log('\n--- Checking Companies ---');
        const allCompanies = await db.select().from(companies);
        for (const c of allCompanies) {
            moveFileIfNeeded(c.logo, 'companies');
        }

        // 2. Check Categories
        console.log('\n--- Checking Categories ---');
        const allCategories = await db.select().from(categories);
        for (const c of allCategories) {
            moveFileIfNeeded(c.image, 'categories');
        }

        // 3. Check Features
        console.log('\n--- Checking Features ---');
        const allFeatures = await db.select().from(features);
        for (const f of allFeatures) {
            moveFileIfNeeded(f.image, 'features');
        }

        // 4. Check Applications
        console.log('\n--- Checking Applications ---');
        const allApps = await db.select().from(applications);
        for (const a of allApps) {
            moveFileIfNeeded(a.image, 'applications');
        }

        // 5. Check Blog Posts
        console.log('\n--- Checking Blog Posts ---');
        const allPosts = await db.select().from(blogPosts);
        for (const p of allPosts) {
            moveFileIfNeeded(p.featuredImage, 'blog');
        }

        console.log('\n✅ Fix script completed!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error running fix script:', error);
        process.exit(1);
    }
}

main();
