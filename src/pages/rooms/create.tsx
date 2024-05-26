import React, {useState} from "react";
import {HttpError, IResourceComponentsProps, useForm, useNavigation} from "@refinedev/core";
import {IRoom, IRoomForm} from "@/interfaces/room";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {ListNavButton} from "@/components/navButtons/listNavButton";
import {Button} from "primereact/button";


export const RoomCreate: React.FC<IResourceComponentsProps> = () => {
    const {onFinish} = useForm<IRoom, HttpError, IRoomForm>({
        resource: "rooms",
        action: "create",
        redirect: "list",
    });

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [cost_per_hour, setCost_per_hour] = useState<string>("");
    const [x, setX] = useState<string>("");
    const [y, setY] = useState<string>("");
    const [width, setWidth] = useState<string>("");
    const [height, setHeight] = useState<string>("");

    const {list} = useNavigation();

    const onSubmit = (event: any) => {
        event.preventDefault();
        // Using FormData to get the form values and convert it to an object.
        const data = Object.fromEntries(new FormData(event.target).entries());
        // Calling onFinish to submit with the data we've collected from the form.
        onFinish({
            name: name,
            description: description,
            cost_per_hour: Number(cost_per_hour),
            x: Number(x),
            y: Number(y),
            width: Number(width),
            height: Number(height),
        });
    }

    return (
        <Card
            className="shadow-1"
            title={
                <div className="flex justify-content-between align-items-center justify-content-center">
                    <span className="text-3xl p-card-title">Список контента</span>
                    <div className="flex gap-3">
                        <ListNavButton handleClick={() => list("rooms")}/>
                    </div>

                </div>
            }

        >
            <form action="" onSubmit={onSubmit} className="flex flex-column gap-2">
                <p className="text-field">
                    <label htmlFor="name">Название</label>
                    <InputText value={name} onChange={(e) => setName(e.target.value)}/>
                </p>

                <p className="text-field">
                    <label htmlFor="description">Описание</label>
                    <InputText value={description} onChange={(e) => setDescription(e.target.value)}/>
                </p>

                <p className="text-field">
                    <label htmlFor="price">Цена в час</label>
                    <InputText keyfilter="int" value={cost_per_hour}
                               onChange={(e) => setCost_per_hour(e.target.value)}/>
                </p>
                <p className="text-field">
                    <label htmlFor="x">X</label>
                    <InputText keyfilter="int" value={x} onChange={(e) => setX(e.target.value)}/>
                </p>

                <p className="text-field">
                    <label htmlFor="y">Y</label>
                    <InputText keyfilter="int" value={y} onChange={(e) => setY(e.target.value)}/>
                </p>

                <p className="text-field">
                    <label htmlFor="width">Ширина</label>
                    <InputText keyfilter="int" value={width} onChange={(e) => setWidth(e.target.value)}/>
                </p>

                <p className="text-field">
                    <label htmlFor="height">Длина</label>
                    <InputText keyfilter="int" value={height} onChange={(e) => setHeight(e.target.value)}/>
                </p>

                <Button label="Добавить запись"/>
            </form>
        </Card>
    )
}