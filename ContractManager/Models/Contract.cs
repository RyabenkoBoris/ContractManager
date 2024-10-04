using CsvHelper.Configuration.Attributes;
using System.ComponentModel.DataAnnotations;

namespace ContractManager.Core.Models
{
    public class Contract
    {
        [Ignore]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        [Name("Date of birth")]
        public DateOnly Date { get; set; }
        public bool Married { get; set; }
        public string Phone { get; set; } = string.Empty;
        public decimal Salary { get; set; }
    }
}
