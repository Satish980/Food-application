// Footer.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAd } from "@fortawesome/free-solid-svg-icons"; // Assuming there is a suitable icon for Swiggy
import swiggyFooterLogo from '../swiggy_footer.png';

const Footer = () => {
  return (
    <footer className="relative right-0 left-0 bottom-0 bg-black text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex flex-col">
          {/* Swiggy icon with text */}
          <div className="flex items-center gap-2">
            <div>
              <img src={swiggyFooterLogo} alt="Logo" className="h-5" />
            </div>
            <span className="text-lg font-semibold">Swiggy</span>
          </div>
        <div>
          {/* Copyright information */}
          <p>© 2023 Bundl Technologies Pvt. Ltd</p>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
