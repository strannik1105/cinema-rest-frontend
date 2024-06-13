import {Header} from "@/pages/main/components/header";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {format} from "date-fns";


export const BList = () => {

    const [bookings, setBookings] = useState<any>();

    const user_sid = localStorage.getItem("user_sid")
    const user = localStorage.getItem("user")

    useEffect(() => {
        axios.get(`http://localhost:8001/api/v1/booking/${user_sid}/by/user`)
            .then(data => setBookings(data.data))
    }, []);

    const [foods, setFoods] = useState<any>();

    useEffect(() => {
        axios.get("http://localhost:8001/api/v1/food")
            .then(res => {
                setFoods(res.data)
            })
    }, []);

    const foodListBodyTemplate = (rowData: any) => {
        if (foods) {
            // @ts-ignore
            const bookings = JSON.parse(localStorage.getItem("bookings"));

            const foodObj = bookings.find((el: any) => el.booking_sid == rowData.sid);
            console.log(rowData)
            let res = "";
            foodObj.food.forEach((el: any) => {
                res += el.name
                res += " "
            })
            return res
        }
    }


    const formatDateTime = (value: string) => {
        return format(value, 'dd.MM.yyyy HH:mm:ss')
    }

    const dateTemplate = (dateValue: string) => {
        return formatDateTime(dateValue)
    }

    const dateStartTemplate = (rowData: any) => {
        // @ts-ignore
        const bookings = JSON.parse(localStorage.getItem("bookings"));
        const filmName = bookings.find((el: any) => el.booking_sid == rowData.sid)

        console.log(rowData)

        return filmName.dateStart
    }

    const dateEndTemplate = (rowData: any) => {
        // @ts-ignore
        const bookings = JSON.parse(localStorage.getItem("bookings"));
        const filmName = bookings.find((el: any) => el.booking_sid == rowData.sid)

        return filmName.dateEnd
    }

    if (bookings) {
        return (
            <div className="site_content">
                <Header/>
                <main className="main">
                    <h2>Моя бронь и заказы</h2>

                    {bookings.map((el: any) => {
                        return (
                            <>
                                <p className="text-lg">Пользователь: {user}</p>
                                <p className="text-lg">Дата начала: {dateStartTemplate(el)}</p>
                                <p className="text-lg">Дата окончания: {dateEndTemplate(el)}</p>
                                <p className="text-lg">Еда: {foodListBodyTemplate(el)}</p>
                                <hr/>
                            </>

                        )
                    })}
                </main>
                <footer className="footer">
                    <p>Адрес: ул Красная 135</p>
                    <p>Номер телефона: 89186968405</p>
                </footer>
            </div>
        )
    }

    return <></>

}