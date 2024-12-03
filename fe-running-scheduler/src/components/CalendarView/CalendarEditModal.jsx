import { CardModal } from "@/components/generic";
import { useEditCalendar } from "@/lib/hooks";

const CalendarEditModal = () => {

  const {handleChange, updateCalendarTitleMutation, deleteCalendarMutation, title} = useEditCalendar();

  const handleUpdate = async () => {
    updateCalendarTitleMutation.mutate();
  };

  const handleDelete = async () => {
    deleteCalendarMutation.mutate();
  };

  return (
    <CardModal>
      <h2 className="card-title text-xl font-bold">Edit Title</h2>

      <div className="flex space-x-2 justify-end">
        <button className="btn btn-sm btn-success ml-2" onClick={handleUpdate}>
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

// old code without useQueryClient
// const handleDelete = async () => {
//   const confirmDelete = window.confirm(
//     "Are you sure you want to delete the complete Training and Running Journal?"
//   );
//   if (!confirmDelete) return;
//   else {
//     const confirmDelete = window.confirm(
//       "Please confirm that you want to delete the complete Training and Running Journal. This action cannot be undone."
//     );
//     if (!confirmDelete) return;
//   }

//   try {
//     await deleteTrainingSchedule(calendarId);
//     await deleteRunCalendar(calendarId);
//     navigate("/");
//     handleSetRuns([]);
//     handleSetSchedule([]);
//     toast.success("Calendar deleted successfully!");
//   } catch (error) {
//     toast.error(`Error deleting calendar: ${error.message}`);
//   }
// };



  // const navigate = useNavigate();
  // const { schedule, runs, handleSetSchedule, handleSetRuns } =
  //   useOutletContext();
  // const [title, setTitle] = useState(schedule?.meta?.title);
  // const calendarId = schedule?._id;

  // const queryClient = useQueryClient();

  // const handleChange = (e) => {
  //   setTitle(e.target.value);
  // };

  // const update = async () => {
  //   if (!title) {
  //     toast.error("Title cannot be empty!");
  //     return;
  //   }
  //   try {
  //     const updatedTrainingSchedule = {
  //       ...schedule,
  //       meta: { ...schedule.meta, title },
  //     };
  //     const updatedRunningLog = {
  //       ...runs,
  //       meta: { ...runs.meta, title },
  //     };
  //     await updateTrainingSchedule(updatedTrainingSchedule, calendarId);
  //     await updateRunCalendar(updatedRunningLog, calendarId);

  //     handleSetSchedule(updatedTrainingSchedule);
  //     handleSetRuns(updatedRunningLog);

  //     toast.success("Title updated successfully!");
  //     navigate(-1);
  //   } catch (error) {
  //     toast.error(`Error editing title: ${error.message}`);
  //   }
  // };

  // const deleteCalendarMutation = useMutation({
  //   mutationFn: async () => {
  //     const confirmDelete = window.confirm(
  //       "Are you sure you want to delete the complete Training and Running Journal?"
  //     );
  //     if (!confirmDelete) return;
  //     else {
  //       const confirmDelete = window.confirm(
  //         "Please confirm that you want to delete the complete Training and Running Journal. This action cannot be undone."
  //       );
  //       if (!confirmDelete) return;
  //     }

  //     try {
  //       await deleteTrainingSchedule(calendarId);
  //       await deleteRunCalendar(calendarId);
  //       handleSetRuns(null);
  //       handleSetSchedule(null);
  //       toast.success("Calendar deleted successfully!");
  //       // navigate("/");
  //     } catch (error) {
  //       toast.error(`Error deleting calendar: ${error.message}`);
  //     }
  //   },
  //   onError: (error) => {
  //     toast.error(`Error deleting calendar: ${error.message}`);
  //   },
  //   onSuccess: async () => {
  //     // invalidateQueries is not working to update the cache as useQuery will only be called when there is a valid calendarId
  //     // new try with removeQueries (calendarId is needed, because the combination of both is the key)
  //     // it works as expected
  //     queryClient.removeQueries(["trainingSchedule", calendarId]);
  //     queryClient.removeQueries(["runs", calendarId]);

  //     // navigate to root as url needs to be updated, else it would remain on the deleted calendarId
  //     navigate("/");
  //   },
  // });