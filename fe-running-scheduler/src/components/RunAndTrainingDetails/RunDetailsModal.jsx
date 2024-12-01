import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  updateEquipment,
  getEquipmentListFromUser,
  updateRunCalendar,
} from "@/data";
import { CardModal, InputErrorBar } from "@/components/generic";
import {
  NotesField,
  RunDetailsButtonGroup,
  RunDetailsStatsAndForms,
  RunDetailsTitle,
} from "@/components/RunAndTrainingDetails";
import { useAuth } from "@/context";
import { verifyRunDetailsInput } from "@/lib";

const RunDetailsModal = () => {
  const { week, day } = useParams();
  const { runs, handleSetRuns } = useOutletContext();
  // console.log("runs", runs);

  const { user } = useAuth();
  const run = runs.weeks[week].days[day];
  const calendarId = runs._id;
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...run });
  const [equipmentChanged, setEquipmentChanged] = useState(false);
  const [equipmentList, setEquipmentList] = useState([]);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const activeEquipmentList = equipmentList.filter(
    (item) => item.status === "active"
  );

  const selectedEquipment = activeEquipmentList.find(
    (item) => item.name === formData.equipment
  );

  useEffect(() => {
    const fetchEquipmentList = async () => {
      const equipmentList = await getEquipmentListFromUser(user.userId);
      setEquipmentList(equipmentList);
    };
    fetchEquipmentList();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSetEquipmentChanged = (value) => {
    setEquipmentChanged(value);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      setFormData({ ...run });
    }
  };

  const update = async () => {
    if (handleInputVerification() === false) return;

    try {
      setIsUpdating(true);
      const updatedRunningData = { ...runs };
      updatedRunningData.weeks[week].days[day] = formData;

      handleSetRuns(updatedRunningData);
      await updateRunCalendar(runs, calendarId);

      // update the equipment distance if still exists in the list (as active equipment)
      if (selectedEquipment && equipmentChanged) {
        const distanceToAdd = formData.distance || 0;
        const durationToAdd = formData.duration || 0;
        const updatedEquipment = { ...selectedEquipment };
        updatedEquipment.distance += parseFloat(distanceToAdd);
        updatedEquipment.time += Math.round((durationToAdd / 3600) * 100) / 100;

        updateEquipment(user.userId, selectedEquipment._id, updatedEquipment);
      }
      toast.success("Run updated successfully.");
      navigate(-1);
    } catch (error) {
      setIsUpdating(false);
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      // alert with a confirmation box
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this run?"
      );
      if (!confirmDelete) return;

      setIsUpdating(true);

      const updatedRunningData = { ...runs };
      updatedRunningData.weeks[week].days[day] = { date: run.date };
      // console.log(updatedRunningData.weeks[week].days[day]);
      handleSetRuns(updatedRunningData);
      await updateRunCalendar(runs, calendarId);
      toast.success("Run deleted successfully.");
      navigate(-1);
    } catch (error) {
      toast.error(error.message);
      setIsUpdating(false);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleInputVerification = () => {
    const isValid = verifyRunDetailsInput(formData, setError);
    return isValid;
  };

  return (
    <>
      <CardModal>
        <RunDetailsTitle
          isEditMode={isEditMode}
          name={formData.name}
          date={formData.date}
          handleChange={handleChange}
        />
        <RunDetailsButtonGroup
          isUpdating={isUpdating}
          handleDelete={handleDelete}
          toggleEditMode={toggleEditMode}
          isEditMode={isEditMode}
          update={update}
        />

        {isEditMode && error && <InputErrorBar error={error} />}

        <RunDetailsStatsAndForms
          isEditMode={isEditMode}
          formData={formData}
          handleChange={handleChange}
          run={run}
          activeEquipmentList={activeEquipmentList}
          handleSetEquipmentChanged={handleSetEquipmentChanged}
        />
        <NotesField
          isEditMode={isEditMode}
          text={formData.comments}
          handleChange={handleChange}
        />
      </CardModal>
    </>
  );
};

export default RunDetailsModal;
