'use client';

import { Container, Grid, Typography } from "@mui/material";
import { Listing } from "@prisma/client";
import { useEffect, useState } from "react";
import ListingCard from "../listing-card";

export const Catalog = () => {
    const [listings, setListings] = useState<Listing[]>([]);

    useEffect(() => {
        fetch('/api/listing')
            .then(response => response.json())
            .then(data => setListings(data));
    }, []);

    return (
        <div>
            <Container>
                <Grid container spacing={2} sx={{
                    p: 4
                }}>
                    {listings.map(listing => (
                        <Grid item key={listing.id} xs={12} sm={6} md={4}>
                            <ListingCard
                                listing={listing}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};