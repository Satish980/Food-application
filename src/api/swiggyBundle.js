import {
  FETCH_STATUS,
  FILTER_API,
  LIST_API,
  LOOKUP_API,
  SEARCH_API,
} from "./constants";

export default {
  name: "swiggy",
  reducer: (state = [], action) => {
    switch (action.type) {
      case "FETCH_FOOD_REQUEST":
        return {
          ...state,
          fetchStatus: FETCH_STATUS.IN_PROGRESS,
        };
      case "FETCH_FOOD_SUCCESS":
        return {
          ...state,
          fetchStatus: FETCH_STATUS.SUCCESS,
          foodData: action.response,
          currentMeal: null,
        };
      case "FETCH_FOOD_FAILED":
        return {
          ...state,
          fetchStatus: FETCH_STATUS.FAILED,
          error: action.error,
        };
      case "FETCH_AREA_LIST_REQUEST":
        return {
          ...state,
          fetchStatus: FETCH_STATUS.IN_PROGRESS,
        };
      case "FETCH_AREA_LIST_SUCCESS":
        return {
          ...state,
          areaList: action.response,
          fetchStatus: FETCH_STATUS.SUCCESS,
        };
      case "FETCH_AREA_LIST_FAILED":
        return {
          ...state,
          fetchStatus: FETCH_STATUS.FAILED,
          error: action.error,
        };
      case "FETCH_CURRENT_MEAL_REQUEST":
        return {
          ...state,
          fetchStatus: FETCH_STATUS.IN_PROGRESS,
        };
      case "FETCH_CURRENT_MEAL_SUCCESS":
        return {
          ...state,
          currentMeal: action.response,
          fetchStatus: FETCH_STATUS.SUCCESS,
        };
      case "FETCH_CURRENT_MEAL_FAILED":
        return {
          ...state,
          fetchStatus: FETCH_STATUS.FAILED,
          error: action.error,
        };
    }
    return state;
  },
  doFetchFoodByArea:
    (location) =>
    ({ dispatch }) => {
      dispatch({ type: "FETCH_FOOD_REQUEST" });
      const fetchData = async () => {
        try {
          const uri = `${FILTER_API}?a=${location}`;
          const response = await fetch(uri);
          const data = await response.json();
          dispatch({ type: "FETCH_FOOD_SUCCESS", response: data });
        } catch (error) {
          dispatch({ type: "FETCH_FOOD_FAILED", error: error });
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    },
  doFetchAreaList:
    () =>
    ({ dispatch }) => {
      dispatch({ type: "FETCH_AREA_LIST_REQUEST" });
      const fetchAreaList = async () => {
        try {
          const uri = `${LIST_API}?a=list`;
          const response = await fetch(uri);
          const data = await response.json();
          dispatch({ type: "FETCH_AREA_LIST_SUCCESS", response: data });
        } catch (error) {
          dispatch({ type: "FETCH_AREA_LIST_FAILED" });
          console.error("Error fetching data: ", error);
        }
      };
      fetchAreaList();
    },
  doFetchCurrentMeal:
    (mealId) =>
    ({ dispatch }) => {
      dispatch({ type: "FETCH_CURRENT_MEAL_REQUEST " });
      const fetchFood = async () => {
        try {
          const uri = `${LOOKUP_API}?i=${mealId}`;
          const response = await fetch(uri);
          const data = await response.json();
          dispatch({ type: "FETCH_CURRENT_MEAL_SUCCESS", response: data });
        } catch (error) {
          dispatch({ type: "FETCH_CURRENT_MEAL_FAILED" });
          console.error("Error fetching data: ", error);
        }
      };
      fetchFood();
    },
  // doSearchFoodByName: (mealName) => {
  //   ({ dispatch }) => {
  //     dispatch({ type: "FETCH_FOOD_REQUEST" });
  //     const fetchData = async () => {
  //       try {
  //         const uri = `${SEARCH_API}?s=${mea}`;
  //         const response = await fetch(uri);
  //         const data = await response.json();
  //         dispatch({ type: "FETCH_FOOD_SUCCESS", response: data });
  //       } catch (error) {
  //         dispatch({ type: "FETCH_FOOD_FAILED", error: error });
  //         console.error("Error fetching data:", error);
  //       }
  //     };
  //     fetchData();
  //   }
  // },
  selectFoodData: (state) => state.swiggy.foodData,
  selectAreaList: (state) => state.swiggy.areaList,
  selectFetchStatus: (state) => state.swiggy.fetchStatus,
  selectCurrentMeal: (state) => state.swiggy.currentMeal,
  init: (store) => {
    if (!store.selectFoodData()) {
      store.doFetchFoodByArea("Indian");
    }
    if (!store.selectAreaList()) {
      store.doFetchAreaList();
    }
  },
};
