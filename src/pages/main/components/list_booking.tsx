import {Header} from "@/pages/main/components/header";
import React from "react";


export const BList = () => {
    // @ts-ignore
    const bookings = JSON.parse(localStorage.getItem("bookings"));
    // @ts-ignore
    const user = localStorage.getItem("user");
    const a = bookings.filter((el: any) => el.user == user)

    return (
        <>
            <Header/>
            <main className="main">
                <h2>Моя бронь и заказы</h2>

                {a.map((el: any) => {
                    return (
                        <>
                            <p className="text-lg">Пользователь: {el.user}</p>
                            <p className="text-lg">Фильм: {el.film}</p>
                            <p className="text-lg">Дата начала: {el.dateStart}</p>
                            <p className="text-lg">Дата окончания: {el.dateEnd}</p>
                            <p className="text-lg">Комната: {el.room}</p>
                            <p className="text-lg">Еда: {el.food.map((el2: any) => {
                                return (<p>{el2.name}</p>)
                            })}</p>
                            <hr/>
                        </>

                    )
                })}
            </main>

        </>
    )
}