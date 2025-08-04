import React from "react";
import HomePage from "./components/HomePage";
import { properties, projects } from "./data";

const RealEstateApp: React.FC = () => {
  return (
    <div className="min-h-screen">
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <HomePage properties={properties} projects={projects} />
      </main>
    </div>
  );
};

export default RealEstateApp;
