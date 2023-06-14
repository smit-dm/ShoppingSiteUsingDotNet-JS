using System.ComponentModel.DataAnnotations;

namespace WebTechnologiesFinalProject.Requests
{
    public class ProductCreateRequest
    {
        public ProductCreateRequest(string description, double pricePerUnit, double shippingCost)
        {
            Description = description;
            PricePerUnit = pricePerUnit;
            ShippingCost = shippingCost;
        }
        [Required]
        public string Description { get; set; }
        public string? ImageString { get; set; }
        [Required]
        [Range(0.01, double.MaxValue)]
        public double PricePerUnit { get; set; }
        [Required]
        [Range(0, double.MaxValue)]
        public double ShippingCost { get; set; }
    }
}
