import {HttpError, IResourceComponentsProps, useCreate, useForm} from "@refinedev/core";
import {IMovie, IMovieForm} from "@/interfaces/movie";
import React, {useRef, useState} from "react";
import {FileUpload, FileUploadUploadEvent} from "primereact/fileupload";
import {Toast} from "primereact/toast";
import {InputText} from "primereact/inputtext";


export const MovieImageUpload: React.FC<IResourceComponentsProps> = () => {
    const {onFinish} = useForm({
        resource: "movies_images",
        action: "create",
        redirect: "list",
    });
    const toast = useRef<Toast>(null);

    const onUpload = (event: FileUploadUploadEvent) => {
        // @ts-ignore
        toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    };

    const {mutate} = useCreate();

    const [name, setName] = useState<string>("");

    const onSubmit = (event: any) => {
        event.preventDefault();
        onFinish({
            name: name,
            select_as_title: true,
        })
    }

    const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {

        const formData = new FormData();

        if (e.target?.files !== null) {
            formData.append('movies_images/7fd5c4bf-7d48-4adc-8400-78680022dc78', e.target?.files[0]);
        }

        mutate(
            {
                resource: "movies_images/7fd5c4bf-7d48-4adc-8400-78680022dc78",
                values: formData,
                meta: {
                    headers: {'content-type': 'multipart/form-data'}
                }
            },
            {
                onSuccess: (data) => {
                   console.log(data)
                }
            }
        )
    }


    return (
        <>
            <label htmlFor="name">Name</label>
            <InputText value={name} onChange={(e) => setName(e.target.value)}/>

            <input
                type="file"
                id="docpicker"
                onChange={onUploadImage}
                accept=""/>

            <button onClick={onSubmit}></button>
        </>

    )
}