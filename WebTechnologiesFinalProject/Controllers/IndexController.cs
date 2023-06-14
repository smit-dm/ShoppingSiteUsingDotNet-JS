using Microsoft.AspNetCore.Mvc;

namespace WebTechnologiesFinalProject.Controllers
{
    public class IndexController : Controller
    {
        public IActionResult Index()
        {
            // return index from wwwroot
            // get relative path 
            var path = System.IO.Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html");
            // read file
            var file = System.IO.File.ReadAllText(path);
            // return file
            return Content(file, "text/html");
        }
    }
}
