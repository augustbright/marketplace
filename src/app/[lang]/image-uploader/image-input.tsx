import { Box, Button } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ImageFileThumbnail } from "./image-file-thumbnail";

export const ImageInput = ({
    images, onChange
}: {
    images: File[],
    onChange: (images: File[]) => void
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange([...images, ...Array.from(e.target.files || [])]);
    };

    const deleteFile = (fileName: string) => {
        onChange(images.filter(({ name }) => name !== fileName))
    }
    return (
        <Box>
            <Box>
                {
                    images.length === 0 && (
                        <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />}>
                            Add Picture
                            <input onChange={handleChange} accept="image" type="file" hidden multiple={false} />
                        </Button>
                    )
                }
            </Box>
            <Box>
                {images.map((file) => (
                    <ImageFileThumbnail onDelete={() => {
                        deleteFile(file.name);
                    }}
                        key={file.name}
                        file={file}
                    />
                ))}
            </Box>
        </Box>
    );
};