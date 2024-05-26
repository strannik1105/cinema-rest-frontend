import React, {useEffect, useState} from "react";
import axios from "axios";
import {MovieImage} from "@/pages/main/components/movie_image";
import {FoodImage} from "@/pages/main/components/food_image";


export const Main = () => {

    const [movies, setMovies] = useState<any>();

    const [food, setFood] = useState<any>();


    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/v1/movies/")
            .then(resp => {
                setMovies(resp.data)
            })

        axios.get("http://127.0.0.1:8000/api/v1/food/")
            .then(resp => {
                setFood(resp.data)
            })
    }, [])


    if (movies) {
        return (
            <div className="main__container">
                <h1 id="movie">Список фильмов</h1>
                <div className="films_list">
                    {movies.map((el: any) => {
                        return (
                            <div className="film_item">
                                <MovieImage sid={el.sid}/>
                                <h3>{el.name}</h3>

                            </div>

                        )
                    })}
                </div>
                <h1 id="food">Список блюд</h1>
                <div className="films_list">
                    {food?.map((el: any) => {
                        return (
                            <div className="film_item">
                                <FoodImage sid={el.sid}/>
                                <h3>{el.name}</h3>
                                <p>{el.price}</p>
                            </div>
                        )
                    })}
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
    return <h1></h1>

}