import React from "react";
import { Home, MapPin, TreePine, Building } from "lucide-react";
import { Property } from "../type";
import Link from "next/link";
const MapComponent: React.FC<{
  properties: Property[];
}> = ({ properties }) => {
  return (
    <div className="max-w-7xl mx-auto relative h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl overflow-hidden shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20"></div>

      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <MapPin className="text-green-600" size={24} />
            Madhya Pradesh Properties
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            Click on markers to view property details
          </p>
        </div>
      </div>

      {properties.map((property) => (
        <div
          key={property.id}
          className="absolute z-20 cursor-pointer transform hover:scale-110 transition-transform"
          style={{
            left: `${(property.coordinates.lng - 74) * 15 + 20}%`,
            top: `${(26 - property.coordinates.lat) * 15 + 20}%`,
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
          <Link
            href={`/properties/${property.type}/${property.slug}`}
            className="text-sm text-gray-800 hover:underline"
          >
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 hover:opacity-100 transition-opacity">
              <div className="bg-white rounded-lg p-3 shadow-xl min-w-48 border">
                <h4 className="font-semibold text-sm text-gray-800">
                  {property.title}
                </h4>
                <p className="text-green-600 font-bold text-sm">
                  {property.price}
                </p>
                <p className="text-gray-600 text-xs">{property.area}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}

      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
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
      </div>
    </div>
  );
};

export default MapComponent;
