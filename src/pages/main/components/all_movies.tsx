import React, {useEffect, useState} from "react";
import axios from "axios";
import {MovieImage} from "@/pages/main/components/movie_image";
import {Header} from "@/pages/main/components/header";


export const AllMovies = () => {
    const [films, setFilms] = useState<any>();

    useEffect(() => {
        axios.get("http://localhost:8001/api/v1/movies/")
            .then(data => setFilms(data.data))
    }, []);

    if (films) {
        return (
            <div className="site_content">
                <Header/>
                <h1>Все фильмы</h1>
                <div className="films">
                    {films.map((el: any) => {
                        return (
                            <div className="film animate__bounce animate__delay-2s">
                                <MovieImage sid={el.sid}/>
                                <div>
                                    <h2>{el.name}</h2>
                                    <p>{el.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <footer className="footer">
                    <p>Адрес: ул Ленина 123</p>
                    <p>Номер телефона: 88001234554</p>
                </footer>
            </div>
        )
    }
    return <> <Header/></>
}