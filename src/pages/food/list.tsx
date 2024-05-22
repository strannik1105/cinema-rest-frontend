import React from "react";
import {IResourceComponentsProps, useTable} from "@refinedev/core";
import {IMovie} from "@/interfaces/movie";


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

    return <h1></h1>
}