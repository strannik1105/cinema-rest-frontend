import React, {PropsWithChildren} from "react";
import {Menu} from "../menu";
import {Breadcrumb} from "../breadcrumb";
import {Link} from "react-router-dom";

export const Layout: React.FC<PropsWithChildren> = ({children}) => {
    const userRole = localStorage.getItem("user_role")

    if (userRole == "1") {
        return <>у вас нет прав! <Link to="/index/">Перейти на главную</Link></>
    }
    return (
        <div className="min-h-screen surface-ground flex">
            <Menu/>
            <div className="p-3 w-full">
                <Breadcrumb/>
                {children}
            </div>
        </div>
    );
};
