using finance_tracker_api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace finance_tracker_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class DashboardController : BaseController
    {
        private readonly AppDbContext _context;

        public DashboardController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary()
        {
            var userId = GetUserId();
            var now = DateTime.UtcNow;

            var transactions = await _context.Transactions
                .Where(t => t.UserId == userId &&
                            t.Date.Month == now.Month &&
                            t.Date.Year == now.Year)
                .Include(t => t.Category)
                .ToListAsync();

            var totalIncome = transactions
                .Where(t => t.Category.Type == "income")
                .Sum(t => t.Amount);

            var totalExpenses = transactions
                .Where(t => t.Category.Type == "expense")
                .Sum(t => t.Amount);

            var netBalance = totalIncome - totalExpenses;

            var spendingByCategory = transactions
                .Where(t => t.Category.Type == "expense")
                .GroupBy(t => t.Category.Name)
                .Select(g => new
                {
                    Category = g.Key,
                    Total = g.Sum(t => t.Amount)
                });

            return Ok(new
            {
                TotalIncome = totalIncome,
                TotalExpenses = totalExpenses,
                NetBalance = netBalance,
                SpendingByCategory = spendingByCategory
            });
        }
    }
}