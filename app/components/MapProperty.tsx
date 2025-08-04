// app/components/MapComponent.tsx
"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import Leaflet itself for custom icons
import "leaflet/dist/leaflet.css"; // Import Leaflet's CSS
import { MapPin } from "lucide-react"; // For custom marker icons
import { Property } from "@/app/type"; // Adjust path if needed
import Link from "next/link";

// Fix for default Leaflet icon issue with Webpack/Next.js
// If your markers don't show up, uncomment/adjust these lines
// delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/grass/leaflet/marker-icon-2x.png",
  iconUrl: "/grass/leaflet/marker-icon.png",
  shadowUrl: "/grass/leaflet/marker-shadow.png",
});

// If you want custom Lucide icons for markers, you'll need to create custom Leaflet DivIcons
const createCustomIcon = (type: Property["type"]) => {
  let iconContent;
  let iconColor;
  switch (type) {
    case "agriculture":
      iconContent = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tree-palm-icon lucide-tree-palm"><path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4"/><path d="M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3"/><path d="M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35"/><path d="M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14"/></svg>`;
      iconColor = "text-green-600";
      break;
    case "commercial":
      iconContent = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-landmark-icon lucide-landmark"><path d="M10 18v-7"/><path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M3 22h18"/><path d="M6 18v-7"/></svg>`;
      iconColor = "text-blue-600";
      break;
    case "residential":
    default:
      iconContent = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-icon lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`;
      iconColor = "text-purple-600";
      break;
  }

  return L.divIcon({
    html: `<div class="bg-white rounded-full p-2 shadow-lg ${iconColor}">${iconContent}</div>`,
    className: "custom-leaflet-icon", // Use a class for further styling if needed
    iconSize: L.point(36, 36), // Adjust based on your icon size
    iconAnchor: L.point(18, 18), // Anchor the center of the icon
    popupAnchor: L.point(0, -18), // Position popup above the icon
  });
};

interface MapComponentProps {
  properties: Property[];
  initialCenter?: L.LatLngExpression;
  initialZoom?: number;
}

const MapComponent: React.FC<MapComponentProps> = ({
  properties,
  initialCenter = [22.67731436970806, 75.84163103217945], // Center on Indore by default
  initialZoom = 12, // Zoom level to show most of MP
}) => {
  // Calculate the average center of properties for the map's initial view
  const getAverageCoordinates = () => {
    if (properties.length === 0) {
      return initialCenter;
    }
    const sumLat = properties.reduce((acc, p) => acc + p.coordinates.lat, 0);
    const sumLng = properties.reduce((acc, p) => acc + p.coordinates.lng, 0);
    return [sumLat / properties.length, sumLng / properties.length];
  };

  const center = getAverageCoordinates();

  return (
    <div
      className="max-w-7xl mx-auto relative rounded-2xl overflow-hidden shadow-xl"
      style={{ height: "600px", width: "100%" }}
    >
      <MapContainer
        center={center as L.LatLngTuple}
        zoom={initialZoom}
        scrollWheelZoom={true}
        className="h-full w-full z-0" // Make sure the map container fills the div
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[property.coordinates.lat, property.coordinates.lng]}
            icon={createCustomIcon(property.type)} // Use custom icon
          >
            <Popup>
              <div className="font-sans">
                <h4 className="font-bold text-lg text-gray-800 mb-1">
                  {property.title}
                </h4>
                <p className="text-gray-700 text-sm flex items-center gap-1 mb-1">
                  <MapPin size={14} className="inline-block text-gray-500" />{" "}
                  {property.location}
                </p>
                <p className="text-green-600 font-bold text-base mb-2">
                  {property.price}{" "}
                  <span className="text-gray-500 ml-1 font-normal text-sm">
                    • {property.area}
                  </span>
                </p>
                <Link
                  href={`/properties/${property.type}/${property.slug}`}
                  className="inline-flex items-center justify-center  text-[#173153] px-3 py-1 rounded-md text-sm"
                >
                  View Details
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
