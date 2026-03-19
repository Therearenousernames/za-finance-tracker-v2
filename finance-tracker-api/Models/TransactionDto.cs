namespace finance_tracker_api.Models
{
    public class CreateTransactionDto
    {
        public int CategoryId {get; set;}
        public decimal Amount {get; set;}
        public string Description {get; set;} = string.Empty;
        public DateTime Date {get; set;}
    }
}