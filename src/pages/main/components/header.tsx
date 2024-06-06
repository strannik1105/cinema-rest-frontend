import {Link, useNavigate} from "react-router-dom";
import React from "react";


export const Header = () => {
    const token = localStorage.getItem("booking_access_token")
    const navigate = useNavigate();
    const logotClick = () => {
        localStorage.removeItem("booking_access_token")
        navigate("/index")
    }
    return (
        <header className="header">
            <h1><Link to="/index">Кино-ресторан</Link></h1>
            <p><a href="#movie">Каталог фильмов</a></p>
            <p><a href="#food">Меню блюд</a></p>
            <p><a href="#about">О нас</a></p>
            <p>{token ? <Link to="/booking_rooms">Забронировать</Link> : <Link to="/main_login">Забронировать</Link>}</p>
            <p>{token ? <Link to="/blist">Мои заказы</Link> : <></>}</p>
            <p onClick={logotClick}>{token ? <Link to="">Выйти</Link> : <></>}</p>
        </header>
    )
}