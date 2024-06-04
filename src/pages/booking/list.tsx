import React, {useEffect, useState} from "react";
import {IResourceComponentsProps, useNavigation, useTable} from "@refinedev/core";
import {ColumnMeta} from "@/interfaces/common";
import {Card} from "primereact/card";
import {DatatableView} from "@/components/datatableView";
import {format} from "date-fns";
import {EditIcon, ShowIcon} from "@/components/actions/common";
import axios from "axios";


export const BookingList: React.FC<IResourceComponentsProps> = () => {

    const {
        tableQueryResult,
        pageCount,
        current,
        pageSize,
        sorters,
        filters,
        setCurrent,
        setPageSize,
        setSorters,
        setFilters,
    } = useTable<any>({
            syncWithLocation: true,
        }
    )

    const data = tableQueryResult?.data?.data;

    const formatDateTime = (value: string) => {
        return format(value, 'dd.MM.yyyy HH:mm:ss')
    }

    const dateTemplate = (dateValue: string) => {
        return formatDateTime(dateValue)
    }

    const {edit, show} = useNavigation();

    const [waiters, setWaiters] = useState<any>();

    const [cooks, setCooks] = useState<any>();

    const [users, setUsers] = useState<any>();

    const [rooms, setRooms] = useState<any>();

    const [movies, setMovies] = useState<any>();

    const [foods, setFoods] = useState<any>();

    useEffect(() => {
        axios.get("http://localhost:8001/api/v1/waiter")
            .then(res => {
                setWaiters(res.data)
            })
        axios.get("http://localhost:8001/api/v1/cook")
            .then(res => {
                setCooks(res.data)
            })
        axios.get("http://localhost:8001/api/v1/users")
            .then(res => {
                setUsers(res.data)
            })
        axios.get("http://localhost:8001/api/v1/rooms")
            .then(res => {
                setRooms(res.data)
            })
        axios.get("http://localhost:8001/api/v1/movies")
            .then(res => {
                setMovies(res.data)
            })
         axios.get("http://localhost:8001/api/v1/food")
            .then(res => {
                setFoods(res.data)
            })
    }, []);


    const waiterBodyTemplate = (rowData: any) => {
        if (waiters) {
            const waiterName = waiters.find((el: any) => el.sid === rowData.waiter_sid)
            return <>{`${waiterName.name} ${waiterName.surname}`}</>
        }

    }

    const cookBodyTemplate = (rowData: any) => {
        if (cooks) {
            const cookName = cooks.find((el: any) => el.sid === rowData.cook_sid)
            return <>{`${cookName.name} ${cookName.surname}`}</>
        }
    }

    const userBodyTemplate = (rowData: any) => {
        if (users) {
             // @ts-ignore
            const bookings = JSON.parse(localStorage.getItem("bookings"));
            const obj = bookings.find((el: any) => el.booking_sid == rowData.sid);

            return obj.user
        }
    }

    const roomBodyTemplate = (rowData: any) => {
        if (rooms) {
            const cookName = rooms.find((el: any) => el.sid === rowData.room_sid)
            return <>{`${cookName.name}`}</>
        }
    }

    const filmBodyTemplate = (rowData: any) => {
        if (movies) {
            // @ts-ignore
            const bookings = JSON.parse(localStorage.getItem("bookings"));

            const filmName = bookings.find((el: any) => el.booking_sid == rowData.sid)

            return filmName.film
        }
    }

    const foodListBodyTemplate = (rowData: any) => {
        if (foods) {
            // @ts-ignore
            const bookings = JSON.parse(localStorage.getItem("bookings"));
            const foodObj = bookings.find((el: any) => el.booking_sid == rowData.sid);
            let res = "";
            foodObj.food.forEach((el: any) => {
                res += el.name
                res += " "
            })
            return res
        }
    }

    const actionBodyTemplate = (rowData: any) => {
        return (
            <>
                <ShowIcon
                    icon="pi pi-eye"
                    onClick={() => show("booking", rowData.sid)}
                />
            </>
        );
    }

    const dateStartBodyTemplate = (rowData: any) => {
        return dateTemplate(rowData.datetime_start)
    }

    const dateEndBodyTemplate = (rowData: any) => {
        return dateTemplate(rowData.datetime_end)
    }

    const columns: ColumnMeta[] = [
        {field: "user", header: "Пользователь", filter: false, sortable: false, body: userBodyTemplate},
        {field: "film", header: "Фильм", filter: false, sortable: false, body: filmBodyTemplate},
        {field: "room", header: "Комната", filter: false, sortable: false, body: roomBodyTemplate},
        {field: "waiter_sid", header: "Официант", filter: true, sortable: true, body: waiterBodyTemplate},
        {field: "cook_sid", header: "Повар", filter: true, sortable: true, body: cookBodyTemplate},
        {field: "food_list", header: "Еда", filter: true, sortable: true, body: foodListBodyTemplate},
        {field: "datetime_start", header: "Дата время начала", filter: true, sortable: true, body: dateStartBodyTemplate},
        {field: "datetime_end", header: "Дата время окончания", filter: true, sortable: true, body: dateEndBodyTemplate},
        {field: '', header: 'Actions', body: actionBodyTemplate, sortable: false, filter: false},
    ]

    if (data) {
        return (
            <Card
                className="shadow-1"
                title={
                    <div className="flex justify-content-between align-items-center justify-content-center">
                        <span className="text-3xl p-card-title">Список бронирований</span>
                    </div>
                }
            >
                <DatatableView
                    data={data}
                    columns={columns}
                    filters={filters}
                />
            </Card>

        )
    }
    return <Card
        className="shadow-1"
        title={
            <div className="flex justify-content-between align-items-center justify-content-center">
                <span className="text-3xl p-card-title">Список бронирований</span>
            </div>
        }

    />
}