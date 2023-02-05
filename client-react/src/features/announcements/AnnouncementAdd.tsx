import {Typography, Grid, Paper, Box, Button, Avatar, Checkbox} from "@mui/material";
import {FieldValues, useForm} from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import {Announcement} from "../../app/models/announcement";
import {useEffect, useState} from "react";
import useAnnouncements from "../../app/hooks/useAnnouncements";
import {toast} from "react-toastify";
import AppDropzone from "../../app/components/AppDropzone";
import {validationSchema} from "./announcementValidation";
import {yupResolver} from "@hookform/resolvers/yup";

interface Props {
    announcement?: Announcement;
    cancelEdit: () => void;
}

export default function AnnouncementForm({announcement, cancelEdit}: Props) {
    const { control, reset, handleSubmit, watch } = useForm();
    const {announcements} = useAnnouncements();
    const watchFile = watch('file', null);

    useEffect(() => {
        if (announcement) reset(announcement);
    }, [announcement, reset])

    function handleSubmitData(data: FieldValues) {
        console.log(data.onlineLesson);
        console.log(data);
    }

    return (
        <Box component={Paper} sx={{p: 4}}>
            <Typography variant="h4" gutterBottom sx={{mb: 4}}>
                Dodawanie ogłoszenia
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
                    <Grid item xs={12} lg={6}>
                        <Box display='flex' justifyContent='space-evenly' alignItems='center'>
                            <AppDropzone control={control} name='file' />
                            {watchFile ? (
                                <Avatar src={watchFile.preview} alt="preview" style={{maxWidth: 120, maxHeight: 120}}/>
                            ) : (
                                <Avatar src={announcement?.photoUrl} alt={announcement?.announcementTitle} style={{width: 120, height: 120}}/>
                            )}
                        </Box>
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
                    <Button type='submit' variant='contained' color='success'>Potwierdź</Button>
                </Box>
            </form>
        </Box>
    )
}