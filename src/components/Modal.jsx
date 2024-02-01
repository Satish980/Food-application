import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ item, onClose, isLoading }) => {
  return (
    <div className="fixed top-0 left-0 z-10 w-full h-full flex items-center justify-center bg-black bg-opacity-50 font-sans">
      {/* The modal content */}
      <div className="bg-white p-8 rounded-md w-3/4 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 relative">
        {/* Close icon */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* Loader */}
        {isLoading || !item ? (
          <div className="animate-pulse bg-gray-300 h-60 w-full object-cover rounded-lg mb-6"></div>
        ) : (
          <div>
            <h2 className="text-3xl font-bold mb-4">{item.strMeal}</h2>

            {/* Display the food item image */}
            <img
              src={item.strMealThumb}
              alt={item.strMeal}
              className="w-full h-60 object-cover rounded-lg mb-6"
            />

            {/* Display additional details about the food item */}
            <div className="mb-6">
              <p className="text-gray-700 mb-2"><b className="font-bold">Category:</b> {item.strCategory}</p>
              <p className="text-gray-700 mb-2"><b className="font-bold">Area:</b> {item.strArea}</p>
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
              <p className="font-semibold pb-1">
                {item.rating}
              </p>
            </div>
          </div>
        )}
        {/* 
        <button onClick={onClose} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
          Close
        </button> */}
      </div>
    </div>
  );
};

export default Modal;