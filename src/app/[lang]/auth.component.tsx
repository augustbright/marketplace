'use client';

import { SessionProvider } from 'next-auth/react';

type TProps = {
    children: React.ReactNode;
};
export const AuthProvider = ({ children }: TProps) => (
    <SessionProvider>
        {children}
    </SessionProvider>
);