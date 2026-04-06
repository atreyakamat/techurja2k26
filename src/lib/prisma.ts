import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  // Explicitly passing the URL to avoid any automatic detection of a Proxy client
  const dbUrl = process.env.PROD_DATABASE_URL;
  
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Prisma Init] Using URL protocol: ${dbUrl?.split(':')[0]}://`);
  }

  return new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

export const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
