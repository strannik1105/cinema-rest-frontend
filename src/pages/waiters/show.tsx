import React from "react";
import {IResourceComponentsProps, useNavigation, useShow} from "@refinedev/core";
import {IMovie} from "@/interfaces/movie";
import {Card} from "primereact/card";
import {AddNavButton} from "@/components/navButtons/addNavButton";
import {EditNavButton} from "@/components/navButtons/editNavButton";
import {ListNavButton} from "@/components/navButtons/listNavButton";
import {IWaiter} from "@/interfaces/waiters";


export const WaiterDetail: React.FC<IResourceComponentsProps> = () => {
    const {queryResult} = useShow<IWaiter>();
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
                            <AddNavButton handleClick={() => create("waiter")}/>
                            <EditNavButton handleClick={() => edit("waiter", record.sid)}/>
                            <ListNavButton handleClick={() => list("waiter")}/>
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