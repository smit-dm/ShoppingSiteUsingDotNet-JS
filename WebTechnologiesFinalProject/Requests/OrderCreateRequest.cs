namespace WebTechnologiesFinalProject.Requests
{
    public class OrderCreateRequest
    {
        public OrderCreateRequest(int userId)
        {
            UserId = userId;            
        }
        public int UserId { get; set; }
        public string? ShippingAddress { get; set; }
    }
}
