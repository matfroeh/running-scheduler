import { formatDateYYMMDD } from '@/lib/utils';

const RunDetailsTitle = ({isEditMode, name, date, handleChange}) => {
  return (
    <h2 className="card-title text-sm md:text-base lg:text-xl font-bold">
    {isEditMode ? (
      <div>
        <div>Name: </div>
        <input
          type="text"
          name="name"
          value={name || ""}
          onChange={handleChange}
          className="input input-bordered w-full mt-2"
        />
      </div>
    ) : (
      <div>
        <span>{name ? name + ", " : ""}</span>
        <span>{formatDateYYMMDD(date)}</span>{" "}
      </div>
    )}
  </h2>
  )
}

export default RunDetailsTitle