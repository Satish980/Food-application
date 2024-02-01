import {
  FETCH_STATUS,
  FILTER_API,
  LIST_API,
  LOOKUP_API,
  // SEARCH_API,
  MEAL_BUNDLE_STATE,
} from "./constants";
import { setAreaList, setMealData } from "./scripts";

export default {
  name: "mealBundle",
  reducer: (state = [], action) => {
    switch (action.type) {
      case "FETCH_FOOD_REQUEST":
        return {
          ...state,
          mealBundleState: MEAL_BUNDLE_STATE.FETCH_MEAL_BY_LOCATION,
          fetchStatus: FETCH_STATUS.IN_PROGRESS,
        };
      case "FETCH_FOOD_SUCCESS":
        return {
          ...state,
          fetchStatus: FETCH_STATUS.SUCCESS,
          foodData: setMealData(action.response),
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
          mealBundleState: MEAL_BUNDLE_STATE.FETCH_AREA_LIST,
          fetchStatus: FETCH_STATUS.IN_PROGRESS,
        };
      case "FETCH_AREA_LIST_SUCCESS":
        return {
          ...state,
          areaList: setAreaList(action.response),
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
          mealBundleState: MEAL_BUNDLE_STATE.FETCH_CURRENT_MEAL,
          fetchStatus: FETCH_STATUS.IN_PROGRESS,
        };
      case "FETCH_CURRENT_MEAL_SUCCESS":
        return {
          ...state,
          currentMeal: setMealData(action.response),
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
      dispatch({ type: "FETCH_CURRENT_MEAL_REQUEST" });
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
  selectFoodData: (state) => state.mealBundle.foodData,
  selectAreaList: (state) => state.mealBundle.areaList,
  selectFetchStatus: (state) => state.mealBundle.fetchStatus,
  selectCurrentMeal: (state) => state.mealBundle.currentMeal,
  selectMealBundleState: (state) => state.mealBundle.mealBundleState,
  init: (store) => {
    if (!store.selectFoodData()) {
      store.doFetchFoodByArea("Indian");
    }
    if (!store.selectAreaList()) {
      store.doFetchAreaList();
    }
  },
};
