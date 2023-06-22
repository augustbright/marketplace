'use client';
import Link from "next/link";

export const GuestMenu = () => {
    return (
        <Link href='/api/auth/signin'>
            Login
        </Link>
    );
}