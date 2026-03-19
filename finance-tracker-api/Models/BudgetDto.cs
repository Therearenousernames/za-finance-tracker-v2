namespace finance_tracker_api.Models
{
    public class CreateBudgetDto
    {
        public int CategoryId {get; set;}
        public decimal Amount {get; set;}
        public int Month {get; set;} // 1-12
        public int Year {get; set;}
    }
}