namespace WebTechnologiesFinalProject.Models
{
    public class User
    {
        public User() { }
        public User(string name, string email, string password, string shippingAddress)
        {
            Name = name;
            Email = email;
            Password = password;
            ShippingAddress = shippingAddress;
        }
        public int UserId { get; set; }
        public string Name { get; set; }      
        public string Email { get; set; }
        public string Password { get; set; }
        public string ShippingAddress { get; set; }
        public Cart? Cart { get; set; }
        public List<Comment>? Comments { get; set; }
        public List<Order>? Orders { get; set; }
    }
}
