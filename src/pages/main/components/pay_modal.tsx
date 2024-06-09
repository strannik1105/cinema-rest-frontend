import {InputText} from "primereact/inputtext";
import React, {useState} from "react";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";


export const PayModal = () => {
    const [name, setName] = useState<string>("");

    const [cartNum, setCartNum] = useState<string>();
    const [cartDate, setCartDate] = useState<string>();
    const [cartCvv, setCartCvv] = useState<string>();

    const navigate = useNavigate();

    const onPay = () => {
        navigate("/blist")
    }

    return (
        <div className="payForm">
            <label htmlFor="name">ФИО</label>
            <InputText value={name} onChange={(e) => setName(e.target.value)}/>

            <label htmlFor="description">Номер карты</label>
            <InputText value={cartNum} onChange={(e) => setCartNum(e.target.value)}/>

            <label htmlFor="description">Дата</label>
            <InputText value={cartDate} onChange={(e) => setCartDate(e.target.value)}/>

            <label htmlFor="description">CVV</label>
            <InputText value={cartCvv} onChange={(e) => setCartCvv(e.target.value)}/>
            <Button label="Оплатить" onClick={onPay}/>
        </div>
    )
}