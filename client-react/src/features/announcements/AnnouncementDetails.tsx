import {
    Avatar, Chip,
    Divider,
    Grid, Icon,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from "@mui/material";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Announcement} from "../../app/models/announcement";
import {
    Email,
    Laptop,
    LocationOn,
    PhoneAndroid,
    VideoChat
} from "@mui/icons-material";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default function AnnouncementDetails() {
    const {id} = useParams<{id: string}>();
    const [announcement, setAnnouncement] = useState<Announcement | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Catalog.details(parseInt(id))
            .then(response => setAnnouncement(response))
            .catch(error => console.log(error.response))
            .finally(() => setLoading(false));
    }, [id])

    if (loading) return <LoadingComponent message='Przechodzę do ogłoszenia...' />

    if (!announcement) return <NotFound />

    function checkOnline() {
        if (announcement?.onlineLesson === true) {
            return 'online i stacjonarnie'
        }else{
            return 'zajęcia stacjonarne'
        }
    }


    return (
        <Grid container spacing={6}>
            <Grid item xs={4}>
                <Avatar sx={{mt: 3, ml: 'auto', mr: 'auto'}} src={announcement.photoUrl} alt={announcement.announcementTitle}
                style={{width: 120, height: 120}}></Avatar>
                <Divider sx={{mt: 5, mb:5}}><Chip label="Szczegóły" /></Divider>
                <Typography color='darkgray' variant='h6' textAlign='center'>{(announcement.price)} zł / godzina</Typography>
                <TableContainer sx={{mt: 5, ml: 'auto', mr: 'auto'}}>
                    <Table sx={{ml: 7}}>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{borderBottom:"none"}} align='right'><Icon><LocationOn color='primary'></LocationOn></Icon></TableCell>
                                <TableCell style={{borderBottom:"none"}} align='left'>{announcement.location}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{borderBottom:"none"}} align='right'><Icon><Laptop color='primary'></Laptop></Icon></TableCell>
                                <TableCell style={{borderBottom:"none"}} align='left'>{checkOnline()}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{borderBottom:"none"}} align='right'><Icon><PhoneAndroid color='primary'></PhoneAndroid></Icon></TableCell>
                                <TableCell style={{borderBottom:"none"}} align='left'>{announcement.phoneNumber}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{borderBottom:"none"}} align='right'><Icon><VideoChat color='primary'></VideoChat></Icon></TableCell>
                                <TableCell style={{borderBottom:"none"}} align='left'>{announcement.skypeNumber}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{borderBottom:"none"}} align='right'><Icon><Email color='primary'></Email></Icon></TableCell>
                                <TableCell style={{borderBottom:"none"}} align='left'>tu będzie prop email</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={8}>
                <Typography sx={{mt: 4, mr:5}} textAlign='end' variant='h4'>{announcement.announcementTitle}</Typography>
                <Typography color='primary.main' sx={{ mb: 11.7, mr: 5}} textAlign='end' variant='h6'>{announcement.subjectLesson}</Typography>
                <Divider sx={{mb: 8}} />

                <Typography sx={{ml: 7, mr: 7, mt: 2}} variant='h5'>{announcement.description}</Typography>
            </Grid>
        </Grid>
    )
}