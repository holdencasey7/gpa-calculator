import { useContext } from "react";
import { GPAContext } from "./App.js";

function CurrentCreditHours() {
    const {gpaState, setGPAState} = useContext(GPAContext);

    const changeCreditHours = (newValue) => {
        setGPAState({type: 'UPDATE_C', data: newValue});
    };

    return (
        <div className="CurrentCreditHours">
            <h3>Previous Total Credit Hours: {gpaState.currentCreditHours}</h3>
            <input
                type="number"
                id="currentCreditHours"
                name="currentCreditHours"
                // value={gpaState.currentCreditHours}
                placeholder="Hours..."
                onClick={(e) => e.target.value = null}
                onChange={e => changeCreditHours(e.target.value)}>
          </input>
        </div>
    );
}

export default CurrentCreditHours;