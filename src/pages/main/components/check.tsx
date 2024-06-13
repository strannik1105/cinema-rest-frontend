import {Header} from "@/pages/main/components/header";
import React, {useState} from "react";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {PayModal} from "@/pages/main/components/pay_modal";


export const Check = () => {
    // @ts-ignore
    const bookings = JSON.parse(localStorage.getItem("bookings"))
    const a = bookings.at(-1)
    // @ts-ignore
    const totalPrice = JSON.parse(localStorage.getItem("totalPrice"))

    const [visible, setVisible] = useState(false);

    const modalOpen = () => {
        setVisible(true);
    }

    return (
        <div className="site_content">
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
                <Button label="Оплатить" onClick={modalOpen}/>
                <Dialog visible={visible} style={{width: '50vw'}} onHide={() => {
                    if (!visible) return;
                    setVisible(false);
                }}>
                    <PayModal/>
                </Dialog>
            </main>
            <footer className="footer">
                <p>Адрес: ул Красная 135</p>
                <p>Номер телефона: 89186968405</p>
            </footer>
        </div>
    )
}