import { PrismaClient } from '@prisma/client';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

// Load .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Log the MongoDB URI being used (with password hidden)
const dbUri = process.env.MONGODB_URI || '';
const maskedUri = dbUri.replace(/\/\/(.+?):(.+?)@/, '//***:***@');
console.log(`Prisma connecting to: ${maskedUri}`);

// Create database name accessor for logging
const getDatabaseName = () => {
  if (!process.env.MONGODB_URI) return 'No URI found';
  const parts = process.env.MONGODB_URI.split('/');
  return parts[parts.length - 1].split('?')[0] || 'No database in URI';
};

console.log(`Database name: ${getDatabaseName()}`);

// Set up Prisma client with explicit database URL
const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.MONGODB_URI,
      },
    },
    log: ['query', 'error', 'warn'],
  });
};

// Use global to prevent multiple instances
const globalForPrisma = global;
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma; 