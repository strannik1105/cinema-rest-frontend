export const productData = [
    {
        sid: "123",
        name: "Паста карбонара",
        description: "описание",
        price: 1000,
        image: "https://eda.ru/images/RecipePhoto/620x415/pasta-karbonara-pasta-alla-carbonara_50865_photo_56238.webp",
        cook: "Петр Петров",
        waiter: "Иван Иванов",
    },
    {
        sid: "456",
        name: "Салат «Цезарь» с тигровыми креветками",
        description: "Описание",
        price: 500,
        image: "https://www.vremena-goda.ru/upload/iblock/a84/salat_cezar_krevetki_ext.jpg?2021072301",
        cook: "Петр Петров",
        waiter: "Иван Иванов",
    },
    {
        sid: "1234",
        name: "Индейка, запеченная целиком",
        description: "Описание",
        price: 10000,
        image: "https://www.vremena-goda.ru/upload/iblock/84b/indeika_ext.jpg?2021072301",
        cook: "Петр Петров",
        waiter: "Максим Сидоров",
    },
]

export const getFood = () => {
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
