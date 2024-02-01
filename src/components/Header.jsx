// Header.jsx
import React from "react";
import swiggyLogo from "../Swiggy_logo.svg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import swiggyMobile from "../swiggyMobile.webp";

const Header = () => {
  return (
    <header className="top-0 text-black p-4 shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center justify-between px-1 sm:px-0">
          <div>
            <img src={swiggyLogo} alt="Logo" className="h-12 hidden sm:block" />
            <img src={swiggyMobile} alt="mobile logo" className="h-8 block sm:hidden"/>
          </div>
          <div className="flex items-start relative">
            {/* Search bar with search icon */}
            <input
              type="text"
              placeholder="Search for restaurant and food"
              className="bg-gray-100 text-black-800 pl-2 p-2 rounded-lg w-72 focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200 transition-all"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
