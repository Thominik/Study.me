export interface Announcement {
    id: number;
    announcementTitle: string;
    subjectLesson: string;
    location: string;
    price: number;
    onlineLesson: string;
    description: string;
    phoneNumber: string;
    skypeNumber: string;
    photoUrl: string;
    firstName: string;
    lastName: string;
    optionalEmail?: string;
}

export interface AnnouncementParams {
    orderBy: string;
    searchTerm?: string;
    cityTerm?: string;
    subjectLessonTerm?: string;
    pageNumber: number;
    pageSize: number;
}