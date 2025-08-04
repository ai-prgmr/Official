// app/properties/[typeSlug]/page.tsx
// This page lists properties for a specific type (e.g., /properties/residential)
// It's a Server Component and uses generateStaticParams for SSG.
import { notFound } from "next/navigation";
import { properties } from "@/app/data";
import { propertyTypes, isPropertyType } from "@/app/constants/propertyTypes";
import PropertyGridDisplay from "@/app/components/PropertyGridDisplay";
import Link from "next/link";
import { ArrowRight } from "lucide-react"; // For the button icon

interface PropertyTypeListingsPageProps {
  params: Promise<{
    typeSlug: string;
  }>;
}

export default async function PropertyTypeListingsPage({
  params,
}: PropertyTypeListingsPageProps) {
  const { typeSlug } = await params;

  if (!isPropertyType(typeSlug)) {
    notFound();
  }

  const filteredProperties = properties.filter((p) => p.type === typeSlug);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
        {typeSlug.charAt(0).toUpperCase() + typeSlug.slice(1)} Properties
      </h1>
      <PropertyGridDisplay
        properties={filteredProperties}
        noResultsMessage={`No ${typeSlug} properties found yet.`}
      />
      <div className="flex justify-center text-center mt-10">
        {/* Converted to Link */}
        <Link
          href="/properties" // Link to the same overview page or /properties/all if you create it
          className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2" // Added inline-flex
        >
          Explore All Properties {/* Could be "View All Properties" */}
          <ArrowRight size={20} />
        </Link>
      </div>
      <section className="bg-gradient-to-b from-green-200 to-blue-200 p-8 rounded-lg shadow-md text-center mt-12 mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Are You a Property Owner?
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          List your property with Grass Venture and reach a wide audience of
          potential buyers and investors.
        </p>
        <Link
          href="https://wa.me/919201463228?text=I%20want%20to%20list%20my%20property%20on%20Grass%20Venture."
          target="_blank"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300"
        >
          List Your Property Now
        </Link>
      </section>
    </main>
  );
}

// *** CRITICAL for Static Site Generation (SSG) ***
// Next.js will build a page for each typeSlug returned here.
export async function generateStaticParams() {
  return propertyTypes.map((type) => ({
    typeSlug: type,
  }));
}

// Generate metadata for these type-specific pages
interface MetadataProps {
  params: Promise<{
    typeSlug: string;
  }>;
}

export async function generateMetadata({ params }: MetadataProps) {
  const { typeSlug } = await params;
  if (!isPropertyType(typeSlug)) {
    return { title: "Properties Not Found" };
  }
  return {
    title: `${
      typeSlug.charAt(0).toUpperCase() + typeSlug.slice(1)
    } Properties - Grass Venture`,
    description: `Browse ${typeSlug} properties in Madhya Pradesh with Grass Venture.`,
  };
}
