using System.Text.Json.Serialization;

namespace WebTechnologiesFinalProject.Models
{
    public class Cart
    {
        public Cart() { }
        public Cart(User user)
        {
            User = user;
            CartLineItems = new List<CartLineItem>();
        }
        public int CartId { get; set; }
        public int UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; }        
        public List<CartLineItem> CartLineItems { get; set; }
    }
}
