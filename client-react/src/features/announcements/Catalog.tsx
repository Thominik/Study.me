import {Announcement} from "../../app/models/announcement";
import AnnouncementList from "./AnnouncementList";
import {useEffect, useState} from "react";
import agent from "../../app/api/agent";

export default function Catalog() {

    const [announcements, setAnnouncements] = useState<Announcement[]>([]);

    useEffect(() => {
        agent.Catalog.list().then(announcements => setAnnouncements(announcements));
    }, [])

    return (
        <>
            <AnnouncementList announcements={announcements} />
        </>
    )
}