import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
dotenv.config();

async function setupDatabase() {
    console.log('🚀 Starting database setup...\n');

    try {
        // Step 1: Create database
        console.log('Step 1: Creating database...');
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || '127.0.0.1',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            port: parseInt(process.env.DB_PORT || '3307'),
        });

        const dbName = process.env.DB_NAME || 'shashvat_trading';
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
        console.log(`✅ Database '${dbName}' created successfully\n`);
        await connection.end();

        // Step 2: Push schema
        console.log('Step 2: Creating tables (pushing schema)...');
        const { stdout: pushOutput } = await execAsync('npm run db:push');
        console.log(pushOutput);
        console.log('✅ Tables created successfully\n');

        // Step 3: Seed data
        console.log('Step 3: Seeding database with sample data...');
        const { stdout: seedOutput } = await execAsync('npm run db:seed');
        console.log(seedOutput);
        console.log('✅ Database seeded successfully\n');

        console.log('🎉 Database setup complete!');
        console.log('\n📝 Next steps:');
        console.log('   1. Restart your server if it\'s running');
        console.log('   2. Open http://localhost:3000 in your browser');
        console.log('   3. The website should now work with full data!\n');

    } catch (error) {
        console.error('❌ Error during setup:', error.message);

        if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.log('\n💡 Database connection failed!');
            console.log('   Please check your .env file:');
            console.log('   - DB_HOST should be: 127.0.0.1');
            console.log('   - DB_PORT should be: 3307');
            console.log('   - DB_USER should be: root');
            console.log('   - DB_PASSWORD: Add your MariaDB password if you have one\n');
        }
        process.exit(1);
    }
}

setupDatabase();
