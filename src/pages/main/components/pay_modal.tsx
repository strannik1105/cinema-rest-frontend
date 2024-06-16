import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";


export const PayModal = () => {

    // @ts-ignore
    const bookings = JSON.parse(localStorage.getItem("bookings"))
    const a = bookings.at(-1)
    // @ts-ignore
    const totalPrice = JSON.parse(localStorage.getItem("totalPrice"))

    // @ts-ignore
    const userSid = localStorage.getItem("user_sid")
    console.log(userSid)


    const [user, setUser] = useState<any>();

    useEffect(() => {
        axios.get("http://localhost:8001/api/v1/users/" + userSid)
            .then(data => {
                console.log(data.data)
                setUser(() => data.data)
            })
    }, []);


    const navigate = useNavigate();
    const onPay = () => {
        navigate("/blist")
    }

    if (user) {
        return (
            <form className="payform-tinkoff" name="payform-tinkoff">
                <input className="payform-tinkoff-row" type="hidden" name="terminalkey" value="TinkoffBankTest"/>
                <input className="payform-tinkoff-row" type="hidden" name="frame" value="false"/>
                <input className="payform-tinkoff-row" type="hidden" name="language" value="ru"/>
                <input className="payform-tinkoff-row" type="text" placeholder="Сумма заказа" name="amount"
                       value={totalPrice}
                       required disabled/>
                <input className="payform-tinkoff-row" type="hidden" placeholder="Номер заказа" name="order"/>
                <input className="payform-tinkoff-row" type="text" placeholder="ФИО плательщика"
                       name="name" defaultValue={a.user}/>
                <input className="payform-tinkoff-row" type="email" placeholder="E-mail"
                       name="email" defaultValue={user.email}/>
                <input className="payform-tinkoff-row payform-tinkoff-btn" type="submit"
                       value="Оплатить" onClick={onPay}/>
            </form>
        )
    }
    return <form className="payform-tinkoff" name="payform-tinkoff"></form>

}