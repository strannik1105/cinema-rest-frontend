import React, {useEffect, useState} from "react";
import axios from "axios";
import {Header} from "@/pages/main/components/header";
import {FoodImage} from "@/pages/main/components/food_image";
import {Dropdown} from "primereact/dropdown";


export const AllFoods = () => {
    const [foods, setFoods] = useState<any>();
    const [query, setQuery] = useState<any>({
        type_: null,

    });

    useEffect(() => {
        axios.get("http://localhost:8001/api/v1/food/", {params: query})
            .then(data => setFoods(data.data))
    }, [query]);

    const [genre, setGenre] = useState()


     const onSelectGenre = (el: any) => {
        setQuery({
            ...query,
            type_: el.value.name
        })
        setGenre(el.value)
    }

     const genres = [
        {name: "основное", code: "основное"},
        {name: "закуски", code: "закуски"},
        {name: "напитки", code: "напитки"},
        {name: "десерты", code: "десерты"},
        {name: "комбо", code: "комбо"},
    ]

    if (foods) {
        return (
            <div className="site_content">
                <Header/>
                <main className="main">
                    <h1>Все блюда</h1>
                    <div className="films">
                        <div className="fiter_form">
                            <p>
                                <label htmlFor="">Вид</label>
                                <Dropdown value={genre}
                                          onChange={(e) => onSelectGenre(e)}
                                          options={genres} optionLabel="name"
                                          placeholder="Выберите жанр" className="w-full md:w-14rem"/>
                            </p>

                        </div>
                        {foods.map((el: any) => {
                            return (
                                <div className="film animate__bounce animate__delay-2s">
                                    <FoodImage sid={el.sid}/>
                                    <div>
                                        <h2>{el.name}</h2>
                                        <p>{el.description}</p>
                                        <p>{el.price}</p>
                                        <p>{el.type_}</p>
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