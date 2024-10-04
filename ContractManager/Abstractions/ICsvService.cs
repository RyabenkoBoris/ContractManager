using ContractManager.Core.Models;

namespace ContractManager.Abstractions
{
    public interface ICsvService
    {
        (IEnumerable<Contract>?, string) ReadFile(IFormFile file);
    }
}