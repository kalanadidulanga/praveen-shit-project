import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { getDb } from '@/lib/mongodb'; // Use the MongoDB connection directly

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email and password are required');
          }

          // Use the MongoDB connection directly
          const db = await getDb();
          const usersCollection = db.collection('User');
          
          // Find the user
          const user = await usersCollection.findOne({ email: credentials.email });

          if (!user) {
            console.log(`No user found with email: ${credentials.email}`);
            return null;
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordValid) {
            console.log('Invalid password');
            return null;
          }

          console.log('User authenticated successfully:', user.email);
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            userType: user.userType,
            image: user.profileImage,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.userType = user.userType;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.userType = token.userType;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Enable debug mode for troubleshooting
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 