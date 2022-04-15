import { configureStore } from "@reduxjs/toolkit";

import searchOptionsReducer from "./searchOptionsSlice";
import searchResultsReducer from "./searchResultsSlice";

export default configureStore({
	reducer: {
		searchOptions: searchOptionsReducer,
		searchResults: searchResultsReducer
	}
});
