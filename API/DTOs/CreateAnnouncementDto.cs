using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class CreateAnnouncementDto
{
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
    [Required]
    public string PhoneNumber { get; set; }
    public string? SkypeNumber { get; set; }
    [Required]
    public IFormFile File { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
}