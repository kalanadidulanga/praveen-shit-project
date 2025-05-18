# Next.js Dashboard App Knowledge Bank

## Introduction

This knowledge bank contains comprehensive information about building a full-stack Next.js application, specifically a financial dashboard with authentication, database integration, and various optimizations.

## What We'll Build

The project is a financial dashboard that includes:

- Public home page
- Login page
- Protected dashboard pages
- CRUD operations for invoices
- Database integration

## Key Features and Topics

1. **Styling Options**

   - Multiple approaches to styling in Next.js

2. **Optimizations**

   - Image optimization
   - Link optimization
   - Font optimization

3. **Routing**

   - File-system based routing
   - Nested layouts
   - Page creation

4. **Data Management**

   - Postgres database setup on Vercel
   - Data fetching best practices
   - Data streaming
   - Search and pagination using URL params
   - Data mutation with React Server Actions
   - Cache revalidation

5. **Error Handling**

   - General error handling
   - 404 error handling

6. **Form Handling**

   - Server-side validation
   - Accessibility improvements

7. **Authentication**

   - Integration with NextAuth.js
   - Middleware implementation

8. **Metadata**

   - SEO optimization
   - Social sharing preparation

9. **Navigation**

   - Client-side navigation
   - Automatic code splitting
   - Automatic prefetching

10. **React Leaflet Integration**
    - Installation
    - Basic Setup
    - Important Prerequisites
    - TypeScript Support
    - Troubleshooting

## Routing Details

### File-System Routing

- Next.js uses folder-based routing where each folder represents a route segment
- Folders map directly to URL segments
- Special files:
  - `page.tsx`: Required for making routes accessible
  - `layout.tsx`: Defines shared UI for multiple pages

### Page Creation

- Create new routes by adding folders in the `/app` directory
- Each route needs a `page.tsx` file to be accessible
- Example structure:
  ```
  /app
    /dashboard
      page.tsx           # /dashboard route
      /customers
        page.tsx        # /dashboard/customers route
      /invoices
        page.tsx        # /dashboard/invoices route
  ```
- Only content inside page files is publicly accessible
- You can colocate UI components, tests, and related code within route folders

### Best Practices

- Use nested folders for creating hierarchical routes
- Keep related components in `/ui` folder within `/app`
- Store utility functions in `/lib` folder
- Colocate related files with routes while maintaining public/private separation

## Navigation

### Client-Side Navigation

- Next.js provides the `next/link` component for client-side navigation
- Replaces traditional `<a>` tags to prevent full page refreshes
- Enables smooth, app-like navigation experience

#### Implementation

```jsx
import Link from "next/link";

<Link href="/dashboard" className="your-styles-here">
  Dashboard
</Link>;
```

### Performance Features

1. **Automatic Code Splitting**

   - Application code is split by route segments
   - Only necessary code is loaded for each page
   - Isolates pages for better error handling
   - Reduces initial bundle size

2. **Automatic Prefetching**
   - Code for linked routes is prefetched automatically
   - Happens when `<Link>` components enter viewport
   - Makes page transitions near-instant
   - Only active in production builds

### Best Practices

- Use `<Link>` instead of `<a>` for internal navigation
- Keep route segments focused and modular
- Leverage automatic prefetching for performance
- Consider implementing active link states for better UX

## Database Setup

### Vercel Postgres Integration

1. **Setup Steps**

   - Create GitHub repository for the project
   - Create Vercel account and connect to GitHub
   - Deploy project to Vercel
   - Create Postgres database from Vercel dashboard
   - Configure environment variables

2. **Environment Configuration**
   ```env
   # .env file
   POSTGRES_URL="your-postgres-url"
   POSTGRES_PRISMA_URL="your-prisma-url"
   POSTGRES_URL_NON_POOLING="your-non-pooling-url"
   POSTGRES_USER="your-username"
   POSTGRES_HOST="your-host"
   POSTGRES_PASSWORD="your-password"
   POSTGRES_DATABASE="your-database"
   ```

### Database Seeding

1. **Setup Process**

   - Create database schema
   - Prepare seed data
   - Run seeding script
   - Verify data insertion

