namespace WebTechnologiesFinalProject.Models
{
    public class Product
    {
        public Product() { }
        public Product(string description, double pricePerUnit, double shippingCost)
        {
            Description = description;
            PricePerUnit = pricePerUnit;
            ShippingCost = shippingCost;
        }
        public int ProductId { get; set; }        
        public string Description { get; set; }        
        public byte[]? Image { get; set; }
        public double PricePerUnit { get; set; }
        public double ShippingCost { get; set; }
        public List<Comment>? Comments { get; set; }
    }
}
