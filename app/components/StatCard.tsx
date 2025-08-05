import React from "react";

const StatCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  color: string;
}> = ({ icon, title, color }) => {
  return (
    <div className="bg-gradient-to-b from-green-200 to-blue-200 rounded-xl p-4 shadow-lg flex flex-col items-center">
      <div
        className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${color} mb-4`}
      >
        {icon}
      </div>
      {/* <h3 className="text-2xl font-bold text-gray-800">{value}</h3> */}
      <p className="text-gray-600 text-center">{title}</p>
    </div>
  );
};
export default StatCard;
