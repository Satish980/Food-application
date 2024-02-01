import React, { useState } from "react";
import { Header, Filters, FoodItems, Footer } from "./components";

const App = () => {
  
  // State to keep track of sorting option
  const [sortOption, setSortOption] = useState("");

  // Function to handle sorting option change
  const handleSort = (option) => {
    setSortOption(option);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header component */}
      <Header />
      {/* Body */}
      <div className="flex flex-col flex-grow pl-10 pr-10 sm:px-20 md:px-20 lg:px-40">
        {/* Filters */}
        <Filters handleSort={handleSort} />
        {/* Food items component with the current sorting option */}
        <FoodItems sortOption={sortOption} />
      </div>
      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default App;