2. **Best Practices**

   - Keep `.env` in `.gitignore`
   - Use secure password hashing (bcrypt)
   - Handle database errors gracefully
   - Use connection pooling for better performance

3. **Troubleshooting**
   - Verify database secrets are properly copied
   - Check environment variable configuration
   - Consider using `bcryptjs` for better compatibility
   - Use `DROP TABLE` carefully for testing

## Data Fetching

### Approaches

1. **API Layer**

   - Use for third-party services
   - Required when fetching from client
   - Implement using Route Handlers
   - Protects database secrets

2. **Direct Database Queries**

   - Use with Server Components
   - Skip API layer for better performance
   - Secure database access
   - Use SQL or ORM

3. **Server Components**
   - Default in Next.js applications
   - Native Promise support
   - Async/await without useEffect
   - Keep expensive operations on server

### SQL Implementation

```typescript
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
});

// Example query
const data = await sql`SELECT * FROM users`;
```

### Best Practices

- Use Server Components for data fetching when possible
- Keep database queries in dedicated files (e.g., `data.ts`)
- Implement proper error handling
- Consider caching strategies
- Use appropriate security measures

## Advanced Data Fetching

### Caching Patterns

1. **Request Memoization**

```typescript
// Automatic request deduping
const getUser = cache(async (id: string) => {
  const user = await db.user.findUnique({ id });
  return user;
});
```

2. **Data Revalidation**

```typescript
// Revalidate at specific intervals
export const revalidate = 3600; // revalidate every hour

// On-demand revalidation
revalidatePath("/blog");
revalidateTag("blog-posts");
```

3. **Streaming with Suspense**

```tsx
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <SlowComponent />
    </Suspense>
  );
}
```

### Parallel vs Sequential Data Fetching

1. **Parallel**

```typescript
// Fetch data in parallel
const [userData, postData] = await Promise.all([
  getUser(userId),
  getPosts(userId),
]);
```

2. **Sequential**

```typescript
// Sequential fetching when data dependencies exist
const user = await getUser(userId);
const posts = await getPosts(user.preferences);
```

### Static vs Dynamic Data

1. **Static Generation**

```typescript
// Generate static pages at build time
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
```

2. **Dynamic Rendering**

```typescript
// Force dynamic rendering
export const dynamic = "force-dynamic";
```

### Error Boundaries and Loading States

```tsx
<ErrorBoundary fallback={<Error />}>
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
</ErrorBoundary>
```

## Prisma ORM Integration

### Installation and Setup

```bash
# Initialize a TypeScript project
npm init -y
npm install typescript ts-node @types/node --save-dev
npx tsc --init

# Install Prisma
npm install prisma --save-dev
npx prisma init

# Install Prisma Client
npm install @prisma/client
```

### Database Connection

```env
# .env
# For MongoDB
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority"

# For PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/database?schema=public"
```

### Schema Definition

```prisma
// prisma/schema.prisma
datasource db {
  provider = "mongodb" // or "postgresql", "mysql", etc.
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// Example models
model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  email     String   @unique
  name      String?
  posts     Post[]
  profile   Profile?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String   @db.ObjectId
  tags      Tag[]
}

model Profile {
  id     String @id @default(auto()) @map("_id") @db.ObjectId
  bio    String
  user   User   @relation(fields: [userId], references: [id])
  userId String @unique @db.ObjectId
}

model Tag {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  name  String @unique
  posts Post[]
}
```

### Generate and Push Schema

```bash
# Generate Prisma Client
npx prisma generate

# Push schema changes to database (development)
npx prisma db push

# Create and apply migrations (production)
npx prisma migrate dev --name init
npx prisma migrate deploy
```

### Basic Database Operations

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create
async function createUser() {
  const user = await prisma.user.create({
    data: {
      email: "user@example.com",
      name: "John Doe",
      posts: {
        create: {
          title: "Hello World",
          content: "My first post!",
        },
      },
      profile: {
        create: {
          bio: "I love coding",
        },
      },
    },
    include: {
      posts: true,
      profile: true,
    },
  });
  return user;
}

