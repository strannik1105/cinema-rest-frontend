import {IResourceComponentsProps, useDelete, useNavigation, useTable} from "@refinedev/core";
import React from "react";
import {IMovie} from "../../interfaces/movie";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {ColumnMeta} from "@/interfaces/common";
import {EditIcon, ShowIcon} from "@/components/actions/common";
import {DatatableView} from "@/components/datatableView";
import {Card} from "primereact/card";


export const MoviesList: React.FC<IResourceComponentsProps> = () => {
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

    const movies = tableQueryResult?.data?.data;

    const {mutate} = useDelete();

    const {edit, show, create} = useNavigation();

    const actionBodyTemplate = (rowData: IMovie) => {
        return (
            <>
                <EditIcon
                    icon="pi pi-pencil"
                    onClick={() => edit("movies", rowData.sid)}
                />

                <ShowIcon
                    icon="pi pi-eye"
                    onClick={() => show("movies", rowData.sid)}
                />
            </>
        );
    }

    const columns: ColumnMeta[] = [
        {field: "name", header: "Название фильма", filter: true},
        {field: "description", header: "Описание", filter: false, sortable: false},
        {field: "genre", header: "Жанр", filter: true},
        {field: '', header: 'Actions', body: actionBodyTemplate, sortable: false, filter: false},
    ]

    if (movies) {
        return (
            <Card>
                <DatatableView
                data={movies}
                columns={columns}
            />
            </Card>

        )
    }
    return <h1>Нет данных</h1>
}