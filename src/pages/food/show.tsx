import React from "react";
import {IResourceComponentsProps, useNavigation, useShow} from "@refinedev/core";
import {Card} from "primereact/card";
import {AddNavButton} from "@/components/navButtons/addNavButton";
import {ListNavButton} from "@/components/navButtons/listNavButton";
import {IFood} from "@/interfaces/food";


export const FoodDetail: React.FC<IResourceComponentsProps> = () => {

    const {queryResult} = useShow<IFood>();
    const {data} = queryResult;

    const record = data?.data;

    const {list, create} = useNavigation();

    if (record) {
        return (
            <Card
                className="shadow-1"
                title={
                    <div className="flex justify-content-between align-items-center justify-content-center">
                        <span className="text-3xl p-card-title">Просмотр контента</span>
                        <div className="flex gap-3">
                            <AddNavButton handleClick={() => create("food")}/>
                            <ListNavButton handleClick={() => list("food")}/>
                        </div>
                    </div>
                }
            >
                <p className="text-lg">Название: {record.name}</p>
                <p className="text-lg">Описание: {record.description}</p>
                <p className="text-lg">Цена: {record.price}</p>
                <p className="text-lg">Рецепт: {record.recipe}</p>

            </Card>
        )
    }
    return <Card/>
}