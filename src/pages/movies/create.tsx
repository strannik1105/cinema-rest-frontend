import React, {useState} from "react";
import {HttpError, IResourceComponentsProps, useForm, useNavigation} from "@refinedev/core";
import {IMovie, IMovieForm} from "@/interfaces/movie";
import {Card} from "primereact/card";
import {ListNavButton} from "@/components/navButtons/listNavButton";
import {InputText} from "primereact/inputtext";
import {MovieImageUpload} from "@/pages/movies/image_upload";
import {Button} from "primereact/button";
import axios from "axios";
import {useNavigate} from "react-router-dom";


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

     const navigate = useNavigate();

    const [newSid, setNewSid] = useState<string>();
    const [image, setImage] = useState();

    const onSubmit = (event: any) => {
       event.preventDefault();

        axios.post("http://127.0.0.1:8001/api/v1/movies/", {
            name: name,
            description: description,
            genre: genre
        })
            .then(resp => upload(resp.data.sid))

        console.log(localStorage.getItem("newId"))

        navigate("/movies/")
    }

    const upload = (sid: string) => {
        const formData = new FormData()
        // @ts-ignore
        formData.append('new_movie_image', image)
        console.log(formData)
        const config = {
            headers: {'content-type': 'multipart/form-data'}
        }
        axios.post("http://127.0.0.1:8001/api/v1/movies_images/" + sid, formData, config)
            .then(resp => setNewSid(resp.data))
    }

    const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        setImage(e?.target?.files[0])
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
                <label htmlFor="name">Название</label>
                <InputText value={name} onChange={(e) => setName(e.target.value)}/>

                <label htmlFor="description">Описание</label>
                <InputText value={description} onChange={(e) => setDescription(e.target.value)}/>

                <label htmlFor="genre">Жанр</label>
                <InputText value={genre} onChange={(e) => setGenre(e.target.value)}/>

                <label htmlFor="price">Изображение</label>
                <input id="uploadImage"
                       name="uploadImage"
                       type="file"
                       accept="image/png, image/jpeg"
                       className="text-base text-color w-full md:w-20rem"
                       onChange={onUploadImage}/>
                <Button label="Добавить запись"/>
            </form>
        </Card>
    )
}