import "./style.css";
import {getFilms} from "@/pages/movies/service";
import {getFood} from "@/pages/food/service";
import React, {useEffect, useState} from "react";
import {Stage, Layer, Rect, Text} from 'react-konva';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";


export const MainPage = () => {

    const films = getFilms();
    const foods = getFood();

    const [rooms, setRooms] = useState();

    useEffect(() => {
        axios.get("http://localhost:8000/api/v1/rooms/")
            .then(data => {
                setRooms(data.data)
            })
    }, [])

    return (
        <>
            <header className="header">
                <h1>Кафе-ресторан</h1>
                <p><Link to="/register">Регистрация</Link></p>
                <p><Link to="/login">Вход</Link></p>
            </header>
            <main className="main">
                <div className="main__container">
                    <h1>Список фильмов</h1>
                    <div className="films_list">
                        {films?.map((el) => {
                            return (
                                <div className="film_item">
                                    <img src={el.image} alt=""/>
                                    <h3>{el.name}</h3>
                                    <p>{el.genre}</p>
                                </div>

                            )
                        })}
                    </div>
                    <h1>Список блюд</h1>
                    <div className="films_list">
                        {foods?.map((el) => {
                            return (
                                <div className="film_item">
                                    <img src={el.image} alt=""/>
                                    <h3>{el.name}</h3>
                                    <p>{el.price}</p>
                                </div>
                            )
                        })}
                    </div>

                    <div className="booking_container">
                        <h2>Забронируйте комнату прямо сейчас</h2>
                        <Stage width={500} height={500}>
                            <Layer>
                                <Text fontSize={15}/>
                                {
                                    rooms?.map((el: any) => {
                                        return (
                                            <Rect
                                                x={el.x}
                                                y={el.y}
                                                width={100}
                                                height={100}
                                                fill="red"
                                                shadowBlur={10}
                                            />
                                        )
                                    })
                                }
                            </Layer>
                        </Stage>
                    </div>

                </div>

            </main>
        </>
    )
}