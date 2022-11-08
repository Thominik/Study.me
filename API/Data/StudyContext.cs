using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StudyContext : DbContext
{
    public StudyContext(DbContextOptions options) : base(options)
    {
        
    }
    
    public DbSet<Announcement> Announcements { get; set; }
}