import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function createTable() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'shashvat_trading',
            port: parseInt(process.env.DB_PORT || '3306'),
        });

        console.log('Connected to database.');

        const query = `
            CREATE TABLE IF NOT EXISTS callback_requests (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(50) NOT NULL,
                city VARCHAR(255) NOT NULL,
                requirement TEXT,
                status VARCHAR(50) DEFAULT 'new',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

        await connection.query(query);
        console.log('✅ callback_requests table created successfully.');

        await connection.end();
    } catch (error) {
        console.error('❌ Error creating table:', error);
    }
}

createTable();
