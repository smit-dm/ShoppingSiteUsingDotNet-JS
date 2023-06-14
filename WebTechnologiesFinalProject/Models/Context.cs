using Microsoft.EntityFrameworkCore;

namespace WebTechnologiesFinalProject.Models
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options)
            : base(options)
        {
        }
        public DbSet<Product> Products { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Comment> Comments { get; set; } = null!;
        public DbSet<Cart> Carts { get; set; } = null!;
        public DbSet<CartLineItem> CartLineItems { get; set; } = null!;
        public DbSet<OrderLineItem> OrderLineItems { get; set; } = null!;
        public DbSet<Order> Orders { get; set; } = null!;        
    }
}
