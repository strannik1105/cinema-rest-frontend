import React from "react";
import {IResourceComponentsProps, useDelete, useNavigation, useTable} from "@refinedev/core";
import {IMovie} from "@/interfaces/movie";
import {EditIcon, ShowIcon} from "@/components/actions/common";
import {ColumnMeta} from "@/interfaces/common";
import {Card} from "primereact/card";
import {AddNavButton} from "@/components/navButtons/addNavButton";
import {DatatableView} from "@/components/datatableView";
import {getData} from "@/pages/food/service";


export const FoodList: React.FC<IResourceComponentsProps> = () => {

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

    const foods = tableQueryResult?.data?.data;

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
            </>
        );
    }

    const food = getData()

    const columns: ColumnMeta[] = [
        {field: "name", header: "Название", filter: true},
        {field: "description", header: "Описание", filter: false, sortable: false},
        {field: "price", header: "Цена", filter: true},
        {field: '', header: 'Actions', body: actionBodyTemplate, sortable: false, filter: false},
    ]

    if (food) {
        return (
            <Card
                className="shadow-1"
                title={
                    <div className="flex justify-content-between align-items-center justify-content-center">
                        <span className="text-3xl p-card-title">Список еды</span>
                        <AddNavButton
                            handleClick={() => create("food")}
                        />
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