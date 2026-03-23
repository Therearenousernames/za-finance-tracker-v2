using System.Runtime.CompilerServices;
using System.Transactions;

namespace finance_tracker_api.Models
{
    public class Category
    {
        public int Id {get; set;}
        public string Name {get; set;} = string.Empty;
        public string Type {get; set;} = string.Empty; // "income" or "expense"
        public int UserId {get; set;}

        public User? User {get; set;}
        public ICollection<Transaction> Transactions {get; set;} = new List<Transaction>();
        public ICollection<Budget> Budgets {get; set;} = new List<Budget>();
    }
}