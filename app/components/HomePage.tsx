import React from "react";
import { Property, Project } from "../type";
import PropertyCard from "./PropertyCard";
import StatCard from "./StatCard";
import BackgroundCarousel from "./BackgroundCarousel";
import PropertyTypeSelector from "./PropertyTypeSelector";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Building,
  Award,
  Shield,
  MapPin,
} from "lucide-react";
import { projects } from "../data";

const HomePage: React.FC<{
  properties: Property[];
  projects: Project[];
}> = ({ properties }) => {
  return (
    <div className="flex flex-col gap-y-6">
      <section className="w-full mx-auto">
        <BackgroundCarousel>
          <section className="text-center py-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Find Your Perfect&nbsp;
              <span className="text-green-600 block">Property in MP</span>
            </h1>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Discover premium agricultural, commercial, and residential
              properties in Indore, Ujjain, & Dewas. Verified listings with
              transparent pricing.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/properties"
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                Explore Properties
                <ArrowRight size={20} />
              </Link>
              <a
                href="https://wa.me/919201463228"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white text-white px-8 py-3 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors flex items-center gap-2"
              >
                <Phone size={20} />
                Get Expert Advice
              </a>
            </div>
          </section>
        </BackgroundCarousel>
      </section>
      <section className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <StatCard
          icon={<Building className="text-white" size={24} />}
          title="Verified Listings"
          color="bg-blue-500"
        />
        <StatCard
          icon={<Shield className="text-white" size={24} />}
          title="Rera Approved"
          color="bg-green-500"
        />
        <StatCard
          icon={<Award className="text-white" size={24} />}
          title="Trusted Network"
          color="bg-purple-500"
        />
        <StatCard
          icon={<MapPin className="text-white" size={24} />}
          title="Strategic Locations"
          color="bg-orange-500"
        />
      </section>
      <section>
        <PropertyTypeSelector />
      </section>
      <section>
        <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Featured Projects in Indore
        </h3>
        <div className="flex mx-auto max-w-lg gap-6 flex-wrap justify-center">
          {projects.map((project) => (
            <Link
              href={`/projects/${project.slug}`}
              key={project.id}
              className="block group"
            >
              <div className="bg-gradient-to-b from-green-200 to-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-gray-600 mt-2">{project.description}</p>
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
      </section>
      <section>
        <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Featured Properties in Indore, Ujjain
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.slice(0, 3).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
      <section className="bg-green-700 py-16 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Find Your Perfect Property?
        </h3>
        <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
          Our team of experts is ready to help you every step of the way.
        </p>
        <a
          href="https://wa.me/919201463228"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-green-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
        >
          Get Started Now
        </a>
      </section>
    </div>
  );
};
export default HomePage;
