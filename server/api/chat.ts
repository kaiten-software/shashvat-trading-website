import { Router, Request, Response } from 'express';
import { db } from '../db';
import { products, blogPosts } from '../db/schema';
import { eq, like, or } from 'drizzle-orm';
import fs from 'fs';
import path from 'path';

const router = Router();

// Load chatbot knowledge
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const knowledgeConfig = path.join(__dirname, '../chatbot/config.json');
const knowledgeBoundaries = path.join(__dirname, '../chatbot/knowledge_boundaries.md');

router.post('/message', async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const lowerMsg = message.toLowerCase();

        // 1. Check for product-related queries
        if (lowerMsg.includes('product') || lowerMsg.includes('grade') || lowerMsg.includes('mfi') || lowerMsg.includes('spec')) {
            const allProducts = await db.select().from(products).limit(5);
            const productNames = allProducts.map(p => p.name).join(', ');
            return res.json({
                reply: `I can help you with our product range. We offer high-quality resins like: ${productNames}. For specific technical data sheets or a formal quote, please use the "Get Quote" button on the product pages.`
            });
        }

        // 2. Check for contact/quote queries
        if (lowerMsg.includes('quote') || lowerMsg.includes('price') || lowerMsg.includes('buy') || lowerMsg.includes('inquiry')) {
            return res.json({
                reply: "Polymer market prices fluctuate daily. To provide you with the most accurate pricing and availability, please fill out our inquiry form by clicking 'Get Quote' or visiting our Contact page. Our procurement experts will get back to you within 24 hours."
            });
        }

        // 3. Fallback to generic professional B2B response based on config
        return res.json({
            reply: "I am the Shashvat AI Copilot. I can assist you with technical specifications for PP, PE, PVC, and Engineering Plastics. How can I help with your industrial requirements today?"
        });

    } catch (error) {
        console.error('Chatbot error:', error);
        res.status(500).json({ error: 'Failed to process message' });
    }
});

export default router;
