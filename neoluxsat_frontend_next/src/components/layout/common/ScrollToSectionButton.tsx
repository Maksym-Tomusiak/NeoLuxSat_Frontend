"use client";

import { useState, useEffect } from "react";
import DropdownIcon from "@/assets/svgs/scroll-to-top-icon.svg?component";

interface Props {
  targetId?: string;
}

const ScrollToSectionButton = ({ targetId = "main-content-start" }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > window.innerHeight * 1.5) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToSection = () => {
    document.getElementById(targetId)?.scrollIntoView({
      behavior: "smooth", // Smooth scroll animation
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToSection}
          className="pointer-events-auto float-right p-3 z-50 rounded-full bg-primaryOrange text-white shadow-lg transition-opacity duration-300 ease-in-out hover:bg-primaryOrange/80 focus:outline-none cursor-pointer flex items-center justify-center" // <-- ADDED HERE
          aria-label="Scroll to content"
        >
          <div className="rotate-180 scroll-button fill-primaryWhite">
            {" "}
            {/* <-- REMOVED FROM HERE */}
            <DropdownIcon />
          </div>
          {/* --- FIX: Added classes back to the icon --- */}
        </button>
      )}
    </>
  );
};

export default ScrollToSectionButton;
