// app/components/MapComponent.tsx
"use client"; // Essential for interactive elements and state if you add them later
import React from "react";
import { Home, MapPin, TreePine, Building } from "lucide-react";
import { Property } from "@/app/type"; // Corrected import path based on common setup
import Link from "next/link";

const NewMapComponent: React.FC<{
  properties: Property[];
}> = ({ properties }) => {
  // --- IMPORTANT: Calibrate these values based on your specific MP map image ---
  // These are approximate min/max lat/long for Madhya Pradesh.
  // You'll need to adjust these 'mapMinLat', 'mapMaxLat', 'mapMinLng', 'mapMaxLng'
  // to correspond to the visible boundaries of Madhya Pradesh *within your chosen background image*.
  // Start with the approximate values below, then fine-tune.
  const mapMinLat = 21.1; // Southernmost point of MP
  const mapMaxLat = 26.9; // Northernmost point of MP
  const mapMinLng = 74.0; // Westernmost point of MP
  const mapMaxLng = 82.7; // Easternmost point of MP

  const latRange = mapMaxLat - mapMinLat;
  const lngRange = mapMaxLng - mapMinLng;

  // Padding in percentage from the edge of the map container
  const horizontalPadding = 5; // e.g., 5% from left and right
  const verticalPadding = 5; // e.g., 5% from top and bottom

  return (
    <div
      className="max-w-7xl mx-auto relative h-[500px] sm:h-[600px] lg:h-[700px] xl:h-[800px] rounded-2xl overflow-hidden shadow-xl"
      style={{
        // Add your background map image here
        backgroundImage: `url('/grass/mp-map.svg')`, // Path to your MP map image in public/images
        backgroundSize: "100% 100%", // Or 'contain' depending on your image aspect ratio vs div
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Decorative overlay (keep if desired) */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20"></div>

      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="bg-white/90 w-1/3 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <MapPin className="text-green-600" size={24} />
            Madhya Pradesh Properties
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            Click on markers to view property details
          </p>
        </div>
      </div>

      {properties.map((property) => {
        // Normalize latitude and longitude to 0-1 range within the map's bounds
        const normalizedLat = (property.coordinates.lat - mapMinLat) / latRange;
        const normalizedLng = (property.coordinates.lng - mapMinLng) / lngRange;

        // Convert to percentage for 'top' and 'left'
        // 'top' is inverted: higher latitude (north) means lower 'top' percentage
        // 'left' is straightforward: higher longitude (east) means higher 'left' percentage
        const topPercentage =
          (1 - normalizedLat) * (100 - 2 * verticalPadding) + verticalPadding;
        const leftPercentage =
          normalizedLng * (100 - 2 * horizontalPadding) + horizontalPadding;

        return (
          <div
            key={property.id}
            className="overflow-scroll absolute z-20 cursor-pointer transform hover:scale-110 transition-transform group" // Added 'group' for hover effect
            style={{
              left: `${leftPercentage}%`,
              top: `${topPercentage}%`,
              // To perfectly center the marker icon, adjust with half its width/height
              transform: `translate(-50%, -50%)`,
            }}
          >
            <div className="bg-white rounded-full p-2 shadow-lg border-2 border-green-500 hover:border-green-600">
              {property.type === "agriculture" && (
                <TreePine className="text-green-600" size={16} />
              )}
              {property.type === "commercial" && (
                <Building className="text-blue-600" size={16} />
              )}
              {property.type === "residential" && (
                <Home className="text-purple-600" size={16} />
              )}
            </div>
            {/* The tooltip/popup that appears on hover/click */}
            {/* Changed to use Tailwind's group-hover for visibility */}
            <Link
              href={`/properties/${property.type}/${property.slug}`}
              className="text-sm text-gray-800" // Removed hover:underline from Link directly, it's on text
            >
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-white rounded-lg p-3 shadow-xl min-w-48 border border-gray-200">
                  <h4 className="font-semibold text-sm text-gray-800">
                    {property.title}
                  </h4>
                  <p className="text-green-600 font-bold text-sm">
                    {property.price}
                  </p>
                  <p className="text-gray-600 text-xs">{property.area}</p>
                  <span className="text-blue-600 text-xs hover:underline mt-1 block">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
          </div>
        );
      })}

      {/* <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg z-10">
        <h4 className="font-semibold text-gray-800 mb-2">Property Types</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <TreePine className="text-green-600" size={16} />
            <span className="text-sm text-gray-700">Agricultural</span>
          </div>
          <div className="flex items-center gap-2">
            <Building className="text-blue-600" size={16} />
            <span className="text-sm text-gray-700">Commercial</span>
          </div>
          <div className="flex items-center gap-2">
            <Home className="text-purple-600" size={16} />
            <span className="text-sm text-gray-700">Residential</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default NewMapComponent;
