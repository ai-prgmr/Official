// app/components/PropertyGridDisplay.tsx
"use client";
import React from "react";
import { Property } from "@/app/type";
import PropertyCard from "./PropertyCard";

interface PropertyGridDisplayProps {
  properties: Property[];
  noResultsMessage?: string;
}

const PropertyGridDisplay: React.FC<PropertyGridDisplayProps> = ({
  properties,
  noResultsMessage = "No properties found.",
}) => {
  if (!properties || properties.length === 0) {
    return (
      <p className="text-center text-gray-600 text-lg">{noResultsMessage}</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyGridDisplay;
