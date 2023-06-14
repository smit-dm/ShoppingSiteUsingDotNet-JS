namespace WebTechnologiesFinalProject.Requests
{
    public class UserCreateRequest
    {        
        public UserCreateRequest(string name, string email, string password, string shippingAddress)
        {
            Name = name;
            Email = email;
            Password = password;
            ShippingAddress = shippingAddress;
        }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ShippingAddress { get; set; }
    }
}
