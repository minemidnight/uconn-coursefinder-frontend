import { API_BASE_URL } from "../../config";

export default async function getCourses(options) {
	const url = new URL(API_BASE_URL);

	url.pathname = "/courses";

	url.searchParams.set("campus", options.campus);
	url.searchParams.set("semester", options.semester);

	if(options.keywords.length) url.searchParams.set("keywords", options.keywords);

	url.searchParams.set("subjects", options.subjects);

	url.searchParams.set("quantative", options.qCourses);
	url.searchParams.set("environmental", options.eCourses);
	url.searchParams.set("writing", options.wCourses);
	url.searchParams.set("international", options.intCourses);
	url.searchParams.set("hasCompetency", !options.noCompetencies);
	url.searchParams.set("online", options.onlineCourses);
	url.searchParams.set("inPerson", options.inPersonCourses);
	url.searchParams.set("ca1", options.ca4Courses);
	url.searchParams.set("ca2", options.ca2Courses);
	url.searchParams.set("ca3", options.ca3Courses);
	url.searchParams.set("ca4", options.ca4Courses);
	url.searchParams.set("hasContentArea", !options.noCa);

	const response = await fetch(url);
	const body = await response.json();

	return body;
}
