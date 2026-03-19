using finance_tracker_api.Data;
using finance_tracker_api.Models;
using finance_tracker_api.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace finance_tracker_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class CategoriesController : BaseController
    {
        private readonly AppDbContext _context;

        public CategoriesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var userId = GetUserId();
            var categories = await _context.Categories
                .Where(c => c.UserId == userId)
                .ToListAsync();
            return Ok(categories);
        }

        [HttpPost]
public async Task<IActionResult> CreateCategory(CreateCategoryDto dto)
{
    var userId = GetUserId();
    var category = new Category
    {
        Name = dto.Name,
        Type = dto.Type,
        UserId = userId
    };
    _context.Categories.Add(category);
    await _context.SaveChangesAsync();
    return Ok(category);
}

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var userId = GetUserId();
            var category = await _context.Categories
                .FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);
            if (category == null)
                return NotFound("Category not found.");
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return Ok("Category deleted.");
        }
    }
}