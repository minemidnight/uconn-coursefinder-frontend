// constants because... why not
const LOCAL_STORAGE_ITEM_NAME = "theme";
const LIGHT_THEME_VALUE = "light";
const DARK_THEME_VALUE = "dark";

const DARK_THEME_CLASS = "dark";

function isDarkTheme() {
	const browserMediaTheme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

	if(LOCAL_STORAGE_ITEM_NAME in localStorage) return localStorage.getItem(LOCAL_STORAGE_ITEM_NAME) === DARK_THEME_VALUE.toString();
	else return browserMediaTheme;
}

function setThemeDark() {
	document.documentElement.classList.add(DARK_THEME_CLASS);
}

function setThemeLight() {
	document.documentElement.classList.remove(DARK_THEME_CLASS);
}

function updateTheme() {
	const isDark = isDarkTheme();

	if(isDark) setThemeDark();
	else setThemeLight();
}

function toggleTheme() {
	const newTheme = isDarkTheme() ? LIGHT_THEME_VALUE : DARK_THEME_VALUE;

	localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, newTheme);
	updateTheme();
}

export { updateTheme, toggleTheme };
