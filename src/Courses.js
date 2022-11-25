import {useReducer, useContext, useState} from "react";
import { CourseArrayContext } from "./App.js";

function Courses() {
    const Course = class {
        constructor(name = "Unnamed", hours = 0, grade = 0.00, stem = false) {
            this.name = name;
            this.hours = hours;
            this.grade = grade;
            this.stem = stem;
            this.stemGrade = (stem && grade < 4) ? (this.grade + .5) : this.grade;
        }
    }

    const {courseArray, setCourseArray} = useContext(CourseArrayContext);
    
    const [id, setId] = useReducer((id) => id + 1, 0);

    const [tempStem, setTempStem] = useState(false);

    const handleAddClass = event => {
        event.preventDefault();

        const newCourse = new Course(event.target.coursename.value,
            parseInt(event.target.coursehours.value),
            parseFloat(event.target.coursegrade.value),
            tempStem);

        setCourseArray([
            ...courseArray,
            { id: id, course: newCourse}
        ])

        event.target.coursename.value = null;
        event.target.coursehours.value = null;
        event.target.coursegrade.value = 4.0;
        event.target.coursestem.checked = false;
        setTempStem(false);

        setId();
    };

    const handleRemove = (event, idToRemove) => {
        event.preventDefault();

        let tempArr = courseArray;
        tempArr = tempArr.filter(item => item.id !== idToRemove);
        setCourseArray(
            tempArr
        );
    };

    const gradeToLetter = (grade) => {
        switch (grade) {
            case 4.0:
                return "A";
            case 3.0:
                return "B";
            case 2.0:
                return "C";
            case 1.0:
                return "D";
            case 0.0:
                return "F";
            default:
                return "Error";
        }
    }

    return (
        <div className="Courses" id="courses">
             <div className="AddCourse">
                <form className="AddCourseForm" onSubmit={handleAddClass}>
                    <label htmlFor="coursename">Course Name: </label>
                    <input
                        type="text"
                        id="coursename"
                        name="coursename"
                        placeholder="Course..."
                    />
                    <label htmlFor="coursegrade"> Grade: </label>
                    <select id="coursegrade" name="coursegrade">
                        <option value={4.0}>A</option>
                        <option value={3.0}>B</option>
                        <option value={2.0}>C</option>
                        <option value={1.0}>D</option>
                        <option value={0.0}>F</option>
                    </select>
                    <label htmlFor="coursehours"> Hours: </label>
                    <input
                        type="number"
                        id="coursehours"
                        name="coursehours"
                        placeholder="Hours..."
                    />
                    <label htmlFor="coursestem"> Stem?</label>
                    <input
                        type="checkbox"
                        id="coursestem"
                        name="coursestem"
                        value={tempStem}
                        onChange={(e) => setTempStem(e.target.checked)}
                    />
                    <input
                        type="submit"
                        name="addClassButton"
                        value="Add Course"
                    />
                </form>
            </div>
            <div className="CourseList" id="course-list">
                <table className="course-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Grade</th>
                            <th>Hours</th>
                            <th>Stem?</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseArray.map(currCourse => (
                            <tr key={currCourse.id}>
                                <td>{currCourse.course.name}</td>
                                <td>{gradeToLetter(currCourse.course.grade)}</td>
                                <td>{currCourse.course.hours}</td>
                                <td>{currCourse.course.stem ? "Yes" : "No"}</td>
                                <td><button onClick={(e) => handleRemove(e, currCourse.id)}>Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Courses;