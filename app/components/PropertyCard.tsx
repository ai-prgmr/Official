// app/components/PropertyCard.tsx
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Property } from "@/app/type"; // Adjust path
import { MapPin, Shield, ArrowRight, CheckCircle } from "lucide-react";
import ShareButton from "./ShareButton";
const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  const typeBgColor =
    property.type === "agriculture"
      ? "bg-green-500"
      : property.type === "commercial"
      ? "bg-blue-500"
      : "bg-purple-500";

  const detailPageHref = `/properties/${property.type}/${property.slug}`;

  return (
    <div className="rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <Image
          src={property.image}
          alt={property.title}
          width={500}
          height={300}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${typeBgColor}`}
          >
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          {property.verified && (
            <div className="bg-white text-green-600 p-2 rounded-full">
              <Shield size={16} />
            </div>
          )}
        </div>
        {property.type !== "agriculture" && (
          <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-2 py-1 rounded-full">
            <span className="text-xs">High Demand</span>
          </div>
        )}
      </div>

      <div className="p-6 bg-gradient-to-b from-green-100 to-blue-100">
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
          {property.title}
        </h3>
        <p className="text-gray-600 mb-3 flex items-center gap-1">
          <MapPin size={16} />
          {property.location}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div>
            {property.type === "residential" && (
              <span className="text-gray-800 font-bold text-xl">
                Starting from{" "}
              </span>
            )}
            <span className="text-xl font-bold text-green-600">
              {property.price}{" "}
            </span>
            {property.type === "residential" && (
              <span className="text-gray-800 font-bold text-sm">
                <br className="block sm:hidden" />
              </span>
            )}
            <span className="text-gray-900 font-bold text-xl">
              {property.area}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {property.features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-gray-700 bg-blue-50 p-3 rounded-lg shadow-sm"
            >
              <CheckCircle size={18} className="text-green-500" />
              <span className="text-sm font-semibold">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Link
            href={detailPageHref}
            className="flex-1 bg-gradient-to-r from-green-400 to-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            View Details
            <ArrowRight size={16} />
          </Link>
          <ShareButton />
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
