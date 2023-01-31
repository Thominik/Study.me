import {debounce, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store/configureStore";
import {setAnnouncementParams} from "./announcementSlice";
import {useState} from "react";
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;

export default function AnnouncementSearch() {
    const {announcementParams} = useAppSelector(state => state.catalog);
    const [searchTerm, setSearchTerm] = useState(announcementParams.searchTerm);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event: any) => {
        dispatch(setAnnouncementParams({searchTerm: event.target.value}))
    })

    return (
        <TextField
            label='Nazwa ogłoszenia'
            variant='outlined'
            sx={{mr: 5, ml: 5, mt: 3, mb: 3}}
            value={searchTerm || ''}
            onChange={(event: any) => {
                setSearchTerm(event.target.value);
                debouncedSearch(event);
            }}
        />
    )
}