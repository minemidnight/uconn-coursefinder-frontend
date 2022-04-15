import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import Loading from "./Loading";

import {
	resetStore,
	fetchCampuses, fetchSemesters, fetchSubjects,
	setKeywords,
	setCampus, setSemester, setSubjects,
	setQCourses, setWCourses, setECourses, setIntCourses,
	setOnlineCourses, setInPersonCourses,
	setCA1Courses, setCA2Courses, setCA3Courses, setCA4Courses,
	setNoCa, setNoCompetencies
} from "../store/searchOptionsSlice";

Checkbox.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string.isRequired,
	checked: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired
};
function Checkbox(props) {
	const id = props.id ? props.id : props.label.toLowerCase().replace(/ /g, "-");

	return (
		<div className="flex items-start mb-2">
			<div className="flex items-center h-5">
				<input
					id={id}
					aria-describedby={id}
					checked={props.checked}
					onChange={event => props.onChange(event.target.checked)}
					type="checkbox"
					className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
					required
				/>
			</div>
			<div className="ml-3 text-sm">
				<label htmlFor={id} className="font-medium text-gray-900 dark:text-gray-300">{props.label}</label>
			</div>
		</div>
	);
}

TextInput.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired
};
function TextInput(props) {
	const id = props.id ? props.id : props.label.toLowerCase().replace(/ /g, "-");

	return (
		<div className="relative z-0 mb-2 w-full group">
			<input type="text"
				name={id}
				value={props.value}
				onChange={event => props.onChange(event.target.value)}
				className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
				placeholder=" "
			/>
			<label htmlFor={id}
				className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
			>
				{props.label}
			</label>
		</div>
	);
}

SelectInput.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(PropTypes.string).isRequired,
	multiple: PropTypes.bool,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired
};
SelectInput.defaultValues = { multiple: false };
function SelectInput(props) {
	const id = props.id ? props.id : props.label.toLowerCase().replace(/ /g, "-");

	return (
		<div className="mb-2">
			<label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{props.label}</label>
			<select
				id={id}
				value={props.value}
				onChange={event => {
					if(props.multiple) {
						const value = Array.from(event.target.options)
							.filter(option => option.selected)
							.map(option => option.value || option.text);

						props.onChange(value);
					} else {
						props.onChange(event.target.value);
					}
				}}
				multiple={props.multiple}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			>
				{props.options.map((option, i) => <option key={i}>{option}</option>)}
			</select>
		</div>
	);
}

SearchBox.propTypes = { handleSubmit: PropTypes.func.isRequired };
export default function SearchBox(props) {
	const dispatch = useDispatch();

	// select options
	const campusOptions = useSelector(state => state.searchOptions.campusOptions);
	const semesterOptions = useSelector(state => state.searchOptions.semesterOptions);
	const subjectOptions = useSelector(state => state.searchOptions.subjectOptions);

	// text inputs
	const keywords = useSelector(state => state.searchOptions.keywords);

	// selects
	const campus = useSelector(state => state.searchOptions.campus);
	const semester = useSelector(state => state.searchOptions.semester);
	const subjects = useSelector(state => state.searchOptions.subjects);

	// checkboxes
	const qCourses = useSelector(state => state.searchOptions.qCourses);
	const wCourses = useSelector(state => state.searchOptions.wCourses);
	const eCourses = useSelector(state => state.searchOptions.eCourses);
	const intCourses = useSelector(state => state.searchOptions.intCourses);
	const onlineCourses = useSelector(state => state.searchOptions.onlineCourses);
	const inPersonCourses = useSelector(state => state.searchOptions.inPersonCourses);
	const ca1Courses = useSelector(state => state.searchOptions.ca1Courses);
	const ca2Courses = useSelector(state => state.searchOptions.ca2Courses);
	const ca3Courses = useSelector(state => state.searchOptions.ca3Courses);
	const ca4Courses = useSelector(state => state.searchOptions.ca4Courses);
	const noCa = useSelector(state => state.searchOptions.noCa);
	const noCompetencies = useSelector(state => state.searchOptions.noCompetencies);

	// effect to get campuses, semesters & subjects
	useEffect(() => {
		// only get the options once
		if(campusOptions && semesterOptions && subjectOptions) return;

		dispatch(fetchCampuses());
		dispatch(fetchSemesters());
		dispatch(fetchSubjects());
	}, []);

	const handleReset = () => dispatch(resetStore());

	const handleSubmit = event => {
		event.preventDefault();

		props.handleSubmit({
			keywords,

			campus,
			semester,
			subjects,

			qCourses,
			wCourses,
			eCourses,
			intCourses,
			onlineCourses,
			inPersonCourses,
			ca1Courses,
			ca2Courses,
			ca3Courses,
			ca4Courses,

			noCa,
			noCompetencies
		});
	};

	const getForm = () => <form>
		<div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
			<TextInput id="keywords" label="Keywords (course #/title)" onChange={value => dispatch(setKeywords(value))} value={keywords} />

			<SelectInput label="Campus" onChange={value => dispatch(setCampus(value))} value={campus} options={campusOptions} />
			<SelectInput label="Semester" onChange={value => dispatch(setSemester(value))} value={semester} options={semesterOptions} />
			<SelectInput label="Subject" onChange={value => dispatch(setSubjects(value))} value={subjects} options={subjectOptions} multiple={true} />

			<div className="col-span-1 sm:col-span-2">
				<p className="text-gray-700 dark:text-gray-200 mb-2">Course Criteria</p>
				<div className="grid grid-cols-1 sm:grid-cols-2">
					<Checkbox label="Quantative (Q)" id="quantative" checked={qCourses} onChange={value => dispatch(setQCourses(value))} />
					<Checkbox label="Writing (W)" id="writing" checked={wCourses} onChange={value => dispatch(setWCourses(value))} />
					<Checkbox label="Environmental (E)" id="environmental" checked={eCourses} onChange={value => dispatch(setECourses(value))} />
					<Checkbox label="International (INT)" id="international" checked={intCourses} onChange={value => dispatch(setIntCourses(value))}/>
					<Checkbox label="No Competencies" id="no-competencies" checked={noCompetencies} onChange={value => dispatch(setNoCompetencies(value))} />
					<Checkbox label="No Content Areas" checked={noCa} onChange={value => dispatch(setNoCa(value))} />
					<Checkbox label="CA1" checked={ca1Courses} onChange={value => dispatch(setCA1Courses(value))}/>
					<Checkbox label="CA2" checked={ca2Courses} onChange={value => dispatch(setCA2Courses(value))}/>
					<Checkbox label="CA3" checked={ca3Courses} onChange={value => dispatch(setCA3Courses(value))}/>
					<Checkbox label="CA4" checked={ca4Courses} onChange={value => dispatch(setCA4Courses(value))} />
					<Checkbox label="Online" checked={onlineCourses} onChange={value => dispatch(setOnlineCourses(value))}/>
					<Checkbox label="In Person" checked={inPersonCourses} onChange={value => dispatch(setInPersonCourses(value))}/>
				</div>
			</div>
		</div>

		<div className="flex justify-end mt-6">
			<button onClick={handleReset} className="px-6 py-2 mr-6 leading-5 text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Reset</button>
			<button onClick={handleSubmit} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Search</button>
		</div>
	</form>;

	const loading =
		<div className="flex justify-center my-4">
			<Loading />
		</div>;

	return (
		<section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
			<h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Search settings</h2>

			{campusOptions && semesterOptions && subjectOptions ? getForm() : loading}
		</section>
	);
}
