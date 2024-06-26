import React from "react";

type UndoableNotification = {
    message: string;
    cancelMutation?: () => void;
    closeToast?: () => void;
};

export const Notification: React.FC<UndoableNotification> = (
    {
        closeToast,
        cancelMutation,
        message,
    }) => {
    return (
        <div>
            <p>{message}</p>
            <button
                onClick={() => {
                    cancelMutation?.();
                    closeToast?.();
                }}
            >
                Undo
            </button>
        </div>
    );
};