import {IResourceComponentsProps, useNavigation, useShow} from "@refinedev/core";
import React from "react";
import {Card} from "primereact/card";
import {EditNavButton} from "@/components/navButtons/editNavButton";
import {AddNavButton} from "@/components/navButtons/addNavButton";
import {ListNavButton} from "@/components/navButtons/listNavButton";
import {ICook} from "@/interfaces/cook";


export const CookDetail: React.FC<IResourceComponentsProps> = () => {
    const {queryResult} = useShow<ICook>();
    const {data} = queryResult;

    const record = data?.data;

    const {edit, list, create} = useNavigation();

    if (record) {
        return (
            <Card
                className="shadow-1"
                title={
                    <div className="flex justify-content-between align-items-center justify-content-center">
                        <span className="text-3xl p-card-title">Просмотр записи</span>
                        <div className="flex gap-3">
                            <AddNavButton handleClick={() => create("cook")}/>
                            <EditNavButton handleClick={() => edit("cook", record.sid)}/>
                            <ListNavButton handleClick={() => list("cook")}/>
                        </div>
                    </div>
                }
            >
                <p className="text-lg">Название: {record.name}</p>
                <p className="text-lg">Описание: {record.surname}</p>

            </Card>
        )
    }
    return <Card/>
}