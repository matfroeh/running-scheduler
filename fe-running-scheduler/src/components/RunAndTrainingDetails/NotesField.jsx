const NotesField = ({isEditMode, text, handleChange}) => {
  return (
    <div className="mt-4">
    <h3 className="text-lg font-semibold">Notes: </h3>
    {isEditMode ? (
      <textarea
        placeholder="Add your comments here"
        rows={4}
        name="comments"
        value={text || ""}
        onChange={handleChange}
        className="placeholder-italic textarea min-h-20 resize-vertical textarea-bordered w-full mt-2"
      />
    ) : (
      <div className="bg-base-200 min-h-20 p-2 rounded mt-4">
        {text || ""}
      </div>
    )}
  </div>
  )
}

export default NotesField