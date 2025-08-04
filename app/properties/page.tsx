import { properties } from "@/app/data";
import PropertyTypeSelector from "@/app/components/PropertyTypeSelector";
import PropertyGridDisplay from "@/app/components/PropertyGridDisplay";

export default async function PropertiesOverviewPage() {
  const featuredProperties = properties; // Example: show first 6

  return (
    <main className="container mx-auto px-4 py-8 ">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          Discover Your Ideal Property in Madhya Pradesh
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          Explore a diverse range of residential, commercial, and agricultural
          properties. Your next venture starts here.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Browse by Property Type
        </h2>
        <PropertyTypeSelector />
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Listed Properties
        </h2>
        <PropertyGridDisplay
          properties={featuredProperties}
          noResultsMessage="No featured properties available."
        />
      </section>

      <section className="text-center text-gray-600">
        <p className="text-md">
          Grass Venture is your trusted partner for real estate in Madhya
          Pradesh, offering seamless property transactions and expert guidance.
        </p>
      </section>
    </main>
  );
}

export async function generateMetadata() {
  return {
    title: "Properties for Sale in Madhya Pradesh - Grass Venture",
    description:
      "Explore residential, commercial, and agricultural properties in Madhya Pradesh. Find your next investment with Grass Venture.",
  };
}
