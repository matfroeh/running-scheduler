const EffortSlider = ({handleChange, effort}) => {
  return (
    <>
    <input
      type="range"
      name="effort"
      min={0}
      max="10"
      onChange={handleChange}
      value={effort || 0}
      className="range range-primary mt-3"
      step="1"
    />
    <div className="flex w-full justify-between px-2 text-xs">
      <span>0</span>
      <span>|</span>
      <span>|</span>
      <span>|</span>
      <span>|</span>
      <span>5</span>
      <span>|</span>
      <span>|</span>
      <span>|</span>
      <span>|</span>
      <span>10</span>
    </div>
  </>
  )
}

export default EffortSlider