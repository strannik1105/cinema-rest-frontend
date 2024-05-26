import {Link} from "react-router-dom";
import React from "react";


export const Header = () => {
    return (
        <header className="header">
            <h1><Link to="/index">Кино-ресторан</Link></h1>
            <p><a href="#movie">Каталог фильмов</a></p>
            <p><a href="#food">Меню блюд</a></p>
            <p><a href="#about">О нас</a></p>
            <p><Link to="/register">Забронировать</Link></p>
        </header>
    )
}