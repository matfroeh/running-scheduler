const EquipmentSelector = ({equipment, handleEquipmentChange, activeEquipmentList}) => {
  return (
    <select
    className="select select-bordered w-full mt-2"
    value={equipment}
    name="equipment"
    onChange={handleEquipmentChange}
  >
    <option value="" defaultValue="Select equipment used">
      Select equipment used
    </option>
    {activeEquipmentList.map((item) => (
      <option key={item._id} value={item.name}>
        {item.name}
      </option>
    ))}
  </select>
  )
}

export default EquipmentSelector