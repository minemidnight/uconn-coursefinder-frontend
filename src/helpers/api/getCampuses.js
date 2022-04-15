import { API_BASE_URL } from "../../config";

export default async function getCampuses() {
	const url = new URL(API_BASE_URL);

	url.pathname = "/campuses";

	const response = await fetch(url);
	const body = await response.json();

	return body;
}
