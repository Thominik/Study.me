import {useAppDispatch, useAppSelector} from "../../store/configureStore";
import {announcementSelectors, fetchAnnouncementsAsync} from "../../features/announcements/announcementSlice";
import {useEffect} from "react";

export default function useCatalog() {
    const announcements = useAppSelector(announcementSelectors.selectAll);
    const {announcementsLoaded, metaData} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAnnouncementsAsync());
    }, [announcementsLoaded, dispatch])

    return {
        announcements,
        announcementsLoaded,
        metaData
    }
}