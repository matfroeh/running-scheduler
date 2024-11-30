import { Form } from "react-router-dom";
import { CardModal } from "@/components/generic";
import { useCreateScheduleForm } from "@/lib/hooks";
import {
  CreateScheduleForm,
  CreateScheduleControls,
} from "@/components/CreateSchedule";

const CreateScheduleModal = () => {
  const {
    form,
    runningDays,
    error,
    selectedDays,
    handleChange,
    handleToggle,
    handleSubmit,
  } = useCreateScheduleForm();

  return (
    <CardModal>
      <h2 className="card-title text-xl mb-6">Create New Schedule</h2>

      <Form method="post" action="/auth/calendar">
        {/* <div className="grid grid-cols-2 gap-4"> */}
        <div className="flex flex-wrap gap-4">
          <CreateScheduleForm
            form={form}
            handleChange={handleChange}
            handleToggle={handleToggle}
            runningDays={runningDays}
            selectedDays={selectedDays}
          />
        </div>
        <CreateScheduleControls error={error} handleSubmit={handleSubmit} />
      </Form>
    </CardModal>
  );
};

export default CreateScheduleModal;

// return (
//   <Form method="post" action="/auth/calendar">
//     <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
//       <div className="modal-window p-8 bg-base-100 rounded-lg border shadow-lg">
//         <div className="grid grid-cols-2 gap-4">
//           <CreateScheduleForm
//             form={form}
//             handleChange={handleChange}
//             handleToggle={handleToggle}
//             runningDays={runningDays}
//             selectedDays={selectedDays}
//           />
//         </div>
//         <CreateScheduleControls error={error} handleSubmit={handleSubmit} />
//       </div>
//     </div>
//   </Form>
// );
