export const productData = [
    {
        sid: "123",
        name: "блюдо1",
        description: "Описание",
        price: 1000
    },
    {
        sid: "456",
        name: "блюдо2",
        description: "Описание",
        price: 500
    },
    {
        sid: "1234",
        name: "блюдо2",
        description: "Описание",
        price: 500
    },
]

export const getData = () => {
    return productData
}

export const addData = (obj: any) => {
    productData.push(obj)
}

export const getById = (id: string) => {
    let res;
    for (let i=0; i < productData.length; i++) {
        if (productData[i].sid == id) {
            res = productData[i]
        }
    }
    return res
}
