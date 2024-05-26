import {useParams} from "react-router-dom";
import {useNavigation} from "@refinedev/core";
import {Card} from "primereact/card";
import {ListNavButton} from "@/components/navButtons/listNavButton";
import React, {useEffect, useState} from "react";
import {Dropdown} from "primereact/dropdown";
import axios from "axios";
import {Button} from "primereact/button";


export const BookingEdit = () => {
    const params = useParams()
    // @ts-ignore
    const bookings = JSON.parse(localStorage.getItem("bookings"))
    const curr_obj = bookings.filter((el: any) => el.id == params.id)

    const [waiters, setWaiters] = useState();
    const [cooks, setCooks] = useState();

    const [selectedWaiter, setSelectedWaiter] = useState();
    const [selectedCook, setSelectedCook] = useState();

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/v1/cook/")
            .then(res => {
                setCooks(res.data)
            })

        axios.get("http://127.0.0.1:8000/api/v1/waiter/")
            .then(res => {
                setWaiters(res.data)
            })

    }, [])

    // @ts-ignore
    const waitersChoices = waiters?.map((el: any) => {
        return {name: `${el.name} ${el.surname}`, code: el.sid}
    })

    // @ts-ignore
    const cooksChoices = cooks?.map((el: any) => {
        return {name: `${el.name} ${el.surname}`, code: el.sid}
    })

    const {list} = useNavigation();

    const a = curr_obj[0]

    const onChange = () => {
        // @ts-ignore
        const bookings = JSON.parse(localStorage.getItem("bookings"))
        const curr_obj = bookings.filter((el: any) => el.id == params.id)
        const v = curr_obj[0]

        // @ts-ignore
        v.cook = selectedCook.name
        // @ts-ignore
        v.waiter = selectedWaiter.name

        localStorage.setItem('bookings', JSON.stringify(bookings));
    }

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

            <Dropdown value={selectedWaiter} onChange={(e) => setSelectedWaiter(e.value)} options={waitersChoices}
                      optionLabel="name"
                      placeholder="Выберите официанта" className="w-full md:w-14rem"/>
            <br/>
            <br/>
            <Dropdown value={selectedCook} onChange={(e) => setSelectedCook(e.value)} options={cooksChoices}
                      optionLabel="name"
                      placeholder="Выберите повара" className="w-full md:w-14rem"/>
            <br/>
            <br/>
            <Button onClick={onChange} label="Изменить запись"/>
        </Card>
    )
}
