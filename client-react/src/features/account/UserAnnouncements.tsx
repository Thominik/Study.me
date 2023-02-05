import {
    Typography,
    Button,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Box,
    Avatar
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import useAnnouncements from "../../app/hooks/useAnnouncements";
import AppPagination from "../../app/components/AppPagination";
import {useAppDispatch} from "../../store/configureStore";
import {setPageNumber} from "../announcements/announcementSlice";
import {useState} from "react";
import AnnouncementForm from "../announcements/AnnouncementForm";
import {Announcement} from "../../app/models/announcement";

export default function UserAnnouncements() {
    const {announcements, metaData} = useAnnouncements();
    const dispatch = useAppDispatch();
    const [editMode, setEditMode] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | undefined>(undefined);

    function handleSelectAnnouncement(announcement: Announcement) {
        setSelectedAnnouncement(announcement);
        setEditMode(true);
    }

    function cancelEdit() {
        if (selectedAnnouncement) setSelectedAnnouncement(undefined);
        setEditMode(false);
    }

    if (editMode) return <AnnouncementForm announcement={selectedAnnouncement} cancelEdit={cancelEdit} />
        console.log(announcements);
    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>Moje ogłoszenia</Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Nazwa ogłoszenia</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {announcements.map((announcement) => (
                            <TableRow
                                key={announcement.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">
                                    <Box display='flex' alignItems='center'>
                                        <Avatar src={announcement.photoUrl} alt={announcement.announcementTitle}
                                             style={{ height: 50, width: 50, marginRight: 20 }} />
                                        <span>{announcement.announcementTitle}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => handleSelectAnnouncement(announcement)} startIcon={<Edit />} />
                                    <Button startIcon={<Delete />} color='error' />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {metaData &&
                <Box sx={{pt: 2}}>
                <AppPagination
                    metaData={metaData}
                    onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))} />
                </Box>}
        </>
    )
}