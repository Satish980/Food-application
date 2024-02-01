import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { connect } from "redux-bundler-react";

const Filters = ({ handleSort, areaList, doFetchFoodByArea }) => {
  // State variables to manage the state of the area dropdown
  const [isAreaDropdownOpen, setAreaDropdownOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState("");
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    // Effect to update areas when areaList changes
    if (areaList && areaList.length) {
      setAreas(areaList);
    }
  }, [areaList]);

  // Function to toggle the visibility of the area dropdown
  const toggleAreaDropdown = () => {
    setAreaDropdownOpen(!isAreaDropdownOpen);
  };

  // Function to handle the selection of an area
  const handleAreaSelect = (area) => {
    setSelectedArea(area);
  };

  // Function to apply filters based on the selected area
  const handleApplyFilter = () => {
    setAreaDropdownOpen(false);
    if (doFetchFoodByArea) {
      doFetchFoodByArea(selectedArea);
    }
  };

  return (
    <div className="mt-4 mb-4 flex">
      <div className="flex w-full justify-between items-center">
        {/* Filter by Area */}
        <div className="relative pr-5 sm:pr-4 md:mb-0">
          <button
            onClick={toggleAreaDropdown}
            className="p-2 border rounded-lg"
          >
            {/* Displaying the text "Filter By Area" with an icon */}
            <span className="hidden sm:inline md:inline lg:inline xl:inline">
              Filter By Area
            </span>
            <FontAwesomeIcon icon={faFilter} className="ml-2" />
          </button>
          {isAreaDropdownOpen && areas.length > 0 && (
            <div className="absolute top-full left-0 mt-2 pt-0 w-full bg-white border rounded-md max-h-40 overflow-auto">
              <div>
                {/* Iterating through areas list and displaying available areas with radio button */}
                {areas.map((area) => (
                  <div
                    key={area}
                    className="flex items-center cursor-pointer px-3 py-1 hover:bg-orange-100"
                    onClick={() => handleAreaSelect(area)}
                  >
                    <input
                      type="radio"
                      id={area}
                      name="area"
                      value={area}
                      checked={selectedArea === area}
                      onChange={() => handleAreaSelect(area)}
                      className="mr-2"
                    />
                    <label htmlFor={area}>{area}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Apply Button */}
          {isAreaDropdownOpen && (
            <button
              onClick={handleApplyFilter}
              className="p-2 bg-orange-500 ml-2 text-white rounded-md"
            >
              Apply
            </button>
          )}
        </div>

        {/* Sort By */}
        <div className="flex items-center">
          {/* Displaying the text "Sort By" with a dropdown for sorting options */}
          <span className="hidden sm:inline md:inline lg:inline xl:inline mr-2 text-gray-700">
            Sort By:
          </span>
          <select
            onChange={(e) => handleSort(e.target.value)}
            className="p-2 border rounded-lg"
          >
            {/* Sorting options dropdown */}
            <option value="alphabetical">A-Z</option>
            <option value="reverse_alphabetical">Z-A</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default connect("selectAreaList", "doFetchFoodByArea", Filters);
