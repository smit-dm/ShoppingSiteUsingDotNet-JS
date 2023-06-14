using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebTechnologiesFinalProject.Models;
using WebTechnologiesFinalProject.Requests;

namespace WebTechnologiesFinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly Context _context;

        public OrdersController(Context context)
        {
            _context = context;
        }

        // GET: api/orders
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<List<Order>> Get()
        {
            return _context.Orders.Include(o => o.User).Include(o => o.OrderLineItems).ToList();
        }

        // GET api/orders/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Order> Get(int id)
        {
            Order? order = _context.Orders.Include(o => o.User)
                                          .Include(o => o.OrderLineItems)
                                          .ThenInclude(o => o.Product)
                                          .Where(o => o.OrderId == id)
                                          .SingleOrDefault();

            if (order != null)
            {
                return Ok(order);
            }
            return NotFound();
        }

        // GET api/orders/user/5
        [HttpGet("user/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<List<Order>> GetByUserId(int id)
        {
            var order = _context.Orders.Include(o => o.User).Include(o => o.OrderLineItems).Where(o => o.UserId == id).ToList();

            if (order != null)
            {
                return Ok(order);
            }
            return NotFound();
        }

        // POST api/orders
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Order> Post([FromBody] OrderCreateRequest request)
        {
            if (request == null)
            {
                return BadRequest();
            }

            var user = _context.Users.FirstOrDefault(u => u.UserId == request.UserId);
            if (user == null)
            {
                return BadRequest("User does not exist");
            }

            var cart = _context.Carts.Include(c => c.CartLineItems).ThenInclude(c => c.Product).FirstOrDefault(c => c.UserId == request.UserId);
            if (cart == null)
            {
                return BadRequest("No cart found for user");
            }

            // return bad request if cart is empty
            if (cart.CartLineItems.Count == 0)
            {
                return BadRequest("Cart is empty");
            }

            // get all line items from cart
            var cartLineItems = _context.CartLineItems.Include(c => c.Product).Where(c => c.CartId == cart.CartId).ToList();

            // create order line items
            var orderLineItems = new List<OrderLineItem>();
            foreach (var cartLineItem in cartLineItems)
            {
                var orderLineItem = new OrderLineItem()
                {
                    Product = cartLineItem.Product,
                    Quantity = cartLineItem.Quantity
                };                
                orderLineItems.Add(orderLineItem);
            }

            var order = new Order(user, DateTime.Now, request.ShippingAddress, orderLineItems);
            _context.Orders.Add(order);
            _context.SaveChanges();            

            _context.Carts.Remove(cart);
            _context.SaveChanges();

            return CreatedAtAction(nameof(Get), new { id = order.OrderId }, order);
        }
        // Updating an order doesn't make much sense, so i'll leave this as a placeholder
        // PUT api/orders/5
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Order> Put(int id, [FromBody] OrderUpdateRequest request)
        {
            if (request == null)
            {
                return BadRequest();
            }

            var order = _context.Orders.Include(o => o.User).Include(o => o.OrderLineItems).FirstOrDefault(o => o.OrderId == id);
            if (order == null)
            {
                return NotFound();
            }

            order.ShippingAddress = request.ShippingAddress ?? order.ShippingAddress;
            order.OrderDate = request.OrderDate ?? order.OrderDate;

            _context.SaveChanges();

            return Ok(order);
        }

        // DELETE api/orders/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Order> Delete(int id)
        {
            var order = _context.Orders.Include(o => o.User).Include(o => o.OrderLineItems).FirstOrDefault(o => o.OrderId == id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            _context.SaveChanges();

            return Ok(order);
        }
    }
}
