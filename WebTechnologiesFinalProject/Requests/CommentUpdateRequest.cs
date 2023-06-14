namespace WebTechnologiesFinalProject.Requests
{
    public class CommentUpdateRequest
    {
        public int? Rating { get; set; }
        public string? CommentText { get; set; }
        public byte[]? Image { get; set; }
    }
}
