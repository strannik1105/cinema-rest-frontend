import {Button} from "primereact/button";
import React, {MouseEventHandler} from "react";


export const AddNavButton = ({handleClick}: {handleClick: MouseEventHandler}) => {
    return (
        <Button
            icon="pi pi-plus"
            label="Добавить"
            onClick={handleClick}
            severity="success"
        />
    )
}
