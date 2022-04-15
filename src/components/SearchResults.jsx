import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { ArrowLeftIcon } from "@heroicons/react/outline";

ClassCard.propTypes = { course: PropTypes.object };
function ClassCard({ course }) {
	const navigate = useNavigate();

	const courseKey = `${course.subject}-${course.catalogNumber}`;
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

	return (
		<div>
			<div onClick={() => navigate(courseKey)} className="px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 transition duration-300 cursor-pointer hover:scale-105 hover:drop-shadow-2xl hover:bg-neutral-200 dark:hover:bg-gray-700">
				<p className="text-sm text-gray-600 dark:text-gray-400">{course.subjectLong}</p>
				<p className="text-2xl font-bold text-gray-700 dark:text-white">{course.subject} {course.catalogNumber}</p>
				<p className="text-xl font-semibold text-gray-700 dark:text-white">{course.title}</p>
				<p className="mt-2 text-gray-600 dark:text-gray-300">Content Areas: {course.hasContentArea.length ? contentAreas.join(", ") : "None"}</p>
				<p className="mt-2 text-gray-600 dark:text-gray-300">Competencies: {competencies.length ? competencies.join(", ") : "None"}</p>

				<div className="flex justify-end mt-2">
					<span className="text-gray-800 dark:text-gray-200">{course.minCredits === course.maxCredits ? course.minCredits : `${course.minCredits} - ${course.maxCredits}`} credits</span>
				</div>
			</div>
		</div>
	);
}

BackButton.propTypes = { handleClick: PropTypes.func.isRequired };
function BackButton(props) {
	return (
		<button onClick={props.handleClick} className="flex items-center px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
			<ArrowLeftIcon className="w-5 h-5 mx-1" />
			<span className="mx-1">Search</span>
		</button>
	);
}

SearchResults.propTypes = {
	goBackHandler: PropTypes.func.isRequired,
	results: PropTypes.arrayOf(PropTypes.object).isRequired
};
export default function SearchResults(props) {
	return (
		<div className="flex flex-col gap-3 max-w-2xl mx-auto">
			<div>
				<BackButton handleClick={props.goBackHandler} />
			</div>
			{
				props.results.map(result => <ClassCard key={`${result.subject}-${result.catalogNumber}`} course={result} />)
			}
		</div>
	);
}
