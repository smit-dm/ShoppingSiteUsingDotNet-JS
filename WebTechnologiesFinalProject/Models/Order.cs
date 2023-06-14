using System.Text.Json.Serialization;

namespace WebTechnologiesFinalProject.Models
{
    public class Order
    {
        public Order() { }
        public Order(User user, DateTime orderDate, string? shippingAddress, List<OrderLineItem> orderLineItems)
        {
            User = user;
            OrderDate = orderDate;
            ShippingAddress = shippingAddress;
            OrderLineItems = orderLineItems;
        }                
        public int OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public string? ShippingAddress { get; set; }
        public int UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; }
        public List<OrderLineItem> OrderLineItems { get; set; }
    }
}
