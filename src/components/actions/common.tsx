import {Button} from "primereact/button";
import React from "react";

interface IBaseIcon {
    icon: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

const BaseIcon = ({icon, onClick, className}: IBaseIcon) => {
    return (
        <Button
            className={className}
            icon={icon}
            rounded
            text
            severity="secondary"
            onClick={onClick}
        />
    )
}

export const EditIcon = ({icon, onClick}: IBaseIcon) => {
    return <BaseIcon icon={icon} onClick={onClick}/>;
}

export const ShowIcon = ({icon, onClick}: IBaseIcon) => {
    return <BaseIcon icon={icon} onClick={onClick}/>;
}

export const DeleteIcon = ({icon, onClick, className}: IBaseIcon) => {
    return <BaseIcon icon={icon} onClick={onClick} className={className}/>;
}
