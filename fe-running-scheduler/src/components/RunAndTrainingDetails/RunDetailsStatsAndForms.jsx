import {
  getTempoAsMinutesSecondsString,
  getSecondsAsHoursMinutesSecondsString,
} from "@/lib/utils";
import {
  TypeSelectOptions,
  EffortSlider,
  EquipmentSelector,
} from "@/components/RunAndTrainingDetails";
import { LineChartTimeVelocity } from "@/components/charts";

const RunDetailsStatsAndForms = ({
  isEditMode,
  formData,
  handleChange,
  run,
  activeEquipmentList,
  handleSetEquipmentChanged,
}) => {

  const handleEquipmentChange = (e) => {
    handleChange(e);
    handleSetEquipmentChanged(true);

  };
  return (
    <>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div>
          <strong>Distance: </strong>
          {isEditMode ? (
            <input
              type="number"
              name="distance"
              value={parseFloat(formData.distance) || ""}
              onChange={handleChange}
              className="input input-bordered w-full mt-2"
            />
          ) : (
            <span>{formData.distance ? `${formData.distance} km` : ""}</span>
          )}
        </div>
        {isEditMode ? (
          <TypeSelectOptions type={formData.type} handleChange={handleChange} />
        ) : (
          <div>
            <strong>Type: </strong>
            <span>{formData.type || ""}</span>
          </div>
        )}
        {!isEditMode && (
          <div>
            <strong>Activity Time: </strong>
            <span>
              {formData.duration
                ? getSecondsAsHoursMinutesSecondsString(formData.duration)
                : null}
            </span>
          </div>
        )}
        {!isEditMode && (
          <div>
            <strong>Total Time: </strong>
            <span>
              {formData.totalTime
                ? getSecondsAsHoursMinutesSecondsString(formData.totalTime)
                : null}
            </span>
          </div>
        )}
        <div>
          <strong>Effort: </strong>
          {isEditMode ? (
            <EffortSlider
              handleChange={handleChange}
              effort={formData.effort}
            />
          ) : (
            <span>
              {formData.effort !== undefined ? formData.effort + " / 10" : null}
            </span>
          )}
        </div>
        {isEditMode ? null : (
          <div>
            <strong>Pace: </strong>
            <span>
              {formData.tempo
                ? getTempoAsMinutesSecondsString(formData.tempo) +
                  " " +
                  "min/km"
                : null}
            </span>
          </div>
        )}
        <div>
          <strong>Average Heart Rate: </strong>
          {isEditMode ? (
            <input
              type="number"
              name="avg_hr"
              value={formData.avg_hr || ""}
              onChange={handleChange}
              className="input input-bordered w-full mt-2"
            />
          ) : (
            <span>{formData.avg_hr ? `${formData.avg_hr} bpm` : ""}</span>
          )}
        </div>
        {!isEditMode && <div className="spacer"></div>}
        <div>
          <strong>Equipment: </strong>
          {isEditMode ? (
            <EquipmentSelector
              equipment={formData.equipment}
              handleEquipmentChange={handleEquipmentChange}
              activeEquipmentList={activeEquipmentList}
            />
          ) : (
            <span>{formData.equipment || ""}</span>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center">
        {!isEditMode &&
          run?.timeArray?.length > 0 &&
          run?.velocityArray?.length > 0 && (
            <LineChartTimeVelocity
              xLabel={run.timeArray}
              yFunction={run.velocityArray}
              yLabel="Tempo (min/km)"
              yAxisReversed={true}
              color={"#00CDB7"}
            />
          )}
      </div>
    </>
  );
};

export default RunDetailsStatsAndForms;
