import React from "react";
import {IResourceComponentsProps, useNavigation, useTable} from "@refinedev/core";
import {IFood} from "@/interfaces/food";
import {Card} from "primereact/card";
import {AddNavButton} from "@/components/navButtons/addNavButton";
import {ConfirmPopup} from "primereact/confirmpopup";
import {DatatableView} from "@/components/datatableView";
import {ColumnMeta} from "@/interfaces/common";


export const UsersList: React.FC<IResourceComponentsProps> = () => {
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

    const data = tableQueryResult?.data?.data;

    const {edit, show, create} = useNavigation();

    const columns: ColumnMeta[] = [
        {field: "name", header: "Имя пользователя"},
        {field: "email", header: "Email"},
        {field: "role", header: "Роль"}
    ]

    if (data) {
        return (
            <Card
                className="shadow-1"
                title={
                    <div className="flex justify-content-between align-items-center justify-content-center">
                        <span className="text-3xl p-card-title">Список пользователей</span>
                        <AddNavButton
                            handleClick={() => create("food")}
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

    return <Card/>
}
