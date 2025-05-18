require('dotenv').config();

console.log('Environment Variables Check:');
console.log('--------------------------');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set ✓' : 'Not set ✗');
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? 'Set ✓' : 'Not set ✗');
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL ? 'Set ✓' : 'Not set ✗');

if (process.env.MONGODB_URI) {
  const dbParts = process.env.MONGODB_URI.split('/');
  const dbName = dbParts[dbParts.length - 1].split('?')[0];
  console.log('Database name:', dbName);
} 