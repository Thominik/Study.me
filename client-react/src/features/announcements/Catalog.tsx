import AnnouncementList from "./AnnouncementList";
import {useEffect} from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {useAppDispatch, useAppSelector} from "../../store/configureStore";
import {announcementSelectors, fetchAnnouncementsAsync} from "./announcementSlice";

export default function Catalog() {
    const announcements = useAppSelector(announcementSelectors.selectAll);
    const {announcementsLoaded, status} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!announcementsLoaded) dispatch(fetchAnnouncementsAsync());
    }, [announcementsLoaded, dispatch])

    if (status.includes('pending')) return <LoadingComponent message='Ładuję ogłoszenia...' />

    return (
        <>
            <AnnouncementList announcements={announcements} />
        </>
    )
}