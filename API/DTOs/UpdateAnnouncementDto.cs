using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class UpdateAnnouncementDto
{
    public int Id { get; set; }
    [Required]
    public string AnnouncementTitle { get; set; }
    [Required]
    public string SubjectLesson { get; set; }
    [Required]
    public string Location { get; set; }
    [Required]
    [Range(1, Double.PositiveInfinity)]
    public long Price { get; set; }
    [Required]
    public string OnlineLesson { get; set; }
    [Required]
    [MaxLength(200)]
    public string Description { get; set; }
    public string? PhoneNumber { get; set; }
    public string? SkypeNumber { get; set; }
    public IFormFile? PhotoUrl { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
}