// Import necessary libraries and components
import Image from "next/image";

const SocialMediaButtons: React.FC = () => {
  // --- WhatsApp Configuration ---
  const whatsappNumber = "+919201463228";
  const whatsappMessage = encodeURIComponent(
    "Hello! I have a question about your Properties."
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // --- Facebook Configuration ---
  // Replace this with your actual Facebook page URL
  const facebookLink = "https://www.facebook.com/profile.php?id=61579428055383";

  // --- Instagram Configuration ---
  // Replace this with your actual Instagram profile URL
  const instagramLink = "https://instagram.com/grassventure.in";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
      {/* WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white transition-all duration-300 transform hover:scale-110 flex items-center justify-center w-12 h-12 md:w-14 md:h-14"
        aria-label="Chat on WhatsApp"
      >
        <Image
          src="/Digital_Glyph_Green.svg"
          alt="WhatsApp Icon"
          width={40}
          height={40}
          className="text-white"
        />
      </a>

      {/* Instagram Button */}
      <a
        href={instagramLink}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full text-white transition-all duration-300 transform hover:scale-110 flex items-center justify-center w-12 h-12 md:w-14 md:h-14"
        aria-label="Follow on Instagram"
      >
        <Image
          src="/Instagram.png"
          alt="WhatsApp Icon"
          width={40}
          height={40}
          className="text-white"
        />
      </a>

      {/* Facebook Button */}
      <a
        href={facebookLink}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full text-white transition-all duration-300 transform hover:scale-110 flex items-center justify-center w-12 h-12 md:w-14 md:h-14"
        aria-label="Follow on Facebook"
      >
        <Image
          src="/Facebook.png"
          alt="WhatsApp Icon"
          width={40}
          height={40}
          className="text-white"
        />
      </a>
    </div>
  );
};

export default SocialMediaButtons;
