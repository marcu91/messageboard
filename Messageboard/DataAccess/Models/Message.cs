using System.ComponentModel.DataAnnotations;

namespace Messageboard.DataAccess.Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
    }
}
