// Filters.jsx
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { connect } from "redux-bundler-react";

const Filters = ({ handleSort, areaList, doFetchFoodByArea }) => {
  const [isAreaDropdownOpen, setAreaDropdownOpen] = useState(false);
  const [isSortByDropdownOpen, setIsSortByDropdownOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState("");
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    if (areaList?.meals) {
      const areaData = areaList.meals.map((item) => item.strArea);
      setAreas(areaData);
    }
  }, [areaList]);

  const toggleAreaDropdown = () => {
    setAreaDropdownOpen(!isAreaDropdownOpen);
  };

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
  };

  const toggleSortByDropdown = () => {
    setIsSortByDropdownOpen(!isSortByDropdownOpen);
  };

  const handleApplyFilter = () => {
    setAreaDropdownOpen(false);
    if (doFetchFoodByArea) {
      doFetchFoodByArea(selectedArea);
    }
  };

  return (
    <div className="mt-4 mb-4 flex justify-between">
      {/* Filter by Area */}
      <div className="relative mr-4">
        <button onClick={toggleAreaDropdown} className="p-2 border rounded-lg">
          Filter By Area
          <FontAwesomeIcon icon={faFilter} className="ml-2" />
        </button>
        {isAreaDropdownOpen && areas.length > 0 && (
          <div className="absolute top-full left-0 mt-2 pt-0 w-full bg-white border rounded-md max-h-40 overflow-y-auto">
            <div>
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
        <span className="mr-2 text-gray-700">Sort By:</span>
        <select
          onChange={(e) => handleSort(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">None</option>
          <option value="alphabetical">A-Z</option>
          <option value="reverse_alphabetical">Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default connect("selectAreaList", "doFetchFoodByArea", Filters);