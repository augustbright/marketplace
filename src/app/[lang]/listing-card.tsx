import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Image, Listing, User } from '@prisma/client';
import { Avatar, CardHeader, CardMedia } from '@mui/material';
import { red } from '@mui/material/colors';

export default function ListingCard({ listing }: {
    listing: Listing & { user: User, image: Image }
}) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar src={listing.user.image || undefined} sx={{ bgcolor: red[500] }} aria-label="user">
                        {listing.user.name[0]}
                    </Avatar>
                }
                title={listing.user.name}
                subheader={listing.createdAt.toLocaleString()}
            />
            <CardContent>
                {listing.image && (
                    <CardMedia
                        component="img"
                        alt={listing.image.name}
                        image={listing.image.url}
                        sx={{
                            aspectRatio: 1
                        }}
                    />
                )}

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