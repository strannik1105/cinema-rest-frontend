import React from "react";
import {IResourceComponentsProps, useDelete, useNavigation, useTable} from "@refinedev/core";
import {IWaiter} from "@/interfaces/waiters";
import {ColumnMeta} from "@/interfaces/common";
import {IFood} from "@/interfaces/food";
import {DeleteIcon, EditIcon, ShowIcon} from "@/components/actions/common";
import {Card} from "primereact/card";
import {AddNavButton} from "@/components/navButtons/addNavButton";
import {DatatableView} from "@/components/datatableView";
import {ConfirmPopup, confirmPopup} from "primereact/confirmpopup";


export const WaitersList: React.FC<IResourceComponentsProps> = () => {
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
    } = useTable<IWaiter>({
            syncWithLocation: true,
        }
    )

    const data = tableQueryResult?.data?.data;

    const {mutate} = useDelete();

    const {edit, show, create} = useNavigation();

    const actionBodyTemplate = (rowData: IFood) => {
        return (
            <>
                <EditIcon
                    icon="pi pi-pencil"
                    onClick={() => edit("waiter", rowData.sid)}
                />

                <ShowIcon
                    icon="pi pi-eye"
                    onClick={() => show("waiter", rowData.sid)}
                />

                <DeleteIcon
                    className="bg-red-500 text-0"
                    icon="pi pi-trash"
                    onClick={(event) => {
                        confirmPopup({
                            target: event.currentTarget,
                            message: 'Удалить эту запись?',
                            icon: 'pi pi-info-circle',
                            defaultFocus: 'reject',
                            acceptClassName: 'p-button-danger',
                            accept: () => mutate({resource: "waiter", id: rowData.sid})
                        })
                    }}
                />
            </>
        );
    }

    const columns: ColumnMeta[] = [
        {field: "name", header: "Название", filter: true},
        {field: "surname", header: "Фамилия", filter: false, sortable: false},
        {field: '', header: 'Actions', body: actionBodyTemplate, sortable: false, filter: false},
    ]


    if (data) {
        return (
            <Card
                className="shadow-1"
                title={
                    <div className="flex justify-content-between align-items-center justify-content-center">
                        <span className="text-3xl p-card-title">Список официантов</span>
                        <AddNavButton
                            handleClick={() => create("waiter")}
                        />
                    </div>
                }
            >
                <ConfirmPopup/>
                <DatatableView
                    data={data}
                    columns={columns}
                />
            </Card>
        )
    }
    return <Card
        className="shadow-1"
        title={
            <div className="flex justify-content-between align-items-center justify-content-center">
                <span className="text-3xl p-card-title">Список официантов</span>
                <AddNavButton
                    handleClick={() => create("waiters")}
                />
            </div>
        }

    />
}