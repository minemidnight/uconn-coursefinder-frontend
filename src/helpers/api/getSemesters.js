import { API_BASE_URL } from "../../config";

export default async function getSemesters() {
	const url = new URL(API_BASE_URL);

	url.pathname = "/semesters";

	const response = await fetch(url);
	const body = await response.json();

	return body;
}
