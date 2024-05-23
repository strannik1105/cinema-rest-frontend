import React from "react";
import {IResourceComponentsProps, useDelete, useNavigation, useTable} from "@refinedev/core";
import {IMovie} from "@/interfaces/movie";
import {ColumnMeta} from "@/interfaces/common";
import {Card} from "primereact/card";
import {AddNavButton} from "@/components/navButtons/addNavButton";
import {DatatableView} from "@/components/datatableView";
import {getData} from "@/pages/booking/service";
import {format} from "date-fns";


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
    } = useTable<IMovie>({
            syncWithLocation: true,
        }
    )

    const formatDateTime = (value: string) => {
        return format(value, 'dd.MM.yyyy HH:mm:ss')
    }

    const dateTemplate = (dateValue: string) => {
        return formatDateTime(dateValue)
    }


    const bookings = tableQueryResult?.data?.data;

    const {create} = useNavigation();

    const food = getData()

    const columns: ColumnMeta[] = [
        {field: "datetime_start", header: "Дата начала", filter: false, sortable: false, body: (rowData: any) => dateTemplate(rowData?.datetime_start)},
        {field: "datetime_end", header: "Дата окончания", filter: false, body: (rowData: any) => dateTemplate(rowData?.datetime_start)},
    ]

    if (food) {
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
                    data={food}
                    columns={columns}
                />
            </Card>

        )
    }
    return <Card
        className="shadow-1"
        title={
            <div className="flex justify-content-between align-items-center justify-content-center">
                <span className="text-3xl p-card-title">Список еды</span>
                <AddNavButton
                    handleClick={() => create("food")}
                />
            </div>
        }

    />
}