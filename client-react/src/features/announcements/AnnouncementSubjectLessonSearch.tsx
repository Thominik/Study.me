import {debounce, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store/configureStore";
import {setAnnouncementParams} from "./announcementSlice";
import {useState} from "react";

export default function AnnouncementSubjectLessonSearch() {
    const {announcementParams} = useAppSelector(state => state.catalog);
    const [searchSubjectTerm, setSearchTerm] = useState(announcementParams.subjectLessonTerm);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event: any) => {
        dispatch(setAnnouncementParams({subjectLessonTerm: event.target.value}))
    }, 1000)

    return (
        <TextField
            label='Przedmiot'
            variant='outlined'
            sx={{mr: 5, ml: 5, mt: 3, mb: 3}}
            value={searchSubjectTerm || ''}
            onChange={(event: any) => {
                setSearchTerm(event.target.value);
                debouncedSearch(event);
            }}
        />
    )
}