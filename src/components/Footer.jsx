import React from "react";
import { footerLogo } from '../assets';

const Footer = () => {
  return (
    // Footer component
    <footer className="relative right-0 left-0 bottom-0 bg-black text-white p-4">
      {/* Container for the footer content */}
      <div className="container mx-auto flex items-center justify-between">
        {/* Flex container for Swiggy icon and text, and copyright information */}
        <div className="flex flex-col">
          {/* Swiggy icon with text */}
          <div className="flex items-center gap-2">
            <div>
              {/* Swiggy logo */}
              <img src={footerLogo} alt="Logo" className="h-5" />
            </div>
            {/* Swiggy text */}
            <span className="text-lg font-semibold">Swiggy</span>
          </div>
          {/* Copyright information */}
          <div>
            <p>© 2023 Bundl Technologies Pvt. Ltd</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
