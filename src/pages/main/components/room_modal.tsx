import React, {useEffect, useState} from "react";
import axios from "axios";
import {Dropdown} from "primereact/dropdown";
import {MultiSelect} from "primereact/multiselect";
import {Calendar} from "primereact/calendar";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {FloatLabel} from "primereact/floatlabel";
import {format} from "date-fns";
import {FoodImage} from "@/pages/main/components/food_image";

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
        axios.get("http://127.0.0.1:8001/api/v1/rooms/" + id)
            .then(res => {
                setData(res.data)
            })

        axios.get("http://127.0.0.1:8001/api/v1/food/")
            .then(res => {
                setFoodList(res.data)
            })

        axios.get("http://127.0.0.1:8001/api/v1/movies/")
            .then(res => {
                setFilms(res.data)
            })
    }, [])

    const foodChoices = foodList?.map((el: any) => {
        return {name: `${el.name}, ${el.price}`, code: el.sid}
    })

    const filmsChoices = films?.map((el: any) => {
        return {name: el.name, code: el.sid}
    })

    const [datetime24hStart, setDateTime24hStart] = useState<any>(null);

    const [error, setError] = useState<any>();

    const postBook = async () => {
        const cDate = datetime24hStart.getDate();
        const cYear = datetime24hStart.getYear() + 1900;
        const cMonth = datetime24hStart.getMonth() + 1;
        let rMonth = cMonth
        if (cMonth < 10) {
            rMonth = `0${cMonth}`
        }

        const dateTimeStart = new Date(`${cYear}-${rMonth}-${cDate}:${choisenTime}`)
        const cDur = duration.code;

        const cHour = cDur.split(":")[0]
        const cMin = cDur.split(":")[1]

        const dateTimeEnd = new Date(`${cYear}-${rMonth}-${cDate}:${choisenTime}`)
        dateTimeEnd.setMinutes(dateTimeEnd.getMinutes() + Number(cMin))
        dateTimeEnd.setHours(dateTimeEnd.getHours() + Number(cHour))
        // @ts-ignore
        const user_sid = localStorage.getItem("user_sid");

        return axios.post("http://127.0.0.1:8001/api/v1/booking/", {
            room_sid: id,
            user_sid: user_sid,
            datetime_start: dateTimeStart.toISOString().slice(0, -1),
            datetime_end: dateTimeEnd.toISOString().slice(0, -1)
        })
            .then(data => {
                return data.data.sid
            })
            .catch(err => {
                setError(err.response.data.detail)
                return err.response.data
            })
    }

    const formatDateTime = (value: string) => {
        return format(value, 'dd.MM.yyyy HH:mm:ss')
    }

    const dateTemplate = (dateValue: string) => {
        return formatDateTime(dateValue)
    }

    const onCheck = async () => {

        const cDate = datetime24hStart.getDate();
        const cYear = datetime24hStart.getYear() + 1900;
        const cMonth = datetime24hStart.getMonth() + 1;
        let rMonth = cMonth
        if (cMonth < 10) {
            rMonth = `0${cMonth}`
        }

        const dateTimeStart = new Date(`${cYear}-${rMonth}-${cDate}:${choisenTime}`)
        const cDur = duration.code;

        const cHour = cDur.split(":")[0]
        const cMin = cDur.split(":")[1]

        const dateTimeEnd = new Date(`${cYear}-${rMonth}-${cDate}:${choisenTime}`)
        dateTimeEnd.setMinutes(dateTimeEnd.getMinutes() + Number(cMin))
        dateTimeEnd.setHours(dateTimeEnd.getHours() + Number(cHour))

        if (!selectedFilm || !selectedFood) {
            setError("некоррктный ввод")
        } else {
            const tmp = await postBook()

            if (typeof tmp === "string") {
                const obj = {
                    user: localStorage.getItem("user"),
                    film: selectedFilm.name,
                    food: selectedFood,
                    dateStart: dateTemplate(dateTimeStart.toString()),
                    dateEnd: dateTemplate(dateTimeEnd.toString()),
                    room: data.name,
                    booking_sid: tmp
                }

                for (let i = 0; i < selectedFood.length; i++) {
                    const d = foodList.filter((el: any) => el.sid == selectedFood[i].code)
                    a += d[0].price
                }

                const timeDiff = Math.abs(dateTimeEnd.getTime() - dateTimeStart.getTime());
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
        }

    }

    const drawTime = () => {
        // @ts-ignore
        const bookings = JSON.parse(localStorage.getItem("bookings"));
        const cDate = datetime24hStart.getDate();
        const cYear = datetime24hStart.getYear() + 1900;
        const cMonth = datetime24hStart.getMonth() + 1;

        let rMonth = cMonth

        if (cMonth < 10) {
            rMonth = `0${cMonth}`
        }

        let curDate;

        if (bookings) {
            curDate = bookings.filter((el: any) => el.dateStart.split(" ")[0] == `${cDate}.${rMonth}.${cYear}`);
        }

        let dates;

        if (curDate) {
            dates = curDate.map((el: any) => {
                return {
                    dateStart: `${el.dateStart.split(" ")[1].slice(0, 5)}`,
                    dateEnd: `${el.dateEnd.split(" ")[1].slice(0, 5)}`
                }
            })
        }

        let h = 0;
        // @ts-ignore
        const res = [];
        for (let i = 0; i < 48; i++) {
            if (i % 2 != 0) {
                if (h < 10) {
                    res.push(`0${h}:30`)
                } else {
                    res.push(`${h}:30`)
                }
                h++;
            } else {
                if (h < 10) {
                    res.push(`0${h}:00`)
                } else {
                    res.push(`${h}:00`)
                }
            }
        }

        if (dates) {
            for (let i = 0; i < 48; i++) {
                // @ts-ignore
                const curItem = dates.filter((el: any) => el.dateStart == res[i])
                if (curItem.length > 0) {
                    let j = i;
                    while (res[j] != curItem[0].dateEnd) {
                        res[j] = "";
                        j++;

                    }
                    if (res[j] == curItem[0].dateEnd) {
                        res[j] = "";
                    }
                }
            }
        }


        const aaa = res.filter((el: any) => el != "")

        return aaa
    }

    const itemTemplate = (option: any) => {
        return (
            <div className="flex align-items-center sdf gap-3">
                <FoodImage sid={option.code}/>
                <p>{option.name} {option.price}</p>
            </div>
        )
    }

    const [choisenTime, setChoisenTime] = useState<any>();

    const onChoice = (el: any) => {
        setChoisenTime(() => el.target.innerText)
    }

    const [duration, setSelectedDuration] = useState<any>();

    const durations = [
        {name: '0:30', code: '0:30'},
        {name: '1:00', code: '1:00'},
        {name: '1:30', code: '1:00'},
        {name: '2:00', code: '2:00'},
        {name: '2:30', code: '2:30'},
        {name: '3:00', code: '3:00'},
        {name: '3:30', code: '3:30'},
        {name: '4:00', code: '4:00'},
    ];

    if (data) {
        return (
            <p className="m-0">
                <h1>{data.name}</h1>
                <p>{data.description}</p>
                <p>{data.cost_per_hour}</p>
                <MultiSelect value={selectedFood} onChange={(e) => setSelectedFood(e.value)} options={foodChoices}
                             optionLabel="name" itemTemplate={itemTemplate}
                             placeholder="Выберите еду" className="w-full md:w-20rem"/>
                <br/>
                <br/>
                <Dropdown value={selectedFilm} onChange={(e) => setSelectedFilm(e.value)} options={filmsChoices}
                          optionLabel="name"
                          placeholder="Выберите фильм" className="w-full md:w-14rem"/>
                <br/>
                <br/>
                <div className="flex-auto">

                    <div className="flex-auto">
                        <FloatLabel>
                            <Calendar inputId="Дата бронирования" value={datetime24hStart}
                                      onChange={(e) => setDateTime24hStart(e.value)}/>
                            <label htmlFor="Дата бронирования">Дата бронирования</label>
                        </FloatLabel>
                    </div>

                    <br/>

                    <div className="flex-auto">
                        {datetime24hStart ?
                            <div className="times_list">
                                {drawTime().map(el => {
                                    return (
                                        <p className="aaa" onClick={onChoice}>{el}</p>
                                    )
                                })}
                            </div>

                            : ""}
                    </div>

                    <div className="flex-auto">
                        <p><b>{choisenTime ? `Вы выбрали ${choisenTime}` : ""}</b></p>
                        {datetime24hStart ?
                            <>
                                <Dropdown value={duration} onChange={(e) => setSelectedDuration(e.value)}
                                          options={durations} optionLabel="name"
                                          placeholder="Выберите длительность бронирования"
                                          className="w-full md:w-14rem"/>
                            </>
                            : ""}
                    </div>
                </div>

                <h2>{error ? error : ""}</h2>

                <br/>
                <Button onClick={onCheck} label="Забронировать"/>
            </p>
        )
    }

    return <p className="m-0"></p>
}