import React from "react";
import {IResourceComponentsProps, useDelete, useNavigation, useTable} from "@refinedev/core";
import {DeleteIcon, EditIcon, ShowIcon} from "@/components/actions/common";
import {ColumnMeta} from "@/interfaces/common";
import {Card} from "primereact/card";
import {AddNavButton} from "@/components/navButtons/addNavButton";
import {DatatableView} from "@/components/datatableView";
import {IFood} from "@/interfaces/food";
import {ConfirmPopup, confirmPopup} from "primereact/confirmpopup";
import {FoodImage} from "@/pages/main/components/food_image";


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
    } = useTable<IFood>({
            syncWithLocation: true,
        }
    )

    const foods = tableQueryResult?.data?.data;

    const {mutate} = useDelete();

    const {edit, show, create} = useNavigation();

    const actionBodyTemplate = (rowData: IFood) => {
        return (
            <>
                <EditIcon
                    icon="pi pi-pencil"
                    onClick={() => edit("food", rowData.sid)}
                />

                <ShowIcon
                    icon="pi pi-eye"
                    onClick={() => show("food", rowData.sid)}
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
                            accept: () => mutate({resource: "food", id: rowData.sid})
                        })
                    }}
                />
            </>
        );
    }

    const columns: ColumnMeta[] = [
        {field: "image", header: "Картинка", body: FoodImage},
        {field: "name", header: "Название", filter: true},
        {field: "description", header: "Описание", filter: false, sortable: false},
        {field: "price", header: "Цена", filter: true},
        {field: "recipe", header: "Рецепт", filter: true},
        {field: '', header: 'Actions', body: actionBodyTemplate, sortable: false, filter: false},
    ]

    if (foods) {
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
                <ConfirmPopup/>
                <DatatableView
                    data={foods}
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