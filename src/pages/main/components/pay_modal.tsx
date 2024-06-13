import {InputText} from "primereact/inputtext";
import React, {useState} from "react";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {Password} from "primereact/password";


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

            <div className="flex align-items-center gap-5">
                <label htmlFor="description">Дата</label>
                <InputText value={cartDate} onChange={(e) => setCartDate(e.target.value)}/>

                <label htmlFor="description">CVV</label>
                <Password value={cartCvv} onChange={(e) => setCartCvv(e.target.value)}/>

            </div>
            <Button label="Оплатить" onClick={onPay}/>
        </div>
    )
}