using System.Transactions;

namespace finance_tracker_api.Models
{
    public class User
    {
        public int Id {get; set;}
        public string Name {get; set;} = string.Empty;
        public string Email {get; set;} = string.Empty;
        public string PasswordHash {get; set;} = string.Empty;
        public DateTime createdAt {get; set;} = DateTime.UtcNow;

        public ICollection<Transaction> Transactions {get; set;} = new List<Transaction>();
        public ICollection<Budget> Budgets {get; set;} = new List<Budget>();
        public ICollection<Category> Categories {get; set;} = new List<Category>();
    }
}