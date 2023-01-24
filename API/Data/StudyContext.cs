using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StudyContext : IdentityDbContext<User>
{
    public StudyContext(DbContextOptions options) : base(options)
    {
        
    }
    
    public DbSet<Announcement> Announcements { get; set; }
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<IdentityRole>()
            .HasData(
                new IdentityRole {Name = "Member", NormalizedName = "MEMBER"},
                new IdentityRole {Name = "Admin", NormalizedName = "ADMIN"}
            );
    }
}