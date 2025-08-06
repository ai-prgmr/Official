// app/types.ts
export interface Property {
  id: number;
  title: string;
  slug: string;
  type: "agriculture" | "commercial" | "residential"; // Ensure consistent types
  location: string;
  price: string;
  area: string;
  coordinates: { lat: number; lng: number };
  image: string;
  features: string[];
  rating: number;
  views: number;
  description: string;
  layout?: {
    overview: string;
    sections: { title: string; points: string[] }[];
  };
  verified: boolean;
  projectSlug: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  developer: string;
  image: string; // URL to the main project image
  images: string[]; // Additional images
  video?: string;
  description: string;
  location: string;
  status: "Under Construction" | "Ready to Move" | "Completed";
  features: string[]; // e.g., ['RERA Approved', 'Gated Community', 'Swimming Pool']
  propertyCount: number; // The number of properties available within this project
}
