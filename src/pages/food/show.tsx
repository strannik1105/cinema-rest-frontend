import React from "react";
import {IResourceComponentsProps, useNavigation} from "@refinedev/core";
import {Card} from "primereact/card";
import {AddNavButton} from "@/components/navButtons/addNavButton";
import {ListNavButton} from "@/components/navButtons/listNavButton";
import {getById} from "@/pages/food/service";
import {useParams} from "react-router-dom";


export const FoodDetail: React.FC<IResourceComponentsProps> = () => {

    const params = useParams();

    const a = getById(params.id);


    const {list, create} = useNavigation();

    if (a) {
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
                <p className="text-lg">Название: {a?.name}</p>
                <p className="text-lg">Описание: {a?.description}</p>
                <p className="text-lg">Цена: {a?.price}</p>

            </Card>
        )
    }
    return <Card/>
}