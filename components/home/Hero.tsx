import { getCurrentUser } from "@/lib/auth/session";
import HeroClient from "./HeroClient";

export default async function Hero() {
  const user = await getCurrentUser();

  return (
    <HeroClient
      isLoggedIn={!!user}
    />
  );
}