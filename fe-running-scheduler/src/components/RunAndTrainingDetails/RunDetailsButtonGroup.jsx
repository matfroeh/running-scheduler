import { ButtonLoadingState } from "@/components/generic";

const RunDetailsButtonGroup = ({isUpdating, handleDelete, toggleEditMode, isEditMode, update}) => {
  return (
    <div>
    {!isUpdating && (
      <div className="flex space-x-2 justify-end">
        <button
          className="btn btn-sm btn-neutral hover:btn-error"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={toggleEditMode}
        >
          {isEditMode ? "Cancel" : "Edit"}
        </button>
        {isEditMode && (
          <>
            <button
              className="btn btn-sm btn-success ml-2"
              onClick={update}
            >
              Save
            </button>
          </>
        )}
      </div>
    )}
    {isUpdating && (
      <div className="flex space-x-2 justify-end">
        <ButtonLoadingState text={"Updating..."} />
      </div>
    )}
  </div>
  )
}

export default RunDetailsButtonGroup