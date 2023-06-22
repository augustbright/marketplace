'use client';
import { GuestMenu } from "./guest-menu";
import { MouseEventHandler } from "react";
import { useSession } from "next-auth/react";
import { UserMenu } from "./user-menu";

export const AuthMenu = ({ onClick }: {
    onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
    const session = useSession();

    if (session && session.data?.user) {
        return (
            <UserMenu user={session.data?.user} onClick={onClick} />
        );
    } else {
        return (
            <GuestMenu />
        );
    }
};