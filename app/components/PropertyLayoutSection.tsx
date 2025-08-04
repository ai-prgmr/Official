// ... (import icons)
import { LayoutGrid, BedDouble, Utensils } from "lucide-react";
import { Property } from "@/app/type";

const iconMap = {
  "Kitchen & Common Areas": <Utensils className="text-blue-500" size={20} />,
  "Bedrooms & Bathrooms": <BedDouble className="text-purple-500" size={20} />,
};

const PropertyLayoutSection = ({ layout }: { layout: Property["layout"] }) => {
  if (!layout) return null;

  return (
    <div className="bg-gray-50 rounded-xl p-6 md:p-8 mt-8 shadow-inner">
      <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-6">
        <LayoutGrid className="text-green-600" size={28} />
        Apartment Layout
      </h3>

      <div className="space-y-6">
        <div className="pb-4">
          <p className="text-gray-700 leading-relaxed">{layout.overview}</p>
        </div>
        {layout.sections.map((section, index) => (
          <div key={index} className="border-t pt-6">
            <h4 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-2">
              {iconMap[section.title as keyof typeof iconMap] || (
                <LayoutGrid size={20} />
              )}
              {section.title}
            </h4>
            <ul className="text-gray-700 space-y-1">
              {section.points.map((point, pointIndex) => (
                <li key={pointIndex} className="flex items-start gap-2">
                  <span className="font-medium text-gray-900">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyLayoutSection;
