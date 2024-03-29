import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ item, onClose, isLoading }) => {
  // Modal component to show individual meal details
  return (
    <div className="fixed top-0 left-0 z-10 w-full h-full flex items-center justify-center bg-black bg-opacity-50 font-sans">
      {/* The modal content */}
      <div className="bg-white p-8 rounded-md w-3/4 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 relative">
        {/* Close icon */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500"
        >
          <FontAwesomeIcon icon={faTimes} title="close-icon" />
        </button>

        {/* Skeleton or loader */}
        {isLoading || !item ? (
          <div className="cursor-pointer shadow-sm rounded-lg bg-gray-200 p-4">
            <h2 className="font-bold mb-4 bg-gray-300"></h2>
            <div className="w-full h-40 bg-gray-300 mb-4 rounded-lg"></div>
            <div className="pl-2 pb-2">
              <div className="w-3/4 h-4 bg-gray-300 mb-2"></div>
              <div className="w-3/4 h-4 bg-gray-300 mb-2"></div>
              <div className="w-3/4 h-4 bg-gray-300 mb-2"></div>
              <div className="flex items-center text-black-500">
                <div className="bg-aqua rounded-full p-1 mr-1">
                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                </div>
                <div className="w-8 h-4 bg-gray-300"></div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-bold mb-4">{item.strMeal}</h2>

            {/* Display the food item image */}
            <img
              src={item.strMealThumb}
              alt={item.strMeal}
              className="w-full h-60 object-cover rounded-lg mb-6"
              loading="lazy"
            />

            {/* Display additional details about the food item */}
            <div className="mb-6">
              <p className="text-gray-700 mb-2">
                <b className="font-bold">Category:</b> {item.strCategory}
              </p>
              <p className="text-gray-700 mb-2">
                <b className="font-bold">Area:</b> {item.strArea}
              </p>
              <p className="text-gray-700 h-20 overflow-auto">
                <b className="font-bold">Recipe:</b> {item.strInstructions}
              </p>
            </div>

            {/* Display ratings */}
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
        )}
      </div>
    </div>
  );
};

export default Modal;
