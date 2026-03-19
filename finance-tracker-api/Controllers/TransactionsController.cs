using finance_tracker_api.Data;
using finance_tracker_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace finance_tracker_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class TransactionsController : BaseController
    {
        private readonly AppDbContext _context;

        public TransactionsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetTransactions()
        {
            var userId = GetUserId();
            var transactions = await _context.Transactions
                .Where(t => t.UserId == userId)
                .Include(t => t.Category)
                .OrderByDescending(t => t.Date)
                .ToListAsync();
            return Ok(transactions);
        }

       [HttpPost]
public async Task<IActionResult> CreateTransaction(CreateTransactionDto dto)
{
    var userId = GetUserId();
    var transaction = new Transaction
    {
        UserId = userId,
        CategoryId = dto.CategoryId,
        Amount = dto.Amount,
        Description = dto.Description,
        Date = DateTime.SpecifyKind(dto.Date, DateTimeKind.Utc)
    };
    _context.Transactions.Add(transaction);
    await _context.SaveChangesAsync();
    return Ok(transaction);
}


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTransaction(int id, CreateTransactionDto dto)
        {
            var userId = GetUserId();
            var transaction = await _context.Transactions
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
            if (transaction == null)
                return NotFound("Transaction not found.");

            transaction.Amount = dto.Amount;
            transaction.Description = dto.Description;
            transaction.Date = DateTime.SpecifyKind(dto.Date, DateTimeKind.Utc);
            transaction.CategoryId = dto.CategoryId;

            await _context.SaveChangesAsync();
            return Ok(transaction);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            var userId = GetUserId();
            var transaction = await _context.Transactions
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
            if (transaction == null)
                return NotFound("Transaction not found.");
            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();
            return Ok("Transaction deleted.");
        }
    }
}