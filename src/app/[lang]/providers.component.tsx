'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient();

type TProps = {
    children: React.ReactNode;
};
export const Providers = ({ children }: TProps) => (
    <SessionProvider>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </SessionProvider>
);