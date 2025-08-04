// app/constants/propertyTypes.ts
export const propertyTypes = [
  "residential",
  "commercial",
  "agriculture",
] as const;

export type PropertyType = (typeof propertyTypes)[number];

export function isPropertyType(slug: string): slug is PropertyType {
  return (propertyTypes as readonly string[]).includes(slug);
}
