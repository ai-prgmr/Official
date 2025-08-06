import { notFound } from "next/navigation";
import { projects, properties } from "@/app/data";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Folder,
  MapPin,
  Check,
  Building,
  Tag,
  Images,
  SquareDot,
} from "lucide-react";

interface ProjectDetailsPageProps {
  params: Promise<{
    projectSlug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProjectDetailsPageProps): Promise<Metadata> {
  const ProjectSlugParams = await params;
  const project = projects.find(
    (p) => p.slug === ProjectSlugParams.projectSlug
  );
  if (!project) {
    return { title: "Project Not Found" };
  }
  return {
    title: `${project.title} - Grass Venture`,
    description: project.description,
    openGraph: {
      images: project.images.length > 0 ? [project.images[0]] : [project.image],
    },
  };
}

// CRUCIAL for static export: tell Next.js which pages to build
export async function generateStaticParams() {
  return projects.map((project) => ({
    projectSlug: project.slug,
  }));
}

const ProjectDetailsPage = async ({ params }: ProjectDetailsPageProps) => {
  const ProjectDetailParams = await params;
  const project = projects.find(
    (p) => p.slug === ProjectDetailParams.projectSlug
  );

  if (!project) {
    notFound(); // Display the 404 page if the project isn't found
  }
  // NEW: Filter properties that belong to this project
  const projectProperties = properties.filter(
    (property) => property.projectSlug === project.slug
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {project.title}
        </h1>
        <div className="flex items-center text-gray-600 mb-8">
          <Folder className="mr-2 text-green-600" size={20} />
          <span>
            Developed by{" "}
            <strong className="text-gray-800">{project.developer}</strong>
          </span>
        </div>

        {/* Gallery Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="relative h-80 w-full overflow-hidden ">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {project.images &&
              project.images.slice(0, 4).map((img, index) => (
                <div
                  key={index}
                  className="relative h-80 overflow-hidden rounded-xl shadow-md"
                >
                  <Image
                    src={img}
                    alt={`${project.title} image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
          </div>
          {/* Video Thumbnail (Conditional) */}
          {project.video && (
            <Link
              href={project.video}
              target="_blank"
              rel="noopener noreferrer"
              className="relative h-40 md:h-80 overflow-hidden rounded-xl shadow-md flex items-center justify-center bg-gray-900 bg-opacity-70 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-16 h-16 transition-transform duration-300 group-hover:scale-110"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              <span className="absolute bottom-4 left-4 text-white text-sm font-semibold bg-gray-900 bg-opacity-50 px-3 py-1 rounded-full">
                Watch Video
              </span>
            </Link>
          )}
        </div>

        <div className="prose max-w-none text-gray-700 mb-8">
          <p>{project.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Details Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Building className="text-green-600" size={24} />
              Project Details
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <MapPin className="text-gray-500" size={18} />
                <span className="text-gray-700 font-semibold">Location:</span>
                <span className="text-gray-600">{project.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <Tag className="text-gray-500" size={18} />
                <span className="text-gray-700 font-semibold">Status:</span>
                <span className="bg-green-200 text-green-800 text-sm font-bold px-2.5 py-0.5 rounded-full">
                  {project.status}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Images className="text-gray-500" size={18} />
                <span className="text-gray-700 font-semibold">Properties:</span>
                <span className="text-gray-600">
                  {project.propertyCount} listed
                </span>
              </li>
            </ul>
          </div>

          {/* Features Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Check className="text-green-600" size={24} />
              Key Features
            </h3>
            <ul className="space-y-3">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="text-green-500 mt-1" size={18} />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            Available Properties ({projectProperties.length})
          </h2>
          {projectProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectProperties.map((property) => (
                <Link
                  key={property.id}
                  href={`/properties/${property.type}/${property.slug}`}
                  className="block group   rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4 bg-gradient-to-b from-green-100 to-blue-100">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                      {property.title}
                    </h3>
                    <p className="text-green-600 font-bold mt-1">
                      {property.price}
                    </p>
                    <ul className="text-gray-500 text-sm mt-2 space-y-1">
                      <li className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{property.location}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <SquareDot size={16} />
                        <span>{property.area}</span>
                      </li>
                    </ul>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg py-8">
              No properties are currently listed for this project.
            </p>
          )}
        </section>
      </div>
    </main>
  );
};

export default ProjectDetailsPage;
