import {IResourceComponentsProps, useDelete, useNavigation, useTable} from "@refinedev/core";
import React from "react";
import {IMovie} from "@/interfaces/movie";
import {ColumnMeta} from "@/interfaces/common";
import {DeleteIcon, EditIcon, ShowIcon} from "@/components/actions/common";
import {DatatableView} from "@/components/datatableView";
import {Card} from "primereact/card";
import {AddNavButton} from "@/components/navButtons/addNavButton";
import {ConfirmPopup, confirmPopup} from "primereact/confirmpopup";
import {MovieImage} from "@/pages/main/components/movie_image";


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

                <DeleteIcon
                    className="bg-red-500 text-0"
                    icon="pi pi-trash"
                    onClick={(event) => {
                        confirmPopup({
                            target: event.currentTarget,
                            message: 'Удалить этот фильм?',
                            icon: 'pi pi-info-circle',
                            defaultFocus: 'reject',
                            acceptClassName: 'p-button-danger',
                            accept: () => mutate({resource: "movies", id: rowData.sid})
                        })
                    }}
                />
            </>
        );
    }

    const columns: ColumnMeta[] = [
        {field: "", header: "Картинка", filter: false, body: MovieImage},
        {field: "name", header: "Название фильма", filter: true},
        {field: "description", header: "Описание", filter: false, sortable: false},
        {field: "genre", header: "Жанр", filter: true},
        {field: '', header: 'Actions', body: actionBodyTemplate, sortable: false, filter: false},
    ]

    if (movies) {
        return (
            <Card
                className="shadow-1"
                title={
                    <div className="flex justify-content-between align-items-center justify-content-center">
                        <span className="text-3xl p-card-title">Список фильмов</span>
                        <AddNavButton
                            handleClick={() => create("movies")}
                        />
                    </div>
                }

            >
                <ConfirmPopup/>
                <DatatableView
                    data={movies}
                    columns={columns}
                />
            </Card>

        )
    }
    return <h1>Нет данных</h1>
}