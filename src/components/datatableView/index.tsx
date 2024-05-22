import {ColumnMeta} from "@/interfaces/common";
import {DataTable} from "primereact/datatable";
import React from "react";
import {Column} from "primereact/column";


interface View {
    data: object[],
    columns: ColumnMeta[],
}


export const DatatableView: React.FC<View> = (
    {
        data,
        columns
    }) => {

    return (
        <DataTable
            value={data}
            dataKey="sid"
            lazy
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25, 50]}
            rowHover
        >
            {columns.map((col) => (
                <Column
                    key={col.field}
                    field={col.field}
                    header={col.header}
                    body={col.body}
                    sortable={col.sortable}
                    filter={col.filter}
                    filterField={col.field}
                    filterElement={col.filterTemplate}
                    dataType={col.dataType}
                />
            ))}

        </DataTable>
    )
}