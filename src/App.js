import './App.css';
import CurrentGPA from './CurrentGPA.js';
import HypotheticalGPA from './HypotheticalGPA.js';
import CurrentCreditHours from './CurrentCreditHours.js';
import Courses from './Courses.js';
import { createContext, useState, useReducer } from 'react';

const GPAContext = createContext();

const initialGPAState = {
  currentUnweightedGPA: 0.00,
  currentHOPEGPA: 0.00,
  currentCreditHours: 0,
};

function updateGPA(gpaState, action) {
  switch (action.type) {
    case 'UPDATE_U':
      return {
        currentUnweightedGPA: action.data,
        currentHOPEGPA: gpaState.currentHOPEGPA,
        currentCreditHours: gpaState.currentCreditHours,
      };

    case 'UPDATE_H':
      return {
        currentUnweightedGPA: gpaState.currentUnweightedGPA,
        currentHOPEGPA: action.data,
        currentCreditHours: gpaState.currentCreditHours,
      };

    case 'UPDATE_C':
      return {
        currentUnweightedGPA: gpaState.currentUnweightedGPA,
        currentHOPEGPA: gpaState.currentHOPEGPA,
        currentCreditHours: action.data,
      }

    default:
      return initialGPAState;
  }
}

const CourseArrayContext = createContext();

function App() {
  const [gpaState, setGPAState] = useReducer(updateGPA, initialGPAState);
  const [courseArray, setCourseArray] = useState([]);

  return (
    <>
    <div className="header">
      GPA Calculator
    </div>
    <div className="App">
      <GPAContext.Provider value={{ gpaState, setGPAState }}>
        <div>
          <CurrentGPA />
          <CurrentCreditHours />
        </div>
          <CourseArrayContext.Provider value={{ courseArray, setCourseArray }}>
              <HypotheticalGPA />
            <Courses />
          </CourseArrayContext.Provider>
      </GPAContext.Provider>
    </div>
    <footer>
      <p>Created by Holden Casey in Fall 2022</p>
      <p>Beta Version 1.0</p>
    </footer>
    </>
  );
}

export default App;
export {GPAContext};
export {CourseArrayContext};