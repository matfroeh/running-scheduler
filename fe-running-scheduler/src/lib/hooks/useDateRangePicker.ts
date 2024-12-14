import { useState, useRef } from "react";
import { dateToDatePickerFormat } from "@/lib/utils";
import dayjs from "dayjs";

export const useDateRangePicker = () => {
    const [error, setError] = useState("");
    // set last 4 weeks as default date range
    const [dates, setDates] = useState({
        startDate: dateToDatePickerFormat(dayjs().subtract(27, "day")),
        endDate: dateToDatePickerFormat(),
    });
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // handle change with a short delay though the standard date picker has not the best UX (as it fires on every key press, month change etc.)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // clean up previous timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // set new timeout
        timeoutRef.current = setTimeout(() => {
            if (name === "startDate") {
                if (dayjs(value) > dayjs(dates.endDate)) {
                    setError("Start date cannot be after end date");
                    return;
                }
            } else {
                if (dayjs(value) < dayjs(dates.startDate)) {
                    setError("End date cannot be before start date");
                    return;
                }
            }

            setError("");

            setDates((prev) => ({
                ...prev,
                [name]: value,
            }));
        }, 750);
    };

    return {
        error,
        dates,
        handleChange,
    };
};
