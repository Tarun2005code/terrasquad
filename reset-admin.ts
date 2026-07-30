import bcrypt from "bcrypt";
import { prisma } from "./lib/prisma";

async function main() {
  const password = await bcrypt.hash("terrasquad#admin", 10);

  await prisma.user.updateMany({
    where: {
      role: "ADMIN",
    },
    data: {
      password,
    },
  });

  console.log("Admin password updated");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });