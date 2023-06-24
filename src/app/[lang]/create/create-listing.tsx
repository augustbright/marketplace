'use client';

import { Box, Button, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ImageInput } from "../image-uploader/image-input";

type TForm = {
    title: string;
    description: string;
    price: number;
    currency: string;
};

const currencies = [
    {
        value: 'GEL',
        label: '₾',
    },
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'RUB',
        label: '₽',
    }
];

export const CreateListing = () => {
    const { register, handleSubmit, formState } = useForm<TForm>();
    const [images, setImages] = useState<File[]>([]);

    const onSubmit = async (form: TForm) => {
        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('description', form.description);
        formData.append('price', String(form.price));
        formData.append('currency', form.currency);
        images.forEach((image) => {
            formData.append('images', image);
        });

        await axios.post('/api/listing', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };

    return (
        <Box
            sx={{
                width: 500,
                maxWidth: '100%',
                // gap: 2,
                display: 'flex',
                flexDirection: 'column',
            }}
            component='form'
            onSubmit={handleSubmit(onSubmit)}
        >
            <TextField
                fullWidth
                label="Title"
                id="title"
                {...register("title", {
                    required: "Title is required",
                })}
                error={!!formState.errors.title}
                helperText={formState.errors.title?.message || " "}
            />

            <TextField
                id="description"
                label="description"
                multiline
                fullWidth
                rows={4}
                {...register("description", {
                    required: "Description is required",
                })}
                error={!!formState.errors.description}
                helperText={formState.errors.description?.message || " "}
            />

            <Box sx={{
                display: 'flex',
                gap: 2
            }}>
                <TextField
                    id="price"
                    label="price"
                    type="number"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    sx={{ flexGrow: 1 }}
                    {...register("price", {
                        required: "Price is required",
                    })}
                    error={!!formState.errors.price}
                    helperText={formState.errors.price?.message || " "}
                />

                <TextField
                    id="outlined-select-currency"
                    select
                    label="Currency"
                    defaultValue="GEL"
                    sx={{ width: 100 }}
                    {...register("currency", {
                        required: "Currency is required",
                    })}
                    error={!!formState.errors.currency}
                    helperText={formState.errors.currency?.message || " "}
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>

            <ImageInput images={images} onChange={setImages} />

            <Box sx={{
                pt: 2,
                display: 'flex',
                justifyContent: 'flex-end',
            }}>
                <Button variant="contained" color="success" type="submit">
                    Save
                </Button>
            </Box>
        </Box>
    );
};