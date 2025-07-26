// prisma/client.ts
import { PrismaClient } from "@prisma/client";

// This is necessary for Next.js hot reloading in development.
// It ensures that a new PrismaClient is not created on every hot reload,
// which can lead to too many database connections.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Export the single PrismaClient instance.
// In production, it creates a new instance.
// In development, it reuses the existing instance from the global object.
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error"], // You can change this to ['query', 'error', 'warn'] for more detailed logging in development
  });

// Attach the PrismaClient instance to the global object in development.
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
