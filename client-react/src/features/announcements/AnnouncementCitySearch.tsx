import {debounce, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store/configureStore";
import {setAnnouncementParams} from "./announcementSlice";
import {useState} from "react";

export default function AnnouncementCitySearch() {
    const {announcementParams} = useAppSelector(state => state.catalog);
    const [searchCityTerm, setSearchTerm] = useState(announcementParams.cityTerm);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event: any) => {
        dispatch(setAnnouncementParams({cityTerm: event.target.value}))
    })

    return (
        <TextField
            label='Miasto'
            variant='outlined'
            sx={{mr: 5, ml: 5, mt: 3, mb: 3}}
            value={searchCityTerm || ''}
            onChange={(event: any) => {
                setSearchTerm(event.target.value);
                debouncedSearch(event);
            }}
        />
    )
}