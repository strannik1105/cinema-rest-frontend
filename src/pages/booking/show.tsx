import React from "react";
import {IResourceComponentsProps, useNavigation} from "@refinedev/core";
import {useParams} from "react-router-dom";
import {Card} from "primereact/card";
import {ListNavButton} from "@/components/navButtons/listNavButton";


export const BookingDetail: React.FC<IResourceComponentsProps> = () => {

    const params = useParams()
    // @ts-ignore
    const bookings = JSON.parse(localStorage.getItem("bookings"))
    const curr_obj = bookings.filter((el: any) => el.id == params.id)

    const {list} = useNavigation();

    const a = curr_obj[0]

    return (
            <Card
                className="shadow-1"
                title={
                    <div className="flex justify-content-between align-items-center justify-content-center">
                        <span className="text-3xl p-card-title">Просмотр записи</span>
                        <div className="flex gap-3">
                            <ListNavButton handleClick={() => list("bookings")}/>
                        </div>
                    </div>
                }
            >
                <p className="text-lg">Пользователь: {a.user}</p>
                <p className="text-lg">Фильм: {a.film}</p>
                <p className="text-lg">Дата начала: {a.dateStart}</p>
                <p className="text-lg">Дата окончания: {a.dateEnd}</p>
                <p className="text-lg">Комната: {a.room}</p>
                <p className="text-lg">Еда: {a.food.map((el: any) => {
                    return (<p>{el.name}</p>)
                })}</p>


            </Card>
        )
}