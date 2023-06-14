namespace WebTechnologiesFinalProject.Requests
{
    public class ProductUpdateRequest
    {
        public string? Description { get; set; }
        public string? ImageString { get; set; }
        public double? PricePerUnit { get; set; }
        public double? ShippingCost { get; set; }
    }
}
