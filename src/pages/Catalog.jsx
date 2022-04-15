import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setIsSearching, setResults } from "../store/searchResultsSlice";

import SearchBox from "../components/SearchBox";
import SearchResults from "../components/SearchResults";

import getCourses from "../helpers/api/getCourses";

export default function Catalog() {
	const dispatch = useDispatch();
	const isSearching = useSelector(state => state.searchResults.isSearching);
	const searchResults = useSelector(state => state.searchResults.results);

	const handleSubmit = async options => {
		const results = await getCourses(options);

		dispatch(setResults(results));
		dispatch(setIsSearching(false));
	};

	const goBackHandler = () => dispatch(setIsSearching(true));

	const searchBoxComponent = <SearchBox handleSubmit={handleSubmit} />;
	const searchResultsComponent = <SearchResults results={searchResults} goBackHandler={goBackHandler} />;

	return (
		<>
			{isSearching ? searchBoxComponent : searchResultsComponent}
		</>
	);
}
