const CreateScheduleForm = ({
  form,
  handleChange,
  handleToggle,
  runningDays,
  selectedDays,
}) => {
  return (
    <>
      <div className="col-span-2 w-4/5">
        <label className="flex items-center gap-4">
          Title:
          <input
            type="text"
            name="title"
            className="input-bordered input w-full grow focus:ring-2 "
            value={form.title}
            onChange={(e) => handleChange(e)}
          />
        </label>
      </div>
      <div className="">
        <label className="flex items-center gap-4">
          Start:
          <input
            type="date"
            name="date"
            placeholder="Title"
            className="input input-bordered w-full text-center focus:ring-2 "
            value={form.date}
            onChange={(e) => handleChange(e)}
          />
        </label>
      </div>
      <div className="flex items-center gap-4">
        <div className="ml-2 dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn w-full">
            Select Running Days
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    name="monday"
                    className="checkbox"
                    checked={runningDays.monday}
                    onChange={(e) => handleToggle(e)}
                  />
                  <span className="ml-2 label-text">Monday</span>
                </label>
              </div>
            </li>
            <li>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    name="tuesday"
                    className="checkbox"
                    checked={runningDays.tuesday}
                    onChange={(e) => handleToggle(e)}
                  />
                  <span className="ml-2 label-text">Tuesday</span>
                </label>
              </div>
            </li>
            <li>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    name="wednesday"
                    className="checkbox"
                    checked={runningDays.wednesday}
                    onChange={(e) => handleToggle(e)}
                  />
                  <span className="ml-2 label-text">Wednesday</span>
                </label>
              </div>
            </li>
            <li>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    name="thursday"
                    className="checkbox"
                    checked={runningDays.thursday}
                    onChange={(e) => handleToggle(e)}
                  />
                  <span className="ml-2 label-text">Thursday</span>
                </label>
              </div>
            </li>
            <li>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    name="friday"
                    className="checkbox"
                    checked={runningDays.friday}
                    onChange={(e) => handleToggle(e)}
                  />
                  <span className="ml-2 label-text">Friday</span>
                </label>
              </div>
            </li>
            <li>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    name="saturday"
                    className="checkbox"
                    checked={runningDays.saturday}
                    onChange={(e) => handleToggle(e)}
                  />
                  <span className="ml-2 label-text">Saturday</span>
                </label>
              </div>
            </li>
            <li>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    name="sunday"
                    className="checkbox"
                    checked={runningDays.sunday}
                    onChange={(e) => handleToggle(e)}
                  />
                  <span className="ml-2 label-text">Sunday</span>
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="">
        <label className="flex items-center gap-4">
          Weeks:
          <input
            type="number"
            name="weeks"
            className="grow input input-bordered text-center focus:ring-2 "
            value={form.weeks}
            onChange={(e) => handleChange(e)}
          />
        </label>
      </div>
      <div className="flex items-center gap-4">
        <label className="ml-4">Long Run:</label>
        <select
          className="ml-2 bg-base-200 rounded-md p-1"
          name="longRun"
          onChange={(e) => handleChange(e)}
        >
          <option value="none">None</option>
          {selectedDays.map((day) => (
            <option key={day} value={day}>
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </option>
          ))}
          ;
        </select>
      </div>

      <div>
        <label className="flex items-center gap-4">
          Weekly Distance (km):
          <input
            type="number"
            name="distance"
            className="input-bordered text-center input focus:outline-none focus:ring-2 "
            value={form.distance}
            onChange={(e) => handleChange(e)}
          />
        </label>
      </div>

      <div className="flex items-center gap-4">
        <label className="ml-4">Workout Day:</label>
        <select
          className="ml-2 bg-base-200 rounded-md p-1"
          name="workoutDay"
          onChange={(e) => handleChange(e)}
        >
          <option value="none">None</option>
          {selectedDays.map((day) => (
            <option key={day} value={day}>
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </option>
          ))}
          ;
        </select>
      </div>
    </>
  );
};

export default CreateScheduleForm;
