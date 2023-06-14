namespace WebTechnologiesFinalProject.Requests
{
    public class CartUpdateRequest
    {
        public CartUpdateRequest(List<CartLineItemRequest> cartLineItems)
        {
            CartLineItems = cartLineItems;
        }
        public List<CartLineItemRequest> CartLineItems { get; set; }        
        public class CartLineItemRequest
        {
            public int ProductId { get; set; }
            public int Quantity { get; set; }            
        }
    }    
}
