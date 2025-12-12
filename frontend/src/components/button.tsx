import React from "react";

export enum ButtonColor {
    PRIMARY,
    INACTIVE,
    WARNING
}

export default function Button(props: { label: string, onCLick: Function, color?: ButtonColor }) {

    let color;
    switch (props.color) {
        case ButtonColor.INACTIVE: color = "bg-gray-500 hover:bg-gray-600"; break;
        case ButtonColor.WARNING: color = "bg-red-500 hover:bg-red-600"; break;
        case ButtonColor.PRIMARY:
        default: color = "bg-indigo-500 hover:bg-indigo-600"; break;
    }

    return (
        <button onClick={() => props.onCLick()}
                className={`px-4 py-2 rounded-lg text-white shadow-md hover:shadow-lg focus:outline-none cursor-pointer mt-auto ${color}`}>
            {props.label}
        </button>
    );
}