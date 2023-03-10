import {
    Typography,
    Grid,
    Paper,
    Box,
    Button,
    Avatar,
    useTheme,
    useMediaQuery
} from "@mui/material";
import {FieldValues, useForm} from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import {Announcement} from "../../app/models/announcement";
import {useEffect} from "react";
import AppDropzone from "../../app/components/AppDropzone";
import {yupResolver} from '@hookform/resolvers/yup';
import {validationSchema} from "./announcementValidation";
import agent from "../../app/api/agent";
import {useAppDispatch} from "../../store/configureStore";
import {setAnnouncement} from "./announcementSlice";
import {LoadingButton} from "@mui/lab";
import Catalog from "./Catalog";
import {useRouteMatch} from "react-router-dom";

interface Props {
    announcement?: Announcement;
    cancelEdit: () => void;
}

export default function AnnouncementForm({announcement, cancelEdit}: Props) {
    const { control, reset, handleSubmit, watch, formState: {isDirty, isSubmitting} } = useForm({
        resolver: yupResolver<any>(validationSchema)
    });
    const watchFile = watch('file', null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (announcement && !watchFile && !isDirty) reset(announcement);
        return () => {
            if (watchFile) URL.revokeObjectURL(watchFile.preview);
        }
    }, [announcement, reset, watchFile, isDirty])

    async function handleSubmitData(data: FieldValues) {
        try {
            let response: Announcement;
            if (announcement) {
                response = await agent.Member.updateAnnouncement(data);
            } else {
                response = await agent.Member.createAnnouncement(data);
            }
            dispatch(setAnnouncement(response));
            cancelEdit();
        } catch (error) {
            console.log(error)
        }
    }

    const theme= useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('lg'));

    return (
        <Box component={Paper} sx={{p: 4}}>
            <Typography variant="h4" gutterBottom sx={{mb: 4}}>
                Edycja ogłoszenia
            </Typography>
            <form onSubmit={handleSubmit(handleSubmitData)}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <AppTextInput control={control} name='announcementTitle' label='Nazwa ogłoszenia' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='subjectLesson' label='Przedmiot' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='location' label='Miasto' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput type='number' control={control} name='price' label='Cena' />
                </Grid>
                <Grid item xs={12} sm={6} display='flex' alignItems='center'>
                    <AppTextInput control={control} name='onlineLesson' label='Forma zajęć' />
                </Grid>
                <Grid item xs={12}>
                    <AppTextInput multiline={true} rows={4} control={control} name='description' label='Opis' />
                </Grid>
                <Grid item xs={12}>
                    <AppTextInput type='number' control={control} name='phoneNumber' label='Numer telefonu' />
                </Grid>
                <Grid item xs={12}>
                    <AppTextInput control={control} name='skypeNumber' label='Numer Skype' />
                </Grid>
                <Grid item xs={12}>
                    {isMatch ?
                        (<Box display='flex' justifyContent='space-between' alignItems='center'>
                            <AppDropzone control={control} name='file' />
                            {watchFile ? (
                                <Avatar src={watchFile.preview} alt="preview" sx={{ width: 90, height: 90 }}/>
                            ) : (
                                <Avatar src={announcement?.photoUrl} alt={announcement?.announcementTitle} sx={{ width: 90, height: 90 }}/>
                            )}
                        </Box>) :
                        (
                    <Box display='flex' justifyContent='space-evenly' alignItems='center'>
                        <AppDropzone control={control} name='file' />
                        {watchFile ? (
                            <Avatar src={watchFile.preview} alt="preview" sx={{width: 140, height: 140}}/>
                        ) : (
                            <Avatar src={announcement?.photoUrl} alt={announcement?.announcementTitle} sx={{width: 140, height: 140}}/>
                        )}
                    </Box>)}
                </Grid>
                <Grid item xs={12}>
                    <AppTextInput control={control} name='firstName' label='Imię' />
                </Grid>
                <Grid item xs={12}>
                    <AppTextInput control={control} name='lastName' label='Nazwisko' />
                </Grid>
            </Grid>
            <Box display='flex' justifyContent='space-between' sx={{mt: 3}}>
                <Button onClick={cancelEdit} variant='contained' color='inherit'>Wróć</Button>
                <LoadingButton loading={isSubmitting} type='submit' variant='contained' color='success'>Potwierdź</LoadingButton>
            </Box>
            </form>
        </Box>
    )
}