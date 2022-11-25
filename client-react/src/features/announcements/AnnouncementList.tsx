import {Grid, Stack} from "@mui/material";
import {Announcement} from "../../app/models/announcement";
import AnnouncementCard from "./AnnouncementCard";

interface Props {
    announcements: Announcement[];
}

export default function AnnouncementList({announcements}: Props) {
    return (
        <Stack spacing={4}>
            {announcements.map(announcement => (
                <Grid item xs={3}  key={announcement.id}>
                    <AnnouncementCard announcement={announcement} />
                </Grid>
            ))}
        </Stack>
    )
}