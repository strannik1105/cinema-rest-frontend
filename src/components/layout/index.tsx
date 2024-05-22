import React, {PropsWithChildren} from "react";
import {Menu} from "../menu";
import {Breadcrumb} from "../breadcrumb";

export const Layout: React.FC<PropsWithChildren> = ({children}) => {
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
