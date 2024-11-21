import dayjs from "dayjs";

const FormEquipmentStats = ({ formData, setFormData }) => {
  
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const formatDate = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  return (
    <>
      <div>
        <div>Name: </div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="input input-bordered w-full mt-2"
        />
      </div>
      <div>
        <div>Status: </div>
        <select
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="select select-bordered max-w-min mt-2"
        >
          <option defaultValue="active" value="active">
            Active
          </option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div>
        <div>Type: </div>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="input input-bordered w-full mt-2"
        />
      </div>
      <div>
        <div>Brand: </div>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="input input-bordered w-full mt-2"
        />
      </div>
      <div>
        <div>Model: </div>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          className="input input-bordered w-full mt-2"
        />
      </div>
      <div>
        <div>(Starting)-Distance: </div>
        <input
          type="text"
          name="distance"
          value={formData.distance}
          onChange={handleChange}
          className="input input-bordered w-full mt-2"
        />
      </div>
      <div>
        <div>Usage time until now (hours): </div>
        <input
          type="text"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="input input-bordered w-full mt-2"
        />
      </div>
      <div>
        <div>Description: </div>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="input input-bordered w-full mt-2"
        />
      </div>
      <div>
        <div>In use since: </div>
        <input
          type="date"
          name="inUseSince"
          value={formatDate(formData.inUseSince)}
          onChange={handleChange}
          className="input input-bordered w-full mt-2"
        />
      </div>
    </>
  );
};

export default FormEquipmentStats;
