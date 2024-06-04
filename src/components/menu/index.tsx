import {useMenu} from "@refinedev/core";
import {Link} from "react-router-dom";
import {MenuItem} from "primereact/menuitem";
import React, {useState} from "react";
import {Card} from "primereact/card";
import {PanelMenu} from "primereact/panelmenu";
import {Button} from "primereact/button";
import {Sidebar} from "primereact/sidebar";

export const Menu = () => {
    const {menuItems} = useMenu();
    const [visible, setVisible] = useState(false);

    const userRole = localStorage.getItem("user_role")
    const items: MenuItem[] = menuItems.map((menuItem) => ({

        label: menuItem.label,
        icon: menuItem.icon,
        template: (item, options) => {

            if (userRole === "1") {
                if (item.label != "Пользователи" && item.label != "Фильмы") {
                    return (
                        <Link
                            to={menuItem.route ?? "/"}
                            className="flex align-items-center px-3 py-2 cursor-pointer no-underline text-color"
                        >
                            {item.icon}
                            <span className={`mx-2 ${item.items && 'font-semibold'}`}>{item.label}</span>
                        </Link>
                    );
                }
            } else {
                return (
                        <Link
                            to={menuItem.route ?? "/"}
                            className="flex align-items-center px-3 py-2 cursor-pointer no-underline text-color"
                        >
                            {item.icon}
                            <span className={`mx-2 ${item.items && 'font-semibold'}`}>{item.label}</span>
                        </Link>
                    );
            }

        },
    }));

    return (
        <aside className="min-h-full">
            <Sidebar visible={visible} onHide={() => setVisible(false)}>
                <PanelMenu model={items}/>
            </Sidebar>
            <Card className="panel_none card justify-content-center lg:block sm:hidden h-full">
                <PanelMenu model={items} className="w-full md:w-20rem"/>
            </Card>
            <Button className="fixed z-5 lg:hidden md:block right-0"
                    onClick={() => setVisible(true)}
                    icon="pi pi-bars"
            />
        </aside>

    );
};
