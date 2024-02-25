import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { headerLogoMobile, headerLogoWeb } from "../assets";
import { connect } from "redux-bundler-react";

const Header = ({ doSearchMealByName, searchResults: apiSearchResults }) => {
  const redirectToHome = () => {
    window.location.reload();
  };

  const [searchResults, setSearchResults] = useState(apiSearchResults);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (searchText) {
      doSearchMealByName(searchText);
    }
    if (!searchText) {
      setSearchResults([]);
    }
  }, [searchText, doSearchMealByName]);

  useEffect(() => {
    if (apiSearchResults) {
      setSearchResults(apiSearchResults);
    }
  }, [apiSearchResults]);

  return (
    <header className="top-0 text-black p-4 shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center justify-between px-1 sm:px-0">
          <div>
            <img
              src={headerLogoWeb}
              alt="logo contains swiggy symbol with english word"
              className="h-12 hidden sm:block cursor-pointer"
              onClick={redirectToHome}
            />
            <img
              src={headerLogoMobile}
              alt="logo contains swiggy symbol"
              className="h-8 block sm:hidden cursor-pointer"
              onClick={redirectToHome}
            />
          </div>
          <div>
            <div className="flex items-start relative">
              <input
                type="text"
                placeholder="Search for restaurant and food"
                className="bg-gray-100 text-black-800 pl-2 p-2 rounded-lg w-72 focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200 transition-all"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
              </div>
            </div>
            {searchResults?.meals?.length ? (
              <div className="absolute w-72 overflow-scroll mt-2 h-28 z-100 bg-gray-100 border rounded-md border-orange-200">
                <ul id="meals">
                  {searchResults?.meals?.map((item) => (
                    <li
                      key={item?.idMeal}
                      className="cursor-pointer hover:bg-gray-200 p-1"
                      onClick={(e) => console.log(e, "item", item)}
                    >
                      {item?.strMeal}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default connect("doSearchMealByName", "selectSearchResults", Header);
