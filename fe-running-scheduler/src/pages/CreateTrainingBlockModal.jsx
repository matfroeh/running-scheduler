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
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    if (Object.keys(form).some((key) => form[key].trim() === "")) {
      e.preventDefault();
      setError("Please fill in all fields.");
      return;
    }

    const newEntry = form;
    try {
      navigate("/");
    } catch (error) {
      e.preventDefault();
      console.error("Error saving the entry:", error);
      setError("Error saving the entry.");
    }
  };

  return (
    <Form method="post" action="/">
      <div className="fixed inset-0 bg-black bg-opacity-65 flex justify-center items-center z-50">
        <div className="modal-window p-8 rounded-lg border shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="flex items-center gap-8">
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
              <label className="flex items-center gap-8">
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
            <div className="spacer"></div>
            <div className="">
              <label className="flex items-center gap-8">
                Weeks:
                <input
                  type="number"
                  name="weeks"
                  className="input w-full input-bordered text-center focus:ring-2 "
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
                  className="input-bordered text-center grow input focus:outline-none focus:ring-2 "
                  value={form.distance}
                  onChange={(e) => handleChange(e)}
                />
              </label>
            </div>
          </div>

          <div className="flex flex-auto flex-row justify-end">
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
