
export const bookData = [
    {
        sid: "qaz",
        room_sid: "123",
        user_sid: "123",
        datetime_start: new Date(2024, 5, 13),
        datetime_end: new Date(2024, 5, 15),
    },

]

export const getData = () => {
    return bookData
}

export const addData = (obj: any) => {
    bookData.push(obj)
}

export const getById = (id: string) => {
    let res;
    for (let i=0; i < bookData.length; i++) {
        if (bookData[i].sid == id) {
            res = bookData[i]
        }
    }
    return res
}