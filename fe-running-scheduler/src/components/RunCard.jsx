const RunCard = ({ data }) => {
  return (
    <div className="card card-compact bg-base-100 h-24 w-full hover:border-2 border-teal-400 cursor-pointer">
      <div className="card-body">
        <div className="card-title text-sm mt-1">
          <p>+ Upload .gpx</p>
        </div>
      </div>
    </div>
  );
};

export default RunCard;
