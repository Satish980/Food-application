import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
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
  const [foodItems, setFoodItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMealPreparing, setIsMealPreparing] = useState(false);
  const pageSize = 8;

  useEffect(() => {
    if (
      fetchStatus === FETCH_STATUS.IN_PROGRESS &&
      (mealBundleState === MEAL_BUNDLE_STATE.FETCH_MEAL_BY_LOCATION ||
        mealBundleState === MEAL_BUNDLE_STATE.FETCH_AREA_LIST)
    ) {
      setIsMealPreparing(true);
    }
    if (fetchStatus === FETCH_STATUS.SUCCESS &&
      (mealBundleState === MEAL_BUNDLE_STATE.FETCH_MEAL_BY_LOCATION ||
        mealBundleState === MEAL_BUNDLE_STATE.FETCH_AREA_LIST) && foodData) {
      setFoodItems(foodData);
      setIsMealPreparing(false);
    }
    if (currentMeal && currentMeal.length) {
      setSelectedItem(currentMeal[0]);
    }
    if (foodData) {
      let sortedItems = [...foodData];

      if (sortOption) {
        // Check if it's a regular or reverse alphabetical sort
        const isReverseSort = sortOption === "reverse_alphabetical";

        sortedItems.sort((a, b) => {
          const comparison = a.strMeal.localeCompare(b.strMeal);
          return isReverseSort ? -comparison : comparison;
        });
      }
      setFoodItems(sortedItems);
    }
  }, [foodData, currentMeal, sortOption, fetchStatus, mealBundleState]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openModal = (item) => {
    doFetchCurrentMeal(item.idMeal);
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // if (
  //   fetchStatus === FETCH_STATUS.IN_PROGRESS &&
  //   (mealBundleState === MEAL_BUNDLE_STATE.FETCH_MEAL_BY_LOCATION ||
  //     mealBundleState === MEAL_BUNDLE_STATE.FETCH_AREA_LIST)
  // ) {
  //   return (
  //     <div className="mt-4 w-full left-0 right-0 bottom-1/2 top-1/2 font-sans">
  //       <div className="flex flex-col justify-center items-center">
  //         <div className="border-t-4 border-blue-500 border-solid h-12 w-12 rounded-full animate-spin"></div>
  //         <p className="mt-2 font-bold">Preparing items for you...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="mt-4 flex flex-col mb-4 font-sans">
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {isMealPreparing ?
          // Skeleton loading effect
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
          )) : foodItems &&
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
                  <p className="mt-2 font-semibold">{item.strMeal}</p>
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
        <span className="">{`${currentPage} / ${Math.ceil(
          foodItems.length / pageSize
        )}`}</span>
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
