namespace finance_tracker_api.Models
{
    public class ExchangeRateResponse
    {
        public string Base { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public Dictionary<string, decimal> Rates { get; set; } = new();
    }
}