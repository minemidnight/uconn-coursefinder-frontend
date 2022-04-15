import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// loading page component for React.Suspense fallback
import LoadPage from "./components/LoadingPage";

// lazy load both App and 404 page, as we will only render one of these
const App = React.lazy(() => import("./App"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

// lazy load all pages
const Catalog = React.lazy(() => import("./pages/Catalog"));
const Course = React.lazy(() => import("./pages/Course"));

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoadPage page={<App />} />}>
					<Route index element={<LoadPage page={<Catalog />} />} />
					<Route path=":department-:number" element={<LoadPage page={<Course />} />} />
				</Route>
				<Route path="*" element={<LoadPage page={<NotFound />} />} />
			</Routes>
		</BrowserRouter>
	);
}
