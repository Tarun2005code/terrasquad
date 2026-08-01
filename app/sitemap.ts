import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const expeditions = await prisma.expedition.findMany({
    select: {
      slug: true,
      updatedAt: true,
       active: true,
    },
  });

  const expeditionUrls = expeditions.map((trip) => ({
    url: `https://terrasquad.in/expeditions/${trip.slug}`,
    lastModified: trip.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: "https://terrasquad.in",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://terrasquad.in/expeditions",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: "https://terrasquad.in/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://terrasquad.in/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...expeditionUrls,
  ];
}