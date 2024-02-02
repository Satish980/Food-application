import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faRedo } from "@fortawesome/free-solid-svg-icons";
import { connect } from "redux-bundler-react";
import { FETCH_STATUS, MEAL_BUNDLE_STATE } from "../bundles/constants";
import Modal from "./Modal";

const FoodItems = ({
  foodData,
  currentMeal,
  doFetchCurrentMeal,
  fetchStatus,
  sortOption,
  mealBundleState,
}) => {
  // State variables for managing food items, pagination, and modal
  const [foodItems, setFoodItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMealPreparing, setIsMealPreparing] = useState(false);
  const pageSize = 8;

  useEffect(() => {
    // Effect to handle various scenarios when data or states change
    if (
      fetchStatus === FETCH_STATUS.IN_PROGRESS &&
      (mealBundleState === MEAL_BUNDLE_STATE.FETCH_MEAL_BY_LOCATION ||
        mealBundleState === MEAL_BUNDLE_STATE.FETCH_AREA_LIST)
    ) {
      // In progress state => Loading state
      setIsMealPreparing(true);
    }

    if (
      fetchStatus === FETCH_STATUS.SUCCESS &&
      (mealBundleState === MEAL_BUNDLE_STATE.FETCH_MEAL_BY_LOCATION ||
        mealBundleState === MEAL_BUNDLE_STATE.FETCH_AREA_LIST) &&
      foodData
    ) {
      // Data is available
      setFoodItems(foodData);
      setIsMealPreparing(false);
    }

    if (currentMeal && currentMeal.length) {
      // Set the selected item for the modal
      setSelectedItem(currentMeal[0]);
    }

    if (foodData) {
      // Clone the food data for sorting
      let sortedItems = [...foodData];

      if (sortOption) {
        // Check if it's a regular or reverse alphabetical sort
        const isReverseSort = sortOption === "reverse_alphabetical";

        // Sorting the data based on user selection
        sortedItems.sort((a, b) => {
          const comparison = a.strMeal.localeCompare(b.strMeal);
          return isReverseSort ? -comparison : comparison;
        });
      }
      setFoodItems(sortedItems);
    }
  }, [foodData, currentMeal, sortOption, fetchStatus, mealBundleState]);

  // Functions for pagination and modal operations

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openModal = (item) => {
    // Open the modal and fetch current meal details
    doFetchCurrentMeal(item.idMeal);
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    // Close the modal
    setIsModalOpen(!isModalOpen);
  };

  if (fetchStatus === FETCH_STATUS.FAILED) {
    return (
      <div className="mt-4 flex flex-col mb-4 font-sans">
        <div className="flex items-center justify-center mt-8">
          {/* <img src={swiggyFailedImage} alt="Swiggy Failed" className="h-40" /> */}
          <div className="ml-4 text-red-500">
            <p className="text-xl font-bold">Oops! Something went wrong.</p>
            <p>Please try again.</p>
            <button
              onClick={() => (window.location.reload())}
              className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-md"
            >
              <FontAwesomeIcon icon={faRedo} className="mr-2" />
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-col mb-4 font-sans">
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {isMealPreparing
          ? // Skeleton loading effect
            Array.from({ length: pageSize }).map((_, index) => (
              <div
                key={index}
                className="cursor-pointer shadow-sm rounded-lg bg-gray-200 p-4"
              >
                <div className="w-full h-40 bg-gray-300 mb-4 rounded-lg"></div>
                <div className="pl-2 pb-2">
                  <div className="w-3/4 h-4 bg-gray-300 mb-2"></div>
                  <div className="flex items-center text-black-500">
                    <div className="bg-aqua rounded-full p-1 mr-1">
                      <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                    </div>
                    <div className="w-8 h-4 bg-gray-300"></div>
                  </div>
                </div>
              </div>
            ))
          : foodItems &&
            foodItems
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((item) => (
                <div
                  key={item.idMeal}
                  onClick={() => openModal(item)}
                  className="cursor-pointer"
                >
                  <img
                    src={item.strMealThumb}
                    alt={item.strMeal}
                    className="w-full h-40 object-cover rounded-xl"
                    loading="lazy"
                  />
                  <div className="pl-2 pb-2">
                    {/* Name of the meal */}
                    <p className="mt-2 font-semibold">{item.strMeal}</p>
                    {/* Ratings */}
                    <div className="flex items-center justify-start gap-1">
                      <div>
                        <FontAwesomeIcon
                          icon={faStar}
                          className="border-black text-white bg-green-700 rounded-full p-1 h-3 w-3"
                        />
                      </div>
                      <p className="font-semibold pb-1">{item.rating}</p>
                    </div>
                  </div>
                </div>
              ))}
      </div>
      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center gap-1">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 text-orange-500 rounded cursor-pointer disabled:cursor-not-allowed disabled:text-inherit"
        >
          &lt;
        </button>
        <span className="">
          {`${currentPage} / ${Math.ceil(foodItems.length / pageSize)}`}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(foodItems.length / pageSize)}
          className="px-2 py-1 text-orange-500 rounded cursor-pointer disabled:cursor-not-allowed disabled:text-inherit"
        >
          &gt;
        </button>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <Modal
          item={selectedItem}
          onClose={closeModal}
          isLoading={
            fetchStatus === FETCH_STATUS.IN_PROGRESS &&
            mealBundleState === MEAL_BUNDLE_STATE.FETCH_CURRENT_MEAL
          }
        />
      )}
    </div>
  );
};

export default connect(
  "selectFoodData",
  "selectFetchStatus",
  "doFetchCurrentMeal",
  "selectCurrentMeal",
  "selectMealBundleState",
  FoodItems
);
