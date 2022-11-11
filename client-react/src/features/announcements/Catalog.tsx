import {Announcement} from "../../app/models/announcement";
import AnnouncementList from "./AnnouncementList";
import {useEffect, useState} from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default function Catalog() {

    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Catalog.list()
            .then(announcements => setAnnouncements(announcements))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <LoadingComponent message='Ładuję ogłoszenia...' />

    return (
        <>
            <AnnouncementList announcements={announcements} />
        </>
    )
}