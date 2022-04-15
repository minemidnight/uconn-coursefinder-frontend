import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
	name: "searchResults",
	initialState: {
		isSearching: true,
		results: []
	},
	reducers: {
		setIsSearching(state, action) {
			state.isSearching = action.payload;
		},
		setResults(state, action) {
			state.results = action.payload;
		}
	}
});

export const { setIsSearching, setResults } = slice.actions;
export default slice.reducer;
