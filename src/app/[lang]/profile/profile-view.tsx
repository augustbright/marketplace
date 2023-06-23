'use client';

import { Avatar, Box, Container, Typography } from "@mui/material";
import { User } from "@prisma/client";

export const ProfileView = ({ user }: { user: User }) => {
    const { image, name } = user;

    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    justifyContent: 'center',
                    gap: 2,
                    mt: 2,
                }}
            >
                {image && (
                    <Avatar
                        src={image}
                        alt={name || "User picture"}
                        sx={{ width: 56, height: 56 }}
                    />
                )}
                <Typography variant="h6">{name}</Typography>
            </Box>
        </Container>
    );
};