import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import { ArrowLeftIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import Loading from "../components/Loading";

import getCourse from "../helpers/api/getCourse";

function BackButton() {
	const navigate = useNavigate();

	return (
		<button onClick={() => navigate(-1)} className="flex items-center px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
			<ArrowLeftIcon className="w-5 h-5 mx-1" />
			<span className="mx-1">Search Results</span>
		</button>
	);
}

CourseCard.propTypes = { course: PropTypes.object };
function CourseCard({ course }) {
	const contentAreas = [];
	const competencies = [];

	if(course.ca1) contentAreas.push("CA1: Arts and Humanities");
	if(course.ca2) contentAreas.push("CA2: Social Sciences");
	if(course.ca3) contentAreas.push("CA3: Science and Technology");
	if(course.ca4) contentAreas.push("CA4: Diversity and Multiculturalism");

	if(course.environmental) competencies.push("Environmental (E)");
	if(course.international) competencies.push("International (INT)");
	if(course.quantative) competencies.push("Quantative (Q)");
	if(course.writing) competencies.push("Writing (W)");

	const classSections = [];
	const labSections = [];
	const discussionSections = [];

	for(const section of course.sections) {
		if(section.section.endsWith("L")) labSections.push(section);
		else if(section.section.endsWith("D")) discussionSections.push(section);
		else classSections.push(section);
	}

	return <div className="px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
		<h1 className="text-3xl font-bold text-gray-700 dark:text-white mb-0.5">{course.subject} {course.catalogNumber}</h1>
		<h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-100">{course.title}</h2>
		<h3 className="text-l font-light text-gray-700 dark:text-gray-100 mb-4">{course.minCredits === course.maxCredits ? course.minCredits : `${course.minCredits} - ${course.maxCredits}`} credits</h3>


		<p className="text-gray-600 dark:text-gray-300 mb-2">Content Areas: {course.hasContentArea.length ? contentAreas.join(", ") : "None"}</p>
		<p className="text-gray-600 dark:text-gray-300 mb-8">Competencies: {competencies.length ? competencies.join(", ") : "None"}</p>

		<div className="flex justify-start mb-1">
			<span className="text-gray-800 dark:text-gray-200">{classSections.length} lecture sections ({labSections.length} labs, {discussionSections.length} discussions)</span>
		</div>


		<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-2 py-3">Section</th>
						<th scope="col" className="px-2 py-3">Times</th>
						<th scope="col" className="px-2 py-3">Location</th>
						<th scope="col" className="px-2 py-3">Enrolled</th>
						<th scope="col" className="px-2 py-3">Professor</th>
						<th scope="col" className="px-2 py-3">Professor Ratings</th>
					</tr>
				</thead>
				<tbody>
					{
						classSections.map(section => <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={section.section}>
							<th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
								{section.section}
							</th>
							<td className="px-2 py-4">
								<p className="mb-0.5">{section.days.join(" ")}</p>
								<p className="mb-0.5">{section.startTime.replace(":00 ", " ")} - {section.endTime.replace(":00 ", " ")}</p>
							</td>
							<td className="px-2 py-4">
								{section.online ? "Online" : section.location}
							</td>
							<td className="px-2 py-4">
								<p className="mb-0.5">{section.enrolled}/{section.capacity}</p>
								<p className="mb-0.5">Waitlist: {section.waitlisted}/{section.waitlistCapacity}</p>
							</td>
							<td className="px-2 py-4">{section.professors.join(", ")}</td>
							<td className="px-2 py-4">
								{"id" in section.rateMyProfessor[0] ?
									<>
										<a href={`https://www.ratemyprofessors.com/ShowRatings.jsp?tid=${section.rateMyProfessor[0].id}`} className="mb-0.5 hover:underline flex flex-row items-center" target="_blank" rel="noreferrer">
											{section.rateMyProfessor[0].ratingCount} ratings
											<ExternalLinkIcon className="w-4 h-4 ml-1" />
										</a>
										<p className="mb-0.5">{section.rateMyProfessor[0].averageRating}/5.0 average rating</p>
									</> :
									"No ratings"
								}

							</td>
						</tr>)
					}
				</tbody>
			</table>
		</div>
	</div>;
}

export default function Course() {
	const campus = useSelector(state => state.searchOptions.campus);
	const semester = useSelector(state => state.searchOptions.semester);

	const params = useParams();
	const [course, setCourse] = useState(null);

	useEffect(() => {
		async function fetchCourse() {
			const response = await getCourse(campus, semester, params.department.toUpperCase(), params.number);

			setCourse(response);
		}

		fetchCourse();
	}, []);

	const loading =
		<div className="flex justify-center my-4">
			<Loading />
		</div>;

	return (
		<div className="flex flex-col gap-3 max-w-4xl mx-auto">
			<div>
				<BackButton />
			</div>

			<div>
				{course ? <CourseCard course={course} /> : loading}
			</div>
		</div>
	);
}
