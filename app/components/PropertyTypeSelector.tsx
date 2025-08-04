// app/components/PropertyTypeSelector.tsx
"use client";
import Link from "next/link";
import React from "react";
import { propertyTypes } from "@/app/constants/propertyTypes";

export default function PropertyTypeSelector() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {propertyTypes.map((type) => (
        <Link
          key={type}
          href={`/properties/${type}`} // Links directly to the type-specific page
          className={`
            flex flex-col items-center justify-center
            p-6 w-40 h-40 rounded-lg shadow-lg
            transition-all duration-300 ease-in-out
            transform hover:scale-105 hover:shadow-xl
            bg-gradient-to-b from-green-200 to-blue-200 text-gray-800 border-2 border-gray-200 hover:border-blue-500
          `}
        >
          <div className="text-5xl mb-2">
            {type === "residential"
              ? "🏠"
              : type === "commercial"
              ? "🏢"
              : "🚜"}
          </div>
          <span className="text-lg font-semibold text-center">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </Link>
      ))}
    </div>
  );
}
