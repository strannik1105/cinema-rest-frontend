import React from "react";
import {IResourceComponentsProps, useNavigation, useShow} from "@refinedev/core";
import {IRoom} from "@/interfaces/room";
import {Card} from "primereact/card";
import {AddNavButton} from "@/components/navButtons/addNavButton";
import {EditNavButton} from "@/components/navButtons/editNavButton";
import {ListNavButton} from "@/components/navButtons/listNavButton";


export const RoomDetail: React.FC<IResourceComponentsProps> = () => {
    const {queryResult} = useShow<IRoom>();
    const {data} = queryResult;

    const record = data?.data;

    const {edit, list, create} = useNavigation();

    if (record) {
        return (
            <Card
                className="shadow-1"
                title={
                    <div className="flex justify-content-between align-items-center justify-content-center">
                        <span className="text-3xl p-card-title">Просмотр контента</span>
                        <div className="flex gap-3">
                            <AddNavButton handleClick={() => create("rooms")}/>
                            <EditNavButton handleClick={() => edit("rooms", record.sid)}/>
                            <ListNavButton handleClick={() => list("rooms")}/>
                        </div>
                    </div>
                }
            >
                <p className="text-lg">Название: {record.name}</p>
                <p className="text-lg">Описание: {record.description}</p>
                <p className="text-lg">Цена в час: {record.cost_per_hour}</p>
                <p className="text-lg">Координата x: {record.x}</p>
                <p className="text-lg">Координата y: {record.y}</p>
                <p className="text-lg">Ширина: {record.width}</p>
                <p className="text-lg">Высота: {record.height}</p>

            </Card>
        )
    }
    return <Card/>
}