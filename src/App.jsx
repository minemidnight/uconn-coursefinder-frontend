import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";

export default function App() {
	return (
		<div className="transition-colors duration-300
				flex flex-col antialiased min-h-screen
				bg-neutral-50 dark:bg-slate-800"
		>
			<Navbar />
			<div className="my-8 mx-4">
				<Outlet />
			</div>
		</div>
	);
}
