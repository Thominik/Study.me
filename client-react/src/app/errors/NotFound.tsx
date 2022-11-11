import {Button, Container, CssBaseline, Divider, Paper, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {Image} from "@mui/icons-material";

export default function NotFound() {
    return (
        <div>
            <img src='/images/notfoundimg.png' alt='notfound.png'
                 style={{maxHeight: '80%', maxWidth: '80%', display: 'flex', marginLeft: 'auto', marginRight: 'auto', marginTop: '7%', marginBottom: '5%'}}/>
            <CssBaseline />
            <Button style={{display: 'flex', marginLeft: 'auto', marginRight: 'auto', maxWidth: '40%', height: 50, backgroundColor: '#36bbaa'}}
                    variant='contained'
                    component={Link}
                    to='/catalog'>Powrót do ogłoszeń</Button>
        </div>
    )
}