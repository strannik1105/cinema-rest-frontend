import {Header} from "@/pages/main/components/header";
import React from "react";


export const Check = () => {
     // @ts-ignore
    const bookings = JSON.parse(localStorage.getItem("bookings"))
    const a = bookings.at(-1)
     // @ts-ignore
    const totalPrice = JSON.parse(localStorage.getItem("totalPrice"))

    return (
        <>
            <Header/>
            <main className="main">
                <h2>Ваш заказ:</h2>
                <p className="text-lg">Пользователь: {a.user}</p>
                <p className="text-lg">Фильм: {a.film}</p>
                <p className="text-lg">Дата начала: {a.dateStart}</p>
                <p className="text-lg">Дата окончания: {a.dateEnd}</p>
                <p className="text-lg">Комната: {a.room}</p>
                <p className="text-lg">Еда: {a.food.map((el: any) => {
                    return (<p>{el.name}</p>)
                })}</p>
                <p className="text-lg">Итого: {totalPrice}</p>
            </main>

        </>
    )
}