import {Box, Chip, Container, Divider, Grid, Icon, IconButton, Typography} from "@mui/material";
import {Email, Facebook, MarkAsUnreadTwoTone, PhoneIphone, Twitter} from "@mui/icons-material";

export default function ContactPage() {
    return (
        <Container>
            <Divider sx={{mt: 12, mb:5}}><Typography variant='h4'>Pomoc techniczna Study.me</Typography></Divider>
            <Box display='flex' justifyContent='center' sx={{mt: 12, mb: 12 }}>
                <img style={{maxHeight: '40%', maxWidth: '40%', display: 'flex'}}
                     src='/images/online-lesson.png' alt='support.png'
                />
            </Box>
            <Divider sx={{mt: 10, mb: 10}}/>
            <Grid
                container spacing={2}
                sx={{mb: 10}}
                justifyContent="center"
                display='flex'
                xs={12}
            >
                <Grid container item xs={12} sm={6} direction='column' justifyContent='center' alignItems="center" sx={{mb: 5}}>
                    <IconButton><MarkAsUnreadTwoTone style={{width: '90px', height: '90px'}}></MarkAsUnreadTwoTone></IconButton>
                    <Typography variant='h5'>support@studyme.com</Typography>
                </Grid>
                <Grid container item xs={12} sm={6} direction='column' justifyContent='center' alignItems="center" sx={{mb: 5}}>
                    <IconButton><Facebook style={{width: '90px', height: '90px'}}></Facebook></IconButton>
                    <Typography variant='h5'>support@studyme.com</Typography>
                </Grid>
                <Grid container item xs={12} sm={6} direction='column' justifyContent='center' alignItems="center" sx={{mb: 5}}>
                    <IconButton><Twitter style={{width: '90px', height: '90px'}}></Twitter></IconButton>
                    <Typography variant='h5'>support@studyme.com</Typography>
                </Grid>
                <Grid container item xs={12} sm={6} direction='column' justifyContent='center' alignItems="center" sx={{mb: 5}}>
                    <IconButton><PhoneIphone style={{width: '90px', height: '90px'}}></PhoneIphone></IconButton>
                    <Typography variant='h5'>support@studyme.com</Typography>
                </Grid>
            </Grid>
            <Divider sx={{mb: 12}}/>
        </Container>
    )
}
