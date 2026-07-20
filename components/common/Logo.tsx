import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/images/logo/logo.png"
      alt="TerraSquad"
      width={180}
      height={60}
      priority
    />
  );
}