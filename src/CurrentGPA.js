import { useContext } from "react";
import { GPAContext } from "./App.js";

function CurrentGPA() {
    const {gpaState, setGPAState} = useContext(GPAContext);

    const changeUnweighted = (newValue) => {
        setGPAState({type: 'UPDATE_U', data: newValue});
    };

    const changeHOPE = (newValue) => {
        setGPAState({type: 'UPDATE_H', data: newValue});
    };

    return (
      <div className="CurrentGPA" id="currGPAandCredits">
        <section>
          <h3>Current Unweighted GPA: {gpaState.currentUnweightedGPA}</h3>
          <input
            type="number"
            id="currentUnweightedGPA"
            name="currentUnweightedGPA"
            placeholder="Unweighted GPA..."
            onChange={e => changeUnweighted(e.target.value)}>
          </input>
        </section>
        <section>
        <h3>Current HOPE GPA: {gpaState.currentHOPEGPA}</h3>
          <input
            type="number"
            id="currentHOPEGPA"
            name="currentHOPEGPA"
            // value={gpaState.currentHOPEGPA}
            placeholder="Hope GPA..."
            onChange={e => changeHOPE(e.target.value)}>
          </input>
        </section>
      </div>
    );
  }

  export default CurrentGPA;