import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Paper} from "@mui/material";
import {Link, NavLink, useHistory, useLocation} from "react-router-dom";
import {FieldValues, useForm} from "react-hook-form";
import {LoadingButton} from '@mui/lab'
import {useAppDispatch} from "../../store/configureStore";
import {signInUser} from "./accountSlice";

const theme = createTheme();

export default function Login() {
    const history = useHistory();
    const location = useLocation<any>();
    const dispatch = useAppDispatch();
    const {register, handleSubmit, formState: {isSubmitting, errors, isValid}} = useForm({
        mode: 'all'
    })

    async function submitForm(data: FieldValues) {
        await dispatch(signInUser(data));
        history.push(location.state?.from?.pathname || '/catalog');
    }

    return (

            <Container component={Paper} maxWidth="sm"
                       sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4}}>
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Logowanie
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Login"
                            autoFocus
                            {...register('username', {required: 'Login jest wymagany'})}
                            error={!!errors.username}
                            helperText={errors?.username?.message?.toString()}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Hasło"
                            type="password"
                            {...register('password', {required: 'Hasło jest wymagane'})}
                            error={!!errors.password}
                            helperText={errors?.password?.message?.toString()}
                        />
                        <LoadingButton loading={isSubmitting}
                                       disabled={!isValid}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Zaloguj
                        </LoadingButton>
                        <Grid container justifyContent='center'>
                            <Grid item>
                                <LoadingButton loading={isSubmitting}
                                               type="submit"
                                               fullWidth
                                               variant="text"
                                               sx={{ mt: 1}}
                                               exact component={NavLink} to='/asd'
                                >
                                    Zapomniałem hasła
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Box>
            </Container>

    );
}