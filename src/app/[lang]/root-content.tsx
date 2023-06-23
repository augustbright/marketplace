'use client';

import { Container } from "@mui/material";

export const RootContent = ({children}: {
    children: React.ReactNode
}) => (
    <Container sx={{
        pt: 2,
    }}>
        {children}
    </Container>
);