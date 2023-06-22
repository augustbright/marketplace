'use client';
import { GuestMenu } from "./guest-menu";
import { MouseEventHandler } from "react";
import { useSession } from "next-auth/react";

export const AuthMenu = async ({ onClick }: {
    onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
    const session = useSession();

    if (session) {
        return (
            // <UserMenu user={session.user} onClick={onClick} />
            <div>Hello</div>
        );
    } else {
        return (
            <GuestMenu />
        );
    }
};