import React from "react";
import { Shield, Award, TrendingUp } from "lucide-react";
import Image from "next/image";
const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-4 p-4 shadow-xl mt-10 bg-gradient-to-br from-green-200 to-blue-200 gap-4 hover:shadow-4xl">
      <div className="text-center">
        <Image
          src="/Official/grass-logo-gif.gif"
          alt="Grass Venture Logo"
          width={60}
          height={50}
          priority
          loading="eager"
          unoptimized={true}
          className="w-50 h-24 items-center mx-auto mb-4"
          style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
        />

        <p className="text-xl text-gray-600">
          Your trusted partner for all property investments in Madhya Pradesh
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            We are committed to providing transparent, verified, and premium
            property listings across Madhya Pradesh. Our team ensures that every
            property goes through rigorous verification before being listed on
            our platform.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="text-green-600" size={20} />
              <span className="text-gray-700">100% Verified Properties</span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="text-green-600" size={20} />
              <span className="text-gray-700">Expert Consultation</span>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="text-green-600" size={20} />
              <span className="text-gray-700">Market Insights</span>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Why Choose Us?
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li>• Extensive network across Madhya Pradesh</li>
            <li>• Transparent pricing with no hidden costs</li>
            <li>• Legal documentation support</li>
            <li>• Post-purchase assistance</li>
            <li>• Quick WhatsApp connectivity</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default AboutPage;
