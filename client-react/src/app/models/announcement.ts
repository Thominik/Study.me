export interface Announcement {
    id: number;
    announcementTitle: string;
    subjectLesson: string;
    location: string;
    price: number;
    onlineLesson: boolean;
    description: string;
    phoneNumber: string;
    skypeNumber: string;
    photoUrl: string;
    firstName: string;
    lastName: string;
}

export interface AnnouncementParams {
    orderBy: string;
    searchTerm?: string;
    cityTerm?: string;
    subjectLessonTerm?: string;
    pageNumber: number;
    pageSize: number;
}