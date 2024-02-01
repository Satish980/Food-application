// App.jsx
import React, { useState } from "react";
import { Header, Filters, FoodItems, Footer } from "./components";

const App = () => {
  const [sortOption, setSortOption] = useState(""); // State to keep track of sorting option

  const handleSort = (option) => {
    setSortOption(option);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col flex-grow pl-10 pr-10 sm:px-20 md:px-20 lg:px-40">
        <Filters handleSort={handleSort} />
        <FoodItems sortOption={sortOption} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
