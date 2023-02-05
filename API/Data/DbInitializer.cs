using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data;

public class DbInitializer
{
    public static async Task Initialize(StudyContext context, UserManager<User> userManager)
    {
        if (!userManager.Users.Any())
        {
            var user = new User
            {
                UserName = "dominik",
                Email = "dominik@test.com"
            };

            await userManager.CreateAsync(user, "Pa$$word1");
            await userManager.AddToRoleAsync(user, "Member");
            
            var admin = new User
            {
                UserName = "admin",
                Email = "admin@test.com"
            };

            await userManager.CreateAsync(admin, "Pa$$word1");
            await userManager.AddToRolesAsync(admin, new[] {"Member", "Admin"});
        }
        
        if (context.Announcements.Any()) return;
        
        var announcements = new List<Announcement>
        {
            new Announcement
            {
                AnnouncementTitle = "Prosta nauka języka angielskiego",
                Description =
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                Price = 60,
                Location = "Rzeszów",
                SubjectLesson = "język angielski",
                OnlineLesson = "Zajęcia online",
                PhoneNumber = "725725724",
                SkypeNumber = "lukas23",
                PhotoUrl = "/images/people/lukas.png",
                FirstName = "Łukasz",
                LastName = "Nowak"
            },
            new Announcement
            {
                AnnouncementTitle = "Skuteczne programowanie",
                Description =
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                Price = 100,
                Location = "Kraków",
                SubjectLesson = "programowanie",
                OnlineLesson = "Zajęcia stacjonarne",
                PhoneNumber = "345091123",
                SkypeNumber = "anna.k2",
                PhotoUrl = "/images/people/anna.png",
                FirstName = "Anna",
                LastName = "Nowaczkiewicz"
            },
            new Announcement
            {
                AnnouncementTitle = "Matemaks",
                Description =
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                Price = 30,
                Location = "Lublin",
                SubjectLesson = "matematyka",
                OnlineLesson = "Zajęcia stacjonarne i online",
                PhoneNumber = "777341001",
                SkypeNumber = "kasix.q",
                PhotoUrl = "/images/people/kasia.png",
                FirstName = "Kasia",
                LastName = "Duda"
            },
            new Announcement
            {
                AnnouncementTitle = "Szybka nauka biologii",
                Description =
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                Price = 75,
                Location = "Warszawa",
                SubjectLesson = "Biologia",
                OnlineLesson = "Zajęcia online",
                PhoneNumber = "656898100",
                SkypeNumber = "adas.w3",
                PhotoUrl = "/images/people/adam.png",
                FirstName = "Adam",
                LastName = "Wawrej"
            },
            new Announcement
            {
                AnnouncementTitle = "Prosta nauka języka niemieckiego",
                Description =
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                Price = 60,
                Location = "Szczecin",
                SubjectLesson = "język niemiecki",
                OnlineLesson = "Zajęcia online i stacjonarne",
                PhoneNumber = "700700898",
                SkypeNumber = "krz.krz2",
                PhotoUrl = "/images/people/krzysiek.png",
                FirstName = "Krzysiek",
                LastName = "Nowak"
            },
            new Announcement
            {
                AnnouncementTitle = "Proste jak struny w gitarze",
                Description =
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                Price = 30,
                Location = "Rzeszów",
                SubjectLesson = "gra na gitarze",
                OnlineLesson = "Zajęcia stacjonarne u ucznia",
                PhoneNumber = "456983222",
                SkypeNumber = "michu567",
                PhotoUrl = "/images/people/michal.png",
                FirstName = "Michał",
                LastName = "Kowalski"
            },
        };

        foreach (var announement in announcements)
        {
            context.Announcements.Add(announement);
        }

        context.SaveChanges();
    }
}