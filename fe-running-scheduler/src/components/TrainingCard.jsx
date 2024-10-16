const TrainingCard = ({ data }) => {
  return (
    <div className="card card-compact image-full bg-base-100 w-32 hover:border-2 border-teal-400 cursor-pointer">
      <div className="card-body">
        <div className="card-title text-sm">Easy Run</div>
        <p>10 km</p>
      </div>
    </div>
  );
};

export default TrainingCard;