// Read
async function getUsers() {
  // Get all users with their posts
  const users = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });

  // Get specific user
  const user = await prisma.user.findUnique({
    where: {
      email: "user@example.com",
    },
  });

  // Get filtered posts
  const posts = await prisma.post.findMany({
    where: {
      published: true,
      author: {
        email: {
          contains: "@example.com",
        },
      },
    },
    include: {
      author: true,
      tags: true,
    },
  });
}

// Update
async function updateUser() {
  const updatedUser = await prisma.user.update({
    where: {
      email: "user@example.com",
    },
    data: {
      name: "Jane Doe",
      posts: {
        update: {
          where: {
            title: "Hello World",
          },
          data: {
            published: true,
          },
        },
      },
    },
  });
}

// Delete
async function deleteUser() {
  const deletedUser = await prisma.user.delete({
    where: {
      email: "user@example.com",
    },
  });
}
```

### Advanced Queries

```typescript
// Transactions
async function createUserAndPost() {
  const [user, post] = await prisma.$transaction([
    prisma.user.create({
      data: {
        email: "user@example.com",
        name: "John Doe",
      },
    }),
    prisma.post.create({
      data: {
        title: "My Post",
        authorId: "user_id", // Replace with actual ID
      },
    }),
  ]);
}

// Aggregations
async function getStats() {
  const stats = await prisma.post.aggregate({
    _count: {
      id: true, // Count posts
    },
    _avg: {
      likes: true, // Average likes
    },
    where: {
      published: true,
    },
  });
}

// Nested writes
async function createUserWithRelations() {
  const user = await prisma.user.create({
    data: {
      email: "user@example.com",
      posts: {
        create: [
          {
            title: "Post 1",
            tags: {
              create: [{ name: "tag1" }, { name: "tag2" }],
            },
          },
        ],
      },
      profile: {
        create: {
          bio: "Full stack developer",
        },
      },
    },
  });
}
```

### Best Practices

1. **Connection Management**

```typescript
// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

2. **Error Handling**

```typescript
async function handleDatabaseOperation() {
  try {
    const result = await prisma.user.create({
      data: {
        email: "user@example.com",
      },
    });
    return result;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        throw new Error("Unique constraint violation");
      }
    }
    throw e;
  }
}
```

3. **Middleware Usage**

```typescript
// Log all queries
prisma.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  console.log(
    `Query ${params.model}.${params.action} took ${after - before}ms`
  );
  return result;
});

// Soft delete middleware
prisma.$use(async (params, next) => {
  if (params.action === "delete") {
    params.action = "update";
    params.args["data"] = { deleted: true };
  }
  return next(params);
});
```

### Schema Evolution

```bash
# Create a new migration
npx prisma migrate dev --name add_new_field

# Apply migrations in production
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset
```

### Prisma Studio (GUI)

```bash
# Launch Prisma Studio
npx prisma studio
```

## MongoDB-Specific Features

```prisma
// MongoDB-specific schema features
model User {
  id      String   @id @default(auto()) @map("_id") @db.ObjectId
  // MongoDB-specific field types
  age     Int      @db.Int
  details Json?    // Stored as BSON
  tags    String[] // Array type
  status  String   @default("active") @db.String
}

model Product {
  id         String   @id @default(auto()) @map("_id") @db.ObjectId
  // MongoDB full text search index
  name       String
  description String

  @@fulltext([name, description])
}
```

### MongoDB Queries

```typescript
// Full-text search
const searchResults = await prisma.product.findMany({
  where: {
    OR: [
      {
        name: {
          search: "searchterm",
        },
      },
      {
        description: {
          search: "searchterm",
        },
      },
    ],
  },
});

// Array operations
const userWithTags = await prisma.user.findMany({
  where: {
    tags: {
      has: "specific-tag",
    },
  },
});

// JSON field operations
const userWithDetails = await prisma.user.create({
  data: {
    details: {
      address: {
        street: "123 Main St",
        city: "Example City",
      },
      preferences: {
        theme: "dark",
        notifications: true,
      },
    },
  },
});
```

