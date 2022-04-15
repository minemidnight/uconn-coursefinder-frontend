import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import getCampuses from "../helpers/api/getCampuses";
import getSemesters from "../helpers/api/getSemesters";
import getSubjects from "../helpers/api/getSubjects";

const fetchCampuses = createAsyncThunk("searchOptions/fetchCampuses", async thunkAPI => {
	const response = await getCampuses();

	return response;
});

const fetchSemesters = createAsyncThunk("searchOptions/fetchSemesters", async thunkAPI => {
	const response = await getSemesters();

	return response;
});

const fetchSubjects = createAsyncThunk("searchOptions/fetchSubjects", async thunkAPI => {
	const response = await getSubjects();

	return response;
});

const DEFAULT_VALUES = {
	keywords: "",
	campus: state => (state.campusOptions.includes("Storrs") ? "Storrs" : state.campusOptions[0]),
	semester: state => state.semesterOptions[0],
	subjects: state => [state.subjectOptions[0]],
	qCourses: true,
	wCourses: true,
	eCourses: true,
	intCourses: true,
	onlineCourses: true,
	inPersonCourses: true,
	ca1Courses: true,
	ca2Courses: true,
	ca3Courses: true,
	ca4Courses: true,
	noCa: true,
	noCompetencies: true
};

const slice = createSlice({
	name: "searchOptions",
	initialState: {
		campusOptions: null,
		semesterOptions: null,
		subjectOptions: null,

		keywords: DEFAULT_VALUES.keywords,

		campus: "",
		semester: "",
		subjects: [],

		qCourses: DEFAULT_VALUES.qCourses,
		wCourses: DEFAULT_VALUES.wCourses,
		eCourses: DEFAULT_VALUES.eCourses,
		intCourses: DEFAULT_VALUES.intCourses,
		onlineCourses: DEFAULT_VALUES.onlineCourses,
		inPersonCourses: DEFAULT_VALUES.inPersonCourses,
		ca1Courses: DEFAULT_VALUES.ca1Courses,
		ca2Courses: DEFAULT_VALUES.ca2Courses,
		ca3Courses: DEFAULT_VALUES.ca3Courses,
		ca4Courses: DEFAULT_VALUES.ca4Courses,

		noCa: DEFAULT_VALUES.noCa,
		noCompetencies: DEFAULT_VALUES.noCompetencies
	},
	reducers: {
		resetStore(state) {
			state.keywords = DEFAULT_VALUES.keywords;

			state.campus = DEFAULT_VALUES.campus(state);
			state.semester = DEFAULT_VALUES.semester(state);
			state.subjects = DEFAULT_VALUES.subjects(state);

			state.qCourses = DEFAULT_VALUES.qCourses;
			state.wCourses = DEFAULT_VALUES.wCourses;
			state.eCourses = DEFAULT_VALUES.eCourses;
			state.intCourses = DEFAULT_VALUES.intCourses;
			state.onlineCourses = DEFAULT_VALUES.onlineCourses;
			state.inPersonCourses = DEFAULT_VALUES.inPersonCourses;
			state.ca1Courses = DEFAULT_VALUES.ca1Courses;
			state.ca2Courses = DEFAULT_VALUES.ca2Courses;
			state.ca3Courses = DEFAULT_VALUES.ca3Courses;
			state.ca4Courses = DEFAULT_VALUES.ca4Courses;

			state.noCa = DEFAULT_VALUES.noCa;
			state.noCompetencies = DEFAULT_VALUES.noCompetencies;
		},
		setKeywords(state, action) {
			state.keywords = action.payload;
		},
		setCampus(state, action) {
			state.campus = action.payload;
		},
		setSemester(state, action) {
			state.semester = action.payload;
		},
		setSubjects(state, action) {
			state.subjects = action.payload;
		},
		setQCourses(state, action) {
			state.qCourses = action.payload;
		},
		setWCourses(state, action) {
			state.wCourses = action.payload;
		},
		setECourses(state, action) {
			state.eCourses = action.payload;
		},
		setIntCourses(state, action) {
			state.intCourses = action.payload;
		},
		setOnlineCourses(state, action) {
			state.onlineCourses = action.payload;
		},
		setInPersonCourses(state, action) {
			state.inPersonCourses = action.payload;
		},
		setCA1Courses(state, action) {
			state.ca1Courses = action.payload;
		},
		setCA2Courses(state, action) {
			state.ca2Courses = action.payload;
		},
		setCA3Courses(state, action) {
			state.ca3Courses = action.payload;
		},
		setCA4Courses(state, action) {
			state.ca4Courses = action.payload;
		},
		setNoCa(state, action) {
			state.noCa = action.payload;
		},
		setNoCompetencies(state, action) {
			state.noCompetencies = action.payload;
		}
	},
	extraReducers(builder) {
		builder.addCase(fetchCampuses.fulfilled, (state, action) => {
			state.campusOptions = action.payload;
			state.campus = DEFAULT_VALUES.campus(state);
		});

		builder.addCase(fetchSemesters.fulfilled, (state, action) => {
			state.semesterOptions = action.payload;
			state.semester = DEFAULT_VALUES.semester(state);
		});

		builder.addCase(fetchSubjects.fulfilled, (state, action) => {
			state.subjectOptions = action.payload;
			state.subjects = DEFAULT_VALUES.subjects(state);
		});
	}
});

export const {
	resetStore,
	setKeywords,
	setCampus, setSemester, setSubjects,
	setQCourses, setWCourses, setECourses, setIntCourses,
	setOnlineCourses, setInPersonCourses,
	setCA1Courses, setCA2Courses, setCA3Courses, setCA4Courses,
	setNoCa, setNoCompetencies
} = slice.actions;
export { fetchCampuses, fetchSemesters, fetchSubjects };
export default slice.reducer;
