using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebTechnologiesFinalProject.Models;
using WebTechnologiesFinalProject.Requests;

namespace WebTechnologiesFinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]    
    public class UsersController : ControllerBase
    {
        private readonly Context _context;

        public UsersController(Context context)
        {
            _context = context;
        }

        // GET: api/users
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<User>>> Get()
        {
            return await _context.Users.Include(u => u.Cart).Include(u => u.Comments).Include(u => u.Orders).ToListAsync();
        }

        // GET api/users/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<User> Get(int id)
        {
            var user = _context.Users.Include(u => u.Cart).Include(u => u.Comments).Include(u => u.Orders).FirstOrDefault(u => u.UserId == id);

            if (user != null)
            {
                return Ok(user);
            }
            return NotFound();
        }

        // POST api/users
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Post([FromBody] UserCreateRequest user)
        {
            try
            {
                var newUser = new User(user.Name, user.Email, user.Password, user.ShippingAddress);
                _context.Users.Add(newUser);
                _context.SaveChanges();
                int id = newUser.UserId;
                return CreatedAtAction(nameof(Get), new { id = id }, newUser);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/users/5
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Put(int id, [FromBody] UserUpdateRequest user)
        {
            try
            {
                var existingUser = _context.Users.Find(id);
                if (existingUser == null)
                {
                    return NotFound();
                }
                existingUser.Name = user.Name ?? existingUser.Name;
                existingUser.Email = user.Email ?? existingUser.Email;
                existingUser.Password = user.Password ?? existingUser.Password;
                existingUser.ShippingAddress = user.ShippingAddress ?? existingUser.ShippingAddress;
                _context.SaveChanges();
                return Ok(existingUser);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/users/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Delete(int id)
        {
            try
            {
                var existingUser = _context.Users.Find(id);
                if (existingUser == null)
                {
                    return NotFound();
                }
                _context.Users.Remove(existingUser);
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
