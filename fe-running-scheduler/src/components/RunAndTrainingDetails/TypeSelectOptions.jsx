const TypeSelectOptions = ({ type, handleChange }) => {
    return (
        <div className="">
            <strong>Type: </strong>
            <select
                className="select select-bordered w-full mt-2"
                value={type}
                name="type"
                onChange={handleChange}
            >
                <option value="" defaultValue="Select a type">
                    Select a type
                </option>
                <option value="Easy Run">Easy Run</option>
                <option value="Long Run">Long Run</option>
                <option value="Workout Day">Workout Day</option>
                <option value="Interval Workout">Interval Workout</option>
                <option value="Steady State">Steady State</option>
                <option value="Threshold">Threshold</option>
                <option value="Sub-Threshold">Sub-Threshold</option>
                <option value="Tempo Run">Tempo Run</option>
                <option value="Progression Run">Progression Run</option>
                <option value="Hill Sprints">Hill Sprints</option>
                <option value="Strides">Strides</option>
                <option value="Cross Training">Cross Training</option>
                <option value="Strength Training">Strength Training</option>
                <option value="Race Day">Race Day</option>
                <option value="Time Trial">Time Trial</option>
                <option value="Fartlek">Fartlek</option>
                <option value="Recovery Run">Recovery Run</option>
                <option value="Rest Day">Rest Day</option>
                <option value="Other">Other</option>
            </select>
        </div>
    );
};

export default TypeSelectOptions;
