import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link, NavLink, useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import {LoadingButton} from '@mui/lab'
import agent from "../../app/api/agent";
import {Paper} from "@mui/material";
import {toast} from "react-toastify";

const theme = createTheme();

export default function Register() {
    const history = useHistory();
    const {register, handleSubmit, setError, formState: {isSubmitting, errors, isValid}} = useForm({
        mode: 'all'
    })

    function handleApiErrors(errors: any) {
        if (errors) {
            errors.forEach((error: string) => {
                if (error.includes('Passwrod')) {
                    setError('password', {message: error})
                } else if (error.includes('Email')) {
                    setError('email', {message: error})
                } else if (error.includes('Username')) {
                    setError('username', {message: error})
                }
            })
        }
    }

    return (

            <Container component={Paper} maxWidth="sm"
                       sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4}}>
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Rejestracja
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit((data) =>
                        agent.Account.register(data)
                            .then(() => {
                                toast.success('Rejestracja powiodła się');
                                history.push('/login');
                            })
                            .catch(error => handleApiErrors(error)))}
                    noValidate sx={{ mt: 1 }}>
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
                        label="Email"
                        {...register('email', {
                            required: 'Email jest wymagany',
                            pattern: {
                                value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                                message: 'Nieprawidłowy adres email'
                            }
                        })}
                        error={!!errors.email}
                        helperText={errors?.email?.message?.toString()}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Hasło"
                        type="password"
                        {...register('password', {
                            required: 'Hasło jest wymagane',
                            pattern: {
                                value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                                message: 'Hasło nie spełnia wymogów bezpieczeństwa'
                            }
                        })}
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
                        Zarejestruj się
                    </LoadingButton>
                    <Grid container justifyContent='center'>
                        <Grid item>
                            <LoadingButton loading={isSubmitting}
                                           type="submit"
                                           fullWidth
                                           variant="text"
                                           sx={{ mt: 1}}
                                           exact component={NavLink} to='/login'
                            >
                                Mam już konto
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
    );
}