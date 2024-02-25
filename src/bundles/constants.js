// API End points
const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

const FILTER_API = `${API_BASE_URL}/filter.php`;
const LIST_API = `${API_BASE_URL}/list.php`;
const LOOKUP_API = `${API_BASE_URL}/lookup.php`
const SEARCH_API = `${API_BASE_URL}/search.php`

// fetch status of meal bundle
const FETCH_STATUS = {
  IDLE: 0,
  IN_PROGRESS: 1,
  SUCCESS: 2,
  FAILED: 3,
};

// state of meal bundle
const MEAL_BUNDLE_STATE = {
  FETCH_MEAL_BY_LOCATION: 0,
  FETCH_CURRENT_MEAL: 1,
  FETCH_AREA_LIST: 2,
  FETCH_SEARCH_RESULTS: 3
}

export { FILTER_API, FETCH_STATUS, LIST_API, LOOKUP_API, SEARCH_API, MEAL_BUNDLE_STATE };
