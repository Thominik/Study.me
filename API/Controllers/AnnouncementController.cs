using System.Text.Json;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AnnouncementController : BaseApiController
{
    private readonly StudyContext _context;

    public AnnouncementController(StudyContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<PagedList<Announcement>>> GetAnnouncements([FromQuery]AnnouncementParams announcementParams)
    {
        var query = _context.Announcements
            .Sort(announcementParams.OrderBy)
            .Search(announcementParams.SearchTerm)
            .CityFilter(announcementParams.CityTerm)
            .SubjectFilter(announcementParams.SubjectLessonTerm)
            .AsQueryable();

        var announcements = await PagedList<Announcement>.ToPagedList(query,
            announcementParams.PageNumber, announcementParams.PageSize);
        
        Response.AddPaginationHeader(announcements.MetaData);

        return announcements;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Announcement>> GetAnnouncement(int id)
    {
        var announcement = await _context.Announcements.FindAsync(id);

        if (announcement == null) return NotFound();

        return announcement;
    }
}