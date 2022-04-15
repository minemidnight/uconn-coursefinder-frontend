import { API_BASE_URL } from "../../config";

export default async function getSubjects() {
	const url = new URL(API_BASE_URL);

	url.pathname = "/subjects";

	const response = await fetch(url);
	const body = await response.json();

	body.unshift("Any");

	return body;
}
