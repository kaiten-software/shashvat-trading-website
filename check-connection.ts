
import { db } from './server/db';
import { users } from './server/db/schema';
import { sql } from 'drizzle-orm';

async function checkConnection() {
    try {
        console.log('🔌 Testing connection to Supabase...');

        // Simple query to get database version or current time
        const result = await db.execute(sql`SELECT version()`);
        console.log('✅ Connected successfully!');
        console.log(`📊 Database Version: ${result[0].version}`);

        // Check data count
        const userCount = await db.select({ count: sql<number>`count(*)` }).from(users);
        console.log(`👥 Users found in database: ${userCount[0].count}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Connection failed:', error);
        process.exit(1);
    }
}

checkConnection();
