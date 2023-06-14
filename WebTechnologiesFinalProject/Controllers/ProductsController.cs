using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using WebTechnologiesFinalProject.Models;
using WebTechnologiesFinalProject.Requests;

namespace WebTechnologiesFinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]        
    public class ProductsController : ControllerBase
    {
        private readonly Context _context;

        public ProductsController(Context context)
        {
            _context = context;
        }

        // GET: api/products
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<Product>>> Get()
        {
            return await _context.Products.Include(p => p.Comments).ToListAsync();
        }

        // GET api/products/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<Product> Get(int id)
        {
            var product = _context.Products.Include(p => p.Comments).FirstOrDefault(p => p.ProductId == id);

            if (product != null)
            {
                return Ok(product);
            }
            return NotFound();
        }

        // POST api/products
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Post([FromBody] ProductCreateRequest product)
        {
            try
            {
                var newProduct = new Product(product.Description, product.PricePerUnit, product.ShippingCost);
                if (product.ImageString != null)
                {
                    newProduct.Image = Convert.FromBase64String(product.ImageString);
                }
                _context.Products.Add(newProduct);
                _context.SaveChanges();
                int id = newProduct.ProductId;
                return CreatedAtAction(nameof(Get), new { id = id }, newProduct);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/products/5
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Put([Required] int id, [FromBody] ProductUpdateRequest updatedProduct)
        {
            var product = _context.Products.Find(id);

            if (product != null)
            {
                product.Description = updatedProduct.Description ?? product.Description;
                product.Image = updatedProduct.ImageString != null ? Convert.FromBase64String(updatedProduct.ImageString) : product.Image;
                product.PricePerUnit = updatedProduct.PricePerUnit ?? product.PricePerUnit;
                product.ShippingCost = updatedProduct.ShippingCost ?? product.ShippingCost;
                _context.SaveChanges();
                return Ok(product);
            }
            return NotFound();
        }

        // DELETE api/products/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Delete(int id)
        {
            var product = _context.Products.Find(id);

            if (product != null)
            {
                _context.Products.Remove(product);
                _context.SaveChanges();
                return Ok();
            }
            return NotFound();
        }
    }
}
