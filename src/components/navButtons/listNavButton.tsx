import {Button} from "primereact/button";
import {MouseEventHandler} from "react";


export const ListNavButton = ({handleClick}: {handleClick: MouseEventHandler}) => {
    return (
        <Button
            icon="pi pi-backward"
            label="К списку"
            onClick={handleClick}
            severity="secondary"
        />
    )
}
