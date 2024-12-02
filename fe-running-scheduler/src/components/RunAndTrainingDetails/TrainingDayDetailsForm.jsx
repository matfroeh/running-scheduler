const TrainingDayDetailsForm = ({formData, handleChange}) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div>
          <strong>Distance: </strong>
          <input
            type="number"
            name="distance"
            value={formData.distance || ""}
            onChange={handleChange}
            className="input input-bordered w-full mt-2"
          />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="lg:text-lg font-semibold">Description: </h3>
        <textarea
          placeholder="Add your Workout protocol here"
          rows={4}
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          className="placeholder-italic textarea min-h-20 resize-vertical textarea-bordered w-full mt-2"
        />
      </div>
    </>
  );
};

export default TrainingDayDetailsForm;
