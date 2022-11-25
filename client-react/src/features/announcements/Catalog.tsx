import AnnouncementList from "./AnnouncementList";
import {useEffect} from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {useAppDispatch, useAppSelector} from "../../store/configureStore";
import {announcementSelectors, fetchAnnouncementsAsync, setAnnouncementParams} from "./announcementSlice";
import {
    Box,
    Grid, Pagination,
    Paper,
    Typography
} from "@mui/material";
import AnnouncementSearch from "./AnnouncementSearch";
import SelectGroup from "../../app/components/SelectGroup";
import AnnouncementSubjectLessonSearch from "./AnnouncementSubjectLessonSearch";
import AnnouncementCitySearch from "./AnnouncementCitySearch";

const sortOptions = [
    {value: 'title', label: 'Alfabetycznie'},
    {value: 'priceDesc', label: 'Cena malejąco '},
    {value: 'price', label: 'Cena rosnąco'},
]

export default function Catalog() {
    const announcements = useAppSelector(announcementSelectors.selectAll);
    const {announcementsLoaded, status, announcementParams} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!announcementsLoaded) dispatch(fetchAnnouncementsAsync());
    }, [announcementsLoaded, dispatch])

    if (status.includes('pending')) return <LoadingComponent message='Ładuję ogłoszenia...' />

    return (
        <Grid>
            <Grid item xs={2} mt={10} mb={8} justifyContent='center' display='flex'>
                <Paper>
                    <AnnouncementSearch />
                    <SelectGroup
                        options={sortOptions}
                        onChange={(e) => dispatch(setAnnouncementParams({orderBy: e.target.value}))}
                        selectedValue={announcementParams.orderBy}
                    />
                    <AnnouncementSubjectLessonSearch />
                    <AnnouncementCitySearch />
                </Paper>
                <Paper sx={{mb: 2}}>

                </Paper>
            </Grid>
            <Grid sx={{mb: 5}} item xs={10}>
                <AnnouncementList announcements={announcements} />
            </Grid>
            <Grid item xs={3} />
            <Grid sx={{mb: 3}} item xs={9}>
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography>
                        Wyświetlono 1-6 z 20 ogłoszeń
                    </Typography>
                    <Pagination
                        color='primary'
                        size='large'
                        count={10}
                        page={2}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}