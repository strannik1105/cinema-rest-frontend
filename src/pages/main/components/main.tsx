import React, {useEffect, useState} from "react";
import Carousel from 'react-bootstrap/Carousel';
import {foods, movies} from "@/pages/main/movies";
import axios from "axios";
import {MovieImage} from "@/pages/main/components/movie_image";
import {Link} from "react-router-dom";
import {FoodImage} from "@/pages/main/components/food_image";

export const Main = () => {

    const [films, setFilms] = useState<any>();
    const [foods, setFoods] = useState<any>();

    useEffect(() => {
        axios.get("http://localhost:8001/api/v1/movies/")
            .then(data => setFilms(data.data.slice(0, 3)))
        axios.get("http://localhost:8001/api/v1/food/")
            .then(data => setFoods(data.data.slice(0, 3)))
    }, []);

    const a = localStorage.getItem("user")

    return (
        <div className="main__container">
            <Carousel className="sksk">
                <Carousel.Item>
                    <img
                        src="public/1%20(1).jpg"
                        alt=""/>

                </Carousel.Item>
                <Carousel.Item>
                    <img
                        src="public/2%20(1).jpg"
                        alt=""/>

                </Carousel.Item>
                <Carousel.Item>
                    <img
                        src="public/3%20(1).jpg"
                        alt=""/>
                </Carousel.Item>
            </Carousel>

            <h1 id="movie">Список фильмов</h1>
            <div className="films">
                {films ? films.map((el: any) => {
                    return (
                        <div className="film animate__bounce animate__delay-2s">
                            <MovieImage sid={el.sid}/>
                            <div>
                                <h2>{el.name}</h2>
                                <p>{el.description}</p>
                                <p>Жанр: {el.genre}</p>
                                <p>Год: {el.year}</p>
                                <p>Длительность: {el.duration} минут</p>
                                <Link to={a ? "/booking_rooms" :"/main_login"}>Бронировать</Link>
                            </div>
                        </div>
                    )
                }) : <></>}

                <div className="more_films">
                    <Link to="/all_movies">Все фильмы</Link>
                </div>
            </div>

            <h1 id="food">Список блюд</h1>
            <div className="films">
                <div className="films__container">
                    {foods ? foods.map((el: any) => {
                        return (
                            <div className="food">
                                <FoodImage sid={el.sid}/>
                                <div>
                                    <h2>{el.name}</h2>
                                    <p>{el.description}</p>
                                    <p className="price">{el.price}</p>
                                </div>
                            </div>
                        )
                    }) : <></>}
                </div>

                <div className="more_films">
                     <Link to="/all_foods">Все блюда</Link>
                </div>
            </div>


            <h1 id="about">О нас</h1>
            <p>
                Добро пожаловать в уникальный мир кино-ресторана, где каждый визит превращается в захватывающее
                кинематографическое приключение! У нас вы сможете не только насладиться изысканной кухней и
                изысканными напитками, но и окунуться в атмосферу настоящего кино, где каждый уголок заведения
                пронизан волшебством большого экрана. Наша команда готова угодить самым взыскательным гурманам и
                киноманам, создавая неповторимые впечатления и запоминающиеся моменты. Приходите к нам, чтобы
                прочувствовать весь магический мир кино в каждом бите и вкусе!
            </p>
        </div>
    )

}