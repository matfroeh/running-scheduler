const SummaryCard = ( {data} ) => {
  return (
    <div className="card card-compact image-full bg-base-100 w-32">
      <div className="card-body">
        <p>Distance:</p>
        <p>10 km / 50 km</p>
        <p>Avg. HR: 135</p>
        <p>Weighted Effort: 5</p>
      </div>
    </div>
  );
};

export default SummaryCard;