### Schema Evolution and Migrations

1. **Adding New Fields**

```prisma
// Before
model User {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  email String @unique
}

// After
model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  email     String   @unique
  name      String?  // New optional field
  createdAt DateTime @default(now()) // New field with default
}
```

2. **Modifying Relations**

```prisma
// Before
model Post {
  id       String @id @default(auto()) @map("_id") @db.ObjectId
  authorId String @db.ObjectId
  author   User   @relation(fields: [authorId], references: [id])
}

// After - Making it optional
model Post {
  id       String  @id @default(auto()) @map("_id") @db.ObjectId
  authorId String? @db.ObjectId // Optional relation
  author   User?   @relation(fields: [authorId], references: [id])
}
```

3. **Enums and Custom Types**

```prisma
enum Role {
  USER
  ADMIN
  EDITOR
}

model User {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  role  Role   @default(USER)
  // Custom mapped enum
  status String @default("ACTIVE") @db.String
}
```

4. **Indexes and Performance**

```prisma
model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())

  // Compound index
  @@index([email, name])
}

model Post {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  title     String
  content   String?
  published Boolean  @default(false)

  // Multiple indexes
  @@index([title])
  @@index([published])
}
```

5. **Data Validation**

```prisma
model Product {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  name  String
  price Float  @db.Double
  sku   String @unique

  // Custom validation using @@check (PostgreSQL only)
  // For MongoDB, handle in application code
  quantity Int

  @@index([sku])
}
```

### Development Workflow

```bash
# 1. Make schema changes
# 2. Generate Prisma Client
npx prisma generate

# 3. Push changes (development)
npx prisma db push

# 4. Use Prisma Studio to verify
npx prisma studio

# 5. Create migration (production)
npx prisma migrate dev --name describe_your_changes

# 6. Deploy migrations (production)
npx prisma migrate deploy
```

### Type Safety with TypeScript

```typescript
import { Prisma } from "@prisma/client";

// Define input types
type UserCreateInput = Prisma.UserCreateInput;
type UserWhereInput = Prisma.UserWhereInput;

// Use in functions
async function createUser(data: UserCreateInput) {
  return await prisma.user.create({ data });
}

// Type-safe includes
const user = await prisma.user.findUnique({
  where: { id: "user_id" },
  include: {
    posts: {
      include: {
        tags: true,
      },
    },
    profile: true,
  },
});
// TypeScript knows the shape of 'user'
console.log(user?.posts[0]?.tags);
```

## Optimization Techniques

### Font Optimization

- Next.js automatically optimizes fonts using `next/font` module
- Font files are downloaded at build time and hosted with static assets
- No additional network requests for fonts during page load
- Prevents Cumulative Layout Shift (CLS)

#### Implementation

```typescript
// /app/ui/fonts.ts
import { Inter } from 'next/font/google';
export const inter = Inter({ subsets: ['latin'] });

// Usage in layout.tsx
<body className={`${inter.className} antialiased`}>
```

### Image Optimization

Next.js provides the `next/image` component with automatic optimizations:

- Prevents layout shift during image loading
- Responsive images for different screen sizes
- Automatic image resizing for different devices
- Lazy loading by default
- Modern format support (WebP, AVIF)

#### Implementation

```jsx
import Image from "next/image";

<Image src="/hero.png" alt="Description" width={500} height={300} />;
```

#### Static Assets

- Store static images in `/public` directory
- Files in `/public` are served at the root URL path
- Optimized automatically when using `next/image`

## Error Handling

### Server Actions Error Handling

- Use try/catch blocks for graceful error handling
- Handle database errors with informative messages
- Redirect after try/catch blocks to avoid catching redirect "errors"

### Next.js Error Handling

- Use `error.tsx` for handling unexpected errors
- Implement 404 error handling with `notFound` function
- Custom error UI for production environments

## Metadata

### Types and Implementation

1. **Title Metadata**

   ```html
   <title>Page Title</title>
   ```

2. **Description Metadata**

   ```html
   <meta name="description" content="Description here" />
   ```

