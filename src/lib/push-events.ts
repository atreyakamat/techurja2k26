import { prisma } from "./prisma"; // Assuming this is where the singleton is
import { events } from "./event-data";

async function main() {
  console.log("Starting event push...");

  for (const event of events) {
    try {
      await prisma.event.upsert({
        where: { slug: event.slug },
        update: {
          name: event.name,
          description: event.description,
          category: event.category,
          level: event.level,
          date: new Date(2026, 3, 29), // Hardcoding year/month for simplicity as date field is DateTime
          venue: event.venue,
        },
        create: {
          slug: event.slug,
          name: event.name,
          description: event.description,
          category: event.category,
          level: event.level,
          date: new Date(2026, 3, 29),
          venue: event.venue,
        },
      });
      console.log(`Pushed: ${event.name}`);
    } catch (err) {
      console.error(`Error pushing ${event.name}:`, err);
    }
  }

  console.log("Event push completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
