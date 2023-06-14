namespace WebTechnologiesFinalProject.Requests
{
    public class CommentCreateRequest
    {
        public CommentCreateRequest(int rating, string commentText, int productId, int userId)
        {
            Rating = rating;
            CommentText = commentText;
            ProductId = productId;
            UserId = userId;
        }
        public int Rating { get; set; }
        public string CommentText { get; set; }
        public string? ImageString { get; set; }
        public int ProductId { get; set; }
        public int UserId { get; set; }
    }
}
