import {IResourceComponentsProps, useNavigation, useShow} from "@refinedev/core";
import {IMovie} from "@/interfaces/movie";
import React from "react";
import {Card} from "primereact/card";
import {AddNavButton} from "@/components/navButtons/addNavButton";
import {EditNavButton} from "@/components/navButtons/editNavButton";
import {ListNavButton} from "@/components/navButtons/listNavButton";


export const MovieDetail: React.FC<IResourceComponentsProps> = () => {
    const {queryResult} = useShow<IMovie>();
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
                            <AddNavButton handleClick={() => create("movies")}/>
                            <EditNavButton handleClick={() => edit("movies", record.sid)}/>
                            <ListNavButton handleClick={() => list("movies")}/>
                        </div>
                    </div>
                }
            >
                <p className="text-lg">Название: {record.name}</p>
                <p className="text-lg">Описание: {record.description}</p>
                <p className="text-lg">Жанр: {record.genre}</p>
                <p className="text-lg">Год: {record.year}</p>
                <p className="text-lg">Длительность в минутах: {record.duration}</p>

            </Card>
        )
    }
    return <Card/>

}