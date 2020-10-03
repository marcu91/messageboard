using Messageboard.DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace Messageboard.DataAccess
{
    public class MessageboardDbContext : DbContext
    {
        public MessageboardDbContext(DbContextOptions<MessageboardDbContext> options) : base(options)
        { }

        public DbSet<Message> Messages { get; set; }
    }
}