3. **Open Graph Metadata**

   ```html
   <meta property="og:title" content="Title" />
   <meta property="og:description" content="Description" />
   <meta property="og:image" content="image_url" />
   ```

4. **Favicon**
   ```html
   <link rel="icon" href="path/to/favicon.ico" />
   ```

### Benefits

- Improves SEO ranking
- Enhanced social media sharing
- Better search engine indexing
- Improved user experience

## React Leaflet Components

1. **Map Components**

```jsx
import { MapContainer, TileLayer } from "react-leaflet";

// Basic map with tile layer
<MapContainer
  center={[latitude, longitude]}
  zoom={13}
  style={{ height: "400px" }}
>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
</MapContainer>;
```

2. **UI Layers**

```jsx
// Markers and Popups
<Marker position={[lat, lng]}>
  <Popup>Location information here</Popup>
  <Tooltip>Hover text</Tooltip>
</Marker>
```

3. **Vector Layers**

```jsx
// Shapes and paths
<Circle center={[lat, lng]} radius={1000} />
<Polyline positions={[[lat1, lng1], [lat2, lng2]]} />
<Polygon positions={[[lat1, lng1], [lat2, lng2], [lat3, lng3]]} />
<Rectangle bounds={[[lat1, lng1], [lat2, lng2]]} />
```

4. **Controls**

```jsx
// Map controls
<ZoomControl position="topright" />
<ScaleControl position="bottomright" />
<LayersControl position="topright">
  <LayersControl.BaseLayer name="OpenStreetMap">
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  </LayersControl.BaseLayer>
</LayersControl>
```

5. **Event Handling**

```jsx
import { useMapEvents } from "react-leaflet";

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click: (e) => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  return position && <Marker position={position} />;
}
```

## Authentication with Clerk

### Installation and Setup

```bash
# Install Clerk
npm install @clerk/nextjs

# Add environment variables (.env.local)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXX
CLERK_SECRET_KEY=sk_test_XXXXXXXX
```

### Basic Implementation

1. **Wrap App with ClerkProvider**

```tsx
// app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

2. **Add Middleware**

```typescript
// middleware.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: ["/", "/sign-in", "/sign-up"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

3. **Custom Sign-In Page**

```tsx
// app/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      appearance={{
        elements: {
          formButtonPrimary: "bg-primary text-white",
        },
      }}
    />
  );
}
```

4. **Protected Routes**

```tsx
// app/protected/page.tsx
import { auth } from "@clerk/nextjs";

export default async function ProtectedPage() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return <div>Protected content</div>;
}
```

### Client-Side Helpers

```tsx
// Client Components
import { useUser, useAuth, SignedIn, SignedOut } from "@clerk/nextjs";

export default function UserProfile() {
  const { user } = useUser();
  const { userId, sessionId } = useAuth();

  return (
    <>
      <SignedIn>
        <p>Welcome, {user?.firstName}!</p>
      </SignedIn>
      <SignedOut>
        <p>Please sign in</p>
      </SignedOut>
    </>
  );
}
```

### User Profile Customization

```tsx
// Custom user profile page
import { UserProfile } from "@clerk/nextjs";

export default function CustomProfilePage() {
  return (
    <UserProfile
      appearance={{
        elements: {
          navbar: "bg-white shadow-sm",
          card: "rounded-xl shadow-md",
        },
      }}
      path="/user-profile"
      routing="path"
    />
  );
}
```

### Organization Features

```tsx
import { OrganizationProfile, OrganizationSwitcher } from "@clerk/nextjs";

// Organization profile page
export default function OrgProfile() {
  return (
    <OrganizationProfile
      appearance={{
        elements: {
          organizationSwitcherTrigger: "py-2 px-4",
        },
      }}
    />
  );
}

// Organization switcher component
export function OrgSwitcher() {
  return (
    <OrganizationSwitcher
      afterCreateOrganizationUrl="/organization/:id"
      afterLeaveOrganizationUrl="/select-org"
    />
  );
}
```

### Session and User Data

1. **Server-Side (App Router)**

