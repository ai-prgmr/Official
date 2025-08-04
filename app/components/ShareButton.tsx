"use client"; // Essential for client-side functionality in Next.js App Router

import { Share2 } from "lucide-react";
import { useState, useEffect } from "react";

const ShareButton = () => {
  const [currentUrl, setCurrentUrl] = useState("");
  // Renamed to clarify: can we use the native Web Share API?
  const [canUseNativeShare, setCanUseNativeShare] = useState(false);
  const [message, setMessage] = useState(""); // To show feedback to the user

  useEffect(() => {
    // This code runs only on the client-side
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);

      // The most reliable check for native sharing is the presence of navigator.share
      // This is true for modern mobile browsers (Chrome, Safari, Firefox on iOS/Android)
      // and typically false for desktop browsers (or when running on HTTP).
      setCanUseNativeShare(!!navigator.share);
    }
  }, []);

  const handleShareButtonClick = async () => {
    setMessage(""); // Clear previous messages

    if (canUseNativeShare) {
      // On platforms that support it (mostly mobile/tablet): Use Web Share API
      try {
        await navigator.share({
          title: document.title, // Use the page's title
          url: currentUrl,
        });
        // Feedback for native share is usually handled by the OS.
        // We can optionally give a quick confirmation that the sheet opened.
        setMessage("Share options opened.");
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            setMessage("Share cancelled.");
          } else {
            console.error("Error sharing via native API:", error);
            setMessage("Failed to open share options.");
          }
        } else {
          console.error(
            "An unknown error occurred during native share:",
            error
          );
          setMessage("Failed to open share options.");
        }
      }
    } else {
      // On desktop (or mobile devices without Web Share API): Directly copy to clipboard
      try {
        await navigator.clipboard.writeText(currentUrl);
        setMessage("URL copied to clipboard!");
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Failed to copy to clipboard:", error);
          setMessage("Failed to copy URL.");
        } else {
          console.error(
            "An unknown error occurred during clipboard copy:",
            error
          );
          setMessage("Failed to copy URL.");
        }
      }
    }

    // Optional: Hide the message after a few seconds
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // Dynamically set aria-label and title based on functionality
  const buttonAriaLabel = canUseNativeShare
    ? "Share current page via native apps"
    : "Copy URL to clipboard";
  const buttonTitle = canUseNativeShare ? "Share current page" : "Copy URL";

  return (
    <div className="relative inline-block">
      {" "}
      {/* Wrapper for message positioning */}
      <button
        onClick={handleShareButtonClick} // All logic encapsulated in this single handler
        className="bg-white/80 backdrop-blur-sm text-gray-700 p-2 rounded-full hover:bg-white transition-colors"
        aria-label={buttonAriaLabel}
        title={buttonTitle}
      >
        <Share2 size={20} />
      </button>
      {/* Confirmation message (visible for both successful copy and native share attempts) */}
      {message && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap z-10">
          {message}
        </div>
      )}
    </div>
  );
};

export default ShareButton;
