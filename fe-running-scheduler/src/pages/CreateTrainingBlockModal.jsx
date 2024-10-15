import { useNavigate, Form } from "react-router-dom";
import { useState } from "react";

const CreateTrainingBlockModal = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    weeks: "",
    date: "",
    distance: "",
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

  // console.log(runningDays);

  const handleChange = (e) => {
    const { name, value } = e.target;
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

    const newEntry = form;
    // try {
      
    // } catch (error) {
    //   e.preventDefault();
    //   setError("Error creating the schedule.");
    // }
  };

  return (
    <Form method="post" action="/">
      <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
        <div className="modal-window p-8 rounded-lg border shadow-lg">
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
            <div className="spacer"></div>

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
          </div>

          <div className="mt-10 flex flex-auto flex-row justify-end">
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
