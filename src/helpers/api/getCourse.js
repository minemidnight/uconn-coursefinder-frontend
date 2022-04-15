import { API_BASE_URL } from "../../config";

export default async function getCourse(campus, semester, subject, catalogNumber) {
	const url = new URL(API_BASE_URL);

	url.pathname = "/courses/";
	url.pathname += encodeURIComponent(`${subject}-${catalogNumber}`);

	url.searchParams.set("campus", campus);
	url.searchParams.set("semester", semester);

	const response = await fetch(url);
	const body = await response.json();

	return body;
}
