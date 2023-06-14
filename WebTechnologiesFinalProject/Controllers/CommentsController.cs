using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebTechnologiesFinalProject.Models;
using WebTechnologiesFinalProject.Requests;

namespace WebTechnologiesFinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly Context _context;

        public CommentsController(Context context)
        {
            _context = context;
        }

        // GET: api/comments
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<Comment>>> Get()
        {
            return await _context.Comments.Include(c => c.User).Include(c => c.Product).ToListAsync();
        }

        // GET api/comments/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Comment> Get(int id)
        {
            var comment = _context.Comments.Find(id);

            if (comment != null)
            {
                return Ok(comment);
            }
            return NotFound();
        }

        // POST api/comments
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Post([FromBody] CommentCreateRequest comment)
        {
            try
            {
                var user = _context.Users.Find(comment.UserId);
                if (user == null)
                {
                    return BadRequest("User not found");
                }
                var product = _context.Products.Find(comment.ProductId);
                if (product == null)
                {
                    return BadRequest("Product not found");
                }
                var newComment = new Comment(comment.Rating, comment.CommentText, user, product);
                //add image if exists
                if (comment.ImageString != null)
                {
                    newComment.Image = Convert.FromBase64String(comment.ImageString);
                }
                _context.Comments.Add(newComment);
                _context.SaveChanges();
                int id = newComment.CommentId;
                return CreatedAtAction(nameof(Get), new { id = id }, newComment);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/comments/5
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Put(int id, [FromBody] CommentUpdateRequest comment)
        {
            try
            {
                var commentToUpdate = _context.Comments.Find(id);
                if (commentToUpdate == null)
                {
                    return NotFound();
                }
                commentToUpdate.Rating = comment.Rating ?? commentToUpdate.Rating;
                commentToUpdate.CommentText = comment.CommentText ?? commentToUpdate.CommentText;
                commentToUpdate.Image = comment.Image ?? commentToUpdate.Image;
                _context.SaveChanges();
                return Ok(commentToUpdate);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/comments/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Delete(int id)
        {
            var comment = _context.Comments.Find(id);
            if (comment == null)
            {
                return NotFound();
            }
            _context.Comments.Remove(comment);
            _context.SaveChanges();
            return Ok();
        }
    }
}
