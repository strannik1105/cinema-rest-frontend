import React from "react";
import {useNavigate} from "react-router-dom";


export const PayModal = () => {

    // @ts-ignore
    const bookings = JSON.parse(localStorage.getItem("bookings"))
    const a = bookings.at(-1)
    // @ts-ignore
    const totalPrice = JSON.parse(localStorage.getItem("totalPrice"))


    const navigate = useNavigate();
    const onPay = () => {
        navigate("/blist")
    }

    return (
        <form className="payform-tinkoff" name="payform-tinkoff">
            <input className="payform-tinkoff-row" type="hidden" name="terminalkey" value="TinkoffBankTest"/>
            <input className="payform-tinkoff-row" type="hidden" name="frame" value="false"/>
            <input className="payform-tinkoff-row" type="hidden" name="language" value="ru"/>
            <input className="payform-tinkoff-row" type="text" placeholder="Сумма заказа" name="amount" value={totalPrice}
                   required disabled/>
            <input className="payform-tinkoff-row" type="hidden" placeholder="Номер заказа" name="order"/>
            <input className="payform-tinkoff-row" type="text" placeholder="ФИО плательщика"
                   name="name"/>
            <input className="payform-tinkoff-row" type="email" placeholder="E-mail"
                   name="email"/>
            <input className="payform-tinkoff-row" type="tel"
                   placeholder="Контактный телефон" name="phone"/>
            <input className="payform-tinkoff-row payform-tinkoff-btn" type="submit"
                   value="Оплатить" onClick={onPay}/>
        </form>
    )
}