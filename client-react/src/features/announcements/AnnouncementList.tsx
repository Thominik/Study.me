import {Grid, Stack} from "@mui/material";
import {Announcement} from "../../app/models/announcement";
import AnnouncementCard from "./AnnouncementCard";
import {useAppSelector} from "../../store/configureStore";
import AnnouncementSkeleton from "./AnnouncementSkeleton";

interface Props {
    announcements: Announcement[];
}

export default function AnnouncementList({announcements}: Props) {
    const {announcementsLoaded} = useAppSelector(state => state.catalog);
    return (
        <Stack spacing={4}>
            {announcements.map(announcement => (
                <Grid item xs={3}  key={announcement.id}>
                    {!announcementsLoaded ? (
                        <AnnouncementSkeleton />
                    ) : (
                        <AnnouncementCard announcement={announcement} />
                    )}
                </Grid>
            ))}
        </Stack>
    )
}