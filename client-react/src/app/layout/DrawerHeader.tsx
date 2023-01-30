import {Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {useState} from "react";
import {MenuRounded} from "@mui/icons-material";
import {NavLink} from "react-router-dom";

const allLinks = [
    {title: 'Strona główna', path: '/'},
    {title: 'Ogłoszenia', path: '/catalog'},
    {title: 'Dodaj ogłoszenie', path: '/announcement/add'},
    {title: 'Kontakt', path: '/contact'},
    {title: 'Zaloguj się', path: '/login'},
    {title: 'Załóż konto', path: '/register'}
]

const navStyles = {
    color: 'inherit',
    justifyContent: "center",
    alignItems: "center",
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

export default function DrawerHeader() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Drawer open={open} onClose={() => setOpen(false)}>
            <List>
                <ListItemButton onClick={() => setOpen(false)}>
                    <ListItemIcon>
                        <ListItemText>
                            {allLinks.map(({title, path}) => (
                                <ListItem exact component={NavLink} to={path} key={path}
                                          sx={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', ...navStyles}}>
                                    {title}
                                </ListItem>
                            ))}
                        </ListItemText>
                    </ListItemIcon>
                </ListItemButton>
            </List>
            </Drawer>

            <IconButton sx={{marginLeft: 'auto', color: 'white'}} onClick={() => setOpen(!open)}>
                <MenuRounded></MenuRounded>
            </IconButton>
        </>
    )
}