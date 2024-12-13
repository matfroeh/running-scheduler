import { InputErrorBar } from "@/components/generic";
import { useState } from "react";

const ByDateRangeTab = () => {
    const [error, setError] = useState("Nothing to show yet");

    return (
        <div
            role="tabpanel"
            className="tab-content text-sm lg:text-base bg-base-200 border-accent rounded-r-2xl p-4 min-h-[75vh]"
        >
            <div className="flex flex-col">
                <div className="flex md:justify-center items-center flex-wrap gap-4">
                    <div className="gap-2">
                        <label className="" htmlFor="start-date">
                            From:
                        </label>
                        <input
                            type="date"
                            id="start-date"
                            name="start-date"
                            className="input input-sm md:input-md input-bordered ml-4"
                        />
                    </div>
                    <div className="gap-2">
                        <label htmlFor="end-date">To:</label>
                        <input
                            type="date"
                            id="end-date"
                            name="end-date"
                            className="input input-sm md:input-md input-bordered ml-4"
                        />
                    </div>
                    <button className="btn btn-sm md:btn-md btn-primary">
                        Select
                    </button>
                </div>
                <InputErrorBar error={error} />
            </div>
        </div>
    );
};

export default ByDateRangeTab;
