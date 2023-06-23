import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Listing } from '@prisma/client';

export default function ListingCard({ listing }: {
    listing: Listing
}) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {listing.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {listing.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {listing.price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">View More</Button>
            </CardActions>
        </Card>
    );
}