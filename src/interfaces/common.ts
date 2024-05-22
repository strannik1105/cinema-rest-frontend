export interface ColumnMeta {
    field: string,
    header: string,
    body?: any,
    sortable?: boolean,
    filter?: boolean,
    filterTemplate?: any,
    dataType?: string
}
