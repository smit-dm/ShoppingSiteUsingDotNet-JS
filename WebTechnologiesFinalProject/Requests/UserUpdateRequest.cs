namespace WebTechnologiesFinalProject.Requests
{
    public class UserUpdateRequest
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? ShippingAddress { get; set; }
    }
}
