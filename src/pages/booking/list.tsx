import React, {useState} from "react";
import {IResourceComponentsProps, useNavigation} from "@refinedev/core";
import {ColumnMeta} from "@/interfaces/common";
import {Card} from "primereact/card";
import {DatatableView} from "@/components/datatableView";
import {format} from "date-fns";
import {EditIcon, ShowIcon} from "@/components/actions/common";
import {FilterMatchMode} from "primereact/api";


export const BookingList: React.FC<IResourceComponentsProps> = () => {

    const formatDateTime = (value: string) => {
        return format(value, 'dd.MM.yyyy HH:mm:ss')
    }

    const dateTemplate = (dateValue: string) => {
        return formatDateTime(dateValue)
    }

    // @ts-ignore
    const bookings = JSON.parse(localStorage.getItem("bookings"));

    const {edit, show} = useNavigation();


    const actionBodyTemplate = (rowData: any) => {
        return (
            <>
                <EditIcon
                    icon="pi pi-pencil"
                    onClick={() => edit("booking", rowData.id)}
                />

                <ShowIcon
                    icon="pi pi-eye"
                    onClick={() => show("booking", rowData.id)}
                />
            </>
        );
    }

    const [filters, setFilters] = useState({
        waiter: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        cook: { value: null, matchMode: FilterMatchMode.EQUALS }
    });

    const columns: ColumnMeta[] = [
        {field: "user", header: "Пользователь", filter: false, sortable: false},
        {field: "film", header: "Фильм", filter: false, sortable: false},
        {field: "room", header: "Комната", filter: false, sortable: false},
        {field: "dateStart", header: "Дата начала", filter: false, sortable: false, body: (rowData: any) => dateTemplate(rowData?.dateStart)},
        {field: "dateEnd", header: "Дата окончания", filter: false, sortable: false, body: (rowData: any) => dateTemplate(rowData?.dateEnd)},
        {field: "waiter", header: "Официант", filter: true, sortable: true},
        {field: "cook", header: "Повар", filter: true, sortable: true},
        {field: '', header: 'Actions', body: actionBodyTemplate, sortable: false, filter: false},
    ]

    if (bookings) {
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
                    data={bookings}
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