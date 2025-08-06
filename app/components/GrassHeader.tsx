// // components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Home,
  LandPlot,
  X,
  AlignRightIcon,
  Phone,
  PersonStanding,
  Folder,
} from "lucide-react"; // Import Menu and X icons
import { useState } from "react"; // Import useState hook
import { usePathname } from "next/navigation";

export default function GrassHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu visibility

  // Function to close the menu (used when a link is clicked or menu explicitly closed)
  const closeMenu = () => setIsMenuOpen(false);
  const whatsappNumber = "+919201463228";
  const whatsappMessage = encodeURIComponent(
    "Hello! I have a question about your Properties."
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <header className="bg-gradient-to-br from-green-100 to-blue-100 shadow-xl fixed  w-full z-50 border-b-16 border-b-green-600">
      <div className="container relative mx-auto  flex justify-between items-center px-4">
        {" "}
        {/* Added relative for absolute positioning of nav */}
        {/* Logo/Brand */}
        <Link
          href="/"
          className="flex items-center space-x-2 text-2xl font-bold text-white hover:text-blue-100 transition-colors duration-200 p-2 rounded-2xl"
          onClick={closeMenu} // Close menu if logo is clicked
          aria-label="Grass Venture Home"
          title="Grass Venture Home"
        >
          <Image
            src="/grass-logo-gif.gif"
            alt="Grass Venture Logo"
            width={60}
            height={60}
            priority={true}
            loading="eager"
            unoptimized={true}
            className="w-60 h-24"
          />
        </Link>
        {/* Hamburger/Close Button for Mobile */}
        <button
          className="sm:hidden text-green-600 focus:outline-none z-60"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
        >
          {isMenuOpen ? (
            <X size={30} color="white" />
          ) : (
            <AlignRightIcon size={30} />
          )}{" "}
          {/* Toggle between X and Menu icon */}
        </button>
        {/* Navigation - Desktop & Mobile */}
        <nav
          className={`
            ${
              isMenuOpen ? "flex" : "hidden"
            }  // Show/hide based on isMenuOpen state
            flex-col sm:flex-row
    fixed sm:relative
    top-0 left-0 w-full h-full sm:h-auto
    bg-gradient-to-r from-green-200 to-green-500
    sm:bg-none sm:shadow-none
    pb-4 sm:pb-0 pt-2 sm:pt-0
    shadow-lg
    items-center sm:justify-end
    gap-x-4 gap-y-4 text-lg sm:text-base
    sm:flex
    duration-300 ease-in-out
    overflow-y-auto sm:overflow-visible
    z-50
          `}
        >
          {" "}
          <NavLink
            href="/"
            icon={Home}
            label="Home"
            textColor="text-gray-700"
            hoverColor="hover:text-black"
            onClick={closeMenu}
          />
          <NavLink
            href="/properties"
            icon={LandPlot}
            label="Properties"
            textColor="text-gray-700"
            hoverColor="hover:text-black"
            onClick={closeMenu}
          />
          <NavLink
            href="/projects"
            icon={Folder}
            label="Projects"
            textColor="text-gray-700"
            hoverColor="hover:text-black"
            onClick={closeMenu}
          />
          <NavLink
            href="/about-us"
            icon={PersonStanding}
            label="About Us"
            textColor="text-gray-700"
            hoverColor="hover:text-black"
            onClick={closeMenu}
          />
          <NavLink
            href={whatsappLink}
            target="_blank"
            icon={Phone}
            label="Contact Us"
            textColor="text-gray-700"
            hoverColor="hover:text-black"
            onClick={closeMenu}
          />
        </nav>
      </div>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  icon: React.ElementType;
  target?: string;
  label: string;
  textColor?: string;
  hoverColor?: string;
  onClick?: () => void; // Add onClick prop
}

function NavLink({
  href,
  icon: Icon,
  label,
  target = "_self", // Default to self if not specified
  textColor = "text-gray-100",
  hoverColor = "hover:text-blue-100",
  onClick, // Destructure the onClick prop
}: NavLinkProps) {
  const pathname = usePathname();
  // Simplified active check for routes like /products/category
  const isActive =
    pathname.startsWith(href) &&
    (pathname.length === href.length || pathname.charAt(href.length) === "/");

  return (
    <Link
      href={href}
      target={target} // Ensure links open in a new tab if specified
      className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200
        ${isActive ? "bg-teal-400 bg-opacity-20" : ""}
        ${textColor} ${hoverColor}`}
      onClick={onClick} // Pass the onClick prop to the Link
    >
      <Icon size={20} />
      <span className="text-md mt-1 whitespace-nowrap">{label}</span>
    </Link>
  );
}
