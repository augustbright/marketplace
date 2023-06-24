'use client';

import { CircularProgress, Container, Grid } from "@mui/material";
import { Listing } from "@prisma/client";
import ListingCard from "../listing-card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const Catalog = () => {
    const { data: listings, isFetching } = useQuery({
        queryKey: ['listings'],
        queryFn: async () => axios<Listing[]>('/api/listing')
            .then(response => response.data)
    });

    return (
        <Container>
            {
                isFetching ? (
                    <CircularProgress />
                ) : (
                    <Grid container spacing={2} sx={{
                        p: 4
                    }}>
                        {listings && listings.map(listing => (
                            <Grid item key={listing.id} xs={12} sm={6} md={4}>
                                <ListingCard
                                    listing={listing}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )
            }
        </Container>
    );
};