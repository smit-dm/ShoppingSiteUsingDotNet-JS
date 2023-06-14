using System.Text.Json.Serialization;

namespace WebTechnologiesFinalProject.Models
{
    public class OrderLineItem
    {
        public OrderLineItem() { }
        public OrderLineItem(Order order, Product product, int quantity)
        {
            Order = order;
            Product = product;
            Quantity = quantity;
        }
        public int OrderLineItemId { get; set; }
        public int Quantity { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        [JsonIgnore]
        public int OrderId { get; set; }
        [JsonIgnore]
        public Order Order { get; set; }
    }
}
