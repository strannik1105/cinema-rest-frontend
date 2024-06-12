import React from "react";
import {IResourceComponentsProps, useForm, useNavigation} from "@refinedev/core";
import {useParams} from "react-router-dom";
import {Card} from "primereact/card";
import {AddNavButton} from "@/components/navButtons/addNavButton";
import {ListNavButton} from "@/components/navButtons/listNavButton";
import {IMovie} from "@/interfaces/movie";
import {Button} from "primereact/button";


export const MovieEdit: React.FC<IResourceComponentsProps> = () => {
    const params = useParams()

    const {
        queryResult, onFinish
    } = useForm<IMovie>({
        resource: "movies",
        action: "edit",
        redirect: "list",
        id: params.id
    });

    const {list, create} = useNavigation();

    const record = queryResult?.data?.data;

    const onSubmit = (event: any) => {
        event.preventDefault();

        const data = Object.fromEntries(new FormData(event.target).entries());

        onFinish({
                name: data.name,
                description: data.description,
                genre: data.genre,
                year: Number(data.year),
                duration: Number(data.duration),
            }
        );
    };

    if (record) {
        return (
            <Card
                className="shadow-1"
                title={
                    <div className="flex justify-content-between align-items-center justify-content-center">
                        <span className="text-3xl p-card-title">Изменение фильма</span>
                        <div className="flex gap-3">
                            <AddNavButton handleClick={() => create("movies")}/>
                            <ListNavButton handleClick={() => list("movies")}/>
                        </div>
                    </div>
                }
            >
                <form action="" onSubmit={onSubmit} className="flex flex-column gap-2">
                    <label htmlFor="name">Название</label>
                    <input type="text" id="name" name="name" defaultValue={record?.name}/>

                    <label htmlFor="description">Описание</label>
                    <textarea
                        id="description"
                        name="description"
                        defaultValue={record?.description}
                    />

                    <label htmlFor="genre">Жанр</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        defaultValue={record?.genre}
                    />

                    <label htmlFor="year">Год</label>
                    <input
                        type="text"
                        id="year"
                        name="year"
                        defaultValue={record?.year}
                    />
                    <label htmlFor="duration">Длительность в минутах</label>
                    <input
                        type="text"
                        id="duration"
                        name="duration"
                        defaultValue={record?.duration}
                    />
                    <Button label="Изменить запись"/>
                </form>
            </Card>
        );

    }
    return <Card title="Редактирование фильма"></Card>
}