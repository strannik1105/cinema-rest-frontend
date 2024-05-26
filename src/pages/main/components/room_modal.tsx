import React, {useEffect, useState} from "react";
import axios from "axios";
import {Dropdown} from "primereact/dropdown";
import {MultiSelect} from "primereact/multiselect";
import {Calendar} from "primereact/calendar";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";

interface IProps {
    id: string
}


export const RoomModal: React.FC<IProps> = ({id}) => {

    const navigate = useNavigate();

    const [data, setData] = useState<any>();
    const [films, setFilms] = useState<any>();
    const [foodList, setFoodList] = useState<any>();

    const [selectedFood, setSelectedFood] = useState<any>();
    const [selectedFilm, setSelectedFilm] = useState<any>();

    let a = 0;

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/v1/rooms/" + id)
            .then(res => {
                setData(res.data)
            })

        axios.get("http://127.0.0.1:8000/api/v1/food/")
            .then(res => {
                setFoodList(res.data)
            })

        axios.get("http://127.0.0.1:8000/api/v1/movies/")
            .then(res => {
                setFilms(res.data)
            })
    }, [])

    const foodChoices = foodList?.map((el: any) => {
        return {name: el.name, code: el.sid}
    })

    const filmsChoices = films?.map((el: any) => {
        return {name: el.name, code: el.sid}
    })

    const [datetime24hStart, setDateTime24hStart] = useState<any>(null);
    const [datetime24hEnd, setDateTime24End] = useState<any>(null);

    const onCheck = () => {

        const obj = {
            user: localStorage.getItem("user"),
            film: selectedFilm.name,
            food: selectedFood,
            dateStart: datetime24hStart,
            dateEnd: datetime24hEnd,
            room: data.name
        }

        for (let i = 0; i < selectedFood.length; i++) {
            const d = foodList.filter((el: any) => el.sid == selectedFood[i].code)
            a += d[0].price
        }

        const timeDiff = Math.abs(datetime24hEnd.getTime() - datetime24hStart.getTime());
        const diffH = Math.ceil(timeDiff / (1000 * 3600));

        a += diffH * data.cost_per_hour;

        localStorage.setItem('totalPrice', String(a));

        // @ts-ignore
        const bookings = JSON.parse(localStorage.getItem("bookings"));

        if (bookings !== null) {
            const lastObj = bookings.at(-1)
            const maxId = lastObj.id
            // @ts-ignore
            obj.id = maxId + 1;
            bookings.push(obj);

            localStorage.setItem('bookings', JSON.stringify(bookings));
        } else {
            // @ts-ignore
            obj.id = 1;
            localStorage.setItem('bookings', JSON.stringify([obj]));
        }
        navigate("/check")
    }

    if (data) {
        return (
            <p className="m-0">
                <h1>{data.name}</h1>
                <p>{data.description}</p>
                <p>{data.cost_per_hour}</p>
                <MultiSelect value={selectedFood} onChange={(e) => setSelectedFood(e.value)} options={foodChoices}
                             optionLabel="name"
                             placeholder="Выберите еду" className="w-full md:w-20rem"/>
                <br/>
                <br/>
                <Dropdown value={selectedFilm} onChange={(e) => setSelectedFilm(e.value)} options={filmsChoices}
                          optionLabel="name"
                          placeholder="Выберите фильм" className="w-full md:w-14rem"/>
                <br/>
                <br/>
                <div className="flex-auto">
                    <label htmlFor="calendar-24h" className="font-bold block mb-2">
                        Время начала
                    </label>
                    <Calendar id="calendar-24h" value={datetime24hStart} onChange={(e) => setDateTime24hStart(e.value)}
                              showTime
                              hourFormat="24"/>

                    <label htmlFor="calendar-24h" className="font-bold block mb-2">
                        Время конца
                    </label>
                    <Calendar id="calendar-24h" value={datetime24hEnd} onChange={(e) => setDateTime24End(e.value)}
                              showTime
                              hourFormat="24"/>

                </div>

                <br/>
                <Button onClick={onCheck} label="Забронировать"/>
            </p>
        )
    }

    return <p className="m-0"></p>
}