import { prisma } from "./src/lib/prisma";

async function main() {
  try {
    const count = await prisma.event.count();
    console.log(`Current event count: ${count}`);
    const regCount = await prisma.registration.count();
    console.log(`Current registration count: ${regCount}`);
  } catch (err) {
    console.error("Database connection failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
