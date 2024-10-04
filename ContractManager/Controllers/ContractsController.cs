using ContractManager.Abstractions;
using ContractManager.Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContractManager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContractsController : ControllerBase
    {
        private readonly ICsvService _csvService;
        private readonly ContractManagerDbContext _context;
        public ContractsController(ICsvService csvService, ContractManagerDbContext contractManagerDbContext)
        {
            _csvService = csvService;
            _context = contractManagerDbContext;
        }
        [HttpGet]
        public async Task<ActionResult<List<Contract>>> GetContracts()
        {
            var contracts = await _context.Contracts
                .AsNoTracking()
                .ToListAsync();

            return Ok(contracts);
        }

        [HttpPost]
        public async Task<ActionResult> CreateContracts(IFormFile csvFile)
        {
            if (csvFile.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }
            var contractsResult = _csvService.ReadFile(csvFile);
            if(contractsResult.Item1 is null)
            {
                return BadRequest(contractsResult.Item2);
            }

            var newContracts = contractsResult.Item1
                .Where(c => !_context.Contracts
                .Any(exist => exist.Name == c.Name &&
                              exist.Date == c.Date &&
                              exist.Phone == c.Phone))
                .ToList();
            if (newContracts.Any())
            {
                await _context.Contracts.AddRangeAsync(newContracts);
                await _context.SaveChangesAsync();
            }
            return Ok();
        }
        [HttpPut]
        public async Task<ActionResult> ModifyContract(Contract contract)
        {
            Console.WriteLine(contract.Date);

            await _context.Contracts
                .Where(c => c.Id == contract.Id)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(c => c.Name, contract.Name)
                    .SetProperty(c => c.Date, contract.Date)
                    .SetProperty(c => c.Married, contract.Married)
                    .SetProperty(c => c.Phone, contract.Phone)
                    .SetProperty(c => c.Salary, contract.Salary));

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteContract(int id)
        {
            await _context.Contracts
                .Where(c => c.Id == id)
                .ExecuteDeleteAsync();
            return Ok();
        }
    }
}