```tsx
// In Server Components
import { auth, currentUser } from "@clerk/nextjs";

export default async function Page() {
  const { userId, sessionId } = auth();
  const user = await currentUser();

  return <div>Hello, {user?.firstName}!</div>;
}
```

2. **Server-Side (API Routes)**

```tsx
// In API Route
import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, sessionId } = getAuth(req);
  // Handle the request
}
```

3. **Client-Side Hooks**

```tsx
import { useAuth, useUser, useSession, useClerk } from "@clerk/nextjs";

export function UserData() {
  const { isLoaded, userId, sessionId } = useAuth();
  const { user } = useUser();
  const { session } = useSession();
  const clerk = useClerk();

  if (!isLoaded) return null;

  return (
    <div>
      <p>User ID: {userId}</p>
      <p>Email: {user?.emailAddresses[0].emailAddress}</p>
      <button onClick={() => clerk.signOut()}>Sign out</button>
    </div>
  );
}
```

### Custom Sign-Up Page

```tsx
// app/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <SignUp
      path="/sign-up"
      routing="path"
      signInUrl="/sign-in"
      redirectUrl="/dashboard"
      appearance={{
        elements: {
          formButtonPrimary: "bg-primary hover:bg-primary-dark",
          card: "rounded-xl shadow-lg",
        },
      }}
    />
  );
}
```

### Advanced User Profile Customization

```tsx
import { UserProfile } from "@clerk/nextjs";

export default function CustomUserProfile() {
  return (
    <UserProfile
      path="/user-profile"
      routing="path"
      appearance={{
        elements: {
          navbar: "bg-white shadow-sm",
          card: "rounded-xl shadow-md",
        },
      }}
      // Add custom pages
      pages={[
        {
          label: "Custom Settings",
          url: "/user-profile/custom-settings",
          // Custom component to render
          component: <CustomSettingsPage />,
        },
      ]}
      // Add external links
      additionalLinks={[
        {
          label: "Documentation",
          url: "https://docs.example.com",
          target: "_blank",
        },
      ]}
    />
  );
}
```

### Advanced Organization Features

```tsx
import { OrganizationProfile, useOrganization } from "@clerk/nextjs";

export default function CustomOrgProfile() {
  const { organization, membership } = useOrganization();

  return (
    <OrganizationProfile
      appearance={{
        elements: {
          rootBox: "max-w-3xl mx-auto",
          card: "rounded-xl shadow-md",
        },
      }}
      // Custom pages
      pages={[
        {
          label: "Team Settings",
          url: "/org/settings",
          component: <TeamSettingsPage />,
        },
      ]}
      // External links
      additionalLinks={[
        {
          label: "Team Dashboard",
          url: "/team-dashboard",
        },
      ]}
    />
  );
}

// Organization list and management
export function OrgManagement() {
  const { organization, membership, isLoaded } = useOrganization();

  if (!isLoaded) return null;

  return (
    <div>
      <h2>{organization?.name}</h2>
      <p>Role: {membership?.role}</p>
      {membership?.role === "admin" && (
        <button onClick={() => organization?.update({ name: "New Name" })}>
          Update Org
        </button>
      )}
    </div>
  );
}
```

### Environment Variables

```bash
# Required - Get these from your Clerk Dashboard
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXX
CLERK_SECRET_KEY=sk_test_XXXXXXXX

# Optional - Customize paths
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

### Middleware Configuration

```typescript
// middleware.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Public routes (no auth required)
  publicRoutes: ["/", "/sign-in*", "/sign-up*", "/api/public/*", "/about"],

  // Routes that can always be accessed, but will have auth information if available
  ignoredRoutes: ["/api/public", "/_next/image"],

  // Optional: Custom authentication logic
  beforeAuth: (req) => {
    // Run before authentication
    return;
  },

  afterAuth: (auth, req) => {
    // Run after authentication
    if (!auth.userId && !auth.isPublicRoute) {
      return Response.redirect(new URL("/sign-in", req.url));
    }
  },
});
```

## UI Components (shadcn/ui)

### Installation and Setup

```bash
# Initialize shadcn/ui in your project
npx shadcn@latest init

