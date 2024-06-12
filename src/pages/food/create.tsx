import React, {useState} from "react";
import {IResourceComponentsProps, useNavigation} from "@refinedev/core";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {ListNavButton} from "@/components/navButtons/listNavButton";
import {useNavigate} from "react-router-dom";
import {Button} from "primereact/button";
import axios from "axios";


export const FoodCreate: React.FC<IResourceComponentsProps> = () => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [recipe, setRecipe] = useState<string>("");

    const {list} = useNavigation();

    const navigate = useNavigate();

    const [newSid, setNewSid] = useState<string>();
    const [image, setImage] = useState();

    const onSubmit = (event: any) => {
        event.preventDefault();

        axios.post("http://127.0.0.1:8001/api/v1/food/", {
            name: name,
            description: description,
            price: Number(price),
            recipe: recipe
        })
            .then(resp => upload(resp.data.sid))
        navigate("/food/")
    }

    const upload = (sid: string) => {
        const formData = new FormData()
        // @ts-ignore
        formData.append('new_food_image', image)
        console.log(formData)
        const config = {
            headers: {'content-type': 'multipart/form-data'}
        }
         axios.post("http://127.0.0.1:8001/api/v1/food_images/" + sid, formData, config)
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
                    <span className="text-3xl p-card-title">Добавление записи</span>
                    <div className="flex gap-3">
                        <ListNavButton handleClick={() => list("food")}/>
                    </div>

                </div>
            }
        >
            <form action="" onSubmit={onSubmit} className="flex flex-column gap-2">
                <label htmlFor="name">Название</label>
                <InputText value={name} onChange={(e) => setName(e.target.value)}/>

                <label htmlFor="description">Описание</label>
                <InputText value={description} onChange={(e) => setDescription(e.target.value)}/>

                <label htmlFor="price">Цена</label>
                <InputText keyfilter="int" value={price} onChange={(e) => setPrice(e.target.value)}/>

                <label htmlFor="price">Рецепт</label>
                <InputText value={recipe} onChange={(e) => setRecipe(e.target.value)}/>

                <label htmlFor="price">Изображение</label>
                <input id="uploadImage"
                       name="uploadImage"
                       type="file"
                       accept="image/png, image/jpeg"
                       className="text-base text-color w-full md:w-20rem"
                       onChange={onUploadImage}/>


            </form>
        </Card>
    )
}