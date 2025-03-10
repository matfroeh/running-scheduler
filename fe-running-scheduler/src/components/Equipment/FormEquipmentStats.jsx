import { dateToDatePickerFormat } from "@/lib/utils";

const FormEquipmentStats = ({ formData, onChange }) => {
    return (
        <>
            <div>
                <div>Name: </div>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={onChange}
                    className="input input-bordered w-full mt-2"
                />
            </div>
            <div>
                <div>Status: </div>
                <select
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={onChange}
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
                    onChange={onChange}
                    className="input input-bordered w-full mt-2"
                />
            </div>
            <div>
                <div>Brand: </div>
                <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={onChange}
                    className="input input-bordered w-full mt-2"
                />
            </div>
            <div>
                <div>Model: </div>
                <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={onChange}
                    className="input input-bordered w-full mt-2"
                />
            </div>
            <div>
                <div>(Starting)-Distance: </div>
                <input
                    type="number"
                    name="distance"
                    value={formData.distance}
                    onChange={onChange}
                    className="input input-bordered w-full mt-2"
                />
            </div>
            <div>
                <div>Usage time until now (hours): </div>
                <input
                    type="number"
                    name="time"
                    value={formData.time}
                    onChange={onChange}
                    className="input input-bordered w-full mt-2"
                />
            </div>
            <div>
                <div>Description: </div>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={onChange}
                    className="input input-bordered w-full mt-2"
                />
            </div>
            <div>
                <div>In use since: </div>
                <input
                    type="date"
                    name="inUseSince"
                    value={dateToDatePickerFormat(formData.inUseSince)}
                    onChange={onChange}
                    className="input input-bordered w-full mt-2"
                />
            </div>
        </>
    );
};

export default FormEquipmentStats;
