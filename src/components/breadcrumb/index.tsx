import {useBreadcrumb} from "@refinedev/core";
import { BreadCrumb } from 'primereact/breadcrumb';
import {MenuItem} from "primereact/menuitem";
import {Link} from "react-router-dom";
import {classNames} from "primereact/utils";
import React from "react";

export const Breadcrumb: React.FC = () => {
    const {breadcrumbs} = useBreadcrumb();

    const items: MenuItem[] = breadcrumbs.map((breadcrumb) => ({
        label: breadcrumb.label,
        icon: breadcrumb.icon,
        template: (item, options) => {
            return breadcrumb.href ? (
                <Link
                    to={breadcrumb.href}
                    className={classNames("text-color", options.className)}
                >
                    {item.icon}
                    <span
                        className={classNames("ml-2 ", options.labelClassName)}
                    >
                        {item.label}
                    </span>
                </Link>
            ) : (
                <span className={options.className}>
                    <span className={options.labelClassName}>{item.label}</span>
                </span>
            );
        },
    }));

    return (
        <BreadCrumb model={items} />
    );
};
