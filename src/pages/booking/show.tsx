import React, {useEffect, useState} from "react";
import {IResourceComponentsProps, useNavigation, useShow} from "@refinedev/core";
import {useParams} from "react-router-dom";
import {Card} from "primereact/card";
import {ListNavButton} from "@/components/navButtons/listNavButton";
import {format} from "date-fns";
import axios from "axios";


export const BookingDetail: React.FC<IResourceComponentsProps> = () => {

    const {queryResult} = useShow<any>();
    const {data} = queryResult;
    const record = data?.data;

    const params = useParams()
    // @ts-ignore
    const bookings = JSON.parse(localStorage.getItem("bookings"))
    const curr_obj = bookings.filter((el: any) => el.booking_sid == params.id)

    const {list} = useNavigation();

    const [user, setUser] = useState<any>();

    const a = bookings[0]

    const formatDateTime = (value: string) => {
        return format(value, 'dd.MM.yyyy HH:mm:ss')
    }

    const dateTemplate = (dateValue: string) => {
        return formatDateTime(dateValue)
    }

    const [waiter, setWaiter] = useState<any>();
    const [cook, setCook] = useState<any>();
    const [food, setFood] = useState<any>([]);

    const getWaiter = (waiter_sid: string) => {
        axios.get("http://localhost:8001/api/v1/waiter/" + waiter_sid)
            .then(data => {
                setWaiter(`${data.data.name} ${data.data.surname}`)
            })
    }

    const getCook = (cook_sid: string) => {
        axios.get("http://localhost:8001/api/v1/cook/" + cook_sid)
            .then(data => {
                setCook(`${data.data.name} ${data.data.surname}`)
            })
    }

    useEffect(() => {
        curr_obj[0].food.forEach((el: any) => {
            axios.get("http://localhost:8001/api/v1/food/" + el.code)
                .then(data => {
                    food.push(data.data)
                })
        })
    }, []);


    getWaiter(record?.waiter_sid)
    getCook(record?.cook_sid)

    const displayFood = (foodObj: any) => {
        let res = "";
        for (let i = 0; i < foodObj.length / 2; i++) {
            res += `${foodObj[i].name} ${foodObj[i].recipe}; \n`
        }
        return res;
    }

    if (record) {
        return (
            <Card
                className="shadow-1"
                title={
                    <div className="flex justify-content-between align-items-center justify-content-center">
                        <span className="text-3xl p-card-title">Просмотр записи</span>
                        <div className="flex gap-3">
                            <ListNavButton handleClick={() => list("booking")}/>
                        </div>
                    </div>
                }
            >
                <p className="text-lg">Пользователь: {curr_obj[0].user}</p>
                <p className="text-lg">Фильм: {curr_obj[0].film}</p>
                <p className="text-lg">Комната: {curr_obj[0].room}</p>
                <p className="text-lg">Дата начала: {dateTemplate(record.datetime_start)}</p>
                <p className="text-lg">Дата окончания: {dateTemplate(record.datetime_end)}</p>
                <p className="text-lg">Официант: {waiter}</p>
                <p className="text-lg">Повар: {cook}</p>
                <p className="text-lg">Заказ: {displayFood(food)}</p>
            </Card>
        )
    }
    return <Card/>

}