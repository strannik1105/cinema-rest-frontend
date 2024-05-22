import React, {useState} from "react";
import {HttpError, IResourceComponentsProps, useForm, useNavigation} from "@refinedev/core";
import {IMovie, IMovieForm} from "@/interfaces/movie";
import {Card} from "primereact/card";
import {ListNavButton} from "@/components/navButtons/listNavButton";
import {InputText} from "primereact/inputtext";


export const MovieCreate: React.FC<IResourceComponentsProps> = () => {
    const {onFinish} = useForm<IMovie, HttpError, IMovieForm>({
        resource: "movies",
        action: "create",
        redirect: "list",
    });

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [genre, setGenre] = useState<string>("");


    const {list} = useNavigation();

    const onSubmit = (event: any) => {
        event.preventDefault();
        onFinish({
            name: name,
            description: description,
            genre: genre,
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
                <label htmlFor="name">Name</label>
                <InputText value={name} onChange={(e) => setName(e.target.value)}/>

                <label htmlFor="description">Description</label>
                <InputText value={description} onChange={(e) => setDescription(e.target.value)}/>

                <label htmlFor="genre">Genre</label>
                <InputText value={genre} onChange={(e) => setGenre(e.target.value)}/>


                <button type="submit">Submit</button>
            </form>
        </Card>
    )
}