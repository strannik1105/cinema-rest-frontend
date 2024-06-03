import React from "react";
import {IResourceComponentsProps, useNavigation, useTable} from "@refinedev/core";
import {IFood} from "@/interfaces/food";
import {Card} from "primereact/card";
import {AddNavButton} from "@/components/navButtons/addNavButton";


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

    const {edit, show, create} = useNavigation();

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
