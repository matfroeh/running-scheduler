import { useState } from "react";
import { InputErrorBar } from "@/components/generic";
import { changePassword } from "@/data";
import { toast } from "react-toastify";

const ChangePwForm = () => {
  const [{ currentPassword, newPassword, confirmNewPw }, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPw: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmNewPw) {
      setError("All fields are required");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    if (newPassword !== confirmNewPw) {
      setError("New passwords do not match");
      return;
    }
    try {
      await changePassword({ currentPassword, newPassword });
      toast.success("Password changed successfully");
      handleClose();
    } catch (error) {
      if (!error.message) {
        toast.error("An error occurred while changing password");
        return;
      }
      toast.error(error.message);
    }
  };

  // Close modal and clear form
  const handleClose = () => {
    const elem = document.activeElement.closest(".modal");
    if (elem) {
      setForm({ currentPassword: "", newPassword: "", confirmNewPw: "" });
      elem.click();
    }
  };
  return (
    <div>
      <form className="flex flex-col mt-8 gap-3" onSubmit={handleSubmit}>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            name="currentPassword"
            value={currentPassword}
            onChange={handleChange}
            type="password"
            className="grow"
            placeholder="Current Password"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            name="newPassword"
            value={newPassword}
            onChange={handleChange}
            type="password"
            className="grow"
            placeholder="New Password"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            name="confirmNewPw"
            value={confirmNewPw}
            onChange={handleChange}
            type="password"
            className="grow"
            placeholder="Confirm New Password"
          />
        </label>
      </form>

      <InputErrorBar error={error} />

      <div className="flex justify-end gap-2 mt-8">
        <button className="btn btn-sm w-max btn-error" onClick={handleClose}>
          Cancel
        </button>
        <button className="btn btn-sm w-max btn-success" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ChangePwForm;
