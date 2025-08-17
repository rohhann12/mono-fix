import { PrismaClient } from "@prisma/client"

declare global {
  // Prevent multiple instances of Prisma Client in development
  // (Next.js hot reload causes re-imports)
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: [], // optional, helpful for debugging
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
