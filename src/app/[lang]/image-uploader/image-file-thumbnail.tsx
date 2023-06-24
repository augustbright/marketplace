import { Button, Card, CardActions, CardMedia } from "@mui/material";
import { MouseEventHandler, useMemo } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

export const ImageFileThumbnail = ({ file, onDelete }: {
    file: File,
    onDelete: MouseEventHandler
}) => {
    const url = useMemo(() => URL.createObjectURL(file), [file]);
    return (
        <Card>
            <CardMedia
                component="img"
                alt={file.name}
                image={url}
            />
            <CardActions>
                <Button
                    onClick={onDelete}
                    startIcon={<DeleteIcon />}
                    color="warning"
                    size="small">
                    Remove
                </Button>
            </CardActions>
        </Card>
    );
};