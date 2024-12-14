import { InputErrorBar } from "@/components/generic";

interface DateRangePickerProps {
    dates: {
        startDate: string;
        endDate: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: string;
}

const DateRangePicker = ({
    dates,
    handleChange,
    error,
}: DateRangePickerProps) => {
    return (
        <div className="flex flex-col">
            <div className="flex md:justify-center items-center flex-wrap gap-4">
                <div className="gap-2">
                    <label className="" htmlFor="start-date">
                        From:
                    </label>
                    <input
                        type="date"
                        value={dates.startDate}
                        onChange={handleChange}
                        id="start-date"
                        name="startDate"
                        className="input input-xs md:input-md input-bordered ml-4"
                    />
                </div>
                <div className="gap-2">
                    <label htmlFor="end-date">To:</label>
                    <input
                        type="date"
                        value={dates.endDate}
                        onChange={handleChange}
                        id="end-date"
                        name="endDate"
                        className="input input-xs md:input-md input-bordered ml-4"
                    />
                </div>
                {/* <button className="btn btn-sm md:btn-md btn-primary">
                    Select
                </button> */}
            </div>
            <InputErrorBar error={error} />
        </div>
    );
};

export default DateRangePicker;
