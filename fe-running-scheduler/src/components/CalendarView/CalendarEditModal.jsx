import { CardModal } from "@/components/generic";
import { useState } from "react";
import {
  updateRunCalendar,
  deleteRunCalendar,
  updateTrainingSchedule,
  deleteTrainingSchedule,
} from "@/data";
import { useOutletContext, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CalendarEditModal = () => {
  const navigate = useNavigate();
  const { schedule, runs, handleSetSchedule, handleSetRuns } =
    useOutletContext();
  const [title, setTitle] = useState(schedule.meta.title);
  const calendarId = schedule._id;

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const update = async () => {
    try {
      const updatedTrainingSchedule = {
        ...schedule,
        meta: { ...schedule.meta, title },
      };
      const updatedRunningLog = {
        ...runs,
        meta: { ...runs.meta, title },
      };
      await updateTrainingSchedule(updatedTrainingSchedule, calendarId);
      await updateRunCalendar(updatedRunningLog, calendarId);

      handleSetSchedule(updatedTrainingSchedule);
      handleSetRuns(updatedRunningLog);

      toast.success("Title updated successfully!");
      navigate(-1);
    } catch (error) {
      toast.error(`Error editing title: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the complete Training and Running Journal?"
    );
    if (!confirmDelete) return;
    else {
      const confirmDelete = window.confirm(
        "Please confirm that you want to delete the complete Training and Running Journal. This action cannot be undone."
      );
      if (!confirmDelete) return;
    }

    try {
      await deleteTrainingSchedule(calendarId);
      await deleteRunCalendar(calendarId);
      localStorage.removeItem("currentCalendarIndex");
      navigate("/");
      handleSetRuns([]);
      handleSetSchedule([]);
      toast.success("Calendar deleted successfully!");
    } catch (error) {
      toast.error(`Error deleting calendar: ${error.message}`);
    }
  };

  return (
    <CardModal>
      <h2 className="card-title text-xl font-bold">Edit Title</h2>

      <div className="flex space-x-2 justify-end">
        <button className="btn btn-sm btn-success ml-2" onClick={update}>
          Save
        </button>
      </div>
      <div>
        <div>Title: </div>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          className="input input-bordered w-full mt-2"
        />
      </div>
      <div className="flex space-x-2 justify-end mt-10">
        <button
          className="btn btn-sm btn-neutral hover:btn-error"
          onClick={handleDelete}
        >
          Delete Calendar
        </button>
      </div>
    </CardModal>
  );
};

export default CalendarEditModal;