import React from "react";

interface TabHeaderProps {
    name: string;
    label: string;
    checked: boolean;
}

const TabHeader = ({ name, label, checked = false }: TabHeaderProps) => {
    return (
        <input
            type="radio"
            name={name}
            role="tab"
            className="tab text-nowrap text-base font-semibold bg-base-100"
            defaultChecked={checked}
            aria-label={label}
        />
    );
};

export default TabHeader;
