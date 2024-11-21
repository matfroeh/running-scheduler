const ButtonSave = ({onClick}) => {
  return (
    <button
    type="submit"
    className="btn btn-sm btn-success ml-2"
    onClick={onClick}
  >
    Save
  </button>
  )
}

export default ButtonSave