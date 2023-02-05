import {useCallback, useEffect, useState} from "react";
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Header from "./Header";
import Catalog from "../../features/announcements/Catalog";
import {Route, Switch} from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import AnnouncementDetails from "../../features/announcements/AnnouncementDetails";
import ContactPage from "../../features/contact/ContactPage";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import {useAppDispatch} from "../../store/configureStore";
import {fetchCurrentUser} from "../../features/account/accountSlice";
import LoadingComponent from "./LoadingComponent";
import PrivateRoute from "./PrivateRoute";
import AnnouncementAdd from "../../features/announcements/AnnouncementAdd";
import UserAnnouncements from "../../features/account/UserAnnouncements";


function App() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    const initApp = useCallback(async () => {
        try {
            await dispatch(fetchCurrentUser());
        } catch (error) {
            console.log(error);
        }
    }, [dispatch])

    useEffect(() => {
        initApp().then(() => setLoading(false));
    }, [initApp])

    const [darkMode, setDarkMode] = useState(false);
    const paletteType  = darkMode ? 'dark' : 'light'
    const theme = createTheme({
        palette: {
            mode: paletteType,
            background: {
                default: paletteType === 'light' ? '#eaeaea' : '#121212'
            }
        }
    })

    function handleThemeChange() {
        setDarkMode(!darkMode);
    }

    if (loading) return <LoadingComponent message='Inicjalizacja aplikacji...' />

  return (
        <ThemeProvider theme={theme}>
            <ToastContainer position='bottom-right' hideProgressBar />
            <CssBaseline />
            <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
            <Container>
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/catalog' component={Catalog} />
                    <Route path='/catalog/:id' component={AnnouncementDetails} />
                    <Route path='/contact' component={ContactPage} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/server-error' component={ServerError} />
                    <PrivateRoute path='/announcement/add' component={AnnouncementAdd} />
                    <PrivateRoute path='/announcements/user' component={UserAnnouncements} />
                    <Route component={NotFound} />
                </Switch>
            </Container>
        </ThemeProvider>
  );
}

export default App;
