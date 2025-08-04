// app/components/PropertyDetailPage.tsx
"use client";
import React from "react";
import Image from "next/image";
import { Property } from "@/app/type";
import PropertyCard from "./PropertyCard"; // For related properties
import { MapPin, Shield, Ruler, CheckCircle } from "lucide-react";
import ShareButton from "./ShareButton";
import PropertyLayoutSection from "./PropertyLayoutSection"; // For layout section
interface PropertyDetailPageProps {
  property: Property;
  relatedProperties: Property[];
}

const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  property,
  relatedProperties,
}) => {
  if (!property) {
    return (
      <div className="text-center text-red-600">
        Property details could not be loaded.
      </div>
    );
  }

  return (
    <div className=" rounded-lg shadow-xl p-6 lg:p-8">
      <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden mb-8">
        <Image
          src={property.image}
          alt={property.title}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
        {property.verified && (
          <div className="absolute top-4 left-4 bg-green-500 text-white p-2 rounded-full shadow-md">
            <Shield size={20} />
          </div>
        )}
        <div className="absolute top-4 right-4 flex gap-2">
          <ShareButton />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-8">
        <div className="lg:w-2/3">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            {property.title}
          </h1>
          <p className="text-gray-600 mb-4 flex items-center gap-2">
            <MapPin size={20} /> {property.location}
          </p>

          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-green-700">
                {property.price}
              </span>
              <span className="text-gray-600 text-xl flex items-center gap-1">
                <Ruler size={20} /> {property.area}
              </span>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
            <p>{property.description}</p>
          </div>
          <PropertyLayoutSection layout={property.layout} />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Key Features
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {property.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-gray-700 bg-gray-50 p-3 rounded-lg shadow-sm"
              >
                <CheckCircle size={18} className="text-green-500" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Related Properties
          </h2>
          {relatedProperties.length > 0 ? (
            <div className="space-y-4">
              {relatedProperties.map((relatedProperty) => (
                <PropertyCard
                  key={relatedProperty.id}
                  property={relatedProperty}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No related properties found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
