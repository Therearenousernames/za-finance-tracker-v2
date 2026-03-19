using finance_tracker_api.Data;
using finance_tracker_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace finance_tracker_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class BudgetsController : BaseController
    {
        private readonly AppDbContext _context;

        public BudgetsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetBudgets()
        {
            var userId = GetUserId();
            var budgets = await _context.Budgets
                .Where(b => b.UserId == userId)
                .Include(b => b.Category)
                .ToListAsync();
            return Ok(budgets);
        }

        [HttpPost]
public async Task<IActionResult> CreateBudget(CreateBudgetDto dto)
{
    var userId = GetUserId();
    var budget = new Budget
    {
        UserId = userId,
        CategoryId = dto.CategoryId,
        Amount = dto.Amount,
        Month = dto.Month,
        Year = dto.Year
    };
    _context.Budgets.Add(budget);
    await _context.SaveChangesAsync();
    return Ok(budget);
}




        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBudget(int id, Budget updated)
        {
            var userId = GetUserId();
            var budget = await _context.Budgets
                .FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId);
            if (budget == null)
                return NotFound("Budget not found.");

            budget.Amount = updated.Amount;
            budget.Month = updated.Month;
            budget.Year = updated.Year;
            budget.CategoryId = updated.CategoryId;

            await _context.SaveChangesAsync();
            return Ok(budget);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBudget(int id)
        {
            var userId = GetUserId();
            var budget = await _context.Budgets
                .FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId);
            if (budget == null)
                return NotFound("Budget not found.");
            _context.Budgets.Remove(budget);
            await _context.SaveChangesAsync();
            return Ok("Budget deleted.");
        }
    }
}