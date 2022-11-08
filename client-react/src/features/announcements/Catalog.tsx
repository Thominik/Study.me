import {Announcement} from "../../app/models/announcement";
import AnnouncementList from "./AnnouncementList";
import {useEffect, useState} from "react";

export default function Catalog() {

    const [announcements, setAnnouncements] = useState<Announcement[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/Announcement')
            .then(response => response.json())
            .then(data => setAnnouncements(data))
    }, [])

    return (
        <>
            <AnnouncementList announcements={announcements} />
        </>
    )
}