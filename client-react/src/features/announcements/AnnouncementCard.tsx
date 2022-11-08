import {Announcement} from "../../app/models/announcement";
import {
    Avatar, Button,
    Card, CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Typography
} from "@mui/material";
import {Link} from "react-router-dom";

interface Props {
    announcement: Announcement;
}

export default function AnnouncementCard({announcement}: Props) {
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar src={announcement.photoUrl} sx={{width: 120, height: 120, mb: 3, mt: 7, ml: 7, mr: 15}}>
                    </Avatar>
                }
                title={announcement.subjectLesson}
            />
            <CardContent sx={{ mt: -8, ml: 39}}>
                <Typography variant="h5" color="primary">
                    {announcement.announcementTitle}
                </Typography>
            </CardContent>
            <CardContent sx={{ mt: -15, ml: 39}}>
                <Typography variant="h4" color="text.primary">
                    {announcement.firstName}
                </Typography>
            </CardContent>
            <CardContent sx={{ mt: 5, ml: 39}}>
                <Typography variant="h5" color="text.secondary">
                    {announcement.description}
                </Typography>
            </CardContent>
            <CardContent sx={{ mt: -17, ml: 5}}>
                <Typography gutterBottom color='text.primary' variant="h6">
                    {(announcement.price).toFixed(2)} zł / godzina
                </Typography>
            </CardContent>
            <CardActions sx={{ mt: 1, ml: 7.5, mb: 5}}>
                <Button component={Link} to={`/catalog/${announcement.id}`} color='info' size="medium" variant="contained">Zobacz więcej</Button>
            </CardActions>
        </Card>
    )
}