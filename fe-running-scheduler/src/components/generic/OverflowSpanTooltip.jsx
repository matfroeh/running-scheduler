const OverflowSpanTooltip = ({ text }) => {
  return (
    <div className="relative">
      <span
        className="tooltip tooltip-bottom relative block whitespace-nowrap text-ellipsis w-full"
        data-tip={text}
      >
        {text}
      </span>
    </div>
  );
};

export default OverflowSpanTooltip;
