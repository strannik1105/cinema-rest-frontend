import type { DataProvider } from "@refinedev/core";

const fetcher = async (url: string, options?: RequestInit) => fetch(url, {
    ...options,
    headers: {
        ...options?.headers,
    },
});

export const dataProvider  = (API_URL: string): DataProvider => ({
    getList: async ({ resource, pagination, filters, sorters }) => {
        const params = new URLSearchParams();

        if (pagination) {
            if (pagination?.current && pagination?.pageSize) {
                params.append("_start", ((pagination?.current - 1) * pagination?.pageSize).toString());
                params.append("_end", (pagination.current * pagination.pageSize).toString());
            }

        }

        if (sorters && sorters.length > 0) {
            params.append("_sort", sorters.map((sorter) => sorter.field).join(","));
            params.append("_order", sorters.map((sorter) => sorter.order).join(","));
        }

        if (filters && filters.length > 0) {
            filters.forEach((filter) => {
                if ("field" in filter && filter.operator === "eq") {
                    // Our fake API supports "eq" operator by simply appending the field name and value to the query string.
                    params.append(filter.field, filter.value);
                }
            });
        }

        const response = await fetcher(`${API_URL}/${resource}?${params.toString()}`);

        if (response.status < 200 || response.status > 299) throw response;

        const data = await response.json();

        const total = Number(response.headers.get("x-total-count"));


        return {
            data,
            total,
        };
    },
    getMany: async ({ resource, ids }) => {
        const params = new URLSearchParams();

        if (ids) {
            ids.forEach((id) => params.append("id", String(id)));
        }

        const response = await fetcher(
            `${API_URL}/${resource}?${params.toString()}`,
        );

        if (response.status < 200 || response.status > 299) throw response;

        const data = await response.json();

        return { data };
    },
    getOne: async ({ resource, id }) => {
        const response = await fetcher(`${API_URL}/${resource}/${id}`);

        if (response.status < 200 || response.status > 299) throw response;

        const data = await response.json();

        return { data };
    },
    create: async ({ resource, variables }) => {
        const response = await fetcher(`${API_URL}/${resource}`, {
            method: "POST",
            body: JSON.stringify(variables),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status < 200 || response.status > 299) throw response;

        const data = await response.json();

        return { data };
    },
    update: async ({ resource, id, variables }) => {
        const response = await fetcher(`${API_URL}/${resource}/${id}`, {
            method: "PATCH",
            body: JSON.stringify(variables),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status < 200 || response.status > 299) throw response;

        const data = await response.json();

        return { data };
    },
    getApiUrl: () => API_URL,
    deleteOne: async ({resource, id, variables}) => {
        const response = await fetcher(`${API_URL}/${resource}/${id}`, {
            method: "DELETE",
            body: JSON.stringify(variables),
            headers: {
                "Content-Type": "application/json",
            },
        });
         if (response.status < 200 || response.status > 299) throw response;

        const data = await response.json();

        return { data };
    },
    /* ... */
})