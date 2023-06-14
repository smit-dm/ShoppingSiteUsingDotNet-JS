using System.Text.Json.Serialization;

namespace WebTechnologiesFinalProject.Models
{
    public class Comment
    {
        public Comment() { }
        public Comment(int rating, string commentText, User user, Product product)
        {
            Rating = rating;
            CommentText = commentText;
            User = user;
            Product = product;
        }
        public int CommentId { get; set; }        
        public int Rating { get; set; }
        public string CommentText { get; set; }
        public byte[]? Image { get; set; }
        public int ProductId { get; set; }
        [JsonIgnore]
        public Product Product { get; set; }
        public int UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; }
    }
}
