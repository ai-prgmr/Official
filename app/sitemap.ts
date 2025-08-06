// /app/sitemap.ts
import { MetadataRoute } from "next";
import { projects, properties } from "./data";
export const revalidate = 86400;

const BASE_URL = "https://www.grassventure.in";
const WEEKLY = "weekly" as const;
const DAILY = "daily" as const;
const MONTHLY = "monthly" as const;
export default function sitemap(): MetadataRoute.Sitemap {
  const projectsUrls = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: WEEKLY,
    priority: 0.8,
  }));

  const propertiesUrls = properties.map((property) => ({
    url: `${BASE_URL}/properties/${property.type}/${property.slug}`,
    lastModified: new Date(),
    changeFrequency: DAILY,
    priority: 0.9,
  }));

  const propertiesByTypeUrls = ["residential", "commercial", "agriculture"].map(
    (type) => ({
      url: `${BASE_URL}/properties/${type}`,
      lastModified: new Date(),
      changeFrequency: MONTHLY,
      priority: 0.7,
    })
  );

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/properties`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...projectsUrls,
    ...propertiesUrls,
    ...propertiesByTypeUrls,
  ] as const;
}
