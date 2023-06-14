using System.Text.Json.Serialization;

namespace WebTechnologiesFinalProject.Models
{
    public class CartLineItem
    {
        public CartLineItem() { }
        public CartLineItem(Cart cart, Product product, int quantity)
        {
            Product = product;
            Quantity = quantity;
            Cart = cart;
        }
        public int CartLineItemId { get; set; }
        public int Quantity { get; set; }
        public int ProductId { get; set; }        
        public Product Product { get; set; }
        [JsonIgnore]
        public int CartId { get; set; }
        [JsonIgnore]
        public Cart Cart { get; set; }
    }
}
