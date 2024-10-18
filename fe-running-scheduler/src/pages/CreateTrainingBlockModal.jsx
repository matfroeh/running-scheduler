import { useNavigate, Form } from "react-router-dom";
import { useState } from "react";

const CreateTrainingBlockModal = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    weeks: "",
    date: "",
    distance: "",
    longRun: "None",
    workoutDay: "None",
  });
  const [runningDays, setRunningDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });
  const [error, setError] = useState(null);

  const selectedDays = Object.keys(runningDays).filter(
    (day) => runningDays[day] === true
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);

    setForm({ ...form, [name]: value });
  };

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    setRunningDays({ ...runningDays, [name]: checked });
  };

  const handleSubmit = async (e) => {
    if (Object.keys(form).some((key) => form[key].trim() === "")) {
      e.preventDefault();
      setError("Please fill in all fields.");
      return;
    }
    if (selectedDays.length === 0) {
      e.preventDefault();
      setError("Please select at least one running day.");
      return;
    }
    if (form.distance < 1) {
      e.preventDefault();
      setError("Distance should be greater than 0.");
      return;
    }
    if (form.weeks < 1) {
      e.preventDefault();
      setError("Weeks should be greater than 0.");
      return;
    }
    if (
      form.longRun === form.workoutDay &&
      form.longRun !== "None" &&
      form.workoutDay !== "None"
    ) {
      e.preventDefault();
      setError("Long Run and Workout Day should be on different days.");
      return;
    }
  };

  return (
    <Form method="post" action="/">
      <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
        <div className="modal-window p-8 bg-base-100 rounded-lg border shadow-lg">
          <div className="grid grid-cols-2 gap-4">
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
              <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="btn w-full">
                  Select Running Days
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
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
                className="ml-2"
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
                className="ml-2"
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
          </div>

          <div className="mt-10 flex flex-auto flex-row">
            <div className="w-full justify-stretch py-2">
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <button
              className="px-4 py-2 rounded-lg mr-2 hover:bg-base-100 transition-colors"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/3 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              onClick={(e) => handleSubmit(e)}
            >
              Create Training Block
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default CreateTrainingBlockModal;
