'use client';
import { GuestMenu } from "./guest-menu";
import { useSession } from "next-auth/react";
import { UserMenu } from "./user-menu";
import { stat } from "fs";
import { CircularProgress } from "@mui/material";

export const AuthMenu = () => {
    const { status, data } = useSession();

    if (status === "loading") {
        return (
            <CircularProgress color="info" />
        );
    };
    if (status === "authenticated") {
        return (
            <UserMenu user={data.user} />
        );
    } else {
        return (
            <GuestMenu />
        );
    }
};