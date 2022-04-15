import React from "react";

import { toggleTheme } from "../../helpers/themeSwitcher";

import { SunIcon, MoonIcon } from "@heroicons/react/outline";

export default function ThemeSwitcher() {
	return (
		<>
			<button type="button"
				onClick={toggleTheme}
				className="text-gray-200 hover:text-yellow-300 hidden dark:block"
				alt="Toggle theme to light"
			>
				<SunIcon className="mr-3 h-6" />
			</button>

			<button type="button"
				onClick={toggleTheme}
				className="text-gray-700 hover:text-gray-900 block dark:hidden"
				alt="Toggle theme to dark"
			>
				<MoonIcon className="mr-3 h-6" />
			</button>
		</>
	);
}
