// FoodItems.jsx
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import { connect } from "redux-bundler-react";
import { FETCH_STATUS } from "../api/constants";
import Modal from "./Modal";

const FoodItems = ({
  foodData,
  currentMeal,
  doFetchCurrentMeal,
  fetchStatus,
  sortOption,
}) => {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pageSize = 8;

  useEffect(() => {
    if (foodData) {
      setFoodItems(foodData?.meals);
    }
    if (currentMeal) {
      setSelectedItem(currentMeal.meals[0]);
      setIsModalOpen(!isModalOpen);
    }
    if (foodData) {
      let sortedItems = [...foodData?.meals];

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
  }, [foodData, currentMeal, sortOption]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openModal = (item) => {
    // Set the selected item and open the modal
    doFetchCurrentMeal(item.idMeal);
  };

  const closeModal = () => {
    // Close the modal by resetting the selected item
    setIsModalOpen(!isModalOpen);
  };

  if (fetchStatus === FETCH_STATUS.IN_PROGRESS) {
    return (
      <div className="mt-4 w-full left-0 right-0 top-1/2">
        <div className="flex flex-col justify-center items-center">
          <div className="border-t-4 border-blue-500 border-solid h-12 w-12 rounded-full animate-spin"></div>
          <p className="mt-2 font-bold">Preparing items for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-col mb-4">
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {/* Display food items in a grid */}
        {foodItems &&
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
                    <p className="font-semibold pb-1">
                      {(Math.random() * (5.0 - 3.0) + 3.0).toFixed(1)}
                    </p>
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
      {isModalOpen && <Modal item={selectedItem} onClose={closeModal} />}
    </div>
  );
};

export default connect(
  "selectFoodData",
  "selectFetchStatus",
  "doFetchCurrentMeal",
  "selectCurrentMeal",
  FoodItems
);
