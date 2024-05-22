import {Button} from "primereact/button";
import {MouseEventHandler} from "react";


export const EditNavButton = ({handleClick}: {handleClick: MouseEventHandler}) => {
    return (
        <Button
            icon="pi pi-pencil"
            label="Изменить"
            onClick={handleClick}
        />
    )
}
