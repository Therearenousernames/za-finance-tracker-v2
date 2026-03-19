namespace finance_tracker_api.Models
{
    public class CreateCategoryDto
    {
        public string Name { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty; // "income" or "expense"
    }
}