import {useAppDispatch, useAppSelector} from "../../store/configureStore";
import {announcementSelectors, fetchOwnerAnnouncementsAsync} from "../../features/announcements/announcementSlice";
import {useEffect} from "react";

export default function useAnnouncements() {
    const announcements = useAppSelector(announcementSelectors.selectAll);
    const {announcementsLoaded, metaData} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!announcementsLoaded) dispatch(fetchOwnerAnnouncementsAsync());
    }, [announcementsLoaded, dispatch])

    return {
        announcements,
        announcementsLoaded,
        metaData
    }
}