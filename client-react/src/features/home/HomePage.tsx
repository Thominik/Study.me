import {Box, Button, Container, Grid, Icon, IconButton, Typography, useMediaQuery, useTheme} from "@mui/material";
import {KeyboardArrowRight, SubdirectoryArrowRight, TravelExploreTwoTone} from "@mui/icons-material";
import {NavLink} from "react-router-dom";


export default function HomePage() {
    const theme= useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('lg'));
    return (
        <Container>
            <Grid container spacing={2} justifyContent='center' alignItems='center' display='flex' sx={{mt: 12}}>
                {isMatch ? (
                    <>
                        <Grid item>
                            <Box display='flex' justifyContent='center' sx={{mb: 5, mt: -4}}>
                                <img style={{display: 'flex', maxWidth: '70%'}}
                                     src='/images/home2.png' alt='home.png'
                                />
                            </Box>
                        </Grid>
                    <Grid item>
                        <Typography variant='h4' justifyContent='start' alignItems='center'>Znajdź </Typography>
                        <Typography variant='h3'sx={{fontWeight: 'bold'}}> korepetytora</Typography>
                        <Typography variant='h5' justifyContent='start' alignItems='center'>pasującego do Twoich</Typography>
                        <Typography variant='h5' justifyContent='start' alignItems='center'>potrzeb</Typography>
                        <Button
                            variant='contained'
                            sx={{mt: 5, ml: 7}}
                            color='primary'
                            endIcon={<KeyboardArrowRight />}
                            exact component={NavLink} to='/catalog'
                        >
                            Ogłoszenia
                        </Button>
                    </Grid>
                    </>
                ) : (
                        <>
                <Grid item>
                    <Box display='flex' justifyContent='center' sx={{ml: -20}}>
                        <img style={{display: 'flex', maxWidth: '70%'}}
                             src='/images/home2.png' alt='home.png'
                        />
                    </Box>
                </Grid>
                <Grid item>
                    <Typography variant='h4' justifyContent='start' alignItems='center'>Znajdź </Typography>
                    <Typography variant='h3'sx={{fontWeight: 'bold'}}> korepetytora</Typography>
                    <Typography variant='h5' justifyContent='start' alignItems='center'>pasującego do Twoich</Typography>
                    <Typography variant='h5' justifyContent='start' alignItems='center'>potrzeb</Typography>
                    <Button
                        variant='contained'
                        sx={{mt: 5}}
                        color='primary'
                        endIcon={<KeyboardArrowRight />}
                        exact component={NavLink} to='/catalog'
                    >
                        Ogłoszenia
                    </Button>
                </Grid>
                        </>
                )}
            </Grid>
        </Container>
    )
}