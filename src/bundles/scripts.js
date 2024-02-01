// function takes response object and returns meal data
const setMealData = (response) => {
  const meals = response?.meals;

  const foodData = meals.map((food) => {
    return {
      ...food,
      rating: (Math.random() * (5.0 - 3.0) + 3.0).toFixed(1),
    };
  });
  return foodData;
};

// function takes response object and return area list
const setAreaList = (response) => {
  const areaList = response.meals.map((area) => area.strArea);
  return areaList;
};

export { setMealData, setAreaList };
