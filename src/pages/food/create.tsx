import React, {useState} from "react";
import {HttpError, IResourceComponentsProps, useForm, useNavigation} from "@refinedev/core";
import {IRoom, IRoomForm} from "@/interfaces/room";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {ListNavButton} from "@/components/navButtons/listNavButton";
import {IFood, IFoodForm} from "@/interfaces/food";
import {addData} from "@/pages/food/service";
import {useNavigate} from "react-router-dom";


export const FoodCreate: React.FC<IResourceComponentsProps> = () => {
    const {onFinish} = useForm<IFood, HttpError, IFoodForm>({
        resource: "food",
        action: "create",
        redirect: "list",
    });

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");

    const {list} = useNavigation();

    const navigate = useNavigate();

    const onSubmit = (event: any) => {
        event.preventDefault();
        // Using FormData to get the form values and convert it to an object.
        const data = Object.fromEntries(new FormData(event.target).entries());
        // Calling onFinish to submit with the data we've collected from the form.
        addData({
            name: name,
            description: description,
            price: price
        })
        navigate("/food/")
    }

    return (
        <Card
            className="shadow-1"
            title={
                <div className="flex justify-content-between align-items-center justify-content-center">
                    <span className="text-3xl p-card-title">Список контента</span>
                    <div className="flex gap-3">
                        <ListNavButton handleClick={() => list("food")}/>
                    </div>

                </div>
            }

        >
            <form action="" onSubmit={onSubmit} className="flex flex-column gap-2">
                <label htmlFor="name">Name</label>
                <InputText value={name} onChange={(e) => setName(e.target.value)}/>

                <label htmlFor="description">Description</label>
                <InputText value={description} onChange={(e) => setDescription(e.target.value)}/>

                <label htmlFor="price">Price</label>
                <InputText keyfilter="int" value={price} onChange={(e) => setPrice(e.target.value)}/>

                <button type="submit">Submit</button>
            </form>
        </Card>
    )
}