import React from "react";
import {IResourceComponentsProps, useDelete, useNavigation, useTable} from "@refinedev/core";
import {IRoom} from "@/interfaces/room";
import {IMovie} from "@/interfaces/movie";
import {DeleteIcon, EditIcon, ShowIcon} from "@/components/actions/common";
import {ColumnMeta} from "@/interfaces/common";
import {Card} from "primereact/card";
import {DatatableView} from "@/components/datatableView";
import {AddNavButton} from "@/components/navButtons/addNavButton";
import {ConfirmPopup, confirmPopup} from "primereact/confirmpopup";

export const RoomsList: React.FC<IResourceComponentsProps> = () => {
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
    } = useTable<IRoom>({
            syncWithLocation: true,
        }
    )

    const rooms = tableQueryResult?.data?.data;

    const {mutate} = useDelete();

    const {edit, show, create} = useNavigation();

    const actionBodyTemplate = (rowData: IMovie) => {
        return (
            <>
                <EditIcon
                    icon="pi pi-pencil"
                    onClick={() => edit("rooms", rowData.sid)}
                />

                <ShowIcon
                    icon="pi pi-eye"
                    onClick={() => show("rooms", rowData.sid)}
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
                            accept: () => mutate({resource: "rooms", id: rowData.sid})
                        })
                    }}
                />
            </>
        );
    }

    const columns: ColumnMeta[] = [
        {field: "name", header: "Название", filter: true},
        {field: "description", header: "Описание", filter: false, sortable: false},
        {field: "cost_per_hour", header: "Цена в час", filter: true},
        {field: '', header: 'Actions', body: actionBodyTemplate, sortable: false, filter: false},
    ]

    if (rooms) {
        return (
            <Card
                className="shadow-1"
                title={
                    <div className="flex justify-content-between align-items-center justify-content-center">
                        <span className="text-3xl p-card-title">Список комнат</span>
                        <AddNavButton
                            handleClick={() => create("rooms")}
                        />
                    </div>
                }

            >
                <ConfirmPopup/>
                <DatatableView
                    data={rooms}
                    columns={columns}
                />
            </Card>

        )
    }
    return <Card
        className="shadow-1"
        title={
            <div className="flex justify-content-between align-items-center justify-content-center">
                <span className="text-3xl p-card-title">Список комнат</span>
                <AddNavButton
                    handleClick={() => create("rooms")}
                />
            </div>
        }

    />
}