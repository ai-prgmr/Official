import { projects } from "@/app/data";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Projects - Grass Venture",
  description:
    "Browse a list of all real estate projects marketed by Grass Venture.",
};

const ProjectsPage = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12 flex items-center justify-center gap-4">
        Our Projects
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link
            href={`/projects/${project.slug}`}
            key={project.id}
            className="block group"
          >
            <div className="bg-gradient-to-b from-green-200 to-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                  {project.title}
                </h2>
                <p className="text-gray-600 mt-2 line-clamp-3">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="bg-gray-100 text-gray-700 text-sm font-medium px-2.5 py-0.5 rounded">
                    {project.developer}
                  </span>
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {project.status}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default ProjectsPage;
