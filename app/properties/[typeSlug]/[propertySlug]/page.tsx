// app/properties/[typeSlug]/[propertySlug]/page.tsx
// This page displays details for a single property.
// It's a Server Component and uses generateStaticParams for SSG.
import { notFound } from "next/navigation";
import { properties } from "@/app/data";
import { isPropertyType } from "@/app/constants/propertyTypes";
import PropertyDetailPage from "@/app/components/PropertyDetailPage";

// The PageProps interface should now correctly reflect 'params' as a Promise
interface IndividualPropertyPageProps {
  params: Promise<{
    typeSlug: string;
    propertySlug: string;
  }>;
}

export default async function IndividualPropertyPage({
  params,
}: IndividualPropertyPageProps) {
  const resolvedParams = await params;
  const { typeSlug, propertySlug } = resolvedParams;

  if (!isPropertyType(typeSlug)) {
    notFound();
  }

  const property = properties.find((p) => p.slug === propertySlug);

  if (!property) {
    notFound(); // Property not found by slug
  }

  // Ensure the property's actual type matches the typeSlug in the URL
  if (property.type !== typeSlug) {
    // This handles cases like /properties/commercial/my-residential-house-slug
    // It will result in a 404 for the specific URL, guiding users to correct path.
    notFound();
  }

  const relatedProperties = properties
    .filter((p) => p.type === property.type && p.slug !== propertySlug)
    .slice(0, 3);

  return (
    <main className="container mx-auto px-4 py-8 bg-white">
      <PropertyDetailPage
        property={property}
        relatedProperties={relatedProperties}
      />
    </main>
  );
}

// *** CRITICAL for Static Site Generation (SSG) ***
// Next.js will build a page for each typeSlug/propertySlug combination returned here.
export async function generateStaticParams() {
  return properties.map((property) => ({
    typeSlug: property.type,
    propertySlug: property.slug,
  }));
}

// Generate metadata for individual property pages
interface MetadataProps {
  params: Promise<{
    typeSlug: string;
    propertySlug: string;
  }>;
}

export async function generateMetadata({ params }: MetadataProps) {
  const resolvedParams = await params; // Await params here too
  const { typeSlug, propertySlug } = resolvedParams;
  const property = properties.find((p) => p.slug === propertySlug);

  if (!property || property.type !== typeSlug) {
    return { title: "Property Not Found - Grass Venture" };
  }

  return {
    title: `${property.title} - Grass Venture`,
    description: property.description,
    openGraph: {
      title: property.title,
      description: property.description,
      images: [property.image],
    },
  };
}
