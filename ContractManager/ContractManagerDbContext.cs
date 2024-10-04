using ContractManager.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace ContractManager
{
    public class ContractManagerDbContext (DbContextOptions<ContractManagerDbContext> options)
        : DbContext(options)
    {
        public DbSet<Contract> Contracts { get; set; }
    }
}
