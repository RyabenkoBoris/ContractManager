namespace ContractManager.Core.Models
{
    internal class Contract
    {
        const int MAX_NAME_LENGTH = 100;
        private Contract(int id, string name, bool married, string phone, decimal salary)
        {
            Id = id;
            Name = name;
            Married = married;
            Phone = phone;
            Salary = salary;
        }
        public int Id { get; }
        public string Name { get; } = string.Empty;
        public bool Married { get; }
        public string Phone { get; } = string.Empty;
        public decimal Salary { get; }

        public static(Contract Contract, string Error) Create(int id, string name, bool married, string phone, decimal salary)
        {
            var error = string.Empty;

            if(string.IsNullOrEmpty(name) || name.Length > MAX_NAME_LENGTH)
            {
                error = $"Name can not be empty or longer than {MAX_NAME_LENGTH} symbols";
            }

            var contract = new Contract(id, name, married, phone, salary);

            return (contract, error);
        }
    }
}
