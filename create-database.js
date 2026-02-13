import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function createDatabase() {
    try {
        // Connect without specifying a database
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            port: parseInt(process.env.DB_PORT || '3306'),
        });

        console.log('✅ Connected to MySQL/MariaDB');

        // Create database if it doesn't exist
        const dbName = process.env.DB_NAME || 'shashvat_trading';
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
        console.log(`✅ Database '${dbName}' created or already exists`);

        await connection.end();
        console.log('✅ Done! You can now run: npm run db:push');
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.log('\n💡 Tip: Check your DB_PASSWORD in the .env file');
            console.log('   If you have a password set for root, add it to .env');
        }
    }
}

createDatabase();
