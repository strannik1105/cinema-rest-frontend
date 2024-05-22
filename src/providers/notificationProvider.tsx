import React from "react";
import { NotificationProvider } from "@refinedev/core";
import { toast } from "react-toastify";
import {Notification} from "../components/notification";


export const notificationProvider: NotificationProvider = {
    open: ({ key, message, type, undoableTimeout, cancelMutation }) => {
        if (type === "progress") {
            if (toast.isActive(key as React.ReactText)) {
                toast.update(key as React.ReactText, {
                    progress: undoableTimeout && (undoableTimeout / 10) * 2,
                    render: (
                        <Notification
                            message={message}
                            cancelMutation={cancelMutation}
                        />
                    ),
                    type: "default",
                });
            } else {
                toast(
                    <Notification
                        message={message}
                        cancelMutation={cancelMutation}
                    />,
                    {
                        toastId: key,
                        updateId: key,
                        closeOnClick: false,
                        closeButton: false,
                        autoClose: false,
                        progress: undoableTimeout && (undoableTimeout / 10) * 2,
                    },
                );
            }
        } else {
            if (toast.isActive(key as React.ReactText)) {
                toast.update(key as React.ReactText, {
                    render: message,
                    closeButton: true,
                    autoClose: 5000,
                    type,
                });
            } else {
                toast(message, {
                    toastId: key,
                    type,
                });
            }
        }
    },
    close: (key) => toast.dismiss(key),
};