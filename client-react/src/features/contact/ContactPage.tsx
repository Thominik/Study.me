import {Box, Chip, Container, Divider, Grid, Icon, IconButton, Typography} from "@mui/material";
import {Email, Facebook, MarkAsUnreadTwoTone, PhoneIphone, Twitter} from "@mui/icons-material";

export default function ContactPage() {
    return (
        <Container>
            <Grid
                container spacing={2}
                sx={{mb: 10}}
                justifyContent="center"
                display='flex'
                xs={12}
            >
                <Grid item xs={12} sm={12} justifyContent='center' alignItems='center'>
                    <Divider sx={{mt: 4, mb: 4}}></Divider>
                    <Typography variant='h4' justifyContent='center' alignItems='center' display='flex'>Pomoc techniczna</Typography>
                    <Typography variant='h5' justifyContent='center' alignItems='center' display='flex'>Study.me</Typography>
                    <Divider sx={{mt: 4}}></Divider>
                </Grid>
                <Grid item xs={12} sm={12} justifyContent='center' alignItems='center'>
                    <Box display='flex' justifyContent='center' sx={{mt: 4, mb: 4}}>
                        <img style={{maxHeight: '40%', maxWidth: '40%', display: 'flex'}}
                             src='/images/online-lesson.png' alt='support.png'
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} justifyContent='center' alignItems='center'>
                    <Divider sx={{ mb: 10}}/>
                </Grid>
                <Grid container item xs={12} sm={6} direction='column' justifyContent='center' alignItems="center"
                      sx={{mb: 5}}>
                    <IconButton><MarkAsUnreadTwoTone
                        style={{width: '90px', height: '90px'}}></MarkAsUnreadTwoTone></IconButton>
                    <Typography variant='h5'>support@studyme.com</Typography>
                </Grid>
                <Grid container item xs={12} sm={6} direction='column' justifyContent='center' alignItems="center"
                      sx={{mb: 5}}>
                    <IconButton><Facebook style={{width: '90px', height: '90px'}}></Facebook></IconButton>
                    <Typography variant='h5'>facebook.com/studyme</Typography>
                </Grid>
                <Grid container item xs={12} sm={6} direction='column' justifyContent='center' alignItems="center"
                      sx={{mb: 5}}>
                    <IconButton><Twitter style={{width: '90px', height: '90px'}}></Twitter></IconButton>
                    <Typography variant='h5'>twitter.com/studyme</Typography>
                </Grid>
                <Grid container item xs={12} sm={6} direction='column' justifyContent='center' alignItems="center"
                      sx={{mb: 5}}>
                    <IconButton><PhoneIphone style={{width: '90px', height: '90px'}}></PhoneIphone></IconButton>
                    <Typography variant='h5'>+48 220 987 233</Typography>
                </Grid>
            </Grid>
            <Divider sx={{mb: 12}}/>
        </Container>
    )
}
