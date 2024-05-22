import {IResourceComponentsProps, useForm, useNavigation} from "@refinedev/core";
import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {IRoom, IRoomForm} from "@/interfaces/room";
import {Card} from "primereact/card";
import {AddNavButton} from "@/components/navButtons/addNavButton";
import {ListNavButton} from "@/components/navButtons/listNavButton";


export const RoomEdit: React.FC<IResourceComponentsProps> = () => {
    const params = useParams()

    const {
        queryResult, onFinish
    } = useForm<IRoom>({
        resource: "rooms",
        action: "edit",
        redirect: "list",
        id: params.id
    });

    const {list, create} = useNavigation();

    const record = queryResult?.data?.data;

    const onSubmit = (event: any) => {
        event.preventDefault();

        const data = Object.fromEntries(new FormData(event.target).entries());

        console.log({
                name: data.name,
                description: data.description,
                price: Number(data.price),
                x: Number(data.x),
                y: Number(data.y),
                width: Number(data.width),
                height: Number(data.height),
            })
        onFinish({
                name: data.name,
                description: data.description,
                cost_per_hour: Number(data.cost_per_hour),
                x: Number(data.x),
                y: Number(data.y),
                width: Number(data.width),
                height: Number(data.height),

            }
        );
    };

    if (record) {
        return (
            <Card
                className="shadow-1"
                title={
                    <div className="flex justify-content-between align-items-center justify-content-center">
                        <span className="text-3xl p-card-title">Изменение контента</span>
                        <div className="flex gap-3">
                            <AddNavButton handleClick={() => create("rooms")}/>
                            <ListNavButton handleClick={() => list("rooms")}/>
                        </div>
                    </div>
                }
            >
                <form action="" onSubmit={onSubmit} className="flex flex-column gap-2">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" defaultValue={record?.name}/>

                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        defaultValue={record?.description}
                    />

                    <label htmlFor="cost_per_hour">Price</label>
                    <input
                        type="text"
                        id="cost_per_hour"
                        name="cost_per_hour"
                        defaultValue={record?.cost_per_hour}
                    />

                    <label htmlFor="x">X</label>
                    <input type="text" id="x"
                           name="x"
                           defaultValue={record?.x}
                    />

                    <label htmlFor="y">Y</label>
                    <input type="text" id="y"
                           name="y"
                           pattern="\d*.?\d*"
                           defaultValue={record?.y}
                    />

                    <label htmlFor="width">Width</label>
                    <input type="text" id="width"
                           name="width"
                           pattern="\d*.?\d*"
                           defaultValue={record?.width}
                    />

                    <label htmlFor="height">height</label>
                    <input type="text" id="height"
                           name="height"
                           pattern="\d*.?\d*"
                           defaultValue={record?.height}
                    />

                    <button type="submit">Submit</button>
                </form>
            </Card>
        );

    }
    return <Card title="Редактирование комнаты"></Card>
}