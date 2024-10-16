import WeekDaysBar from "./WeekDaysBar";
import TrainingCard from "./TrainingCard";

const CalendarBody = ({ data }) => {
if (Object.keys(data).length === 0) {
  data = "";
}
console.log(data);


  return (
    <div className="grid grid-cols-8 mx-4 gap-x-4 gap-y-2">
      {/* ToDo: what about displaying special days in the header? */}
      <WeekDaysBar />
      {/* Solution 1: map over weeks <TrainingWeek week={data.week*) /> 
      and add a summary conditionally after day0=sunday */}
      {data ? Object.entries(data.week1).map(([day, data]) => {
        return <TrainingCard key={day} data={data} />
      }) : null}
    <div className="card card-compact border image-full bg-base-100 h-28 w-full hover:border-teal-400 cursor-pointer">
      <div className="items-start justify-self-end text-white text-xs mt-1 mr-2"></div>
      <div className="card-body">
      <div className="card-title text-sm">Week 1</div>
        <p>Total:</p>
        <p>58 km</p>
      </div>
    </div>
            {data ? Object.entries(data.week1).map(([day, data]) => {
        return <TrainingCard key={day} data={data} />
      }) : null}
        <div className="card card-compact border image-full bg-base-100 h-28 w-full hover:border-teal-400 cursor-pointer">
      <div className="items-start justify-self-end text-white text-xs mt-1 mr-2"></div>
      <div className="card-body">
      <div className="card-title text-sm">Week 2</div>
        <p>Total:</p>
        <p>58 km</p>
      </div>
    </div>

      {/* Solution 2: all cards directly mapped herein  */}
      {/* Keep in mind that we want to edit each card manually, but even a whole week maybe? */}
    </div>
  );
};

export default CalendarBody;