'use client';
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { DefaultSession } from "next-auth";
import { MouseEventHandler } from "react";

type TProps = {
    user: DefaultSession["user"];
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const UserMenu = ({ user, onClick }: TProps) => {
    return (
        <Tooltip title="Open settings">
            <IconButton onClick={onClick} sx={{ p: 0 }}>
                <Avatar alt={user?.name || ""} src={user?.image || ""} />
            </IconButton>
        </Tooltip>
    );
};