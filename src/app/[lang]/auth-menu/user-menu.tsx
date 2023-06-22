'use client';
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { DefaultSession } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

type TSetting = {
    href: string;
    label: string;
};

const settings: TSetting[] = [];

type TProps = {
    user: DefaultSession["user"];
};

export const UserMenu = ({ user }: TProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        handleClose();
        signOut();        
    };

    return (
        <Tooltip title="Open settings">
            <>
                <IconButton onClick={handleClick} sx={{ p: 0 }}>
                    <Avatar alt={user?.name || ""} src={user?.image || ""} />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <Link href='/profile'>
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                    </Link>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </>
        </Tooltip>
    );
};