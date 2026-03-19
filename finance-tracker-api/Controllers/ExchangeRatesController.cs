using finance_tracker_api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace finance_tracker_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ExchangeRatesController : BaseController
    {
        private readonly ExchangeRateService _exchangeRateService;

        public ExchangeRatesController(ExchangeRateService exchangeRateService)
        {
            _exchangeRateService = exchangeRateService;
        }

        [HttpGet]
        public async Task<IActionResult> GetRates([FromQuery] string base_currency = "ZAR")
        {
            var rates = await _exchangeRateService.GetRatesAsync(base_currency);
            if (rates == null)
                return StatusCode(503, "Exchange rate service is currently unavailable.");
            return Ok(rates);
        }

        [HttpGet("convert")]
        public async Task<IActionResult> Convert(
            [FromQuery] decimal amount,
            [FromQuery] string from = "ZAR",
            [FromQuery] string to = "USD")
        {
            var rates = await _exchangeRateService.GetRatesAsync(from);
            if (rates == null)
                return StatusCode(503, "Exchange rate service is currently unavailable.");

            if (!rates.Rates.ContainsKey(to))
                return BadRequest($"Currency '{to}' not found.");

            var convertedAmount = amount * rates.Rates[to];

            return Ok(new
            {
                From = from,
                To = to,
                OriginalAmount = amount,
                ConvertedAmount = Math.Round(convertedAmount, 2),
                Rate = rates.Rates[to]
            });
        }
    }
}