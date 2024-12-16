import { CardModal } from "@/components/generic";
import { useEditCalendar } from "@/lib/hooks";

const CalendarEditModal = () => {
    const {
        handleChange,
        updateCalendarTitleMutation,
        deleteCalendarMutation,
        title,
    } = useEditCalendar();

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
                <button
                    className="btn btn-sm btn-success ml-2"
                    onClick={handleUpdate}
                >
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
