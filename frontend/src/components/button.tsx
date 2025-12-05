import React from "react";

export enum ButtonColor {
    PRIMARY,
    INACTIVE,
    WARNING
}

export default function Button(props: { label: string, onCLick: Function, color?: ButtonColor }) {

    let color;
    switch (props.color) {
        case ButtonColor.PRIMARY || undefined: color = "indigo"; break;
        case ButtonColor.INACTIVE: color = "gray"; break;
        case ButtonColor.WARNING: color = "red"; break;
    }
    const colorClass = `bg-${color}-500 hover:bg-${color}-600`;

    return (
        <button onClick={() => props.onCLick()}
                className={`${colorClass} px-4 py-2 rounded-lg text-white shadow-md hover:shadow-lg focus:outline-none cursor-pointer mt-auto`}>
            {props.label}
        </button>
    );
}