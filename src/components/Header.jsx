import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { headerLogoMobile, headerLogoWeb } from "../assets";

const Header = () => {
  const redirectToHome = () => {
    window.location.href = "/";
  };

  return (
    <header className="top-0 text-black p-4 shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center justify-between px-1 sm:px-0">
          <div>
            <img
              src={headerLogoWeb}
              alt="Logo"
              className="h-12 hidden sm:block cursor-pointer"
              onClick={redirectToHome}
            />
            <img
              src={headerLogoMobile}
              alt="mobile logo"
              className="h-8 block sm:hidden cursor-pointer"
              onClick={redirectToHome}
            />
          </div>
          <div className="flex items-start relative">
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