# With defaults (new-york style, zinc color, and css variables)
npx shadcn@latest init -d
```

### Configuration

You will be asked a few questions during initialization:

```bash
Which style would you like to use? › New York
Which color would you like to use as base color? › Zinc
Do you want to use CSS variables for colors? › no / yes
```

### Installing Components

```bash
# Install individual components as needed
npx shadcn@latest add button
npx shadcn@latest add dropdown-menu
npx shadcn@latest add card
npx shadcn@latest add form
# ... and more components as needed
```

### Available Components

1. **Form Components**

   - Input
   - Select
   - Textarea
   - Checkbox
   - Radio Group
   - Switch
   - Slider

2. **Layout Components**

   - Card
   - Dialog
   - Drawer
   - Sheet
   - Tabs
   - Navigation Menu

3. **Data Display**

   - Table
   - Calendar
   - Avatar
   - Badge
   - Progress

4. **Feedback Components**
   - Alert
   - Toast
   - Skeleton
   - Progress
   - Spinner

ShadCN/UI provides a variety of UI components. Here’s a list of the main components available:

UI Components
Accordion
Alert
Alert Dialog
Aspect Ratio
Avatar
Badge
Breadcrumb
Button
Calendar
Card
Carousel
Checkbox
Collapsible
Combobox
Command
Context Menu
Data Table
Date Picker
Dialog
Drawer
Dropdown Menu
Form
Hover Card
Input
Label
Menubar
Navigation Menu
Popover
Progress
Radio Group
Resizable
Scroll Area
Select
Separator
Sheet
Skeleton
Slider
Sonner (Toasts)
Switch
Table
Tabs
Textarea
Tooltip

### Integration with Next.js

1. **Server Components**

```tsx
import { Button } from "@/components/ui/button";

export default async function Page() {
  return <Button variant="outline">Server Component Button</Button>;
}
```

2. **Client Components**

```tsx
"use client";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";

export default function ClientComponent() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Dialog content */}
    </Dialog>
  );
}
```

### Styling and Theming

```typescript
// tailwind.config.js
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // Add more color variants
      },
    },
  },
};
```

### Accessibility Features

- ARIA labels
- Keyboard navigation
- Focus management
- Screen reader support
- Color contrast compliance

## React Leaflet Integration

### Installation

```bash
# Install required peer dependencies
npm install react react-dom leaflet

# Install React Leaflet
npm install react-leaflet

# For TypeScript support
npm install -D @types/leaflet
```

### Basic Setup

1. **Import CSS in your layout or page:**

```jsx
import "leaflet/dist/leaflet.css";
```

2. **Basic Map Implementation:**

```jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Map() {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "400px", width: "100%" }} // Important: container needs height
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
```

### Important Prerequisites

1. **React Setup**

   - Familiarity with React
   - Working React project

2. **Leaflet Requirements**
   - Leaflet CSS must be loaded
   - Map container must have defined height
   - Proper attribution for map tiles

### TypeScript Support

```typescript
// Import from package entry-point for TypeScript support
import { MapContainer, TileLayer } from "react-leaflet";

// Avoid individual imports as they lack type definitions
// ❌ import { MapContainer } from 'react-leaflet/MapContainer'
```

### Troubleshooting

- Ensure all dependencies are using supported versions
- Check Leaflet CSS is properly loaded
- Verify map container has explicit height
- Use Stack Overflow's react-leaflet tag for support

## Next.js Additional Features

### Server Actions

- Built-in form handling with Server Actions
- Progressive enhancement
- Revalidation after mutations
- Optimistic updates

### Middleware

```typescript
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/home", request.url));
}

export const config = {
  matcher: "/about/:path*",
};
```

### Authentication

- Support for various auth providers
- Session management
- Protected routes
- API route protection

### State Management

- Server Components for state
- Use Client Components when needed
- React Context for global state
- Server Actions for mutations

### Deployment

- Automatic deployment with Vercel
- Edge Runtime support
- Incremental Static Regeneration
- Automatic HTTPS and SSL

## Prerequisites

- Node.js 18.18.0 or later
- Basic understanding of React and JavaScript
- GitHub Account
- Vercel Account

## System Requirements

- Compatible with macOS, Windows (including WSL), and Linux
- Node.js 18.18.0 or higher

## NextAuth.js OAuth Integration

### Basic Setup

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  // Additional configuration options
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

### Environment Variables

```env
# OAuth Provider Secrets
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

