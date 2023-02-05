namespace API.Entities;

public class Announcement
{
    public int Id { get; set; }
    public string AnnouncementTitle { get; set; }
    public string SubjectLesson { get; set; }
    public string Location { get; set; }
    public long Price { get; set; }
    public string OnlineLesson { get; set; }
    public string Description { get; set; }
    public string PhoneNumber { get; set; }
    public string? SkypeNumber { get; set; }
    public string PhotoUrl { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string PublicId { get; set; }
    public string AnnouncementOwner { get; set; }
}