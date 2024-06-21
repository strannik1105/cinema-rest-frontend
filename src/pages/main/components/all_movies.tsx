import React, {useEffect, useState} from "react";
import axios from "axios";
import {MovieImage} from "@/pages/main/components/movie_image";
import {Header} from "@/pages/main/components/header";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";


export const AllMovies = () => {
    const [films, setFilms] = useState<any>();
    const [query, setQuery] = useState<any>({
        year_gt: null,
        year_lt: null,
        duration_gt: null,
        duration_lt: null,
        genre: null,
    });

    useEffect(() => {
        axios.get("http://localhost:8001/api/v1/movies/", {params: query})
             .then(data => {
                data.data.forEach(async (el: any) => {
                    el["image"] = await drawImage(el.sid).then(data => data.data[0].file)
                })
                setTimeout(() => setFilms(data.data), 700)

            })
    }, [query]);

    const drawImage = async (sid: string) => {
        return axios.get("http://127.0.0.1:8001/api/v1/movies_images/" + sid)
    }

    const [genre, setGenre] = useState()

    const onSelectGenre = (el: any) => {
        setQuery({
            ...query,
            genre: el.value.name
        })
        setGenre(el.value)
    }

    const genres = [
        {name: "драма", code: "драма"},
        {name: "мюзикл", code: "мюзикл"},
        {name: "криминал", code: "криминал"},
        {name: "боевик", code: "боевик"},
        {name: "комедия", code: "комедия"},
    ]

    if (films) {
        return (
            <div className="site_content">
                <Header/>
                <main className="main">
                    <h1>Все фильмы</h1>

                    <div className="films">
                        <div className="fiter_form">
                            <p>
                                <label className="w-2" htmlFor="">Год от</label>
                                <InputText value={query.year_gt} keyfilter="int"
                                           placeholder="Введите год" className="w-full"
                                           onChange={(e) => setQuery({
                                               ...query,
                                               year_gt: Number(e.target.value)
                                           })}/>
                            </p>
                            <p>
                                <label className="w-2" htmlFor="">Год до</label>
                                <InputText value={query.year_lt} keyfilter="int"
                                           placeholder="Введите год" className="w-full"
                                           onChange={(e) => setQuery({
                                               ...query,
                                               year_lt: Number(e.target.value)
                                           })}/>
                            </p>

                            <p>
                                <label htmlFor="">Длительность от(в минутах)</label>
                                <InputText value={query.duration_gt} keyfilter="int"
                                           placeholder="Введите длительность в минутах"
                                           onChange={(e) => setQuery({
                                               ...query,
                                               duration_gt: Number(e.target.value)
                                           })}/>
                            </p>
                            <p>
                                <label htmlFor="">Длительность до(в минутах)</label>
                                <InputText value={query.duration_lt} keyfilter="int"
                                           placeholder="Введите длительность в минутах"
                                           onChange={(e) => setQuery({
                                               ...query,
                                               duration_lt: Number(e.target.value)
                                           })}/>
                            </p>
                            <p>
                                <label htmlFor="">Жанр</label>
                                <Dropdown value={genre}
                                          onChange={(e) => onSelectGenre(e)}
                                          options={genres} optionLabel="name"
                                          placeholder="Выберите жанр" className="w-full"/>
                            </p>

                        </div>
                        {films.map((el: any) => {
                            return (
                                <div className="film animate__bounce animate__delay-2s">
                                    <img src={el.image} alt=""/>
                                    <div>
                                        <h2>{el.name}</h2>
                                        <p>{el.description}</p>
                                        <p>{el.genre}</p>
                                        <p>{el.year}</p>
                                        <p>{el.duration}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </main>

                <footer className="footer">
                    <p>Адрес: ул Красная 135</p>
                    <p>Номер телефона: 89186968405</p>
                </footer>
            </div>
        )
    }
    return <> <Header/></>
}