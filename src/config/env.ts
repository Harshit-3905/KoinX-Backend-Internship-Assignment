import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Export environment variables
export const MONGODB_URI = process.env.MONGODB_URI || '';
export const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY || '';
export const PORT = process.env.PORT || 3000;