### Client Integration

```typescript
// app/layout.tsx
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <SessionProvider session={session}>
      <html>
        <body>{children}</body>
      </html>
    </SessionProvider>
  );
}

// Using session in client components
("use client");
import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return (
      <>
        Signed in as {session.user.email}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      Not signed in
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
```

### Server-Side Session Handling

```typescript
// In Server Components
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function ServerComponent() {
  const session = await getServerSession(authOptions);

  if (session) {
    return <div>Signed in as {session.user.email}</div>;
  }
  return <div>Not signed in</div>;
}

// In API Routes
import { getServerSession } from "next-auth/next";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (session) {
    return Response.json({ content: "Protected content" });
  }
  return Response.json({ error: "You must be signed in." }, { status: 401 });
}
```

### Route Protection with Middleware

```typescript
// middleware.ts
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/api/protected/:path*"],
};

// Advanced middleware configuration
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Custom middleware logic
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
```

### Available OAuth Providers

1. **Google Provider**

```typescript
import GoogleProvider from "next-auth/providers/google";

GoogleProvider({
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  authorization: {
    params: {
      prompt: "consent",
      access_type: "offline",
      response_type: "code",
    },
  },
});
```

2. **GitHub Provider**

```typescript
import GitHubProvider from "next-auth/providers/github";

GitHubProvider({
  clientId: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  // Optional: specify scope
  scope: "read:user user:email",
});
```

3. **Custom OAuth Provider**

```typescript
import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers";

export default function CustomProvider<P extends CustomProfile>(
  options: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    id: "custom",
    name: "Custom Provider",
    type: "oauth",
    authorization: {
      url: "https://custom.com/oauth/authorize",
      params: { scope: "email profile" },
    },
    token: "https://custom.com/oauth/token",
    userinfo: "https://custom.com/oauth/userinfo",
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      };
    },
    options,
  };
}
```

### Session Callbacks

```typescript
export const authOptions = {
  callbacks: {
    async jwt({ token, account, profile }) {
      // Add custom claims to JWT token
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Add custom properties to session
      session.accessToken = token.accessToken;
      session.provider = token.provider;
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      // Custom sign in validation
      return true;
    },
  },
};
```

### Error Handling

```typescript
export const authOptions = {
  // Custom error pages
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  // Error handling
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        // Custom validation
        return true;
      } catch (error) {
        console.error("Sign in error:", error);
        return false;
      }
    },
  },
};
```

### Security Best Practices

1. **Environment Variables**

   - Store all secrets in environment variables
   - Use different secrets for development and production
   - Never commit secrets to version control

2. **CSRF Protection**

   - Enabled by default
   - Uses secure HTTP-only cookies
   - Implements state parameter for OAuth

3. **Session Security**

   - JWT strategy for stateless sessions
   - Database strategy for revocable sessions
   - Configurable session lifetime

4. **OAuth State Verification**
   - Automatic CSRF token validation
   - Secure state parameter handling
   - Protection against replay attacks

### Advanced Configuration

```typescript
export const authOptions = {
  // Session configuration
  session: {
    strategy: "jwt", // "database" also available
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 60 * 60 * 24 * 30, // 30 days
    encryption: true,
  },

  // Events
  events: {
    async signIn(message) {
      /* ... */
    },
    async signOut(message) {
      /* ... */
    },
    async createUser(message) {
      /* ... */
    },
    async linkAccount(message) {
      /* ... */
    },
    async session(message) {
      /* ... */
    },
  },

  // Debug mode
  debug: process.env.NODE_ENV === "development",

  // Custom logger
  logger: {
    error(code, ...message) {
      console.error(code, message);
    },
    warn(code, ...message) {
      console.warn(code, message);
    },
    debug(code, ...message) {
      console.debug(code, message);
    },
  },
};
```
