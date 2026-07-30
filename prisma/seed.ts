import { PrismaClient, UserRole } from "@prisma/client";
import { hashPassword } from "../lib/password";

const prisma = new PrismaClient();

async function main() {
  // Delete existing data
  await prisma.booking.deleteMany();
  await prisma.itineraryDay.deleteMany();
  await prisma.expeditionImage.deleteMany();
  await prisma.expeditionDate.deleteMany();
  await prisma.expedition.deleteMany();
  await prisma.user.deleteMany();

  // ---------------- ADMIN ----------------

  const adminPassword = await hashPassword("admin123");

  await prisma.user.create({
    data: {
      name: "Tarun",
      email: "admin@terrasquad.in",
      password: adminPassword,
      role: UserRole.ADMIN,
      phone: "9713024303",
    },
  });

  // ---------------- PATNA WATERFALL ----------------

  const patna = await prisma.expedition.create({
    data: {
      slug: "patna-waterfall",
      title: "Patna Waterfall",
      location: "Rishikesh",
      duration: "1 Day",
      difficulty: "Easy",
      price: 999,
      image: "/images/expeditions/patna.jpg",
      description:
        "Experience one of the most beautiful waterfalls near Rishikesh with lush forests, crystal-clear water, adventure and unforgettable memories.",
      rating: 4.9,
      altitude: "850 m",
      distance: "3 km Trek",
      pickup: "IIT Roorkee",
      meals: "Breakfast + Lunch",
      guide: true,
    },
  });

  await prisma.itineraryDay.createMany({
    data: [
      {
        expeditionId: patna.id,
        day: 1,
        title: "Departure from IIT Roorkee",
        description:
          "Morning departure from IIT Roorkee, breakfast stop and arrival at Patna Waterfall.",
      },
      {
        expeditionId: patna.id,
        day: 2,
        title: "Explore the Waterfall",
        description:
          "Photography, swimming (if permitted), lunch and return journey.",
      },
    ],
  });

  // Add an available date
  await prisma.expeditionDate.create({
    data: {
      expeditionId: patna.id,
      date: new Date("2026-08-10"),
      seats: 30,
    },
  });

  console.log("✅ Database seeded successfully.");
  console.log("Admin Email: admin@terrasquad.in");
  console.log("Admin Password: admin123");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });