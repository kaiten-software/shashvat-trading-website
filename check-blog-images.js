import { db } from './server/db/index.js';
import { blogPosts } from './server/db/schema.js';

async function checkBlogImages() {
    try {
        const posts = await db.select().from(blogPosts);
        console.log('Blog Posts with Images:');
        console.log('========================');
        posts.forEach(post => {
            console.log(`\nID: ${post.id}`);
            console.log(`Title: ${post.title}`);
            console.log(`Featured Image: ${post.featuredImage || 'NO IMAGE'}`);
        });
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkBlogImages();
