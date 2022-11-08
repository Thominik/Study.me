using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
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
    public async Task<ActionResult<List<Announcement>>> GetAnnouncements()
    {
        return await _context.Announcements.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Announcement>> GetAnnouncement(int id)
    {
        var announcement = await _context.Announcements.FindAsync(id);

        if (announcement == null) return NotFound();

        return announcement;
    }
}