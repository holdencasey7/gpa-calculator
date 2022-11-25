import { useContext } from "react";
import { GPAContext, CourseArrayContext } from "./App.js";

function HypotheticalGPA() {
    const {gpaState} = useContext(GPAContext);

    const {courseArray} = useContext(CourseArrayContext); 

    const calculateHypotheticalUnweightedGPA = (courses, currentUnweightedGPA) => {
      let currentUnits = currentUnweightedGPA.currentUnweightedGPA * currentUnweightedGPA.currentCreditHours;
      let newUnits = 0;
      let newHours = 0;
      courses.forEach(course => {
        newUnits += course.course.grade * course.course.hours;
        newHours += course.course.hours;
      })
      let totalHours = parseInt(currentUnweightedGPA.currentCreditHours) + parseInt(newHours);
      let totalUnits = currentUnits + newUnits;
      if (totalHours === 0) {
        return 0;
      }
      return (totalUnits / totalHours);
    }

    const calculateHypotheticalHOPEGPA = (courses, currentHOPEGPA) => {
      let currentUnits = currentHOPEGPA.currentHOPEGPA * currentHOPEGPA.currentCreditHours;
      let newUnits = 0;
      let newHours = 0;
      courses.forEach(course => {
        newUnits += course.course.stemGrade * course.course.hours;
        newHours += course.course.hours;
      })
      let totalHours = parseInt(currentHOPEGPA.currentCreditHours) + parseInt(newHours);
      let totalUnits = currentUnits + newUnits;
      if (totalHours === 0) {
        return 0;
      }
      return (totalUnits / totalHours);
    }

    return (
      <>
        <section id="hyUnGPA">
            <h2>Hypothetical Unweighted GPA: </h2>
            <h3 className="BigGPA">
              {Math.round((calculateHypotheticalUnweightedGPA(courseArray, gpaState) + Number.EPSILON) * 100) / 100}
            </h3>
        </section>
        <section id="hyHoGPA">
            <h2>Hypothetical HOPE GPA: </h2>
            <h3 className="BigGPA">
              {Math.round((calculateHypotheticalHOPEGPA(courseArray, gpaState) + Number.EPSILON) * 100) / 100}
            </h3>
        </section>
      </>
    );
  }

  export default HypotheticalGPA;