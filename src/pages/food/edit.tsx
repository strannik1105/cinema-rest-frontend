import React from "react";
import {IResourceComponentsProps, useForm, useNavigation} from "@refinedev/core";
import {useParams} from "react-router-dom";
import {IFood} from "@/interfaces/food";
import {Card} from "primereact/card";
import {AddNavButton} from "@/components/navButtons/addNavButton";
import {ListNavButton} from "@/components/navButtons/listNavButton";
import {Button} from "primereact/button";


export const FoodEdit: React.FC<IResourceComponentsProps> = () => {
    const params = useParams();

    const {
        queryResult, onFinish
    } = useForm<IFood>({
        resource: "food",
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
                price: Number(data.price),
                recipe: data.recipe,
            }
        );
    };

     if (record) {
          return (
            <Card
                className="shadow-1"
                title={
                    <div className="flex justify-content-between align-items-center justify-content-center">
                        <span className="text-3xl p-card-title">Редактирование записи</span>
                        <div className="flex gap-3">
                            <AddNavButton handleClick={() => create("food")}/>
                            <ListNavButton handleClick={() => list("food")}/>
                        </div>
                    </div>
                }
            >
                <form action="" onSubmit={onSubmit} className="flex flex-column gap-2">
                    <p className="text-field">
                        <label htmlFor="name">Название</label>
                        <input type="text" id="name" name="name" defaultValue={record?.name}/>
                    </p>
                    <p className="text-field">
                        <label htmlFor="description">Описание</label>
                        <textarea
                            id="description"
                            name="description"
                            defaultValue={record?.description}
                        />
                    </p>
                    <p className="text-field">
                        <label htmlFor="price">Цена</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            defaultValue={record?.price}
                        />
                    </p>
                    <p className="text-field">
                        <label htmlFor="recipe">Рецепт</label>
                        <textarea
                            id="recipe"
                            name="recipe"
                            defaultValue={record?.recipe}
                        />
                    </p>
                    <Button label="Изменить запись"/>
                </form>
            </Card>
          );
     }
    return <Card title="Редактирование записи"></Card>
}