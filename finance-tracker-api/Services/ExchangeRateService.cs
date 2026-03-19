using finance_tracker_api.Models;
using System.Linq.Expressions;
using System.Text.Json;

namespace finance_tracker_api.Services
{
    public class ExchangeRateService
    {
        private readonly HttpClient _httpClient;

        public ExchangeRateService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<ExchangeRateResponse?> GetRatesAsync(string baseCurrent = "ZAR")
        {
            try
            {
                var response = await _httpClient.GetAsync(
                    $"https://api.frankfurter.app/latest?base={baseCurrent}"
                );

                if (!response.IsSuccessStatusCode)
                {
                    return null;
                }

                var content = await response.Content.ReadAsStringAsync();
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };

                return JsonSerializer.Deserialize<ExchangeRateResponse>(content, options);
            }
            catch
            {
                return null;
            }
        }
           
    }
    
}